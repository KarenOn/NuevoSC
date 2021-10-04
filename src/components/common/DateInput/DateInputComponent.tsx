import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Field, ErrorMessage } from 'formik';
import { Input, InputProps } from 'react-native-elements';
import { get } from 'lodash';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';

// Components
import ValidationMessageComponent from '../ValidationMessage/ValidationMessageComponent';

// Constants
import { getCommonProps } from '../../../constants/formsConstants';

// Assets
import styles from './styles';
import { Colors, GeneralStyles } from '../../../assets';

interface Props extends InputProps {
  label: string;
  name: string;
  formikProps: any;
  minimumDate: Date;
  customValue?: Date;
}

const DateInput = (props: Props) => {
  const {
    label,
    name,
    formikProps,
    containerStyle,
    minimumDate,
    customValue,
  } = props;
  const [show, setShow] = useState(false);
  const commonProps = getCommonProps({ isFocus: false });

  const open = useCallback(() => setShow(true), [setShow]);

  const close = useCallback(() => setShow(false), [setShow]);

  return (
    <View style={containerStyle}>
      <Field name={name} formikProps={formikProps}>
        {() => (
          <>
            <TouchableOpacity onPress={open}>
              <Input
                label={label}
                editable={false}
                pointerEvents="none"
                value={moment(
                  get(formikProps.values, name, customValue),
                ).format('LL')}
                {...commonProps}
              />
            </TouchableOpacity>
          </>
        )}
      </Field>
      <ErrorMessage
        // @ts-ignore
        component={ValidationMessageComponent}
        name={name}
      />
      <Modal
        isVisible={show}
        onSwipeComplete={close}
        onBackdropPress={close}
        swipeDirection={['down']}
        style={styles.container}>
        <View style={[GeneralStyles.justifyCenter, GeneralStyles.alignCenter]}>
          <DatePicker
            date={get(formikProps.values, name, customValue)}
            onDateChange={(date) => formikProps.setFieldValue(name, date)}
            mode="date"
            locale="es-ES"
            maximumDate={new Date()}
            minimumDate={minimumDate}
            textColor={Colors.black}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DateInput;
