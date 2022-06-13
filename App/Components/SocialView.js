import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';
import {FontSizes} from '../Assets/FontSizes';
import {Fonts} from '../Assets/Fonts';

export default function SocialView({onPress, imageIcon, title}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainSocialView}>
      <Image
        style={styles.imageView}
        source={imageIcon}
        resizeMode={'contain'}
      />
      <Text style={styles.titleTxt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainSocialView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    padding: wp(10),
    width: wp(163),
    marginRight: wp(16),
    marginBottom: 2,
  },
  imageView: {
    height: wp(18),
    width: wp(18),
    // alignSelf: 'center',
    // resizeMode: 'contain',
  },
  titleTxt: {
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_15,
    fontFamily: Fonts.REGULAR,
    marginLeft: wp(10),
  },
});
