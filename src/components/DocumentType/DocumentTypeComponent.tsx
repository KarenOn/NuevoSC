import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TextConstants,
  TestIdConstants,
  FilterInput,
  DOCUMENT_TYPE_ERRORS,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from '../Offices/styles';

// Context
import { DocumentType } from '../../context/documentType/documentTypeContext';

// Utils
import { citiesNormalizer, capitalizeFirst } from '../../utils/';

// Components
import {
  AlertComponent,
  CustomButtonComponent as Button,
  SplashComponent,
  CustomListItemComponent as ListItem,
} from '../common/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: DocumentType) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: DocumentType[];
  error: any;
  filterError: any;
  status: string;
  removeStatus: string;
  onSetItem: (item: DocumentType) => void;
  onShowOverlay: () => void;
  item: DocumentType;
  showOverlay: boolean;
  onFilterHandlerChange: (value: string) => void;
  filterValue: string;
  refFilter: any;
  isFocus: boolean;
  onHandlerBlur: () => void;
  onHandlerFocus: () => void;
  onRemove: () => void;
  removeError: any;
}

function DocumentTypeComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    removeStatus,
    onSetItem,
    onShowOverlay,
    item: documentType,
    showOverlay,
    onFilterHandlerChange,
    filterValue,
    refFilter,
    isFocus,
    onHandlerBlur,
    onHandlerFocus,
    onRemove,
    removeError,
  } = props;

  const onPress = (item: DocumentType) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<DocumentType> = ({ item }) => {
    const { id, name } = item;

    return (
      <ListItem
        type="default"
        item={item}
        id={`${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${id}`}
        name={`${TextConstants.OFFICES_VIEW_LIST_ITEM_NAME}${capitalizeFirst(
          name,
        )}`}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={[GeneralStyles.flex1, GeneralStyles.paddingH15]}>
      {showOverlay && (
        <Overlay
          overlayStyle={styles.overlayContainer}
          children={
            <ShowListInfoComponent
              onConfirm={editFunction}
              onClose={onShowOverlay}
              title={documentType.name}
              data={citiesNormalizer(documentType)}
              showDelete
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              showButtons
              errors={DOCUMENT_TYPE_ERRORS}
            />
          }
          isVisible
        />
      )}
      <View style={[GeneralStyles.marginT15, GeneralStyles.marginB15]}>
        <Button
          secondary
          title={TextConstants.DOCUMENT_TYPE_VIEW_ADD_BTN}
          testID={TestIdConstants.OFFICES_VIEW_ADD_BTN}
          onPress={addFunction}
        />
      </View>
      <FilterInput
        onChangeText={onFilterHandlerChange}
        containerStyle={[GeneralStyles.paddingB20, GeneralStyles.paddingH0]}
        field={{ isFocus, onHandlerBlur, onHandlerFocus, ref: refFilter }}
        placeholder={TextConstants.OFFICES_VIEW_FILTER_INPUT_PLACEHOLDER}
        value={filterValue}
      />
      {!data.length && !error && !filterError && status !== 'loading' && (
        <View>
          <AlertComponent
            type="primary"
            title={TextConstants.DOCUMENT_TYPE_VIEW_NO_ITEMS_MESSAGE}
          />
        </View>
      )}
      {(error || filterError) && (
        <View>
          <AlertComponent
            type="danger"
            title={error?.message || filterError?.message}
          />
        </View>
      )}
      {status === 'loading' && <SplashComponent />}
      {data.length > 0 && !error && !filterError && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={getKeyExtractor}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={400}
        />
      )}
    </View>
  );
}

export default DocumentTypeComponent;
