import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

// Assets
import { GeneralStyles, Colors } from '../../assets/';

// Containers
import { CreateDocumentTypeContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';

// Constants
import { TextConstants } from '../../constants/';

// Context
import { DocumentTypeContext } from '../../context/';

const CreateDocumentTypeView = () => {
  const {
    documentTypeDraft: { id },
  } = DocumentTypeContext.useState();
  const navigation = useNavigation();
  const headerTitle = id
    ? TextConstants.EDIT_DOCUMENT_TYPE_TITLE
    : TextConstants.DOCUMENT_TYPE_VIEW_ADD_BTN;

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
          <CreateDocumentTypeContainer />
        </KeyboardAvoidingView>
      </>
    </ContainerComponent>
  );
};

export default CreateDocumentTypeView;
