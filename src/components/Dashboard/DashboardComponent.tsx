import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import { moderateScale } from 'react-native-size-matters';
// Utils
import {validationAccess} from '../../utils/';

// Constants
import { ROUTES, TextConstants } from '../../constants';

// Assets
import { GeneralStyles, Colors } from '../../assets';
import styles from './style';

// Components
import {
  CustomButtonComponent as Button,
  CustomTextComponent as Text,
} from '../common/';

// Context
import { User } from '../../context/session/sessionContext';

// Utils
import {
  ADMIN,
  SUPERVISOR,
  EXCLUDE_REVIEWER,
  ONLY_ADVISER,
} from '../../utils/';

const SECTIONS = [
  {
    title: TextConstants.GENERAL,
  },
];

const MOVEMENTS_SECTIONS = [
  {
    title: TextConstants.MOVEMENTS,
  },
];

const REPORTS_SECTIONS = [
  {
    title: TextConstants.REPORTS,
  },
];

interface Props {
  user: User;
}



function DashboardComponent({ user }: Props) {
  const [generalActiveSections, setGeneralActiveSections] = useState([]);
  const [movementsActiveSections, setMovementsActiveSections] = useState([]);
  const [reportsActiveSections, setReportsActiveSections] = useState([]);
  const navigation = useNavigation();
  const {
    rol: { name },
  } = user;


  const renderGeneralSection = () => (
    <View style={GeneralStyles.paddingH10}>
      {/* ciudades */}
      {validationAccess(name,ROUTES.CITIES_ROUTE,'read') ? 
      <View style={GeneralStyles.marginB15}>
      <Button
          onPress={() => navigation.navigate(ROUTES.CITIES_ROUTE)}
          title={ROUTES.CITIES_ROUTE.toUpperCase()}
        /> 
      </View>: null }
    {/* tipos de documentos */}
      {validationAccess(name,ROUTES.DOCUMENT_TYPE_ROUTE,'read') ? 
      <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.DOCUMENT_TYPE_ROUTE)}
          title={ROUTES.DOCUMENT_TYPE_ROUTE.toUpperCase()}
        />
      </View> : null }
      { validationAccess(name,ROUTES.ROLES_ROUTE,'read') ?
      <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.ROLES_ROUTE)}
          title={ROUTES.ROLES_ROUTE.toUpperCase()}
        />
      </View> : null}
    </View>
  );

  const renderMovementsSection = () => {
    return (
      <View style={GeneralStyles.paddingH10}>
        {validationAccess(name,ROUTES.INCOME_EXPENSE_ROUTE,'read') ? 
        <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.INCOME_EXPENSE_ROUTE)}
          title={TextConstants.INCOME_EXPENSES_TITLE.toUpperCase()}
        />
      </View> : null }
        {/* {EXCLUDE_REVIEWER(name) && (
          <View style={GeneralStyles.marginB15}>
            <Button
              onPress={() => navigation.navigate(ROUTES.INCOME_EXPENSE_ROUTE)}
              title={TextConstants.INCOME_EXPENSES_TITLE.toUpperCase()}
            />
          </View>
        )} */}
        {validationAccess(name,ROUTES.TRANSFER_ROUTE,'read') ? 
         <View style={GeneralStyles.marginB15}>
         <Button
           onPress={() => navigation.navigate(ROUTES.TRANSFER_ROUTE)}
           title={ROUTES.TRANSFER_ROUTE.toUpperCase()}
         />
       </View> : null }
        {/* {SUPERVISOR(name) && (
          <View style={GeneralStyles.marginB15}>
            <Button
              onPress={() => navigation.navigate(ROUTES.TRANSFER_ROUTE)}
              title={ROUTES.TRANSFER_ROUTE.toUpperCase()}
            />
          </View>
        )} */}
      </View>
    );
  };

  const renderReportsSection = () => {
    return (
      <View style={GeneralStyles.paddingH10}>
        {SUPERVISOR(name) && (
          <>
          {/* caja rutas */}
          {validationAccess(name,ROUTES.ROUTE_BALANCE_ROUTE,'read') ? 
            <View style={GeneralStyles.marginB15}>
              <Button
                onPress={() => navigation.navigate(ROUTES.ROUTE_BALANCE_ROUTE)}
                title={ROUTES.ROUTE_BALANCE_ROUTE}
              />
            </View> :null}
            {/* Cuadre rutas */}
            {validationAccess(name,ROUTES.ROUTE_CUADRE_ROUTE,'read') ? 
            <View style={GeneralStyles.marginB15}>
              <Button
                onPress={() => navigation.navigate(ROUTES.ROUTE_CUADRE_ROUTE)}
                title={ROUTES.ROUTE_CUADRE_ROUTE}
              />
            </View> : null }
            {/* ingresos y egreso ruta */}
            {validationAccess(name,ROUTES.ROUTE_INCOME_EXPENSE_ROUTE,'read') ? 
            <View style={GeneralStyles.marginB15}>
              <Button
                onPress={() =>
                  navigation.navigate(ROUTES.ROUTE_INCOME_EXPENSE_ROUTE)
                }
                title={ROUTES.ROUTE_INCOME_EXPENSE_ROUTE}
              />
            </View> : null }
          </>
        )}
        {ONLY_ADVISER(name) && (
          // reporte de rutas
          <View style={GeneralStyles.marginB15}>
            <Button
              onPress={() => navigation.navigate(ROUTES.REVIEWER_REPORT_ROUTE)}
              title={ROUTES.REVIEWER_REPORT_ROUTE}
            />
          </View>
        )}
      </View>
    );
  };

  const updateGeneralSections = (_activeSections: any) => {
    setGeneralActiveSections(_activeSections);
  };

  const updateMovementsSections = (_activeSections: any) => {
    setMovementsActiveSections(_activeSections);
  };

  const updateReportsSections = (_activeSections: any) => {
    setReportsActiveSections(_activeSections);
  };

  const renderHeader = (title: string, state: any) => (
    <View
      style={[
        GeneralStyles.marginB15,
        GeneralStyles.paddingH10,
        GeneralStyles.primaryButton,
        GeneralStyles.defaultButton,
        GeneralStyles.justifyBetween,
        GeneralStyles.alignCenter,
        GeneralStyles.flexRow,
        styles.AccordionHeader,
      ]}>
      <Text style={[GeneralStyles.fontBold, GeneralStyles.fontSize18]}>
        {title.toUpperCase()}
      </Text>
      <Icon
        type="ionicon"
        name={state.length > 0 ? 'ios-arrow-down' : 'ios-arrow-forward'}
        color={Colors.white}
        size={moderateScale(30, 0.3)}
        underlayColor={Colors.transparent}
      />
    </View>
  );

  const renderGeneralHeader = (section: any) =>
    renderHeader(section.title, generalActiveSections);

  const renderMovementsHeader = (section: any) =>
    renderHeader(section.title, movementsActiveSections);

  const renderReportsHeader = (section: any) =>
    renderHeader(section.title, reportsActiveSections);

  return (
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
      contentContainerStyle={GeneralStyles.paddingB20}
      keyboardShouldPersistTaps="handled">
      <View style={[GeneralStyles.flex1, GeneralStyles.marginT30]}>
        {ADMIN(name) && (
          <Accordion
            containerStyle={GeneralStyles.marginTLess15}
            renderSectionTitle={() => <Text />}
            renderHeader={renderGeneralHeader}
            renderContent={renderGeneralSection}
            activeSections={generalActiveSections}
            sections={SECTIONS}
            onChange={updateGeneralSections}
            underlayColor="transparent"
          />
        )}
        {/* oficinas */}
        {validationAccess(name,ROUTES.OFFICES_ROUTE,'read') ? 
        <View style={GeneralStyles.marginB15}>
          <Button
            onPress={() => navigation.navigate(ROUTES.OFFICES_ROUTE)}
            title={ROUTES.OFFICES_ROUTE.toUpperCase()}
          />
        </View> : null }
        {/* rutas */}
        {validationAccess(name,ROUTES.ROUTES_ROUTE,'read') ? 
        <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.ROUTES_ROUTE)}
          title={ROUTES.ROUTES_ROUTE.toUpperCase()}
        />
      </View> : null }

      {/* usuarios */}
      {validationAccess(name,ROUTES.USERS_ROUTE,'read') ? 
      <View style={GeneralStyles.marginB15}>
            <Button
              onPress={() => navigation.navigate(ROUTES.USERS_ROUTE)}
              title={ROUTES.USERS_ROUTE.toUpperCase()}
            />
      </View>: null }
        {/* {SUPERVISOR(name) && (
          <View style={GeneralStyles.marginB15}>
            <Button
              onPress={() => navigation.navigate(ROUTES.USERS_ROUTE)}
              title={ROUTES.USERS_ROUTE.toUpperCase()}
            />
          </View>
        )} */}

        {/* clientes */}
        {validationAccess(name,ROUTES.CLIENTS_ROUTE,'read') ? 
        <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.CLIENTS_ROUTE)}
          title={ROUTES.CLIENTS_ROUTE.toUpperCase()}
        />
      </View>: null }
      {/* creditos */}
      {validationAccess(name,ROUTES.CREDITS_ROUTE,'read') ? 
        <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.CREDITS_ROUTE)}
          title={ROUTES.CREDITS_ROUTE.toUpperCase()}
        />
      </View>: null }
      {/* abonos */}
      {validationAccess(name,ROUTES.ADVANCEMENTS_ROUTE,'read') ? 
        <View style={GeneralStyles.marginB15}>
        <Button
          onPress={() => navigation.navigate(ROUTES.ADVANCEMENTS_ROUTE)}
          title={ROUTES.ADVANCEMENTS_ROUTE.toUpperCase()}
        />
      </View>: null }
        
        {EXCLUDE_REVIEWER(name) && (
          <Accordion
            containerStyle={GeneralStyles.marginTLess15}
            renderSectionTitle={() => <Text />}
            renderHeader={renderMovementsHeader}
            renderContent={renderMovementsSection}
            activeSections={movementsActiveSections}
            sections={MOVEMENTS_SECTIONS}
            onChange={updateMovementsSections}
            underlayColor="transparent"
          />
        )}
        {EXCLUDE_REVIEWER(name) && (
          <Accordion
            containerStyle={GeneralStyles.marginTLess15}
            renderSectionTitle={() => <Text />}
            renderHeader={renderReportsHeader}
            renderContent={renderReportsSection}
            activeSections={reportsActiveSections}
            sections={REPORTS_SECTIONS}
            onChange={updateReportsSections}
            underlayColor="transparent"
          />
        )}
      </View>
    </ScrollView>
  );
}

export default DashboardComponent;
