import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

// Components
import Text from '../CustomText/CustomTextComponent';
import ValuePickerComponent from './ValuePickerComponent';

// Assets
import { GeneralStyles } from '../../../assets/';
import styles from './styles';

// Utils
import { capitalizeFirst } from '../../../utils/helpers';

interface Props {
  value: string;
  options: Array<string>;
  hashOptions: any;
  label?: string;
  onValueChange: (value: string) => void;
}

const CustomSelectComponent = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const { value, label, options, onValueChange, hashOptions } = props;

  const openDropDown = () => setShowModal(true);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const onHandlerSelect = (item: string) => {
    const newValue = item === 'default' ? '' : item;
    onValueChange(newValue);
    setShowModal(false);
  };

  return (
    <View>
      <ValuePickerComponent
        selectedValue={selectedValue}
        data={options}
        hashOptions={hashOptions}
        isVisible={showModal}
        onSelect={onHandlerSelect}
      />
      <Text style={[GeneralStyles.fontSize18, styles.label]} bold>
        {label}
      </Text>
      <TouchableWithoutFeedback onPress={openDropDown}>
        <View style={[styles.select]}>
          <Text style={GeneralStyles.fontSize16}>
            {capitalizeFirst(hashOptions[value]?.label)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomSelectComponent;
