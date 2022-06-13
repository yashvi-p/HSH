import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../Assets/Colors';
import {useState} from 'react';
import {wp} from '../Helper/Responsive';

export default function ActionSheet({children}) {
  const [alignment] = useState(new Animated.Value(0));

  const bringUpActionSheet = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  const actionSheetInterpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [-wp(812) / 1.8 + 90, 1],
  });

  const actionSheetStyle = {
    bottom: actionSheetInterpolate,
  };

  const gestureHandler = e => {
    if (e.nativeEvent.contentOffset.y > 0) bringUpActionSheet();
    else if (e.nativeEvent.contentOffset.y < 0) hideTheActionSheet();
  };

  const hideTheActionSheet = () => {
    Animated.timing(alignment, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, actionSheetStyle]}>
      <View>
        <ScrollView
          onScroll={e => gestureHandler(e)}
          style={styles.grabber}
          // showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: wp(812) / 1.8,
    width: wp(375) / 1.0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingLeft: wp(15),
    paddingRight: wp(15),
    elevation: 5,
    marginTop: 5,
  },
  grabber: {
    width: wp(343),
    borderTopColor: '#bbb',
    marginTop: wp(15),
    paddingBottom: wp(15),
  },
});
