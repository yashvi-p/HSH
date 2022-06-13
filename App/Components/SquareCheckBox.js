import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';
import {Images} from '../Assets/Images';

export default function SquareCheckBox() {
  const [selected, setSelected] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setSelected(!selected)}>
        {selected ? (
          <Image style={styles.image} source={Images.RED_CHECKBOX} />
        ) : (
          <Image style={styles.image} source={Images.CHECKBOX_UNSELECTED} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  circleView: {
    width: wp(25),
    borderRadius: 3,
    height: wp(25),
    borderWidth: 2,
    borderColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
  },
  circleSelectedView: {
    width: wp(25),
    height: wp(25),
    borderWidth: 4,
    borderColor: Colors.RED_TXT,
    borderRadius: 3,
    alignSelf: 'center',
  },
  image: {
    width: wp(25),
    height: wp(25),
    alignSelf: 'center',
  },
});
