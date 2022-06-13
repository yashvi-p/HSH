import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {wp} from '../../../../Helper/Responsive';
import {Colors} from '../../../../Assets/Colors';
import {Images} from '../../../../Assets/Images';
import {CustomStatusBar} from '../../../../Components/AppStatusBar';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import CustomButton from '../../../../Components/CustomButton';
import {useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';

export default function GetStarted() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const CrossIconView = () => {
    return (
      <View>
        <Image style={styles.maskGroupeImage} source={Images.MASK_GROUP} />
        <TouchableOpacity
          style={styles.crossIconView}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.crossIcon} source={Images.GREY_CROSS} />
        </TouchableOpacity>
      </View>
    );
  };
  const HomeSwissHomeView = () => {
    return (
      <View style={styles.homeSwissHomeView}>
        <Image style={styles.imageTopImage} source={Images.APP_LOGO} />
        <Text style={styles.listTxt}>{GetLabel('list_your_place_on')}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.homeTxt}>{GetLabel('home')}</Text>
          <Text
            style={[
              styles.homeTxt,
              {color: Colors.RED_TXT, paddingLeft: wp(8)},
            ]}>
            {GetLabel('swiss')}
          </Text>
          <Text style={[styles.homeTxt, {paddingLeft: wp(8)}]}>
            {GetLabel('home')}
          </Text>
        </View>
        <Text style={styles.becomeHostTxt}>
          {GetLabel('become_a_host_in_just_10_steps')}{' '}
        </Text>
      </View>
    );
  };

  const ButtonView = () => {
    return (
      <CustomButton
        additionalStyleText={{fontFamily: Fonts.SEMIBOLD}}
        additionalStyle={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
        buttonWidth={wp(343)}
        onPress={() => {
          navigation.navigate('BecomeHostStack', {
            screen: 'QuestionAndAnswerStep',
          });
        }}
        title={GetLabel('here_we_go')}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{flex: 1}}>
          {CrossIconView()}
          {HomeSwissHomeView()}
          {ButtonView()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageTopImage: {
    width: wp(40),
    height: wp(52),
    resizeMode: 'contain',
  },

  maskGroupeImage: {
    height: wp(400),
    width: wp(392),
  },
  crossIcon: {
    width: wp(28),
    height: wp(28),
  },
  crossIconView: {
    position: 'absolute',
    marginTop: Platform.OS === 'android' ? wp(25) : wp(45),
    marginLeft: wp(20),
  },
  homeSwissHomeView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(30),
  },
  listTxt: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_22,
    color: Colors.GREY_TONE,
    lineHeight: 24,
    marginTop: wp(24),
  },
  homeTxt: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_30,
    color: Colors.BLACK_COLOR,
    lineHeight: 40,
    marginTop: wp(8),
  },
  becomeHostTxt: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    color: Colors.SEARCH_TEXT,
    lineHeight: 40,
    marginTop: wp(24),
  },
  backView: {
    bottom: 0,
    position: 'absolute',
    // marginBottom:wp(20),
    // alignSelf:'center'
  },
});
