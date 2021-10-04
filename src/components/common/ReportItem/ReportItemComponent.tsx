import React from 'react';
import { View, Share, Linking } from 'react-native';

// Components
import Text from '../CustomText/CustomTextComponent';
import Button from '../CustomButton/CustomButtonComponent';

// Assets
import { GeneralStyles } from '../../../assets/';
import styles from './styles';

interface Props {
  title: string;
  link: string;
}

const ReportItem = (props: Props) => {
  const { title, link } = props;

  const onOpen = () => Linking.openURL(link);

  const onShare = () => Share.share({ message: link });

  return (
    <View style={styles.container}>
      <View style={[GeneralStyles.paddingV10, GeneralStyles.paddingL10]}>
        <Text bold style={[GeneralStyles.fontSize16, GeneralStyles.textCenter]}>
          {title}
        </Text>
      </View>
      <View style={styles.separator} />
      <View style={[GeneralStyles.flexRow, GeneralStyles.justifyBetween]}>
        <View style={[GeneralStyles.flex1]}>
          <Button
            buttonStyle={styles.completedBG}
            onPress={onOpen}
            title="ABRIR"
            titleStyle={[GeneralStyles.fontBold]}
          />
        </View>
        <View style={styles.buttonsSeparator} />
        <View style={[GeneralStyles.flex1]}>
          <Button
            buttonStyle={styles.completedBG}
            onPress={onShare}
            title="COMPARTIR"
            titleStyle={[GeneralStyles.fontBold]}
          />
        </View>
      </View>
    </View>
  );
};

export default ReportItem;
