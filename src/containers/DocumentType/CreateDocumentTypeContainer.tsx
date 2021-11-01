import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common';

// Components
import { CreateDocumentTypeComponent } from '../../components';

// Context
import { DocumentTypeContext, SessionContext } from '../../context/';

// Services
import {
  DocumentTypeData,
  useCreateDocumentType,
  useUpdateDocumentType,
} from '../../services/';

const CreateDocumentTypeContainer: React.FC = () => {
  const {
    user: { id },
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
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      NotificationComponent('Operation success')
      navigation.goBack();
    }
  };

  const onEdit = async (values: DocumentTypeContext.DocumentType) => {
    const data: DocumentTypeData = {
      ...values,
      _user: id?.toString() as string,
    };
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      NotificationComponent('Operation success')
      navigation.goBack();
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
