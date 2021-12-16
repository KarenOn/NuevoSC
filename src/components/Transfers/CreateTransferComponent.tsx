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
import { officesSelectData, routesSelectData } from '../../utils/';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { TransferContext } from '../../context';
import { Office } from '../../context/office/officeContext';
import { Route } from '../../context/route/routeContext';

interface Props {
  submitFunction: (values: any) => void;
  error: any;
  status: string;
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
  defaultValues: TransferContext.Transfer;
  offices: Office[];
  routes: Route[];
  onOfficeChange: (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => void;
}

// Variables
const componentFields = pick(fields, [
  'officeId',
  'route_origin',
  'route_destination',
  'detailsRequired',
  'amount',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreateTransferComponent(props: Props) {
  const {
    officeId,
    route_origin,
    route_destination,
    detailsRequired,
    amount,
  } = componentFields;
  const {
    submitFunction,
    error,
    status,
    onEdit,
    editError,
    editStatus,
    defaultValues,
    offices,
    routes,
    onOfficeChange,
  } = props;
  const initialFieldsState = {
    _office: defaultValues.office_of_route.toString(),
    _route_origin: defaultValues._route_origin?.id.toString(),
    _route_destination: defaultValues._route_destination?.id.toString(),
    details: defaultValues.observation,
    amount: defaultValues.amount.toString(),
  };
  const submitTitle = defaultValues.id
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = editStatus === 'loading' || status === 'loading';
  const { data, hashTable } = officesSelectData(offices);
  const { data: routesData, hashTable: routesHashTable } = routesSelectData(
    routes,
  );

  const onSubmit = (values: any) => {
    if (defaultValues.id) {
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
        {({ handleSubmit, setFieldValue }) => (
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
            contentContainerStyle={GeneralStyles.paddingB20}
            keyboardShouldPersistTaps="handled">
            <View>
              <Input
                containerStyle={GeneralStyles.marginT30}
                input={officeId}
                customProps={{
                  data,
                  hashTable,
                  onOfficeChange,
                  setFieldValue,
                }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={route_origin}
                customProps={{
                  data: routesData,
                  hashTable: routesHashTable,
                }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={route_destination}
                customProps={{
                  data: routesData,
                  hashTable: routesHashTable,
                }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={detailsRequired}
              />

              <Input containerStyle={GeneralStyles.marginT15} input={amount} />

              {(error || editError) && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {BASE_MESSAGES[getCode(error?.message) as errorTypes] ||
                    BASE_MESSAGES[getCode(editError?.message) as errorTypes]}
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

export default CreateTransferComponent;
