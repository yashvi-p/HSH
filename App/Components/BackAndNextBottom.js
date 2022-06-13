import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../Assets/Colors';
import * as Progress from 'react-native-progress';
import {hp, wp} from '../Helper/Responsive';
import {FontSizes} from '../Assets/FontSizes';
import {Fonts} from '../Assets/Fonts';

export default function BackAndNextBottom({
  backPressed,
  nextPressed,
  progressValue,
  showNextVisible,
  labelText,
  viewWidth,
}) {
  const ProgressBar = () => {
    return (
      <View style={styles.progressView}>
        {/* <Text style={styles.stepTextStyle}>
          {this.state.selectionIndex}
          
        </Text> */}
        <Progress.Bar
          borderWidth={0}
          color={Colors.TEXT_GREY}
          unfilledColor={Colors.SEARCH_BORDER}
          progress={progressValue * 0.1}
          width={wp(375)}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {ProgressBar()}

      <View
        style={{
          backgroundColor: Colors.WHITE,
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 16,
        }}>
        <TouchableOpacity onPress={backPressed} style={styles.backView}>
          <Text style={styles.backTxt}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showNextVisible ? nextPressed : console.log('Disable')}
          style={[
            showNextVisible ? styles.backViewRed : styles.backView,
            {width: viewWidth != undefined ? viewWidth : wp(68)},
          ]}>
          <Text style={showNextVisible ? styles.backTxtRed : styles.backTxt}>
            {labelText ? labelText : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  progressView: {
    marginTop: hp(16),
    backgroundColor: Colors.TEXT_GREY,
  },
  stepTextStyle: {
    color: Colors.WHITE,
    fontSize: FontSizes.Size_10,
    fontFamily: Fonts.REGULAR,
    marginBottom: wp(8),
  },
  backView: {
    borderRadius: 10,
    borderColor: Colors.SEARCH_BORDER,
    borderWidth: 1,
    width: wp(68),
    height: wp(38),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  backTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
  },
  backViewRed: {
    borderRadius: 10,
    borderColor: Colors.RED_TXT,
    borderWidth: 1,
    width: wp(68),
    height: wp(38),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  backTxtRed: {
    color: Colors.RED_TXT,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
  },
});
