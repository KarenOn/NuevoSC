import React from 'react';
import { View, FlatList, ListRenderItem, Alert } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TextConstants,
  TestIdConstants,
  FilterInput,
  OFFICE_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from './styles';

// Context
import { Office } from '../../context/office/officeContext';

// Utils
import {
  officesNormalizer,
  MANAGER,
  ADMIN,
  capitalizeFirst,
  getStatus,
} from '../../utils/';

// Components
import {
  AlertComponent,
  CustomButtonComponent as Button,
  SplashComponent,
  CustomListItemComponent as ListItem,
} from '../common/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: Office) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: Office[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: Office) => void;
  onShowOverlay: () => void;
  item: Office;
  showOverlay: boolean;
  onFilterHandlerChange: (value: string) => void;
  filterValue: string;
  refFilter: any;
  isFocus: boolean;
  onHandlerBlur: () => void;
  onHandlerFocus: () => void;
  onRemove: () => void;
  removeError: any;
  removeStatus: string;
  rolName: string;
}

function OfficesComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: office,
    showOverlay,
    onFilterHandlerChange,
    filterValue,
    refFilter,
    isFocus,
    onHandlerBlur,
    onHandlerFocus,
    onRemove,
    removeError,
    removeStatus,
    rolName,
  } = props;

  const onPress = (item: Office) => {
    if (refFilter.current) {
      refFilter.current.blur();
    }
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<Office> = ({ item }) => {
    const { id, name, disabled } = item;
    const itemStatus = getStatus(disabled as boolean);

    return (
      <ListItem
        type={itemStatus}
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
              title={office.name}
              data={officesNormalizer(office, rolName)}
              showButtons={ADMIN(rolName)}
              showDelete
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              deleteTitle={TextConstants.ENABLED_AND_DISABLED}
              errors={OFFICE_ERRORS}
            />
          }
          isVisible
        />
      )}
      {MANAGER(rolName) && (
        <View style={[GeneralStyles.marginT15, GeneralStyles.marginB15]}>
          <Button
            secondary
            title={TextConstants.OFFICES_VIEW_ADD_BTN}
            testID={TestIdConstants.OFFICES_VIEW_ADD_BTN}
            onPress={addFunction}
          />
        </View>
      )}
      {ADMIN(rolName) && (
        <FilterInput
          onChangeText={onFilterHandlerChange}
          containerStyle={[GeneralStyles.paddingB5, GeneralStyles.paddingH0]}
          field={{ isFocus, onHandlerBlur, onHandlerFocus, ref: refFilter }}
          placeholder={TextConstants.OFFICES_VIEW_FILTER_INPUT_PLACEHOLDER}
          value={filterValue}
        />
      )}
      {!data.length && !error && !filterError && status !== 'loading' && (
        <View style={GeneralStyles.marginT15}>
          <AlertComponent
            type="primary"
            title={TextConstants.OFFICES_VIEW_NO_ITEMS_MESSAGE}
          />
        </View>
      )}
      {(error || filterError) && (
        <View style={GeneralStyles.marginT15}>
          <AlertComponent
            type="danger"
            title={
              OFFICE_ERRORS[getCode(error?.message) as errorTypes] ||
              OFFICE_ERRORS[getCode(filterError?.message) as errorTypes]
            }
          />
        </View>
      )}
      {/* { console.log('estatus: ' + status) } */}
      { status === 'loading' && <SplashComponent /> }
      {/* { console.log('datos: ' + data) }       */}
      {data.length > 0 && !error && !filterError && (
        <FlatList
          style={GeneralStyles.marginT15}
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

export default OfficesComponent;
