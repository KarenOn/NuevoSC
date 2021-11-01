import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';

// Components
import { CustomTextComponent as Text } from '../common/';

// Assets
import styles from './styles';
import { Colors, GeneralStyles } from '../../assets/';

// Constants
import { TextConstants, ROUTES } from '../../constants/';

// Context
import { SessionContext } from '../../context/';

// Utils
import {
  ADMIN,
  SUPERVISOR,
  EXCLUDE_REVIEWER,
  ONLY_ADVISER,
  validationAccess
} from '../../utils/';

interface Props extends DrawerContentComponentProps<DrawerContentOptions> {
  onLogout: () => void;
  user: SessionContext.User;
}

const GENERAL_SECTION = [
  {
    title: TextConstants.GENERAL,
  },
];

const MOVEMENTS_SECTION = [
  {
    title: TextConstants.MOVEMENTS,
  },
];

const REPORTS_SECTIONS = [
  {
    title: TextConstants.REPORTS,
  },
];

const ROUTE_INDEX = {
  [ROUTES.DASHBOARD_ROUTE]: 0,
  [ROUTES.CITIES_ROUTE]: 1,
  [ROUTES.DOCUMENT_TYPE_ROUTE]: 2,
  [ROUTES.ROLES_ROUTE]: 3,
  [ROUTES.OFFICES_ROUTE]: 4,
  [ROUTES.ROUTES_ROUTE]: 5,
  [ROUTES.USERS_ROUTE]: 6,
  [ROUTES.CLIENTS_ROUTE]: 7,
  [ROUTES.CREDITS_ROUTE]: 8,
  [ROUTES.ADVANCEMENTS_ROUTE]: 9,
  [ROUTES.INCOME_EXPENSE_ROUTE]: 10,
  [ROUTES.TRANSFER_ROUTE]: 11,
  [ROUTES.ROUTE_BALANCE_ROUTE]: 12,
  [ROUTES.ROUTE_CUADRE_ROUTE]: 13,
  [ROUTES.ROUTE_INCOME_EXPENSE_ROUTE]: 14,
  [ROUTES.REVIEWER_REPORT_ROUTE]: 15,
};

const CustomDrawerComponent: React.FC<Props> = (props) => {
  const [generalActiveSections, setGeneralActiveSections] = useState([]);
  const [movementsActiveSections, setMovementsActiveSections] = useState([]);
  const [reportsActiveSections, setReportsActiveSections] = useState([]);
  const {
    onLogout,
    user,
    navigation,
    state: { index },
  } = props;

  const renderGeneralSection = () => (
    <View>
      { validationAccess(user?.rol?.name,ROUTES.CITIES_ROUTE,'read') ?
      <View
        style={[
          GeneralStyles.marginV3,
          ROUTE_INDEX[ROUTES.CITIES_ROUTE] === index && styles.activeColor,
        ]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(ROUTES.CITIES_ROUTE)}>
          <View style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
            <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
              {ROUTES.CITIES_ROUTE.toUpperCase()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View> :null }
      {/* tipo documento */}
      { validationAccess(user?.rol?.name,ROUTES.DOCUMENT_TYPE_ROUTE,'read') ?
      <View
        style={[
          GeneralStyles.marginV3,
          ROUTE_INDEX[ROUTES.DOCUMENT_TYPE_ROUTE] === index &&
            styles.activeColor,
        ]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(ROUTES.DOCUMENT_TYPE_ROUTE)}>
          <View style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
            <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
              {ROUTES.DOCUMENT_TYPE_ROUTE.toUpperCase()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View> :null } 
      { validationAccess(user?.rol?.name,ROUTES.ROLES_ROUTE,'read') ?
      <View
        style={[
          GeneralStyles.marginV3,
          ROUTE_INDEX[ROUTES.ROLES_ROUTE] === index && styles.activeColor,
        ]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(ROUTES.ROLES_ROUTE)}>
          <View style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
            <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
              {ROUTES.ROLES_ROUTE.toUpperCase()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>:null}
    </View> 
  );

  const renderMovementsSection = () => {
    return (
      <View>
       {/* {EXCLUDE_REVIEWER(user.rol.name) && ( */}
          { validationAccess(user?.rol?.name,ROUTES.INCOME_EXPENSE_ROUTE,'read') ?
          <View
            style={[
              GeneralStyles.marginV3,
              ROUTE_INDEX[ROUTES.INCOME_EXPENSE_ROUTE] === index &&
                styles.activeColor,
            ]}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(ROUTES.INCOME_EXPENSE_ROUTE)}>
              <View
                style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
                <Text
                  style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                  {ROUTES.INCOME_EXPENSE_ROUTE.toUpperCase()}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View> : null }
        {/* )} */}
        {/* {SUPERVISOR(user.rol.name) && ( */}
          { validationAccess(user?.rol?.name,ROUTES.TRANSFER_ROUTE,'read') ?
          <View
            style={[
              GeneralStyles.marginV3,
              ROUTE_INDEX[ROUTES.TRANSFER_ROUTE] === index &&
                styles.activeColor,
            ]}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(ROUTES.TRANSFER_ROUTE)}>
              <View
                style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
                <Text
                  style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                  {ROUTES.TRANSFER_ROUTE.toUpperCase()}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View> :null } 
        {/*  )} */}
      </View>
    );
  };

  const renderReportsSection = () => {
    return (
      <View>
        {/* {SUPERVISOR(user.rol.name) && ( */}
          <>
          { validationAccess(user?.rol?.name,ROUTES.ROUTE_BALANCE_ROUTE,'read') ?
            <View
              style={[
                GeneralStyles.marginV3,
                ROUTE_INDEX[ROUTES.ROUTE_BALANCE_ROUTE] === index &&
                  styles.activeColor,
              ]}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(ROUTES.ROUTE_BALANCE_ROUTE)}>
                <View
                  style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
                  <Text
                    style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                    {ROUTES.ROUTE_BALANCE_ROUTE}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            :null}
            { validationAccess(user?.rol?.name,ROUTES.ROUTE_CUADRE_ROUTE,'read') ?
            <View
              style={[
                GeneralStyles.marginV3,
                ROUTE_INDEX[ROUTES.ROUTE_CUADRE_ROUTE] === index &&
                  styles.activeColor,
              ]}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(ROUTES.ROUTE_CUADRE_ROUTE)}>
                <View
                  style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
                  <Text
                    style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                    {ROUTES.ROUTE_CUADRE_ROUTE}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View> : null }
            { validationAccess(user?.rol?.name,ROUTES.ROUTE_INCOME_EXPENSE_ROUTE,'read') ?
            <View
              style={[
                GeneralStyles.marginV3,
                ROUTE_INDEX[ROUTES.ROUTE_INCOME_EXPENSE_ROUTE] === index &&
                  styles.activeColor,
              ]}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate(ROUTES.ROUTE_INCOME_EXPENSE_ROUTE)
                }>
                <View
                  style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
                  <Text
                    style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                    {ROUTES.ROUTE_INCOME_EXPENSE_ROUTE}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>:null}
          </>
        {/* )} */}
        {/* {ONLY_ADVISER(user.rol.name) && ( */}
          { validationAccess(user?.rol?.name,ROUTES.REVIEWER_REPORT_ROUTE,'read') ?
          <View
            style={[
              GeneralStyles.marginV3,
              ROUTE_INDEX[ROUTES.REVIEWER_REPORT_ROUTE] === index &&
                styles.activeColor,
            ]}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(ROUTES.REVIEWER_REPORT_ROUTE)}>
              <View
                style={[GeneralStyles.paddingL30, GeneralStyles.paddingV10]}>
                <Text
                  style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                  {ROUTES.REVIEWER_REPORT_ROUTE}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View> : null}
        {/* )} */}
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
        GeneralStyles.justifyBetween,
        GeneralStyles.alignCenter,
        GeneralStyles.flexRow,
        GeneralStyles.paddingH20,
      ]}>
      <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
        {title.toUpperCase()}
      </Text>
      <Icon
        type="ionicon"
        name={state.length > 0 ? 'ios-arrow-down' : 'ios-arrow-forward'}
        color={Colors.white}
        size={moderateScale(22, 0.3)}
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
    <LinearGradient
      start={{ x: 0, y: 0.9 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.gradientSecondary, Colors.gradientPrimary]}
      style={GeneralStyles.flex1}>
      <DrawerContentScrollView alwaysBounceVertical={false} {...props}>
        <View
          style={[
            styles.drawerHeader,
            GeneralStyles.justifyCenter,
            GeneralStyles.paddingH17,
          ]}>
          <Text
            style={[GeneralStyles.fontSize18, GeneralStyles.textCenter]}
            upper
            bold>
            {`${user.name} ${user.last_name}`}
          </Text>
          <View style={styles.separator} />
          <Text upper bold style={GeneralStyles.textCenter}>
            {user.rol.name}
          </Text>
        </View>
        <View
          style={[
            GeneralStyles.marginV3,
            ROUTE_INDEX[ROUTES.DASHBOARD_ROUTE] === index && styles.activeColor,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.DASHBOARD_ROUTE)}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {ROUTES.DASHBOARD_ROUTE}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {ADMIN(user.rol.name) && (
          <Accordion
            containerStyle={[
              GeneralStyles.marginTLess10,
              GeneralStyles.marginB10,
            ]}
            renderSectionTitle={() => <Text />}
            renderHeader={renderGeneralHeader}
            renderContent={renderGeneralSection}
            activeSections={generalActiveSections}
            sections={GENERAL_SECTION}
            onChange={updateGeneralSections}
            underlayColor="transparent"
          />
        )}
        { validationAccess(user?.rol?.name,ROUTES.OFFICES_ROUTE,'read') ?
        <View
          style={[
            GeneralStyles.marginV3,
            ROUTE_INDEX[ROUTES.OFFICES_ROUTE] === index && styles.activeColor,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.OFFICES_ROUTE)}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {ROUTES.OFFICES_ROUTE}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View> : null }
        { validationAccess(user?.rol?.name,ROUTES.ROUTES_ROUTE,'read') ?
        <View
          style={[
            GeneralStyles.marginV3,
            ROUTE_INDEX[ROUTES.ROUTES_ROUTE] === index && styles.activeColor,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.ROUTES_ROUTE)}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {ROUTES.ROUTES_ROUTE}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>:null}
        {/* {SUPERVISOR(user.rol.name) && ( */}
          { validationAccess(user?.rol?.name,ROUTES.USERS_ROUTE,'read') ?
          <View
            style={[
              GeneralStyles.marginV3,
              ROUTE_INDEX[ROUTES.USERS_ROUTE] === index && styles.activeColor,
            ]}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(ROUTES.USERS_ROUTE)}>
              <View
                style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
                <Text
                  style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                  {ROUTES.USERS_ROUTE}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>:null}
        {/* )} */}
        { validationAccess(user?.rol?.name,ROUTES.CLIENTS_ROUTE,'read') ?
        <View
          style={[
            GeneralStyles.marginV3,
            ROUTE_INDEX[ROUTES.CLIENTS_ROUTE] === index && styles.activeColor,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.CLIENTS_ROUTE)}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {ROUTES.CLIENTS_ROUTE}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>: null}
        { validationAccess(user?.rol?.name,ROUTES.CREDITS_ROUTE,'read') ?
        <View
          style={[
            GeneralStyles.marginV3,
            ROUTE_INDEX[ROUTES.CREDITS_ROUTE] === index && styles.activeColor,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.CREDITS_ROUTE)}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {ROUTES.CREDITS_ROUTE}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>:null}
        { validationAccess(user?.rol?.name,ROUTES.ADVANCEMENTS_ROUTE,'read') ?
        <View
          style={[
            GeneralStyles.marginV3,
            ROUTE_INDEX[ROUTES.ADVANCEMENTS_ROUTE] === index &&
              styles.activeColor,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.ADVANCEMENTS_ROUTE)}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {ROUTES.ADVANCEMENTS_ROUTE}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>:null}
        {EXCLUDE_REVIEWER(user.rol.name) && (
          <Accordion
            containerStyle={[
              GeneralStyles.marginTLess10,
              GeneralStyles.marginB10,
            ]}
            renderSectionTitle={() => <Text />}
            renderHeader={renderMovementsHeader}
            renderContent={renderMovementsSection}
            activeSections={movementsActiveSections}
            sections={MOVEMENTS_SECTION}
            onChange={updateMovementsSections}
            underlayColor="transparent"
          />
        )}
        {EXCLUDE_REVIEWER(user.rol.name) && (
          <Accordion
            containerStyle={[
              GeneralStyles.marginTLess10,
              GeneralStyles.marginB10,
            ]}
            renderSectionTitle={() => <Text />}
            renderHeader={renderReportsHeader}
            renderContent={renderReportsSection}
            activeSections={reportsActiveSections}
            sections={REPORTS_SECTIONS}
            onChange={updateReportsSections}
            underlayColor="transparent"
          />
        )}
        <View style={[GeneralStyles.marginV3]}>
          <TouchableWithoutFeedback onPress={onLogout}>
            <View style={[GeneralStyles.paddingL20, GeneralStyles.paddingV10]}>
              <Text style={[styles.drawerItemLabel, GeneralStyles.fontSize13]}>
                {TextConstants.LOGOUT}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default CustomDrawerComponent;
