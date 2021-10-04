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
  incomeExpenseTypesSelectData,
  incomeExpenseCategoriesSelectData,
  incomeExpenseConceptsSelectData,
  officesSelectData,
  routesSelectData,
} from '../../utils/';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { IncomeExpenseContext } from '../../context';
import { IncomeExpenseType } from '../../context/incomeExpense/incomeExpenseTypeContext';
import { IncomeExpenseCategory } from '../../context/incomeExpense/incomeExpenseCategoryContext';
import { IncomeExpenseConcept } from '../../context/incomeExpense/incomeExpenseConceptContext';
import { Office } from '../../context/office/officeContext';
import { Route } from '../../context/route/routeContext';

interface Props {
  submitFunction: (values: any) => void;
  error: any;
  status: string;
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
  defaultValues: IncomeExpenseContext.IncomeExpense;
  types: IncomeExpenseType[];
  categories: IncomeExpenseCategory[];
  concepts: IncomeExpenseConcept[];
  offices: Office[];
  routes: Route[];
  onTypeChange: (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => void;
  onCategoryChange: (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => void;
  onOfficeChange: (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => void;
}

// Variables
const componentFields = pick(fields, [
  'income_expense_type',
  'income_expense_category',
  'income_expense_concept',
  'officeId',
  'routeId',
  'detailsRequired',
  'amount',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreateIncomeExpenseComponent(props: Props) {
  const {
    income_expense_type,
    income_expense_category,
    income_expense_concept,
    officeId,
    routeId,
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
    types,
    categories,
    concepts,
    offices,
    routes,
    onTypeChange,
    onCategoryChange,
    onOfficeChange,
  } = props;
  const initialFieldsState = {
    income_expense_type: defaultValues.income_expense_type?.id.toString(),
    income_expense_category: defaultValues.income_expense_category?.id.toString(),
    income_expense_concept: defaultValues.income_expense_concept?.id.toString(),
    office: defaultValues.office_of_route.toString(),
    route: defaultValues.route?.id.toString(),
    details: defaultValues.observation,
    amount: defaultValues.amount.toString(),
  };
  const submitTitle = defaultValues.id
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = editStatus === 'loading' || status === 'loading';
  const { data, hashTable } = incomeExpenseTypesSelectData(types);
  const {
    data: categoriesData,
    hashTable: categoriesHashTable,
  } = incomeExpenseCategoriesSelectData(categories);
  const {
    data: conceptsData,
    hashTable: conceptsHashTable,
  } = incomeExpenseConceptsSelectData(concepts);
  const { data: officesData, hashTable: officesHashTable } = officesSelectData(
    offices,
  );
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
                input={income_expense_type}
                customProps={{ data, hashTable, onTypeChange, setFieldValue }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={income_expense_category}
                customProps={{
                  data: categoriesData,
                  hashTable: categoriesHashTable,
                  onCategoryChange,
                  setFieldValue,
                }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={income_expense_concept}
                customProps={{
                  data: conceptsData,
                  hashTable: conceptsHashTable,
                }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
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
                input={routeId}
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

export default CreateIncomeExpenseComponent;
