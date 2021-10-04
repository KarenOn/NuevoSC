import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TextConstants,
  TestIdConstants,
  FilterInput,
  CLIENT_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from '../Offices/styles';

// Context
import { Client } from '../../context/client/clientContext';
import { Office } from '../../context/office/officeContext';
import { Route } from '../../context/route/routeContext';
import { FK } from '../../context/session/sessionContext';

// Utils
import {
  clientsNormalizer,
  EXCLUDE_REVIEWER,
  capitalizeFirst,
  getStatus,
  officesSelectData,
  routesSelectData,
  REVIEWER,
  fullName,
} from '../../utils/';

// Components
import {
  AlertComponent,
  CustomButtonComponent as Button,
  SplashComponent,
  CustomListItemComponent as ListItem,
  CustomSelectComponent as Select,
} from '../common/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: Client) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: Client[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: Client) => void;
  onShowOverlay: () => void;
  item: Client;
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
  officeSelectChange: (value: string) => void;
  officeValue: string;
  offices: Office[];
  routeSelectChange: (value: string) => void;
  routeValue: string;
  routes: Route[];
}

function ClientsComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: client,
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
    officeSelectChange,
    officeValue,
    offices,
    routeSelectChange,
    routeValue,
    routes,
  } = props;

  const { data: officeData, hashTable } = officesSelectData(offices);
  const { data: routeData, hashTable: routeHashTable } = routesSelectData(
    routes,
  );

  const onPress = (item: Client) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<Client> = ({ item }) => {
    const { code, disabled, payments_overdue } = item;
    const itemStatus = getStatus(disabled as boolean, payments_overdue);
    const name = fullName(item as FK);

    return (
      <ListItem
        type={itemStatus}
        item={item}
        id={`${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${code}`}
        name={`${TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_NAME_LABEL}${name}`}
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
              title={`${client.name} ${capitalizeFirst(client.last_name)}`}
              data={clientsNormalizer(client)}
              showDelete
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              deleteTitle={TextConstants.ENABLED_AND_DISABLED}
              showButtons={EXCLUDE_REVIEWER(rolName)}
              errors={CLIENT_ERRORS}
            />
          }
          isVisible
        />
      )}
      {EXCLUDE_REVIEWER(rolName) && (
        <View style={[GeneralStyles.marginT15]}>
          <Button
            secondary
            title={TextConstants.CLIENTS_VIEW_ADD_BTN}
            testID={TestIdConstants.OFFICES_VIEW_ADD_BTN}
            onPress={addFunction}
          />
        </View>
      )}
      {REVIEWER(rolName) && (
        <View
          style={[
            GeneralStyles.marginT15,
            GeneralStyles.flexRow,
            GeneralStyles.justifyBetween,
          ]}>
          <View style={GeneralStyles.flex1}>
            <Select
              value={officeValue}
              options={officeData}
              hashOptions={hashTable}
              label="Oficina"
              onValueChange={officeSelectChange}
            />
          </View>
          <View style={GeneralStyles.flexDot1} />
          <View style={GeneralStyles.flex1}>
            <Select
              value={routeValue}
              options={routeData}
              hashOptions={routeHashTable}
              label="Ruta"
              onValueChange={routeSelectChange}
            />
          </View>
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
            title={TextConstants.CLIENTS_VIEW_NO_ITEMS_MESSAGE}
          />
        </View>
      )}
      {(error || filterError) && (
        <View>
          <AlertComponent
            type="danger"
            title={
              CLIENT_ERRORS[getCode(error?.message) as errorTypes] ||
              CLIENT_ERRORS[getCode(filterError?.message) as errorTypes]
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

export default ClientsComponent;
