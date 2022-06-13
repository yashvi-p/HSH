import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';

export default function CircleCheckBox({onPress}) {
  const [selected, setSelected] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setSelected(!selected);
          onPress();
        }}
        style={selected ? styles.circleSelectedView : styles.circleView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circleView: {
    width: wp(25),
    borderRadius: wp(25) / 2,
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
    borderRadius: wp(25) / 2,
    alignSelf: 'center',
  },
});
