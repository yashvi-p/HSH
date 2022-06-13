import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../Assets/Images';
import {wp} from '../Helper/Responsive';
import {Colors} from '../Assets/Colors';

export default function CheckImage({onPressed}) {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(true), onPressed();
      }}>
      {selected ? (
        <Image style={styles.imageStyle} source={Images.CHECK_CIRCLE} />
      ) : (
        <Image style={styles.imageStyle} source={Images.UNCHECK_CIRCLE} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageStyle: {
    height: wp(24),
    width: wp(24),
    resizeMode: 'contain',
  },
  checkModalViewStyle: {
    height: wp(58),
    marginTop: wp(16),
    marginHorizontal: wp(16),
    borderColor: Colors.SEARCH_BORDER,
    padding: wp(16),
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  unCheckModalViewStyle: {
    height: wp(58),
    marginTop: wp(16),
    marginHorizontal: wp(16),
    borderColor: Colors.SEARCH_BORDER,
    padding: wp(16),
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
