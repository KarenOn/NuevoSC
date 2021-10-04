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

// Components
import Text from '../CustomText/CustomTextComponent';

// Utils
import { capitalizeFirst } from '../../../utils/helpers';

interface Props {
  isVisible: boolean;
  onSelect: (value: string) => void;
  data: Array<string>;
  selectedValue: string;
  hashOptions: any;
}

const getKeyExtractor = (item: string) => `${item}`;

const ValuePickerComponent = (props: Props) => {
  const { isVisible, onSelect, data, selectedValue, hashOptions } = props;

  const renderItem: ListRenderItem<string> = ({ item }) => {
    const isSelected =
      item === selectedValue ||
      (item.toString() === 'default' && selectedValue === '');

    return (
      <TouchableWithoutFeedback onPress={() => onSelect(item)}>
        <View style={[styles.listItem, isSelected ? styles.itemSelected : {}]}>
          <Text bold={isSelected} style={GeneralStyles.fontSize16}>
            {capitalizeFirst(hashOptions[item].label)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const RenderChildren = () => (
    <>
      <View>
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={getKeyExtractor}
          renderItem={renderItem}
        />
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

export default ValuePickerComponent;
