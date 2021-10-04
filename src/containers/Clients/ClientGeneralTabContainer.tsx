import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

// Components
import { ClientGeneralTabComponent } from '../../components';

// Context
import { ClientContext, DocumentTypeContext } from '../../context';

// Services
import { useGetDocumentTypes } from '../../services';

// Constants
import { ROUTES } from '../../constants/';

const ClientGeneralTabContainer: React.FC = () => {
  const { clientDraft } = ClientContext.useState();
  const clientDispatch = ClientContext.useDispatch();
  const { documentTypes } = DocumentTypeContext.useState();
  const docsDispatch = DocumentTypeContext.useDispatch();
  const [docsMutate] = useGetDocumentTypes();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await docsMutate();

      if (rs && rs.data.success) {
        docsDispatch({
          type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPES,
          value: rs.data.responseData,
        });
      }
    };

    fetchData();
  }, [docsMutate, docsDispatch]);

  const submitFunction = (values: ClientContext.Client) => {
    Keyboard.dismiss();
    clientDispatch({
      type: ClientContext.ActionTypes.SET_CLIENT_DRAFT,
      value: {
        ...values,
        document_type: {
          id: values.document_type,
        },
      },
    });
    navigation.navigate(ROUTES.CLIENT_ADMIN_TAB_ROUTE);
  };

  return (
    <ClientGeneralTabComponent
      defaultValues={clientDraft}
      submitFunction={submitFunction}
      docTypes={documentTypes}
    />
  );
};

export default ClientGeneralTabContainer;
