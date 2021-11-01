import React from "react";
import { View, StyleSheet, ToastAndroid,TouchableOpacityBase } from "react-native";

const NotificationComponent = (message:string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // const showToastWithGravity = () => {
  //   ToastAndroid.showWithGravity(
  //     "All Your Base Are Belong To Us",
  //     ToastAndroid.SHORT,
  //     ToastAndroid.CENTER
  //   );
  // };

//   const showToastWithGravityAndOffset = () => {
//     ToastAndroid.showWithGravityAndOffset(
//       "A wild toast appeared!",
//       ToastAndroid.LONG,
//       ToastAndroid.BOTTOM,
//       25,
//       50
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Toggle Toast" onPress={() => showToast({})} />
//       <Button
//         title="Toggle Toast With Gravity"
//         onPress={() => showToastWithGravity()}
//       />
//       {/* <Button
//         title="Toggle Toast With Gravity & Offset"
//         onPress={() => showToastWithGravityAndOffset()}
//       /> */}
//     </View>
//   );
// };



export default NotificationComponent;