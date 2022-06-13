import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {Images} from '../../../Assets/Images';
import {wp} from '../../../Helper/Responsive';
import {Colors} from '../../../Assets/Colors';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {getLabelValue} from '../../../Helper/database';
import {useSelector} from 'react-redux';
import {Header} from '@react-navigation/stack';
import CustomButton from '../../../Components/CustomButton';

export default function ReferAHost() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const CustomHeader = props => {
    return (
      <View style={{backgroundColor: Colors.WHITE}}>
        <Header {...props} />
      </View>
    );
  };

  navigation.setOptions({
    headerShown: true,
    header: props => <CustomHeader {...props} />,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: Fonts.BOLD,
      fontSize: FontSizes.Size_16,
      color: Colors.SEARCH_TEXT,
    },
    headerLeft: props => (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            height: '30%',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Images.LEFT_ARROW} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Guest referrals',
    headerRight: props => <View></View>,
  });
  const GuestCardView = () => {
    return (
      <View style={styles.GiftCard}>
        <Text style={styles.textStyle}>{GetLabel('total_earning')}</Text>

        <View style={styles.buttonViewStyle}>
          <View style={styles.rowViewStyle}>
            <Text style={styles.poundTextStyle}>{'£'}</Text>
            <Text style={styles.buttonTextStyle}>{'18'}</Text>
          </View>
        </View>
        <Text style={styles.earning_des_txt}>
          {GetLabel('earning_description')}
        </Text>
        <View style={styles.marginTopView} />
      </View>
    );
  };
  const TextInputValuesView = () => {
    return (
      <View>
        <Text style={styles.linkText}>www.homeswisshome.com/r/sarah434</Text>
      </View>
    );
  };
  const ContinueButton = () => {
    return (
      <CustomButton
        additionalStyleText={{
          fontSize: FontSizes.Size_14,
          fontFamily: Fonts.BOLD,
          textTransform: 'uppercase',
        }}
        additionalStyle={{
          alignSelf: 'center',
          marginTop: wp(20),
          height: wp(46),

          justifyContent: 'center',
          marginBottom: wp(20),
        }}
        buttonWidth={wp(343)}
        onPress={() => {
          navigation.goBack();
        }}
        title={GetLabel('share_link')}
      />
    );
  };
  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {GuestCardView()}
        <View style={styles.lineStyle} />
        <Text style={styles.haveYouTextStyle}>
          {GetLabel('share_the_referral_link')}
        </Text>
        <Text style={styles.earning_des_txt}>
          {GetLabel('this_is_your_personal_referral_link')}
        </Text>
        <View>
          {TextInputValuesView()}
          {ContinueButton()}
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
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  GiftCard: {
    marginTop: wp(24),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    shadowColor: Colors.CARD_BORDER_COLOR,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 16,
    padding: wp(10),
    marginLeft: wp(16),
    marginRight: wp(16),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    lineHeight: 23,
    marginTop: wp(8),
  },
  buttonViewStyle: {
    backgroundColor: Colors.WHITE,
    marginTop: wp(16),
    paddingHorizontal: wp(99),
    paddingVertical: wp(16),
    height: wp(62),
    width: wp(256),
    borderColor: Colors.SEARCH_BORDER,
    borderWidth: wp(1),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  marginTopView: {
    marginTop: wp(16),
  },
  lineStyle: {
    height: 1,
    width: wp(343),
    backgroundColor: Colors.SEARCH_BORDER,
    marginTop: wp(24),
    marginHorizontal: wp(16),
  },
  rowViewStyle: {
    flexDirection: 'row',
  },
  haveYouTextStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    lineHeight: 23,
    marginTop: wp(24),
    marginLeft: wp(16),
  },
  poundTextStyle: {
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  earning_des_txt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_13,
    margin: wp(16),
    marginLeft: wp(16),
    marginRight: wp(16),
    lineHeight: 24,
  },
  linkText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    borderRadius: 8,
    marginLeft: wp(16),
    marginRight: wp(16),
    padding: wp(14),
    marginBottom: wp(20),
  },
});
