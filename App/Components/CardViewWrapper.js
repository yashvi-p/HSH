import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Assets/Colors';

export default function CardViewWrapper({children, padding, width}) {
  return <View style={[styles.cardView, {padding: padding}]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.CARD_BORDER_COLOR,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.CARD_BORDER_COLOR,
    borderRadius: 16,
    elevation: 2,
  },
});
