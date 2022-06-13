import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';
import {FontSizes} from '../Assets/FontSizes';
import {Fonts} from '../Assets/Fonts';
import {Images} from '../Assets/Images';

export default function AppTextInput({
  labelText,
  textInputValue,
  placeHolderText,
  additionalStyleView,
  additionalStyleText,
  onChangeText,
  isPlaceHolderTextInput,
  onPressCountryRegion,
  value,
  keyboardType,
  isLabelTextInput,
  isSecureEntry,
}) {
  return (
    <View>
      {isPlaceHolderTextInput ? (
        <View style={[styles.txtInput, additionalStyleView]}>
          <TextInput
            secureTextEntry={isSecureEntry ? true : false}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onChangeText={onChangeText}
            style={[styles.textInputTxt, additionalStyleText]}
            placeholderTextColor={Colors.SEARCH_TEXT}
            value={value}
            placeholder={placeHolderText}>
            {textInputValue}
          </TextInput>
        </View>
      ) : isLabelTextInput ? (
        <TouchableOpacity style={[additionalStyleView, {paddingTop: 10}]}>
          <Text style={styles.textWithBorder}>{labelText}</Text>
          <View style={[styles.inputWithBorder, {height: wp(50)}]}>
            <TextInput
              keyboardType={keyboardType ? keyboardType : 'default'}
              onChangeText={onChangeText}
              style={[
                styles.textInputTxt,
                additionalStyleText,
                {alignSelf: 'flex-start', flex: 1, paddingTop: wp(13)},
              ]}
              placeholderTextColor={Colors.SEARCH_TEXT}
              value={value}
              placeholder={placeHolderText}>
              {textInputValue}
            </TextInput>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPressCountryRegion}
          style={[
            additionalStyleView,
            {
              paddingTop: 10,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={styles.textWithBorder}>{labelText}</Text>
          <View style={[styles.inputWithBorder, {height: wp(50)}]}>
            <Text
              onChangeText={onChangeText}
              style={[
                styles.textInputTxt,
                additionalStyleText,
                {flex: 1, paddingTop: wp(13)},
              ]}
              placeholderTextColor={Colors.SEARCH_TEXT}
              placeholder={placeHolderText}>
              {textInputValue == '' ? placeHolderText : textInputValue}
            </Text>
            <Image style={styles.imageView} source={Images.DOWN_ARROW} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  txtInput: {
    width: wp(343),
    height: wp(50),
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputTxt: {
    paddingLeft: wp(16),
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
    color: Colors.SEARCH_TEXT,
    alignSelf: 'flex-start',
  },
  inputWithBorder: {
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    flexDirection: 'row',
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(50),
  },
  textWithBorder: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 100,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  imageView: {
    width: wp(14),
    height: wp(8),
    alignSelf: 'center',
    marginRight: wp(16),
  },
});
