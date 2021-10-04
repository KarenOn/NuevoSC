import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Assets
import { GeneralStyles, Colors } from '../../assets';

// Containers
import { CreateIncomeExpenseContainer } from '../../containers';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components';

// Constants
import { TextConstants } from '../../constants';

// Context
import { IncomeExpenseContext } from '../../context';

const CreateIncomeExpenseView = () => {
  const {
    incomeExpenseDraft: { id },
  } = IncomeExpenseContext.useState();
  const navigation = useNavigation();
  const headerTitle = id
    ? TextConstants.INCOME_EXPENSES_VIEW_EDIT_TITLE
    : TextConstants.INCOME_EXPENSES_VIEW_ADD_BTN;

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
          <CreateIncomeExpenseContainer />
        </KeyboardAvoidingView>
      </>
    </ContainerComponent>
  );
};

export default CreateIncomeExpenseView;
