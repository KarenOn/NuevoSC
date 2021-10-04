import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Input, InputProps, Text } from 'react-native-elements';

// Utils
import COUNTRIES from '../../../utils/countries.json';
import CountryClass from '../../../utils/country';

// Components
import FlagPickerComponent from './FlagPickerComponent';

// Assets
import styles from './styles';
import { GeneralStyles } from '../../../assets/';

interface Props extends InputProps {
  initialCountry: string;
  onChangeText: (value: string) => void;
}

export interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

const initialCountryState: Country = {
  name: '',
  flag: '',
  code: '',
  dial_code: '',
};

function PhoneNumberInputComponent(props: Props) {
  const { initialCountry, inputStyle, onChangeText, ...otherProps } = props;
  const [showModal, setShowModal] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState(initialCountryState);
  const input = useRef(null);

  useEffect(() => {
    const country = COUNTRIES.filter((obj) => obj.code === initialCountry);
    setDefaultCountry(country[0]);
  }, [initialCountry]);

  // ReactOtron.log(defaultFlag);

  const selectCountry = (country: Country) => {
    setDefaultCountry(country);
    onChangeText(`+${country.dial_code}`);
    onClosePicker();
  };

  const onOpenPicker = () => {
    // @ts-ignore
    input.current.blur();
    setShowModal(true);
  };

  const onClosePicker = () => {
    setShowModal(false);
  };

  const onHandlerChange = (value: string) => {
    const splitValue = value.split(' ').join('');
    onChangeText(splitValue);
    const dialCode = getDialCode(splitValue);

    if (dialCode) {
      const country = CountryClass.getCountryDataByDialCode(
        dialCode.split('+').join(''),
      );
      setDefaultCountry(country);
    } else {
      setDefaultCountry(initialCountryState);
    }
  };

  const isNumeric = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  const getDialCode = (number: string) => {
    let dialCode = '';
    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = '';
      // iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        // if char is number
        if (isNumeric(c)) {
          numericChars += c;
          // if current numericChars make a valid dial code
          // if (this.countryCodes[numericChars]) {
          if (CountryClass.getCountryCodes()[numericChars]) {
            // store the actual raw string (useful for matching later)
            dialCode = number.substr(0, i + 1);
          }
          // longest dial code is 4 chars
          if (numericChars.length === 4) {
            break;
          }
        }
      }
    }
    return dialCode;
  };

  return (
    <View>
      <FlagPickerComponent
        isVisible={showModal}
        onClose={onClosePicker}
        onSelectCountry={selectCountry}
      />
      <View style={styles.flagStyle}>
        <TouchableWithoutFeedback onPress={onOpenPicker}>
          <Text style={GeneralStyles.fontSize35}>{defaultCountry.flag}</Text>
        </TouchableWithoutFeedback>
      </View>
      <Input
        ref={input}
        keyboardType="phone-pad"
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={false}
        inputStyle={[inputStyle, styles.input]}
        onChangeText={onHandlerChange}
        {...otherProps}
      />
    </View>
  );
}

export default PhoneNumberInputComponent;
