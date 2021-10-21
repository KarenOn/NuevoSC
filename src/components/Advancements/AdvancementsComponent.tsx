import React,{useEffect} from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { Overlay } from 'react-native-elements';

// Constants
import {
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
import {
  Advancement,
  CLIENT_FK,
} from '../../context/advancement/advancementContext';

// Utils
import {
  advancementsNormalizer,
  ADMIN,
  getStatus,
  fullName,
} from '../../utils/';

// Components
import {
  AlertComponent,
  SplashComponent,
  CustomListItemComponent as ListItem,
} from '../common/';
import { useGetClients } from '../../services/clientsService';
import { useGetCredits } from '../../services/creditsService';
import { ClientContext, CreditContext } from '../../context/';
import { ShowListInfoComponent } from '../common/';

const getKeyExtractor = (item: Advancement) => `${item.id}`;

interface Props {
  data: Advancement[];
  error: any;
  filterError: any;
  status: string;
  onSetItem: (item: Advancement) => void;
  onShowOverlay: () => void;
  item: Advancement;
  showOverlay: boolean;
  onFilterHandlerChange: (value: string) => void;
  filterValue: string;
  refFilter: any;
  isFocus: boolean;
  onHandlerBlur: () => void;
  onHandlerFocus: () => void;
  onRemove: () => void;
  rolName: string;
}

function AdvancementsComponent(props: Props) {
  const [clientMutate] = useGetClients();
  const [creditMutate] = useGetCredits();
  const { clients } = ClientContext.useState();
  const { credits } = CreditContext.useState();
  const clientDispatch = ClientContext.useDispatch();
  const creditDispatch = CreditContext.useDispatch();
  const {
    data,
    error,
    filterError,
    status,
    onSetItem,
    onShowOverlay,
    item: advancement,
    showOverlay,
    onFilterHandlerChange,
    filterValue,
    refFilter,
    isFocus,
    onHandlerBlur,
    onHandlerFocus,
    onRemove,
    rolName,
  } = props;

  const onPress = (item: Advancement) => {
    // @ts-ignore
    refFilter.current.blur();
    onSetItem(item);
    onShowOverlay();
  };

  useEffect(()=>{
    const fetchData = async () => {
      const rs = await clientMutate();
      const rm = await creditMutate();
      if (rs?.data?.success){
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
        creditDispatch({
          type: CreditContext.ActionTypes.SET_CREDITS,
          value:rm.data.responseData
        })
         
      }}
      fetchData();
  },[props.item])

  const renderItem: ListRenderItem<Advancement> = ({ item }) => {
    const { code, _client, disabled } = item;
    const itemStatus = getStatus(disabled as boolean);
    const name =  ()=> { 
      if(clients.length !== 0 ){
        let client = clients.find(r =>{ if(r.id ===_client) return r })
        return fullName(client as CLIENT_FK)
    }
  }

    return (
      <ListItem
        type={itemStatus}
        item={item}
        id={`${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${code}`}
        name={`${TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_NAME_LABEL}${name()}`}
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
  const getCredit = (id:any)=> { 
    if(credits.length !== 0 ){
      let advCredit = credits.find(r =>{ if(r.id === parseInt(id)) return r })
      return advCredit
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
              title={advancement?.code as string}
              data={advancementsNormalizer({'advancement':advancement,'client':getClient(advancement?._client),'credit':getCredit(advancement?._credit)})}
              onlyShowDelete={!advancement.disabled}
              onDelete={onRemove}
              deleteTitle={TextConstants.CANCELLED}
              showButtons={ADMIN(rolName) && !advancement.disabled}
              errors={BASE_MESSAGES}
            />
          }
          isVisible
        />
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
            title={TextConstants.ADVANCEMENTS_VIEW_NO_ITEMS_MESSAGE}
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

export default AdvancementsComponent;
