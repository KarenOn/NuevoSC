import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { Overlay } from 'react-native-elements';

// Assets
import { GeneralStyles } from '../../../assets';
import styles from './styles';

// Utils
import CountriesData from '../../../utils/countries.json';

// Constants
import { TextConstants } from '../../../constants/textConstants';

// Components
import { Country } from './PhoneNumberInputComponent';
import Text from '../CustomText/CustomTextComponent';
import Button from '../CustomButton/CustomButtonComponent';

interface Props {
  isVisible: boolean;
  onSelectCountry: (country: Country) => void;
  onClose: () => void;
}

const getKeyExtractor = (item: Country) => `${item.code}`;

const FlagPickerComponent = (props: Props) => {
  const { isVisible, onSelectCountry, onClose } = props;

  const renderItem: ListRenderItem<Country> = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => onSelectCountry(item)}>
      <View style={styles.listItem}>
        <Text style={GeneralStyles.fontSize18}>
          {`${item.flag} ${item.name}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const RenderChildren = () => (
    <>
      <View style={[GeneralStyles.flex7]}>
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          data={CountriesData}
          keyExtractor={getKeyExtractor}
          renderItem={renderItem}
        />
      </View>
      <View style={GeneralStyles.marginT15}>
        <Button title={TextConstants.CANCEL} onPress={onClose} />
      </View>
    </>
  );

  return (
    <Overlay
      overlayStyle={styles.modalContainer}
      children={<RenderChildren />}
      isVisible={isVisible}
    />
  );
};

export default FlagPickerComponent;
