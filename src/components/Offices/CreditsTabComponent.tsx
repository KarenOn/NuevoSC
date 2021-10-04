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

// Utils
import { capitalizeFirst } from '../../utils/';

interface Props {
  submitFunction: (values: any) => void;
  onCancel: () => void;
  defaultValues: OfficeContext.Office;
  error: any;
  status: string;
  officeName: string;
  officeId: number;
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
}

// Variables
const componentFields = pick(fields, [
  'minimumCreditValue',
  'maximumCreditValue',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreditsTabComponent(props: Props) {
  const { minimumCreditValue, maximumCreditValue } = componentFields;
  const {
    submitFunction,
    error,
    status,
    defaultValues,
    officeName,
    onCancel,
    officeId,
    onEdit,
    editError,
    editStatus,
  } = props;
  const initialFieldsState = {
    minimum_credit_value: defaultValues.minimum_credit_value.toString(),
    maximum_credit_value: defaultValues.maximum_credit_value.toString(),
    minimum_percent: defaultValues.minimum_percent.toString(),
    maximum_percent: defaultValues.maximum_percent.toString(),
  };
  const btnSubmitTitle = officeId
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = editStatus === 'loading' || status === 'loading';

  const onSubmit = (values: any) => {
    if (officeId) {
      onEdit(values);
    } else {
      submitFunction(values);
    }
  };

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
                {TextConstants.CREATE_OFFICE_CREDIT_TAB_FORM_TITLE}
              </Text>
            </View>
            <View style={[GeneralStyles.marginT30, GeneralStyles.flexRow]}>
              <Text bold style={GeneralStyles.fontSize18}>
                {TextConstants.CREATE_OFFICE_CREDIT_TAB_NAME_LABEL}
              </Text>
              <Text bold upper style={GeneralStyles.fontSize18}>
                {capitalizeFirst(officeName)}
              </Text>
            </View>
            <View>
              <Input
                containerStyle={GeneralStyles.marginT15}
                input={minimumCreditValue}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={maximumCreditValue}
              />

              {(error || editError) && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {OFFICE_ERRORS[getCode(error?.message) as errorTypes] ||
                    OFFICE_ERRORS[getCode(editError?.message) as errorTypes]}
                </ValidationMessageComponent>
              )}

              <View style={[GeneralStyles.marginT30]}>
                <Button
                  title={btnSubmitTitle}
                  testID={TestIdConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN}
                  disabled={isLoading}
                  onPress={handleSubmit}
                  loading={isLoading}
                />
              </View>
              <View style={[GeneralStyles.marginT15]}>
                <Button
                  danger
                  title={TextConstants.CREATE_OFFICE_CREDIT_TAB_CANCEL_BTN}
                  testID={TestIdConstants.CREATE_OFFICE_CREDIT_TAB_CANCEL_BTN}
                  disabled={isLoading}
                  onPress={onCancel}
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

export default CreditsTabComponent;
