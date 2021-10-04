import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Assets
import { GeneralStyles, Colors } from '../../assets/';

// Views
import UserGeneralTabView from './UserGeneralTabView';
import UserAdminTabView from './UserAdminTabView';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';

// Constants
import { TextConstants, ROUTES } from '../../constants/';

// Context
import { SessionContext } from '../../context/';

const Stack = createStackNavigator();

const CreateUserStack = ({ parentNavigator }: any) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name={ROUTES.USER_GENERAL_TAB_ROUTE}
      component={UserGeneralTabView}
    />
    <Stack.Screen
      initialParams={{ parentNavigator }}
      name={ROUTES.USER_ADMIN_TAB_ROUTE}
      component={UserAdminTabView}
    />
  </Stack.Navigator>
);

const CreateUserView = () => {
  const {
    userDraft: { id },
  } = SessionContext.useState();
  const navigation = useNavigation();
  const headerTitle = id
    ? TextConstants.EDIT_USER_TITLE
    : TextConstants.USERS_VIEW_ADD_BTN;

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
          <CreateUserStack parentNavigator={navigation} />
        </KeyboardAvoidingView>
      </>
    </ContainerComponent>
  );
};

export default CreateUserView;
