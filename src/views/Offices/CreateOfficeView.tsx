import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Assets
import { GeneralStyles, Colors } from '../../assets/';

// Views
import CreateGeneralTabView from './CreateGeneralTabView';
import CreateCreditsTabView from './CreateCreditsTabView';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';

// Constants
import { TextConstants, ROUTES } from '../../constants/';

// Context
import { OfficeContext } from '../../context/';

const Stack = createStackNavigator();

const CreateOfficeStack = ({ parentNavigator }: any) => (  
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name={ROUTES.OFFICE_GENERAL_TAB_ROUTE}
      component={CreateGeneralTabView}
    />
    <Stack.Screen
      initialParams={{ parentNavigator }}
      name={ROUTES.OFFICE_CREDITS_TAB_ROUTE}
      component={CreateCreditsTabView}
    />
  </Stack.Navigator>  
);

const CreateOfficeView = () => {
  const {
    officeDraft: { id },
  } = OfficeContext.useState();
  const navigation = useNavigation();
  const headerTitle = id
    ? TextConstants.EDIT_OFFICE_TITLE
    : TextConstants.CREATE_OFFICE_TITLE;

  const onRightIconPress = () => navigation.goBack();

  return (
    <ContainerComponent>
      <>
        {
        <Header
          rightIconType="ionicon"
          rightIconColor={Colors.white}
          rightIconName="ios-arrow-back"
          rightIconPress={onRightIconPress}
          title={headerTitle}
        />
        }
        {
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={[GeneralStyles.flex1]}
          behavior={Platform.select({
            ios: 'padding',
            android: undefined,
          })}>
          
          <CreateOfficeStack parentNavigator={navigation} />

        </KeyboardAvoidingView>
        }
      </>
    </ContainerComponent>
  );
};

export default CreateOfficeView;
