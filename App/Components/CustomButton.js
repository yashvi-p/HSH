import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../Assets/Colors';
import {Fonts} from '../Assets/Fonts';
import {FontSizes} from '../Assets/FontSizes';
import {wp} from '../Helper/Responsive';

export default function CustomButton({
  onPress,
  title,
  buttonWidth,
  additionalStyle,
  additionalStyleText,
}) {
  return (
    <TouchableOpacity
      style={[styles.containerStyle, {width: buttonWidth}, additionalStyle]}
      onPress={onPress}>
      <Text style={[styles.txt, additionalStyleText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.RED_TXT,
    borderRadius: 10,
    elevation: 2,
    shadowColor: Colors.RED_TXT,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    margin: 5,
    height: wp(40),
  },
  txt: {
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_12,
    textAlign: 'center',
    margin: FontSizes.Size_12,
    // padding: 2,
    textAlignVertical: 'center',
  },
});
