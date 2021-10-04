import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TextConstants,
  TestIdConstants,
  FilterInput,
  USER_ERRORS,
  getCode,
  errorTypes,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from '../Offices/styles';

// Context
import { User, FK } from '../../context/session/sessionContext';

// Utils
import {
  usersNormalizer,
  ADMIN,
  capitalizeFirst,
  getStatus,
  fullName,
} from '../../utils/';

// Components
import {
  AlertComponent,
  CustomButtonComponent as Button,
  SplashComponent,
  CustomListItemComponent as ListItem,
} from '../common/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: User) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: User[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: User) => void;
  onShowOverlay: () => void;
  item: User;
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

function UsersComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: user,
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

  const onPress = (item: User) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<User> = ({ item }) => {
    const { id, disabled } = item;
    const itemStatus = getStatus(disabled as boolean);
    const name = fullName(item as FK);

    return (
      <ListItem
        type={itemStatus}
        item={item}
        id={`${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${id}`}
        name={`${TextConstants.CREATE_USER_ADMIN_TAB_NAME_LABEL}${name}`}
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
              title={`${user.name} ${capitalizeFirst(user.last_name)}`}
              data={usersNormalizer(user)}
              showDelete
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              deleteTitle={TextConstants.ENABLED_AND_DISABLED}
              showButtons={ADMIN(rolName)}
              errors={USER_ERRORS}
            />
          }
          isVisible
        />
      )}
      {ADMIN(rolName) && (
        <View style={[GeneralStyles.marginT15]}>
          <Button
            secondary
            title={TextConstants.USERS_VIEW_ADD_BTN}
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
            title={TextConstants.USERS_VIEW_NO_ITEMS_MESSAGE}
          />
        </View>
      )}
      {(error || filterError) && (
        <View>
          <AlertComponent
            type="danger"
            title={
              USER_ERRORS[getCode(error?.message) as errorTypes] ||
              USER_ERRORS[getCode(filterError?.message) as errorTypes]
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

export default UsersComponent;
