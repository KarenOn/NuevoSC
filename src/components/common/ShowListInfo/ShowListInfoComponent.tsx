import React from 'react';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';

// Components
import Text from '../CustomText/CustomTextComponent';
import Button from '../CustomButton/CustomButtonComponent';
import ValidationMessageComponent from '../ValidationMessage/ValidationMessageComponent';

// Assets
import { GeneralStyles, Colors } from '../../../assets';
import styles from './styles';

// Constants
import { TestIdConstants } from '../../../constants/testIDConstants';
import { TextConstants } from '../../../constants/textConstants';
import { getCode, errorTypes } from '../../../constants/apiError';

// Utils
import { capitalizeFirst } from '../../../utils/helpers';

interface Item {
  id: number;
  value: string;
}

interface Props {
  title: string;
  data: Item[];
  onClose: () => void;
  onConfirm?: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
  status?: string;
  removeError?: any;
  deleteTitle?: string;
  showButtons?: boolean;
  isCredit?: boolean;
  onVisit?: () => void;
  onPayment?: () => void;
  errors: any;
  onlyShowDelete?: boolean;
}

const ShowListInfoComponent = (props: Props) => {
  const {
    title,
    data,
    onClose,
    onConfirm,
    showDelete,
    onDelete,
    status,
    removeError,
    deleteTitle,
    showButtons,
    isCredit,
    onVisit,
    onPayment,
    errors,
    onlyShowDelete,
  } = props;

  const onHandlerConfirm = () => {
    onClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  const onPaymentHandler = () => {
    onClose();
    if (onPayment) {
      onPayment();
    }
  };

  const onVisitHandler = () => {
    if (onVisit) {
      onVisit();
    }
  };

  return (
    <View style={GeneralStyles.mHeight100}>
      <View
        style={[
          GeneralStyles.alignCenter,
          styles.overlayTitle,
          GeneralStyles.paddingV10,
        ]}>
        <Text style={GeneralStyles.fontSize18} bold>
          {capitalizeFirst(title)}
        </Text>
        <Icon
          containerStyle={styles.overlayCloseIcon}
          size={moderateScale(50, 0.3)}
          color={Colors.white}
          type="ionicon"
          name="ios-close"
          underlayColor={Colors.transparent}
          onPress={onClose}
        />
      </View>
      {removeError && (
        <ValidationMessageComponent
          children={errors[getCode(removeError?.message) as errorTypes]}
        />
      )}
      <ScrollView
        style={[
          GeneralStyles.paddingH10,
          !showButtons && GeneralStyles.paddingB10,
        ]}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}>
        {data &&
          data.map((item) => (
            <View key={item.id} style={styles.overlayItem}>
              <Text bold black>
                {item.value}
              </Text>
            </View>
          ))}
      </ScrollView>
      {showButtons && (
        <View
          style={[
            GeneralStyles.paddingH10,
            onlyShowDelete && GeneralStyles.paddingT10,
          ]}>
          {!isCredit && !onlyShowDelete && (
            <View style={GeneralStyles.paddingV10}>
              <Button
                disabled={status === 'loading'}
                loading={status === 'loading'}
                testID={TestIdConstants.EDIT_BTN}
                secondary
                title={TextConstants.EDIT}
                onPress={onHandlerConfirm}
              />
            </View>
          )}
          {isCredit && (
            <>
              <View style={GeneralStyles.paddingV10}>
                <Button
                  disabled={status === 'loading'}
                  loading={status === 'loading'}
                  testID={TestIdConstants.REGISTER_VISIT_BTN}
                  secondary
                  title={TextConstants.REGISTER_VISIT}
                  onPress={onVisitHandler}
                />
              </View>
              <View style={GeneralStyles.paddingB10}>
                <Button
                  disabled={status === 'loading'}
                  loading={status === 'loading'}
                  testID={TestIdConstants.REGISTER_PAYMENT_BTN}
                  secondary
                  title={TextConstants.REGISTER_PAYMENT}
                  onPress={onPaymentHandler}
                />
              </View>
            </>
          )}
          {(showDelete || onlyShowDelete) && (
            <View style={GeneralStyles.paddingB10}>
              <Button
                disabled={status === 'loading'}
                loading={status === 'loading'}
                onPress={onDelete}
                testID={TestIdConstants.DELETE_BTN}
                danger
                title={deleteTitle || TextConstants.DELETE}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ShowListInfoComponent;
