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
  ROL_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Components
import {
  InputComponent as Input,
  ValidationMessageComponent,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import { RolContext } from '../../context';

interface Props {
  submitFunction: (values: any) => void;
  defaultValues: RolContext.Rol;
  error: any;
  status: string;
  onEdit: (values: any) => void;
  editError: any;
  editStatus: string;
}

// Variables
const componentFields = pick(fields, ['name', 'description']);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function CreateRolComponent(props: Props) {
  const { name, description } = componentFields;
  const {
    submitFunction,
    error,
    status,
    defaultValues,
    onEdit,
    editError,
    editStatus,
  } = props;
  const initialFieldsState = {
    ...defaultValues,
  };
  const submitTitle = defaultValues.id
    ? TextConstants.EDIT
    : TextConstants.CREATE_OFFICE_CREDIT_TAB_SUBMIT_BTN;
  const isLoading = editStatus === 'loading' || status === 'loading';

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
                input={description}
              />

              {(error || editError) && (
                <ValidationMessageComponent style={GeneralStyles.marginT15}>
                  {ROL_ERRORS[getCode(error?.message) as errorTypes] ||
                    ROL_ERRORS[getCode(editError?.message) as errorTypes]}
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

export default CreateRolComponent;
