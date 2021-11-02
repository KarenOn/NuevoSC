import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { validationAccess } from'../../utils'
import message from '../../utils/message.json'
import {NotificationComponent} from '../../components/common'
// Components
import { DocumentTypeComponent } from '../../components';

// Context
import { DocumentTypeContext,SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { documentTypeMock } from '../../mocks/';

// Services
import {
  useGetDocumentTypes,
  useGetDocumentTypesWithFilter,
  useRemoveDocumentType,
} from '../../services/';

const DocumentTypeContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const {user:{rol:{name}}} = SessionContext.useState();
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetDocumentTypes();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetDocumentTypesWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveDocumentType();
  const { documentTypes } = DocumentTypeContext.useState();
  const documentTypeDispatch = DocumentTypeContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        documentTypeDispatch({
          type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPES,
          value: rs.data.responseData,
        });
      }

      if (isFocus) {
        // @ts-ignore
        refFilter.current.focus();
      }
    };

    if (isFocused && !filterValue) {
      reset();
      removeReset();
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFocused,
    mutate,
    documentTypeDispatch,
    filterValue,
    reset,
    removeReset,
  ]);

  const onAdd = () => {
    if(validationAccess(name,ROUTES.DOCUMENT_TYPE_ROUTE,'create')){
    documentTypeDispatch({
      type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPE_DRAFT,
      value: documentTypeMock,
    });
    onNavigate();
  }else{
      NotificationComponent(message[0].error.access)
    }
  };

  const onEdit = () => {
    if(validationAccess(name,ROUTES.DOCUMENT_TYPE_ROUTE,'update')){
    documentTypeDispatch({
      type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPE_DRAFT,
      value: item,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onRemove = async () => {
  
    if(validationAccess(name,ROUTES.DOCUMENT_TYPE_ROUTE,'delete')){
     // @ts-ignore
    const rs = await removeMutate(item.id);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        documentTypeDispatch({
          type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPES,
          value: getRs.data.responseData,
        });
      }
    }}else{
      NotificationComponent(message[0].error.access)
    }
  };

  const onNavigate = () => {
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CREATE_DOCUMENT_TYPE_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: DocumentTypeContext.DocumentType) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs?.data.success) {
        documentTypeDispatch({
          type: DocumentTypeContext.ActionTypes.SET_DOCUMENT_TYPES,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <DocumentTypeComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as DocumentTypeContext.DocumentType}
      onShowOverlay={onShowOverlay}
      status={status}
      removeStatus={removeStatus}
      error={error}
      filterError={filterError}
      data={documentTypes}
      addFunction={onAdd}
      onRemove={onRemove}
      removeError={removeError}
    />
  );
};

export default DocumentTypeContainer;
