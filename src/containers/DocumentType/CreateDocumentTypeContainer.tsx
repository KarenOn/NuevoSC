import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common';
import message from '../../utils/message.json'
import {validationAccess} from '../../utils/';

// Components
import { CreateDocumentTypeComponent } from '../../components';

// Context
import { DocumentTypeContext, SessionContext } from '../../context/';
import { ROUTES } from '../../constants/';

// Services
import {
  DocumentTypeData,
  useCreateDocumentType,
  useUpdateDocumentType,
} from '../../services/';

const CreateDocumentTypeContainer: React.FC = () => {
  const {
    user: { id ,rol:{name} },
  } = SessionContext.useState();
  const { documentTypeDraft } = DocumentTypeContext.useState();
  const [mutate, { status, error }] = useCreateDocumentType();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateDocumentType();
  const navigation = useNavigation();

  const submitFunction = async (values: DocumentTypeContext.DocumentType) => {
    const data: DocumentTypeData = {
      ...values,
      _user: id?.toString() as string,
    };
    if(validationAccess(name,ROUTES.DOCUMENT_TYPE_ROUTE,'create')){
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
      NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = async (values: DocumentTypeContext.DocumentType) => {
    const data: DocumentTypeData = {
      ...values,
      _user: id?.toString() as string,
    };
    if(validationAccess(name,ROUTES.DOCUMENT_TYPE_ROUTE,'update')){
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  return (
    <CreateDocumentTypeComponent
      defaultValues={documentTypeDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      onEdit={onEdit}
      editStatus={editStatus}
      editError={editError}
    />
  );
};

export default CreateDocumentTypeContainer;
