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
import { IncomeExpense } from '../../context/incomeExpense/incomeExpenseContext';

// Utils
import {
  incomeExpenseNormalizer,
  EXCLUDE_REVIEWER,
  getStatus,
  ADMIN,
} from '../../utils/';

// Components
import {
  AlertComponent,
  SplashComponent,
  CustomListItemComponent as ListItem,
  CustomButtonComponent as Button,
} from '../common/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: IncomeExpense) => `${item.id}`;

interface Props {
  addFunction: () => void;
  editFunction: () => void;
  data: IncomeExpense[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: IncomeExpense) => void;
  onShowOverlay: () => void;
  item: IncomeExpense;
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

function IncomeExpensesComponent(props: Props) {
  const {
    addFunction,
    editFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: incomeExpense,
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

  const onPress = (item: IncomeExpense) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<IncomeExpense> = ({ item }) => {
    const { code, route, office, disabled } = item;
    const itemStatus = getStatus(disabled as boolean);
    const name = route?.name || office?.name;

    return (
      <ListItem
        type={itemStatus}
        item={item}
        id={`${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${code}`}
        name={`${TextConstants.INCOME_EXPENSES_LIST_ITEM_OFFICE_OR_ROUTE}${name}`}
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
              title={incomeExpense?.code as string}
              data={incomeExpenseNormalizer(incomeExpense)}
              showDelete={ADMIN(rolName) && !incomeExpense.disabled}
              onDelete={onRemove}
              status={removeStatus}
              removeError={removeError}
              deleteTitle={TextConstants.CANCELLED}
              showButtons={EXCLUDE_REVIEWER(rolName) && !incomeExpense.disabled}
              errors={BASE_MESSAGES}
            />
          }
          isVisible
        />
      )}
      {EXCLUDE_REVIEWER(rolName) && (
        <View style={[GeneralStyles.marginT15]}>
          <Button
            secondary
            title={TextConstants.INCOME_EXPENSES_VIEW_ADD_BTN}
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
            title={TextConstants.INCOME_EXPENSES_VIEW_NO_ITEMS_MESSAGE}
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

export default IncomeExpensesComponent;
