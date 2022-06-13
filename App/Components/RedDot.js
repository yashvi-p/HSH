import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';

export default function RedDot() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    height: wp(2),
    width: wp(2),
    backgroundColor: Colors.RED_TXT,
    borderRadius: wp(2) / 2,
    alignSelf: 'flex-end',
  },
});
