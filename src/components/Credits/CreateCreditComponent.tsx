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

// Utils
import {
  clientsSelectData,
  paymentPeriositySelectData,
  getPayments,
  getPaymentAmount,
  getPercent,
} from '../../utils/';

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
import { CreditContext } from '../../context';
import { Client } from '../../context/client/clientContext';

interface Props {
  submitFunction: (values: any) => void;
  defaultValues: CreditContext.Credit;
  error: any;
  status: string;
  clients: Client[];
  submitError: any;
  canCreateSpecialCredit: boolean;
}

// Variables
const componentFields = pick(fields, [
  'client',
  'payment_periosity',
  'amount',
  'duration',
  'specialCredit',
  'advancement',
  'percent',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreateCreditComponent(props: Props) {
  const {
    client,
    payment_periosity,
    amount,
    duration,
    specialCredit,
    advancement,
    percent,
  } = componentFields;
  const {
    submitFunction,
    error,
    status,
    defaultValues,
    clients,
    submitError,
    canCreateSpecialCredit,
  } = props;
  const initialFieldsState = {
    ...defaultValues,
    client: defaultValues.client?.id.toString(),
    amount: defaultValues.amount.toString(),
    duration: defaultValues.duration.toString(),
    percent: defaultValues.percent.toString(),
    advancement: defaultValues.advancement.toString(),
    specialCredit: false,
  };
  const submitTitle = TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = status === 'loading';
  const { data, hashTable } = clientsSelectData(clients);
  const {
    data: periosityData,
    hashTable: periosityHashTable,
  } = paymentPeriositySelectData();

  const onSubmit = (values: any) => submitFunction(values);

  return (
    <View style={[GeneralStyles.flex1]}>
      <Formik
        initialValues={initialFieldsState}
        validationSchema={componentSchema}
        onSubmit={onSubmit}
        enableReinitialize>
        {({ handleSubmit, values }) => {
          const payments = getPayments(
            values.payment_periosity,
            parseInt(values.duration, 0),
          );
          const balances = getPaymentAmount(
            values.advancement,
            values.amount,
            payments.toString(),
            values.specialCredit,
            values.specialCredit,
            values.percent,
          );
          const _percent = getPercent(values.specialCredit);

          return (
            <ScrollView
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
              contentContainerStyle={GeneralStyles.paddingB20}
              keyboardShouldPersistTaps="handled">
              <View>
                <Input
                  containerStyle={GeneralStyles.marginT30}
                  input={client}
                  customProps={{ data, hashTable }}
                />

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={payment_periosity}
                  customProps={{
                    data: periosityData,
                    hashTable: periosityHashTable,
                  }}
                />

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={amount}
                />

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={duration}
                />

                {canCreateSpecialCredit && (
                  <Input
                    containerStyle={GeneralStyles.marginT15}
                    input={specialCredit}
                  />
                )}

                <ReadOnlyInputComponent
                  title="Cantidad de cuotas"
                  value={payments}
                  style={GeneralStyles.marginT15}
                />

                <ReadOnlyInputComponent
                  title="Valor cuota"
                  value={balances._payment_amount}
                  style={GeneralStyles.marginT15}
                />

                <ReadOnlyInputComponent
                  title="Saldo"
                  value={balances.balance}
                  style={GeneralStyles.marginT15}
                />

                {!values.specialCredit && (
                  <ReadOnlyInputComponent
                    title="Porcentaje"
                    value={_percent}
                    style={GeneralStyles.marginT15}
                  />
                )}

                {values.specialCredit && (
                  <Input
                    containerStyle={GeneralStyles.marginT15}
                    input={percent}
                  />
                )}

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={advancement}
                />

                {(error || submitError) && (
                  <ValidationMessageComponent style={GeneralStyles.marginT15}>
                    {BASE_MESSAGES[getCode(error?.message) as errorTypes] ||
                      submitError?.message}
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
          );
        }}
      </Formik>
    </View>
  );
}

export default CreateCreditComponent;
