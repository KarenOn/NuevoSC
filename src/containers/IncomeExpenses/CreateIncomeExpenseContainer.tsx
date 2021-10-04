import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import { CreateIncomeExpenseComponent } from '../../components';

// Context
import {
  SessionContext,
  IncomeExpenseContext,
  IncomeExpenseTypeContext,
  IncomeExpenseCategoryContext,
  IncomeExpenseConceptContext,
  OfficeContext,
  RouteContext,
} from '../../context/';

// Services
import {
  useCreateIncomeExpense,
  useUpdateIncomeExpense,
  useGetIncomeExpenseTypes,
  useGetIncomeExpenseCategories,
  useGetIncomeExpenseConcepts,
  useGetOffices,
  useGetRouteByOffice,
} from '../../services/';

interface SubmitProps {
  income_expense_type: number;
  income_expense_category: number;
  income_expense_concept: number;
  office: number;
  route?: number;
  details: string;
}

const CreateIncomeExpenseContainer: React.FC = () => {
  const {
    user: { id },
  } = SessionContext.useState();
  const { incomeExpenseDraft } = IncomeExpenseContext.useState();
  const { incomeExpenseTypes } = IncomeExpenseTypeContext.useState();
  const { incomeExpenseCategories } = IncomeExpenseCategoryContext.useState();
  const { incomeExpenseConcepts } = IncomeExpenseConceptContext.useState();
  const { offices } = OfficeContext.useState();
  const { routes } = RouteContext.useState();
  const typeDispatch = IncomeExpenseTypeContext.useDispatch();
  const categoryDispatch = IncomeExpenseCategoryContext.useDispatch();
  const conceptDispatch = IncomeExpenseConceptContext.useDispatch();
  const officeDispatch = OfficeContext.useDispatch();
  const routeDispatch = RouteContext.useDispatch();
  const [typeMutate] = useGetIncomeExpenseTypes();
  const [categoryMutate] = useGetIncomeExpenseCategories();
  const [conceptMutate] = useGetIncomeExpenseConcepts();
  const [officeMutate] = useGetOffices();
  const [routeMutate] = useGetRouteByOffice();
  const [mutate, { status, error }] = useCreateIncomeExpense();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateIncomeExpense();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await typeMutate();
      const officesRs = await officeMutate();

      if (rs && rs.data.success && officesRs && officesRs.data.success) {
        typeDispatch({
          type: IncomeExpenseTypeContext.ActionTypes.SET_INCOME_EXPENSE_TYPES,
          value: rs.data.responseData,
        });
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: officesRs.data.responseData,
        });
      }

      if (incomeExpenseDraft.id) {
        const typeId = incomeExpenseDraft.income_expense_type?.id || '';
        const categoryId = incomeExpenseDraft.income_expense_category?.id || '';
        const categoryRs = await categoryMutate(typeId.toString());
        const conceptRs = await conceptMutate(categoryId.toString());
        const routeRs = await routeMutate(incomeExpenseDraft.office_of_route);

        if (
          routeRs?.data?.success &&
          categoryRs?.data?.success &&
          conceptRs?.data?.success
        ) {
          categoryDispatch({
            type:
              IncomeExpenseCategoryContext.ActionTypes
                .SET_INCOME_EXPENSE_CATEGORIES,
            value: categoryRs.data.responseData,
          });
          conceptDispatch({
            type:
              IncomeExpenseConceptContext.ActionTypes
                .SET_INCOME_EXPENSE_CONCEPTS,
            value: conceptRs.data.responseData,
          });
          routeDispatch({
            type: RouteContext.ActionTypes.SET_ROUTES,
            value: routeRs.data.responseData,
          });
        }
      }
    };

    fetchData();
  }, [
    typeMutate,
    categoryMutate,
    conceptMutate,
    officeMutate,
    routeMutate,
    typeDispatch,
    categoryDispatch,
    conceptDispatch,
    officeDispatch,
    routeDispatch,
    incomeExpenseDraft,
  ]);

  const submitFunction = async (
    values: IncomeExpenseContext.IncomeExpenseToSend & SubmitProps,
  ) => {
    const data: IncomeExpenseContext.IncomeExpenseToSend = {
      ...values,
      _income_expense_type: values.income_expense_type,
      _income_expense_category: values.income_expense_category,
      _income_expense_concept: values.income_expense_concept,
      _office: values.office,
      _route: values.route,
      _user: id as number,
      observation: values.details,
    };

    const rs = await mutate(data);

    if (rs && rs.data.success) {
      navigation.goBack();
    }
  };

  const onEdit = async (
    values: IncomeExpenseContext.IncomeExpenseToSend & SubmitProps,
  ) => {
    const data: IncomeExpenseContext.IncomeExpenseToSend = {
      ...values,
      _income_expense_type: values.income_expense_type,
      _income_expense_category: values.income_expense_category,
      _income_expense_concept: values.income_expense_concept,
      _office: values.office,
      _route: values.route,
      _user: id as number,
      observation: values.details,
      id: incomeExpenseDraft.id,
    };

    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      navigation.goBack();
    }
  };

  const onTypeChange = async (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => {
    setFieldValue('income_expense_category', '');
    setFieldValue('income_expense_concept', '');
    if (value) {
      const rs = await categoryMutate(value);
      if (rs && rs.data.success) {
        categoryDispatch({
          type:
            IncomeExpenseCategoryContext.ActionTypes
              .SET_INCOME_EXPENSE_CATEGORIES,
          value: rs.data.responseData,
        });
      }
    } else {
      categoryDispatch({
        type:
          IncomeExpenseCategoryContext.ActionTypes
            .SET_INCOME_EXPENSE_CATEGORIES,
        value: [],
      });
    }
  };

  const onCategoryChange = async (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => {
    setFieldValue('income_expense_concept', '');
    if (value) {
      const rs = await conceptMutate(value);
      if (rs && rs.data.success) {
        conceptDispatch({
          type:
            IncomeExpenseConceptContext.ActionTypes.SET_INCOME_EXPENSE_CONCEPTS,
          value: rs.data.responseData,
        });
      }
    } else {
      conceptDispatch({
        type:
          IncomeExpenseConceptContext.ActionTypes.SET_INCOME_EXPENSE_CONCEPTS,
        value: [],
      });
    }
  };

  const onOfficeChange = async (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => {
    setFieldValue('route', '');
    if (value) {
      const rs = await routeMutate(value);
      if (rs && rs.data.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: rs.data.responseData,
        });
      }
    } else {
      routeDispatch({
        type: RouteContext.ActionTypes.SET_ROUTES,
        value: [],
      });
    }
  };

  return (
    <CreateIncomeExpenseComponent
      submitFunction={submitFunction}
      error={error}
      status={status}
      onEdit={onEdit}
      editError={editError}
      editStatus={editStatus}
      defaultValues={incomeExpenseDraft}
      types={incomeExpenseTypes}
      categories={incomeExpenseCategories}
      concepts={incomeExpenseConcepts}
      offices={offices}
      routes={routes}
      onTypeChange={onTypeChange}
      onCategoryChange={onCategoryChange}
      onOfficeChange={onOfficeChange}
    />
  );
};

export default CreateIncomeExpenseContainer;
