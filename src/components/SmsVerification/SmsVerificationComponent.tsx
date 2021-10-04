import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pick } from 'lodash';

// Constants
import {
  fields,
  TextConstants,
  TestIdConstants,
  getCode,
  VERIFICATION_ERRORS,
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
  submitFunction: (value: string) => void;
  error: any;
  status: string;
}

// Variables
const componentFields = pick(fields, ['code']);

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

function SmsVerificationComponent(props: Props) {
  const { code } = componentFields;
  const { submitFunction, error, status } = props;

  const onSubmit = ({ code: codeVal }: any) => submitFunction(codeVal);

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
                <Text h3>{TextConstants.VERIFICATION_VIEW_BTN}</Text>
              </View>
              <View>
                <Input containerStyle={GeneralStyles.marginT30} input={code} />

                {error && (
                  <ValidationMessageComponent style={GeneralStyles.marginT15}>
                    {VERIFICATION_ERRORS[getCode(error?.message) as errorTypes]}
                  </ValidationMessageComponent>
                )}

                <View style={[GeneralStyles.marginT30]}>
                  <Button
                    title={TextConstants.VERIFICATION_VIEW_BTN}
                    testID={TestIdConstants.VERIFICATION_VIEW_BTN}
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

export default SmsVerificationComponent;
