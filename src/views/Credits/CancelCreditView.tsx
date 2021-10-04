import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Assets
import { GeneralStyles, Colors } from '../../assets/';

// Containers
import { CancelCreditContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';

// Constants
import { TextConstants } from '../../constants/';

const CancelCreditView = () => {
  const navigation = useNavigation();
  const headerTitle = TextConstants.CANCEL_CREDIT_TITLE;

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
          <CancelCreditContainer />
        </KeyboardAvoidingView>
      </>
    </ContainerComponent>
  );
};

export default CancelCreditView;
