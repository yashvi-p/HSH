import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../Assets/Images';
import {wp} from '../Helper/Responsive';

export default function ToggleButton() {
  const [selected, setSelected] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setSelected(!selected)}>
        {selected ? (
          <Image
            style={styles.image}
            source={Images.TOGGLE_ON}
            resizeMode={'contain'}
          />
        ) : (
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={Images.TOGGLE_OFF}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp(40),
    height: wp(20),
  },
});
