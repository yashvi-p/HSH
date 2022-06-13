import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../Assets/Colors';
import {Fonts} from '../Assets/Fonts';
import {FontSizes} from '../Assets/FontSizes';
import {wp} from '../Helper/Responsive';

export default function ErrorMessage({error, visible, errorStyle}) {
  //   if (!visible || !error) {
  //     return null;
  //   }
  return (
    <View>
      <Text style={[styles.error, errorStyle]}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: Colors.RED_TXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_12,
    alignSelf: 'flex-end',
    marginRight: wp(5),
    marginTop: wp(2),
  },
});
