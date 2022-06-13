import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';
import {Images} from '../Assets/Images';
import {FontSizes} from '../Assets/FontSizes';
import {Fonts} from '../Assets/Fonts';

export default function SearchTextInput({
  margin,
  placeholderText,
  searchClick,
}) {
  return (
    <View style={[styles.textInputView, {margin: margin}]}>
      <Image style={styles.searchImage} source={Images.SEARCH_ICON} />
      <TextInput
        placeholderTextColor={Colors.SEARCH_TEXT}
        style={styles.textInputStyle}
        placeholder={placeholderText}
        onTouchStart={searchClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 0,
    marginLeft: 10,
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
  },
  textInputView: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.SEARCH_BACKGROUND,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    // height: wp(50),
  },
  searchImage: {
    width: wp(16),
    height: wp(16),
  },
});
