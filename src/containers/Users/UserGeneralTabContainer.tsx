import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

// Components
import { UserGeneralTabComponent } from '../../components';

// Context
import {
  SessionContext,
  DocumentTypeContext,
  CityContext,
} from '../../context';

// Services
import { useGetDocumentTypes, useGetCities } from '../../services';

// Constants
import { ROUTES } from '../../constants/';

// Utils
import { citiesSelectData, documentTypeSelectData } from '../../utils';

interface SubmitProps {
  document_type: number;
  document: string;
  name: string;
  last_name: string;
  city: number;
  address: string;
}

const UserGeneralTabContainer: React.FC = () => {
  const { userDraft } = SessionContext.useState();
  const userDispatch = SessionContext.useDispatch();
  const { documentTypes } = DocumentTypeContext.useState();
  const docsDispatch = DocumentTypeContext.useDispatch();
  const { cities } = CityContext.useState();
  const cityDispatch = CityContext.useDispatch();
  const [docsMutate] = useGetDocumentTypes();
  const [cityMutate] = useGetCities();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await docsMutate();
      const citiesRs = await cityMutate();

      if (rs && rs.data.success && citiesRs && citiesRs.data.success) {
        docsDispatch({
          type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPES,
          value: rs.data.responseData,
        });
        cityDispatch({
          type: CityContext.ActionTypes.SET_CITIES,
          value: citiesRs.data.responseData,
        });
      }
    };

    fetchData();
  }, [docsMutate, docsDispatch, cityMutate, cityDispatch]);

  const submitFunction = (values: SubmitProps) => {
    Keyboard.dismiss();
    userDispatch({
      type: SessionContext.ActionTypes.SET_USER_DRAFT,
      value: {
        ...values,
        city: {
          id: values.city,
          name: citiesSelectData(cities).hashTable[values.city]?.label,
        },
        document_type: {
          id: values.document_type,
          name: documentTypeSelectData(documentTypes).hashTable[
            values.document_type
          ]?.label,
        },
      },
    });
    navigation.navigate(ROUTES.USER_ADMIN_TAB_ROUTE);
  };

  return (
    <UserGeneralTabComponent
      defaultValues={userDraft}
      submitFunction={submitFunction}
      docTypes={documentTypes}
      cities={cities}
    />
  );
};

export default UserGeneralTabContainer;
