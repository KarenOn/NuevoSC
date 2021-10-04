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
  ROUTE_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

import { citiesSelectData, officesSelectData } from '../../utils/';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { RouteContext } from '../../context';
import { Office } from '../../context/office/officeContext';
import { City } from '../../context/city/cityContext';

interface Props {
  submitFunction: (values: any) => void;
  defaultValues: RouteContext.Route;
  error: any;
  status: string;
  offices: Office[];
  cities: City[];
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
}

// Variables
const componentFields = pick(fields, [
  'name',
  'partners',
  'phoneNumber',
  'cityId',
  'officeId',
  'permitirAbonos',
  'canCreateClient',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreateRouteComponent(props: Props) {
  const {
    name,
    partners,
    phoneNumber,
    cityId,
    officeId,
    permitirAbonos,
    canCreateClient,
  } = componentFields;
  const {
    submitFunction,
    error,
    status,
    defaultValues,
    offices,
    cities,
    onEdit,
    editError,
    editStatus,
  } = props;
  const initialFieldsState = {
    ...defaultValues,
    city: defaultValues.city?.id,
    office: defaultValues.office?.id,
  };
  const submitTitle = defaultValues.id
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = editStatus === 'loading' || status === 'loading';
  const { data, hashTable } = officesSelectData(offices);
  const { data: citiesData, hashTable: citiesHashTable } = citiesSelectData(
    cities,
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
        {({ handleSubmit }) => (
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
            contentContainerStyle={GeneralStyles.paddingB20}
            keyboardShouldPersistTaps="handled">
            <View>
              <Input containerStyle={GeneralStyles.marginT30} input={name} />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={partners}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={phoneNumber}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={cityId}
                customProps={{ data: citiesData, hashTable: citiesHashTable }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={officeId}
                customProps={{ data, hashTable }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={permitirAbonos}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={canCreateClient}
              />

              {(error || editError) && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {ROUTE_ERRORS[getCode(error?.message) as errorTypes] ||
                    ROUTE_ERRORS[getCode(editError?.message) as errorTypes]}
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

export default CreateRouteComponent;
