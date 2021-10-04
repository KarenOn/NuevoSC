import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pick } from 'lodash';

// Constants
import {
  fields,
  TextConstants,
  TestIdConstants,
  USER_ERRORS,
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
import {
  SessionContext,
  RouteContext,
  OfficeContext,
  RolContext,
} from '../../context';

// Utils
import {
  routesSelectData,
  officesSelectData,
  rolesSelectData,
} from '../../utils';

interface Props {
  submitFunction: (values: any) => void;
  onCancel: () => void;
  defaultValues: SessionContext.User;
  error: any;
  status: string;
  userName: string;
  userId: number;
  roles: RolContext.Rol[];
  routes: RouteContext.Route[];
  offices: OfficeContext.Office[];
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
}

export interface HashTable {
  value: string;
  label: string;
}

// Variables
const componentFields = (isEdit: boolean) => {
  const _fields = pick(fields, [
    'routeId',
    'officeIdNoRequired',
    'phoneNumber',
    'rolId',
  ]);
  const password = isEdit ? fields.passwordNoRequired : fields.password;
  return {
    ..._fields,
    password,
  };
};

const componentSchema = (isEdit: boolean) => {
  return Yup.object().shape(
    Object.values(componentFields(isEdit)).reduce(
      (prev, next) => ({ ...prev, [next.name]: next.validation }),
      {},
    ),
  );
};

const showOfficeInput = (value: HashTable) => {
  return (
    value &&
    (value.label.toLowerCase() === TextConstants.SUPERVISOR ||
      value.label.toLowerCase() === TextConstants.REVIEWER)
  );
};

const showRouteInput = (value: HashTable) =>
  value && value.label.toLowerCase() === TextConstants.ADVISER;

function UserAdminTabComponent(props: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    submitFunction,
    error,
    status,
    defaultValues,
    userName,
    onCancel,
    userId,
    roles,
    routes,
    offices,
    onEdit,
    editError,
    editStatus,
  } = props;
  const initialFieldsState = {
    ...defaultValues,
    office: defaultValues?.office?.id,
    route: defaultValues?.route?.id,
    rol: defaultValues?.rol?.id,
    password: '',
  };
  const {
    routeId,
    officeIdNoRequired,
    password,
    phoneNumber,
    rolId,
  } = componentFields(!!userId);
  const btnSubmitTitle = userId
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  // Select data
  const { data: routesData, hashTable: routesTable } = routesSelectData(routes);
  const { data: officesData, hashTable: officesTable } = officesSelectData(
    offices,
  );
  const { data: rolesData, hashTable: rolesTable } = rolesSelectData(roles);
  const isLoading = editStatus === 'loading' || status === 'loading';

  /**
   * This function is used for toggle password
   */
  const onVisibilityChange = () => setIsVisible(!isVisible);

  const onSubmit = (values: any) => {
    if (userId) {
      onEdit(values);
    } else {
      submitFunction(values);
    }
  };

  return (
    <View style={[GeneralStyles.flex1]}>
      <Formik
        initialValues={initialFieldsState}
        validationSchema={() => componentSchema(!!userId)}
        onSubmit={onSubmit}
        enableReinitialize>
        {({ handleSubmit, values }) => {
          const { rol } = values;
          const rolName = rolesTable[rol];

          return (
            <ScrollView
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
              contentContainerStyle={GeneralStyles.paddingB20}
              keyboardShouldPersistTaps="handled">
              <View
                style={[GeneralStyles.alignCenter, GeneralStyles.marginT30]}>
                <Text style={GeneralStyles.fontSize20}>
                  {TextConstants.CREATE_USER_ADMIN_TAB_FORM_TITLE}
                </Text>
              </View>
              <View style={[GeneralStyles.marginT30, GeneralStyles.flexRow]}>
                <Text bold style={GeneralStyles.fontSize18}>
                  {TextConstants.CREATE_USER_ADMIN_TAB_NAME_LABEL}
                </Text>
                <Text bold upper style={GeneralStyles.fontSize18}>
                  {userName}
                </Text>
              </View>
              <View>
                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={rolId}
                  customProps={{ data: rolesData, hashTable: rolesTable }}
                />

                {showRouteInput(rolName) && (
                  <Input
                    containerStyle={GeneralStyles.marginT15}
                    input={routeId}
                    customProps={{ data: routesData, hashTable: routesTable }}
                  />
                )}

                {showOfficeInput(rolName) && (
                  <Input
                    containerStyle={GeneralStyles.marginT15}
                    input={officeIdNoRequired}
                    customProps={{ data: officesData, hashTable: officesTable }}
                  />
                )}

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={password}
                  customProps={{
                    isVisible,
                    onClick: onVisibilityChange,
                  }}
                />

                <Input
                  containerStyle={GeneralStyles.marginT15}
                  input={phoneNumber}
                />

                {(error || editError) && (
                  <ValidationMessageComponent style={GeneralStyles.marginT15}>
                    {USER_ERRORS[getCode(error?.message) as errorTypes] ||
                      USER_ERRORS[getCode(editError?.message) as errorTypes]}
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
          );
        }}
      </Formik>
    </View>
  );
}

export default UserAdminTabComponent;
