import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {Colors} from '../Assets/Colors';

const LoaderView = () => {
  return (
    <Modal
      //animationType="fade"
      onRequestClose={() => console.log('Loader Modal Closed')}
      statusBarTranslucent={true}
      transparent={true}
      visible={true}>
      <View style={styles.contentStyle}>
        <DotIndicator color={Colors.RED_TXT} count={3} size={12} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.LOADER_BACK,
  },
});

export default LoaderView;
