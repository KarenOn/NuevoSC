import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TextConstants,
  TestIdConstants,
  FilterInput,
  ROUTE_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from '../Offices/styles';

// Context
import { Route } from '../../context/route/routeContext';

// Utils
import {
  routesNormalizer,
  ADMIN,
  SUPERVISOR,
  REVIEWER,
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

const getKeyExtractor = (item: Route) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: Route[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: Route) => void;
  onShowOverlay: () => void;
  item: Route;
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

function RoutesComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: route,
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

  const onPress = (item: Route) => {
    if (refFilter.current) {
      refFilter.current.blur();
    }
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<Route> = ({ item }) => {
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
              title={route.name}
              data={routesNormalizer(route, rolName)}
              showDelete={!route.disabled ? true : ADMIN(rolName)}
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              deleteTitle={
                !route.disabled
                  ? TextConstants.CLOSE_BOX
                  : TextConstants.OPEN_BOX
              }
              showButtons={SUPERVISOR(rolName)}
              errors={ROUTE_ERRORS}
            />
          }
          isVisible
        />
      )}
      {ADMIN(rolName) && (
        <View style={[GeneralStyles.marginT15, GeneralStyles.marginB15]}>
          <Button
            secondary
            title={TextConstants.ROUTES_VIEW_ADD_BTN}
            testID={TestIdConstants.OFFICES_VIEW_ADD_BTN}
            onPress={addFunction}
          />
        </View>
      )}
      {REVIEWER(rolName) && (
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
            title={TextConstants.ROUTES_VIEW_NO_ITEMS_MESSAGE}
          />
        </View>
      )}
      {(error || filterError) && (
        <View style={GeneralStyles.marginT15}>
          <AlertComponent
            type="danger"
            title={
              ROUTE_ERRORS[getCode(error?.message) as errorTypes] ||
              ROUTE_ERRORS[getCode(filterError?.message) as errorTypes]
            }
          />
        </View>
      )}
      {status === 'loading' && <SplashComponent />}
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

export default RoutesComponent;
