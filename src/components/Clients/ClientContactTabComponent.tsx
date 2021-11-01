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
  CLIENT_ERRORS,
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
import { ClientContext, RouteContext } from '../../context';

// Utils
import { routesSelectData } from '../../utils';

interface Props {
  submitFunction: (values: any) => void;
  onCancel: () => void;
  defaultValues: ClientContext.Client;
  error: any;
  status: string;
  name: string;
  _id: number;
  routes: RouteContext.Route[];
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
}

// Variables
const componentFields = pick(fields, [
  'addressRequired',
  'routeIdRequired',
  'housePhoneNumber',
  'phoneNumber',
  'details',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function ClientContactTabComponent(props: Props) {
  const {
    addressRequired,
    routeIdRequired,
    housePhoneNumber,
    phoneNumber,
    details,
  } = componentFields;
  const {
    submitFunction,
    onCancel,
    defaultValues,
    error,
    status,
    name,
    _id,
    routes,
    onEdit,
    editError,
    editStatus,
  } = props;
  const initialFieldsState = {
    ...defaultValues,
    route: defaultValues._route?.id,
  };
  const btnSubmitTitle = _id
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = editStatus === 'loading' || status === 'loading';
  const { data: routesData, hashTable: routesTable } = routesSelectData(routes);

  const onSubmit = (values: any) => {
    if (_id) {
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
                {TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_FORM_TITLE}
              </Text>
            </View>
            <View style={[GeneralStyles.marginT30, GeneralStyles.flexRow]}>
              <Text bold style={GeneralStyles.fontSize18}>
                {TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_NAME_LABEL}
              </Text>
              <Text bold upper style={GeneralStyles.fontSize18}>
                {name}
              </Text>
            </View>
            <View>
              <Input
                containerStyle={GeneralStyles.marginT15}
                input={addressRequired}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={routeIdRequired}
                customProps={{ data: routesData, hashTable: routesTable }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={housePhoneNumber}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={phoneNumber}
              />

              <Input containerStyle={GeneralStyles.marginT15} input={details} />

              {(error || editError) && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {CLIENT_ERRORS[getCode(error?.message) as errorTypes] ||
                    CLIENT_ERRORS[getCode(editError?.message) as errorTypes]}
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

export default ClientContactTabComponent;
