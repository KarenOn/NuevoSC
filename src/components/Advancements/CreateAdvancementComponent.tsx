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
  CREATE_ADVANCEMENT_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Utils
import { advancementTypesSelectData } from '../../utils/';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
  ReadOnlyInputComponent,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { AdvancementContext } from '../../context';

interface Props {
  submitFunction: (values: any) => void;
  defaultValues: AdvancementContext.Advancement;
  error: any;
  status: string;
  submitError: any;
  nextPaymentDate: string;
  balance: number;
  paymentAmount: number;
}

// Variables
const componentFields = pick(fields, [
  '_advancement_type',
  'amount',
  'details',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreateAdvancementComponent(props: Props) {
  const { _advancement_type, amount, details } = componentFields;
  const {
    submitFunction,
    error,
    status,
    defaultValues,
    submitError,
    nextPaymentDate,
    balance,
    paymentAmount,
  } = props;
  const initialFieldsState = {
    ...defaultValues,
    amount: paymentAmount.toString(),
  };
  const submitTitle = TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = status === 'loading';
  const { data, hashTable } = advancementTypesSelectData();

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
              <ReadOnlyInputComponent
                title="Próximo pago"
                value={nextPaymentDate}
                style={GeneralStyles.marginT30}
              />

              <ReadOnlyInputComponent
                title="Valor cuota"
                value={paymentAmount}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Balance"
                value={balance}
                style={GeneralStyles.marginT15}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={_advancement_type}
                customProps={{ data, hashTable }}
              />

              <Input containerStyle={GeneralStyles.marginT15} input={amount} />

              <Input containerStyle={GeneralStyles.marginT15} input={details} />

              {(error || submitError) && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {CREATE_ADVANCEMENT_ERRORS[
                    getCode(error?.message) as errorTypes
                  ] || submitError?.message}
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

export default CreateAdvancementComponent;
