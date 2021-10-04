import React from 'react';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pick, get } from 'lodash';

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
import { officesSelectData, routesToReportSelectData } from '../../utils';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
  ReportItemComponent,
  DateInputComponent,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { Office } from '../../context/office/officeContext';
import { Route } from '../../context/route/routeContext';

interface Props {
  submitFunction: (values: any) => void;
  error: any;
  status: string;
  offices: Office[];
  routes: Route[];
  onOfficeChange: (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => void;
  onRouteChange: (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => void;
  link: string;
  reportTitle: string;
}

// Variables
const componentFields = pick(fields, ['officeId', 'routeIdRequired']);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function RouteDayBalanceReportComponent(props: Props) {
  const { officeId, routeIdRequired } = componentFields;
  const {
    submitFunction,
    error,
    status,
    offices,
    routes,
    onOfficeChange,
    onRouteChange,
    link,
    reportTitle,
  } = props;
  const initialFieldsState = {
    office: '',
    route: '',
  };
  const isLoading = status === 'loading';
  const { data: officesData, hashTable: officesHashTable } = officesSelectData(
    offices,
  );
  const {
    data: routesData,
    hashTable: routesHashTable,
  } = routesToReportSelectData(routes);

  const onSubmit = (values: any) => submitFunction(values);

  return (
    <View style={[GeneralStyles.flex1]}>
      <Formik
        initialValues={initialFieldsState}
        validationSchema={componentSchema}
        onSubmit={onSubmit}
        enableReinitialize>
        {({ handleSubmit, setFieldValue, ...form }) => (
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
                  data: officesData,
                  hashTable: officesHashTable,
                  onOfficeChange,
                  setFieldValue,
                }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={routeIdRequired}
                customProps={{
                  data: routesData,
                  hashTable: routesHashTable,
                  onRouteChange,
                  setFieldValue,
                }}
              />

              <DateInputComponent
                containerStyle={GeneralStyles.marginT15}
                label="Fecha inicial"
                name="startDate"
                formikProps={{ ...form, setFieldValue }}
                minimumDate={new Date(1950, 0, 1)}
                customValue={new Date()}
              />

              <DateInputComponent
                containerStyle={GeneralStyles.marginT15}
                label="Fecha final"
                name="endDate"
                formikProps={{ ...form, setFieldValue }}
                minimumDate={get(form.values, 'startDate', new Date())}
                customValue={new Date()}
              />

              {error && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {BASE_MESSAGES[getCode(error?.message) as errorTypes]}
                </ValidationMessageComponent>
              )}

              <View style={[GeneralStyles.marginT30]}>
                <Button
                  title={TextConstants.GENERATE}
                  testID={TestIdConstants.SAVE_BTN}
                  disabled={isLoading}
                  onPress={handleSubmit}
                  loading={isLoading}
                />
              </View>

              {link.length > 0 && (
                <View style={GeneralStyles.marginT15}>
                  <ReportItemComponent title={reportTitle} link={link} />
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default RouteDayBalanceReportComponent;
