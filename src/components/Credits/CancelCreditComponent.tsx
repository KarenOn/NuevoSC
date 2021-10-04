import React from 'react';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pick } from 'lodash';

// Constants
import {
  fields,
  TextConstants,
  TestIdConstants,
  BASE_MESSAGES,
  getCode,
  errorTypes,
} from '../../constants';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

interface Props {
  submitFunction: (values: any) => void;
  error: any;
  status: string;
}

// Variables
const componentFields = pick(fields, ['description']);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CancelCreditComponent(props: Props) {
  const { description } = componentFields;
  const { submitFunction, error, status } = props;
  const initialFieldsState = {
    description: '',
  };
  const submitTitle = TextConstants.CANCELLED;
  const isLoading = status === 'loading';

  const onSubmit = (values: any) => submitFunction(values);

  return (
    <View style={[GeneralStyles.flex1]}>
      <Formik
        initialValues={initialFieldsState}
        validationSchema={componentSchema}
        onSubmit={onSubmit}
        enableReinitialize>
        {({ handleSubmit }) => (
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
            contentContainerStyle={GeneralStyles.paddingB20}
            keyboardShouldPersistTaps="handled">
            <View>
              <Input
                containerStyle={GeneralStyles.marginT30}
                input={description}
              />

              {error && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {BASE_MESSAGES[getCode(error?.message) as errorTypes]}
                </ValidationMessageComponent>
              )}

              <View style={[GeneralStyles.marginT30]}>
                <Button
                  title={submitTitle}
                  testID={TestIdConstants.SAVE_BTN}
                  disabled={isLoading}
                  onPress={handleSubmit}
                  loading={isLoading}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default CancelCreditComponent;
