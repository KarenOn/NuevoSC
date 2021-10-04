import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Assets
import { GeneralStyles, Colors } from '../../assets/';

// Views
import ClientGeneralTabView from './ClientGeneralTabView';
import ClientContactTabView from './ClientContactTabView';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';

// Constants
import { TextConstants, ROUTES } from '../../constants/';

// Context
import { ClientContext } from '../../context/';

const Stack = createStackNavigator();

const CreateClientStack = ({ parentNavigator }: any) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name={ROUTES.CLIENT_GENERAL_TAB_ROUTE}
      component={ClientGeneralTabView}
    />
    <Stack.Screen
      initialParams={{ parentNavigator }}
      name={ROUTES.CLIENT_ADMIN_TAB_ROUTE}
      component={ClientContactTabView}
    />
  </Stack.Navigator>
);

const CreateClientView = () => {
  const {
    clientDraft: { id },
  } = ClientContext.useState();
  const navigation = useNavigation();
  const headerTitle = id
    ? TextConstants.EDIT_CLIENT_TITLE
    : TextConstants.CLIENTS_VIEW_ADD_BTN;

  const onRightIconPress = () => navigation.goBack();

  return (
    <ContainerComponent>
      <>
        <Header
          rightIconType="ionicon"
          rightIconColor={Colors.white}
          rightIconName="ios-arrow-back"
          rightIconPress={onRightIconPress}
          title={headerTitle}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={[GeneralStyles.flex1]}
          behavior={Platform.select({
            ios: 'padding',
            android: undefined,
          })}>
          <CreateClientStack parentNavigator={navigation} />
        </KeyboardAvoidingView>
      </>
    </ContainerComponent>
  );
};

export default CreateClientView;
