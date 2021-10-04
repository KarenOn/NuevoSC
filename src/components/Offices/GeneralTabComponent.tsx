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
  OFFICE_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Components
import {
  InputComponent as Input,
  CustomTextComponent as Text,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { OfficeContext } from '../../context';

interface Props {
  submitFunction: (values: any) => void;
  defaultValues: OfficeContext.Office;
  error: any;
  status: string;
}

// Variables
const componentFields = pick(fields, [
  'name',
  'canCreateSpecialCredits',
  'canEditPhone',
  'canCreateClientInMultipleRoutes',
  'maximumDaysToCancel',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function GeneralTabComponent(props: Props) {
  const {
    name,
    canCreateSpecialCredits,
    canEditPhone,
    canCreateClientInMultipleRoutes,
    maximumDaysToCancel,
  } = componentFields;
  const { submitFunction, error, status, defaultValues } = props;
  const initialFieldsState = {
    ...defaultValues,
    maximum_days_to_cancel: defaultValues.maximum_days_to_cancel.toString(),
  };

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
            <View style={[GeneralStyles.alignCenter, GeneralStyles.marginT30]}>
              <Text style={GeneralStyles.fontSize20}>
                {TextConstants.CREATE_OFFICE_VIEW_FORM_TITLE}
              </Text>
            </View>
            <View>
              <Input containerStyle={GeneralStyles.marginT30} input={name} />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={canCreateSpecialCredits}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={canEditPhone}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={canCreateClientInMultipleRoutes}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={maximumDaysToCancel}
              />

              {error && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {OFFICE_ERRORS[getCode(error?.message) as errorTypes]}
                </ValidationMessageComponent>
              )}

              <View style={[GeneralStyles.marginT30]}>
                <Button
                  title={TextConstants.CREATE_OFFICE_VIEW_SUBMIT_BTN}
                  testID={TestIdConstants.CREATE_OFFICE_VIEW_SUBMIT_BTN}
                  disabled={status === 'loading'}
                  onPress={handleSubmit}
                  loading={status === 'loading'}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default GeneralTabComponent;
