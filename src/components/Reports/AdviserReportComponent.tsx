import React from 'react';
import { View, ScrollView } from 'react-native';
import { isEmpty } from 'lodash';

// Constants
import {
  TextConstants,
  TestIdConstants,
  BASE_MESSAGES,
  getCode,
  errorTypes,
} from '../../constants';

// Components
import {
  ValidationMessageComponent,
  CustomButtonComponent as Button,
  ReadOnlyInputComponent,
} from '../common';

// Assets
import { GeneralStyles } from '../../assets';

interface Props {
  submitFunction: () => void;
  error: any;
  status: string;
  item: any;
}

function AdviserReportComponent(props: Props) {
  const { submitFunction, error, status, item } = props;
  const isLoading = status === 'loading';

  return (
    <View style={[GeneralStyles.flex1]}>
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={[GeneralStyles.width100, GeneralStyles.paddingH15]}
        contentContainerStyle={GeneralStyles.paddingB20}
        keyboardShouldPersistTaps="handled">
        <View>
          <View style={[GeneralStyles.marginT30]}>
            <Button
              title={TextConstants.GENERATE}
              testID={TestIdConstants.SAVE_BTN}
              disabled={isLoading}
              onPress={submitFunction}
              loading={isLoading}
            />
          </View>

          {!isEmpty(item) && (
            <>
              <ReadOnlyInputComponent
                title="Ruta"
                value={item.route}
                style={GeneralStyles.marginT30}
              />

              <ReadOnlyInputComponent
                title="Total a Cobrar"
                value={item.totalReceivable}
                style={GeneralStyles.marginT30}
              />

              <ReadOnlyInputComponent
                title="Abonos"
                value={item.totalAdvancements}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Ingresos"
                value={item.totalIncomes}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Egresos"
                value={item.totalExpenses}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Total Mvts."
                value={item.totalMovements}
                style={GeneralStyles.marginT30}
              />

              <ReadOnlyInputComponent
                title="Cantidad Créditos a Cobrar"
                value={item.totalCreditsReceivable}
                style={GeneralStyles.marginT30}
              />

              <ReadOnlyInputComponent
                title="Cantidad Clientes a Cobrar"
                value={item.totalClientsToReceivable}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Cantidad Créditos que Abonaron"
                value={item.paidCredits}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Cantidad Créditos Visitados"
                value={item.visitedCredits}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Cantidad Clientes Visitados"
                value={item.totalVisitedClients}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Cantidad Créditos sin Visitar"
                value={item.totalCreditsWithOutVisit}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Cantidad Abonos Anulados del Día"
                value={item.totalDisabledAdvancements}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Clientes Nuevos"
                value={item.newClients}
                style={GeneralStyles.marginT15}
              />

              <ReadOnlyInputComponent
                title="Caja Anterior"
                value={item.previewBox}
                style={GeneralStyles.marginT30}
              />

              <ReadOnlyInputComponent
                title="Total Caja Act."
                value={item.totalBox}
                style={GeneralStyles.marginT15}
              />
            </>
          )}

          {error && (
            <ValidationMessageComponent style={GeneralStyles.marginT15}>
              {BASE_MESSAGES[getCode(error?.message) as errorTypes]}
            </ValidationMessageComponent>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default AdviserReportComponent;
