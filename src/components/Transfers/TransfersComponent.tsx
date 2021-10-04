import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TestIdConstants,
  TextConstants,
  FilterInput,
  BASE_MESSAGES,
  getCode,
  errorTypes,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from '../Offices/styles';

// Context
import { Transfer } from '../../context/transfer/transferContext';

// Utils
import { transferNormalizer, SUPERVISOR, getStatus, ADMIN } from '../../utils/';

// Components
import {
  AlertComponent,
  SplashComponent,
  CustomListItemComponent as ListItem,
  CustomButtonComponent as Button,
} from '../common/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: Transfer) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: Transfer[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: Transfer) => void;
  onShowOverlay: () => void;
  item: Transfer;
  showOverlay: boolean;
  onFilterHandlerChange: (value: string) => void;
  filterValue: string;
  refFilter: any;
  isFocus: boolean;
  onHandlerBlur: () => void;
  onHandlerFocus: () => void;
  onRemove: () => void;
  rolName: string;
  removeStatus: string;
  removeError: any;
}

function TransfersComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: transfer,
    showOverlay,
    onFilterHandlerChange,
    filterValue,
    refFilter,
    isFocus,
    onHandlerBlur,
    onHandlerFocus,
    onRemove,
    rolName,
    removeStatus,
    removeError,
  } = props;

  const onPress = (item: Transfer) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<Transfer> = ({ item }) => {
    const { code, route_origin, office, disabled } = item;
    const itemStatus = getStatus(disabled as boolean);
    const name = route_origin?.name || office?.name;

    return (
      <ListItem
        type={itemStatus}
        item={item}
        id={`${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${code}`}
        name={`${TextConstants.TRANSFERS_LIST_ITEM_ORIGIN}${name}`}
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
              title={transfer?.code as string}
              data={transferNormalizer(transfer)}
              showDelete={ADMIN(rolName) && !transfer.disabled}
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              deleteTitle={TextConstants.CANCELLED}
              showButtons={SUPERVISOR(rolName) && !transfer.disabled}
              errors={BASE_MESSAGES}
            />
          }
          isVisible
        />
      )}
      {SUPERVISOR(rolName) && (
        <View style={[GeneralStyles.marginT15]}>
          <Button
            secondary
            title={TextConstants.TRANSFERS_VIEW_ADD_BTN}
            testID={TestIdConstants.OFFICES_VIEW_ADD_BTN}
            onPress={addFunction}
          />
        </View>
      )}
      <FilterInput
        onChangeText={onFilterHandlerChange}
        containerStyle={[
          GeneralStyles.paddingB20,
          GeneralStyles.paddingH0,
          GeneralStyles.marginT15,
        ]}
        field={{ isFocus, onHandlerBlur, onHandlerFocus, ref: refFilter }}
        placeholder={TextConstants.USERS_VIEW_FILTER_INPUT_PLACEHOLDER}
        value={filterValue}
      />
      {!data.length && !error && !filterError && status !== 'loading' && (
        <View>
          <AlertComponent
            type="primary"
            title={TextConstants.TRANSFERS_VIEW_NO_ITEMS_MESSAGE}
          />
        </View>
      )}
      {(error || filterError) && (
        <View>
          <AlertComponent
            type="danger"
            title={
              BASE_MESSAGES[getCode(error?.message) as errorTypes] ||
              BASE_MESSAGES[getCode(filterError?.message) as errorTypes]
            }
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

export default TransfersComponent;
