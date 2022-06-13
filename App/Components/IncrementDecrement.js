import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../Assets/Images';
import {wp} from '../Helper/Responsive';
import {Fonts} from '../Assets/Fonts';
import {FontSizes} from '../Assets/FontSizes';
import {Colors} from '../Assets/Colors';

export default function IncrementDecrement({onPressed}) {
  const [count, setCount] = useState(10);

  return (
    <View style={styles.containerView}>
      <TouchableOpacity
        onPress={() => {
          setCount(count > 11 ? count - 11 : 10);
          onPressed(count > 11 ? count - 11 : 10);
        }}>
        <Image style={styles.incrementImage} source={Images.DECREMENT} />
      </TouchableOpacity>
      <Text style={styles.countTxt}>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          setCount(count + 10);
          onPressed(count + 10);
        }}>
        <Image style={styles.incrementImage} source={Images.INCREMENT} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  incrementImage: {
    width: wp(32),
    height: wp(32),
    alignSelf: 'center',
  },
  countTxt: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_15,
    color: Colors.GREY_TONE,
    textAlign: 'center',
    // height: wp(32),
    width: wp(32),
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});
