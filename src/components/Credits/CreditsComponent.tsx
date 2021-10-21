import React,{useEffect,useState} from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
  TextConstants,
  TestIdConstants,
  FilterInput,
  BASE_MESSAGES,
  getCode,
  errorTypes,
} from '../../constants';

// Assets
import { GeneralStyles } from '../../assets';
import styles from '../Offices/styles';

// Context
import { Credit } from '../../context/credit/creditContext';

// Utils
import {
  creditsNormalizer,
  EXCLUDE_REVIEWER,
  getStatus,
  fullName,
  ADMIN,
} from '../../utils/';

// Components
import {
  AlertComponent,
  CustomButtonComponent as Button,
  SplashComponent,
  CustomListItemComponent as ListItem,
} from '../common/';
import { ShowListInfoComponent } from '../common/';
import { useGetClients } from '../../services/clientsService';
import { useGetRoutes } from '../../services/routesService';
import { ClientContext, RouteContext } from '../../context/';
import { FK } from '../../context/session/sessionContext';

const getKeyExtractor = (item: Credit) => `${item.id}`;

interface Props {
  addFunction: () => void;
  data: Credit[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: Credit) => void;
  onShowOverlay: () => void;
  item: Credit;
  showOverlay: boolean;
  onFilterHandlerChange: (value: string) => void;
  filterValue: string;
  refFilter: any;
  isFocus: boolean;
  onHandlerBlur: () => void;
  onHandlerFocus: () => void;
  onRemove: () => void;
  rolName: string;
  onVisit: () => void;
  visitError: any;
  visitStatus: string;
  onAdvancement: () => void;
}

function CreditsComponent(props: Props) {
  const [clientMutate] = useGetClients();
  const [routeMutate] = useGetRoutes();
  const [routeItems,setRouteItems] =useState({})
  const { clients } = ClientContext.useState();
  const { routes } = RouteContext.useState();
  const clientDispatch = ClientContext.useDispatch();
  const routeDispatch = RouteContext.useDispatch();

  const {
    addFunction,
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: credit,
    showOverlay,
    onFilterHandlerChange,
    filterValue,
    refFilter,
    isFocus,
    onHandlerBlur,
    onHandlerFocus,
    onRemove,
    rolName,
    onVisit,
    visitError,
    visitStatus,
    onAdvancement,
  } = props;

  useEffect(()=>{
    const fetchData = async () => {
      const rs = await clientMutate();
      const rm = await routeMutate();
      if (rs?.data?.success){
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value:rm.data.responseData
        })
         
      }}
      fetchData();
  },[props.item])

  const onPress = (item: Credit) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  const renderItem: ListRenderItem<Credit> = ({ item }) => {
    const {
      code,
      _client,
      disabled,
      payments_overdue,
      completed,
      next_payment_date,
    } = item;
    const clientName = ()=> { 
      if(clients.length !== 0 ){
        let client = clients.find(r =>{ if(r.id ===_client) return r })
        return fullName(client as FK)
    }
  }
 
  
    const itemStatus = getStatus(
      disabled as boolean,
      payments_overdue,
      completed,
      next_payment_date,
    );
   
    return (
      <ListItem
        type={itemStatus}
        item={item}
        id={`${TextConstants.CREDITS_VIEW_LIST_ITEM_TITLE}${code}`}
        name={`${TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_NAME_LABEL}${clientName()}`}
        onPress={onPress}
      />
    );
  };
  const getClient = (id:any)=> { 
    if(clients.length !== 0 ){
      let client = clients.find(r =>{ if(r.id === parseInt(id)) return r })
      return client
  }
}
  const getRoute = (id:any)=> { 
    if(routes.length !== 0 ){
      let route = routes.find(r =>{ if(r.id === parseInt(id)) return r })
      return route
  }
}

  return (
    <View style={[GeneralStyles.flex1, GeneralStyles.paddingH15]}>
      {showOverlay && (
        <Overlay
          overlayStyle={styles.overlayContainer}
          children={
            <ShowListInfoComponent
              onClose={onShowOverlay}
              title={credit?.code as string}
              data={creditsNormalizer({'credit':credit,'client':getClient(credit?._client),'route':getRoute(credit?._route)})}
              showDelete={ADMIN(rolName) && !credit.disabled}
              onDelete={onRemove}
              deleteTitle={TextConstants.CANCELLED}
              showButtons={
                EXCLUDE_REVIEWER(rolName) &&
                !credit.disabled &&
                !credit.completed &&
                !credit._route?.disabled
              }
              isCredit
              onPayment={onAdvancement}
              onVisit={onVisit}
              errors={BASE_MESSAGES}
              removeError={visitError}
              status={visitStatus}
            />
          }
          isVisible
        />
      )}
      {EXCLUDE_REVIEWER(rolName) && (
        <View style={[GeneralStyles.marginT15]}>
          <Button
            secondary
            title={TextConstants.CREDITS_VIEW_ADD_BTN}
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
            title={TextConstants.CREDITS_VIEW_NO_ITEMS_MESSAGE}
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

export default CreditsComponent;
