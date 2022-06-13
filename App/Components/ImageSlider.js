import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp} from '../Helper/Responsive';
import {SliderBox} from 'react-native-image-slider-box';
import {Colors} from '../Assets/Colors';

export default function ImageSlider({images}) {
  return (
    <SliderBox
      sliderBoxHeight={wp(275)}
      currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
      onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      images={images}
      imageLoadingColor={Colors.RED_TXT}
      activeOpacity={0.5}
      dotColor={Colors.RED_TXT}
      inactiveDotColor={Colors.WHITE}
    />
  );
}

const styles = StyleSheet.create({});
