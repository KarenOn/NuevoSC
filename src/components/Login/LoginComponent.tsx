import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pick } from 'lodash';

// Constants
import {
  fields,
  TextConstants,
  TestIdConstants,
  AUTH_ERRORS,
  getCode,
  errorTypes,
} from '../../constants/';

// Components
import {
  InputComponent as Input,
  CustomTextComponent as Text,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common/';

// Assets
import { GeneralStyles } from '../../assets/';

interface Props {
  submitFunction: (values: any) => void;
  error: any;
  status: string;
}

// Variables
const componentFields = pick(fields, ['document', 'password']);

const initialFieldsState = Object.values(componentFields).reduce(
  (prev, next) => ({ ...prev, [next.name]: next.initialValue }),
  {},
);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function LoginComponent(props: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const { document, password } = componentFields;
  const { submitFunction, error, status } = props;

  /**
   * This function is used for toggle password
   */
  const onVisibilityChange = () => setIsVisible(!isVisible);

  const onSubmit = (values: any) => submitFunction(values);

  return (
    <View style={[GeneralStyles.flex1]}>
      <Formik
        initialValues={initialFieldsState}
        validationSchema={componentSchema}
        onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
            contentContainerStyle={GeneralStyles.flex1}
            keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              style={[GeneralStyles.flex1, GeneralStyles.justifyCenter]}
              behavior={Platform.select({
                ios: 'padding',
                android: undefined,
              })}>
              <View style={GeneralStyles.alignCenter}>
                <Text h3>{TextConstants.LOGIN_VIEW_LOGIN_BTN}</Text>
              </View>
              <View>
                <Input
                  containerStyle={GeneralStyles.marginT30}
                  input={document}
                />

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={password}
                  customProps={{
                    isVisible,
                    onClick: onVisibilityChange,
                  }}
                />

                {error && (
                  <ValidationMessageComponent style={GeneralStyles.marginT15}>
                    {AUTH_ERRORS[getCode(error?.message) as errorTypes]}
                  </ValidationMessageComponent>
                )}

                <View style={[GeneralStyles.marginT30]}>
                  <Button
                    title={TextConstants.LOGIN_VIEW_LOGIN_BTN}
                    testID={TestIdConstants.LOGIN_VIEW_LOGIN_BTN}
                    disabled={status === 'loading'}
                    onPress={handleSubmit}
                    loading={status === 'loading'}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default LoginComponent;
