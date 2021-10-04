import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UserInactivity from 'react-native-user-inactivity';

// Views
import LoginView from '../Login/LoginView';
import SmsVerificationView from '../SmsVerification/SmsVerificationView';
import DashboardView from '../Dashboard/DashboardView';
import RouteBalanceReportView from '../Reports/RouteBalanceReportView';
import RouteDayBalanceReportView from '../Reports/RouteDayBalanceReportView';
import RouteIncomesExpensesView from '../Reports/RouteIncomesExpensesView';
import AdviserReportView from '../Reports/AdviserReportView';

// Components
import {
  OfficesStack,
  RoutesStack,
  UsersStack,
  CitiesStack,
  DocumentTypeStack,
  RolesStack,
  ClientsStack,
  CreditsStack,
  AdvancementsStack,
  IncomeExpensesStack,
  TransfersStack,
} from './Navigator';
import { SplashComponent, CustomDrawerComponent } from '../../components/';

// Assets
import { Colors } from '../../assets/';

// Context
import { SessionContext } from '../../context/';

// Constants
import { AppTheme, ROUTES, INACTIVITY_TIME_OUT } from '../../constants/';

// Services
import { useLogout } from '../../services/';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppView = () => {
  const [active, setActive] = useState(true);
  const sessionDispatch = SessionContext.useDispatch();
  const { isAuthenticated, isLoading, user } = SessionContext.useState();
  const [mutate] = useLogout();

  const onLogout = async () => {
    await mutate();
    sessionDispatch({
      type: SessionContext.ActionTypes.LOGOUT,
    });
  };

  const renderDrawerContent = (
    props: DrawerContentComponentProps<DrawerContentOptions>,
  ) => {
    return <CustomDrawerComponent {...props} onLogout={onLogout} user={user} />;
  };

  const onActivityChange = (isActive: boolean) => {
    setActive(isActive);
    if (!isActive && isAuthenticated) {
      onLogout();
    }
  };

  return (
    <UserInactivity
      isActive={active}
      timeForInactivity={INACTIVITY_TIME_OUT}
      onAction={onActivityChange}>
      <NavigationContainer theme={AppTheme}>
        {isLoading && <SplashComponent />}
        {!isLoading && (
          <>
            <StatusBar backgroundColor={Colors.gradientPrimary} />    
            { console.log(isAuthenticated) }        
            { !isAuthenticated && ( 
              <Stack.Navigator
                headerMode="none"
                initialRouteName={ROUTES.LOGIN_ROUTE}>
                <Stack.Screen name={ROUTES.LOGIN_ROUTE} component={LoginView} />
                <Stack.Screen
                  name={ROUTES.VERIFICATION_ROUTE}
                  component={SmsVerificationView}
                />
              </Stack.Navigator>
            )}
            { isAuthenticated && (
              <>
              {/*
              <Stack.Navigator
                initialRouteName={ROUTES.DASHBOARD_ROUTE}>
                <Stack.Screen
                  name={ROUTES.DASHBOARD_ROUTE}
                  component={DashboardView}
                /> 

              </Stack.Navigator>
              */}

              {
                <Drawer.Navigator
                  drawerContent={renderDrawerContent}
                  initialRouteName={ROUTES.DASHBOARD_ROUTE}>
                  <Drawer.Screen
                    name={ROUTES.DASHBOARD_ROUTE}
                    component={DashboardView}
                  />
                  <Drawer.Screen
                    name={ROUTES.CITIES_ROUTE}
                    component={CitiesStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.DOCUMENT_TYPE_ROUTE}
                    component={DocumentTypeStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.ROLES_ROUTE}
                    component={RolesStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.OFFICES_ROUTE}
                    component={OfficesStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.ROUTES_ROUTE}
                    component={RoutesStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.USERS_ROUTE}
                    component={UsersStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.CLIENTS_ROUTE}
                    component={ClientsStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.CREDITS_ROUTE}
                    component={CreditsStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.ADVANCEMENTS_ROUTE}
                    component={AdvancementsStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.INCOME_EXPENSE_ROUTE}
                    component={IncomeExpensesStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.TRANSFER_ROUTE}
                    component={TransfersStack}
                  />
                  <Drawer.Screen
                    name={ROUTES.ROUTE_BALANCE_ROUTE}
                    component={RouteBalanceReportView}
                  />
                  <Drawer.Screen
                    name={ROUTES.ROUTE_CUADRE_ROUTE}
                    component={RouteDayBalanceReportView}
                  />
                  <Drawer.Screen
                    name={ROUTES.ROUTE_INCOME_EXPENSE_ROUTE}
                    component={RouteIncomesExpensesView}
                  />
                  <Drawer.Screen
                    name={ROUTES.REVIEWER_REPORT_ROUTE}
                    component={AdviserReportView}
                  />
                </Drawer.Navigator>
              }
              </>
            )}
          </>
        )}
      </NavigationContainer>
    </UserInactivity>
  );
};

export default AppView;
