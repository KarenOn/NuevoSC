import React from 'react';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pick } from 'lodash';

// Constants
import { fields, TextConstants, TestIdConstants } from '../../constants';

// Components
import {
  InputComponent as Input,
  CustomTextComponent as Text,
  CustomButtonComponent as Button,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

// Context
import {
  SessionContext,
  DocumentTypeContext,
  CityContext,
} from '../../context';

// Utils
import { citiesSelectData, documentTypeSelectData } from '../../utils';

interface Props {
  submitFunction: (values: any) => void;
  defaultValues: SessionContext.User;
  docTypes: DocumentTypeContext.DocumentType[];
  cities: CityContext.City[];
}

// Variables
const componentFields = pick(fields, [
  'documentTypeId',
  'document',
  'name',
  'lastName',
  'cityIdNoRequired',
  'address',
]);

const componentSchema = Yup.object().shape(
  Object.values(componentFields).reduce(
    (prev, next) => ({ ...prev, [next.name]: next.validation }),
    {},
  ),
);

function UserGeneralTabComponent(props: Props) {
  const {
    documentTypeId,
    document,
    name,
    lastName,
    cityIdNoRequired,
    address,
  } = componentFields;
  const { submitFunction, defaultValues, docTypes, cities } = props;
  const initialFieldsState = {
    ...defaultValues,
    city: defaultValues.city?.id,
    document_type: defaultValues.document_type?.id,
  };
  // Select data
  const { data: docsData, hashTable: docsTable } = documentTypeSelectData(
    docTypes,
  );
  const { data: citiesData, hashTable: citiesTable } = citiesSelectData(cities);

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
            <View style={[GeneralStyles.alignCenter, GeneralStyles.marginT30]}>
              <Text style={GeneralStyles.fontSize20}>
                {TextConstants.CREATE_OFFICE_VIEW_FORM_TITLE}
              </Text>
            </View>
            <View>
              <Input
                containerStyle={GeneralStyles.marginT30}
                input={documentTypeId}
                customProps={{ data: docsData, hashTable: docsTable }}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={document}
              />

              <Input containerStyle={GeneralStyles.marginT15} input={name} />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={lastName}
              />

              <Input
                containerStyle={GeneralStyles.marginT15}
                input={cityIdNoRequired}
                customProps={{ data: citiesData, hashTable: citiesTable }}
              />

              <Input containerStyle={GeneralStyles.marginT15} input={address} />

              <View style={[GeneralStyles.marginT30]}>
                <Button
                  title={TextConstants.CREATE_OFFICE_VIEW_SUBMIT_BTN}
                  testID={TestIdConstants.SAVE_BTN}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

export default UserGeneralTabComponent;
