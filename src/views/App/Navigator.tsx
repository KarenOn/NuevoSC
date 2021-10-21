import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Constants
import { ROUTES } from '../../constants/';

// Context
import {
  OfficeContext,
  CityContext,
  DocumentTypeContext,
  RolContext,
  RouteContext,
  ClientContext,
  CreditContext,
  AdvancementContext,
  IncomeExpenseTypeContext,
  IncomeExpenseCategoryContext,
  IncomeExpenseConceptContext,
  IncomeExpenseContext,
  TransferContext,
} from '../../context/';

// Views
import OfficesView from '../Offices/OfficesView';
import CreateOfficeView from '../Offices/CreateOfficeView';
import RoutesView from '../Routes/RoutesView';
import CreateRouteView from '../Routes/CreateRouteView';
import UsersView from '../Users/UsersView';
import CreateUserView from '../Users/CreateUserView';
import CitiesView from '../Cities/CitiesView';
import CreateCityView from '../Cities/CreateCityView';
import DocumentTypeView from '../DocumentType/DocumentTypeView';
import CreateDocumentTypeView from '../DocumentType/CreateDocumentTypeView';
import RolesView from '../Roles/RolesView';
import CreateRolView from '../Roles/CreateRolView';
import ClientsView from '../Clients/ClientsView';
import CreateClientView from '../Clients/CreateClientView';
import CreditsView from '../Credits/CreditsView';
import CreateCreditView from '../Credits/CreateCreditView';
import CancelCreditView from '../Credits/CancelCreditView';
import CreateAdvancementView from '../Advancements/CreateAdvancementView';
import AdvancementsView from '../Advancements/AdvancementsView';
import CancelAdvancementView from '../Advancements/CancelAdvancementView';
import IncomeExpensesView from '../IncomeExpenses/IncomeExpensesView';
import CreateIncomeExpenseView from '../IncomeExpenses/CreateIncomeExpenseView';
import TransfersView from '../Transfers/TransfersView';
import CreateTransferView from '../Transfers/CreateTransferView';

const Stack = createStackNavigator();

export const OfficesStack = () => (
  <OfficeContext.Provider>
    <Stack.Navigator headerMode="none" initialRouteName={ROUTES.OFFICES_ROUTE}>
      {
      <Stack.Screen name={ROUTES.OFFICES_ROUTE} component={OfficesView} />
      }
      {
      <Stack.Screen
        name={ROUTES.CREATE_OFFICE_ROUTE}
        component={CreateOfficeView}
      />
      }
    </Stack.Navigator>
  </OfficeContext.Provider>
);

export const RoutesStack = () => (
  <OfficeContext.Provider>
    <CityContext.Provider>
      <RouteContext.Provider>
        <Stack.Navigator
          headerMode="none"
          initialRouteName={ROUTES.ROUTES_ROUTE}>
          <Stack.Screen name={ROUTES.ROUTES_ROUTE} component={RoutesView} />
          <Stack.Screen
            name={ROUTES.CREATE_ROUTE_ROUTE}
            component={CreateRouteView}
          />
        </Stack.Navigator>
      </RouteContext.Provider>
    </CityContext.Provider>
  </OfficeContext.Provider>
);

export const UsersStack = () => (
  <OfficeContext.Provider>
    <RouteContext.Provider>
      <RolContext.Provider>
        <CityContext.Provider>
          <DocumentTypeContext.Provider>
            <Stack.Navigator
              headerMode="none"
              initialRouteName={ROUTES.USERS_ROUTE}>
              <Stack.Screen name={ROUTES.USERS_ROUTE} component={UsersView} />
              <Stack.Screen
                name={ROUTES.CREATE_USER_ROUTE}
                component={CreateUserView}
              />
            </Stack.Navigator>
          </DocumentTypeContext.Provider>
        </CityContext.Provider>
      </RolContext.Provider>
    </RouteContext.Provider>
  </OfficeContext.Provider>
);

export const CitiesStack = () => (
  <CityContext.Provider>
    <Stack.Navigator headerMode="none" initialRouteName={ROUTES.CITIES_ROUTE}>
      <Stack.Screen name={ROUTES.CITIES_ROUTE} component={CitiesView} />
      <Stack.Screen
        name={ROUTES.CREATE_CITY_ROUTE}
        component={CreateCityView}
      />
    </Stack.Navigator>
  </CityContext.Provider>
);

export const DocumentTypeStack = () => (
  <DocumentTypeContext.Provider>
    <Stack.Navigator
      headerMode="none"
      initialRouteName={ROUTES.DOCUMENT_TYPE_ROUTE}>
      <Stack.Screen
        name={ROUTES.DOCUMENT_TYPE_ROUTE}
        component={DocumentTypeView}
      />
      <Stack.Screen
        name={ROUTES.CREATE_DOCUMENT_TYPE_ROUTE}
        component={CreateDocumentTypeView}
      />
    </Stack.Navigator>
  </DocumentTypeContext.Provider>
);

export const RolesStack = () => (
  <RolContext.Provider>
    <Stack.Navigator headerMode="none" initialRouteName={ROUTES.ROLES_ROUTE}>
      <Stack.Screen name={ROUTES.ROLES_ROUTE} component={RolesView} />
      <Stack.Screen name={ROUTES.CREATE_ROL_ROUTE} component={CreateRolView} />
    </Stack.Navigator>
  </RolContext.Provider>
);

export const ClientsStack = () => (
  <OfficeContext.Provider>
    <RouteContext.Provider>
      <DocumentTypeContext.Provider>
        <ClientContext.Provider>
          <Stack.Navigator
            headerMode="none"
            initialRouteName={ROUTES.CLIENTS_ROUTE}>
            <Stack.Screen name={ROUTES.CLIENTS_ROUTE} component={ClientsView} />
            <Stack.Screen
              name={ROUTES.CREATE_CLIENT_ROUTE}
              component={CreateClientView}
            />
          </Stack.Navigator>
        </ClientContext.Provider>
      </DocumentTypeContext.Provider>
    </RouteContext.Provider>
  </OfficeContext.Provider>
);

export const CreditsStack = () => (
  <ClientContext.Provider> 
    <RouteContext.Provider>
    <CreditContext.Provider>
     
      <Stack.Navigator
        headerMode="none"
        initialRouteName={ROUTES.CREDITS_ROUTE}>
        <Stack.Screen name={ROUTES.CREDITS_ROUTE} component={CreditsView} />
        <Stack.Screen
          name={ROUTES.CREATE_CREDIT_ROUTE}
          component={CreateCreditView}
        />
        <Stack.Screen
          name={ROUTES.CANCEL_CREDIT_ROUTE}
          component={CancelCreditView}
        />
        <Stack.Screen
          name={ROUTES.ADVANCEMENT_CREDIT_ROUTE}
          component={CreateAdvancementView}
        />
      </Stack.Navigator>

    </CreditContext.Provider>
    </RouteContext.Provider>
  </ClientContext.Provider>
);

export const AdvancementsStack = () => (
  <AdvancementContext.Provider>
    <Stack.Navigator
      headerMode="none"
      initialRouteName={ROUTES.ADVANCEMENTS_ROUTE}>
      <Stack.Screen
        name={ROUTES.ADVANCEMENTS_ROUTE}
        component={AdvancementsView}
      />
      <Stack.Screen
        name={ROUTES.CANCEL_ADVANCEMENT_ROUTE}
        component={CancelAdvancementView}
      />
    </Stack.Navigator>
  </AdvancementContext.Provider>
);

export const IncomeExpensesStack = () => (
  <OfficeContext.Provider>
    <RouteContext.Provider>
      <IncomeExpenseTypeContext.Provider>
        <IncomeExpenseCategoryContext.Provider>
          <IncomeExpenseConceptContext.Provider>
            <IncomeExpenseContext.Provider>
              <Stack.Navigator
                headerMode="none"
                initialRouteName={ROUTES.INCOME_EXPENSE_ROUTE}>
                <Stack.Screen
                  name={ROUTES.INCOME_EXPENSE_ROUTE}
                  component={IncomeExpensesView}
                />
                <Stack.Screen
                  name={ROUTES.CREATE_INCOME_EXPENSE_ROUTE}
                  component={CreateIncomeExpenseView}
                />
              </Stack.Navigator>
            </IncomeExpenseContext.Provider>
          </IncomeExpenseConceptContext.Provider>
        </IncomeExpenseCategoryContext.Provider>
      </IncomeExpenseTypeContext.Provider>
    </RouteContext.Provider>
  </OfficeContext.Provider>
);

export const TransfersStack = () => (
  <OfficeContext.Provider>
    <RouteContext.Provider>
      <TransferContext.Provider>
        <Stack.Navigator
          headerMode="none"
          initialRouteName={ROUTES.TRANSFER_ROUTE}>
          <Stack.Screen
            name={ROUTES.TRANSFER_ROUTE}
            component={TransfersView}
          />
          <Stack.Screen
            name={ROUTES.CREATE_TRANSFER_ROUTE}
            component={CreateTransferView}
          />
        </Stack.Navigator>
      </TransferContext.Provider>
    </RouteContext.Provider>
  </OfficeContext.Provider>
);
