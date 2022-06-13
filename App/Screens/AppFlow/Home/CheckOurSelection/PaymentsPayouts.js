import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import {Colors} from '../../../../Assets/Colors';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {getLabelValue} from '../../../../Helper/database';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {Header} from '@react-navigation/stack';
export default function PaymentsPayouts() {
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
      fontSize: FontSizes.Size_18,
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
    headerTitle: 'Payments & payouts',
    headerRight: props => <View></View>,
  });
  const [ProfileList, setProfileList] = useState([
    {
      id: 1,
      label: `${GetLabel('payout_methods')}`,
      routeName: 'AppStackFlow',
      flow_name: 'PaymentMethods',
    },
    {
      id: 2,
      label: `${GetLabel('gift_card')}`,
      routeName: 'AppStackFlow',
      flow_name: 'GiftCard',
    },
    {
      id: 3,
      label: `${GetLabel('coupons')}`,
      routeName: 'AppStackFlow',
      flow_name: 'Coupons',
    },
  ]);

  const [ProfileListSecond, setProfileListSecond] = useState([
    {
      id: 1,
      label: `${GetLabel('payout_methods')}`,
      routeName: 'AppStackFlow',
      flow_name: 'payoutMethods',
    },
    {
      id: 2,
      label: `${GetLabel('taxes')}`,
      routeName: 'AppStackFlow',
      flow_name: 'Taxes',
    },
    {
      id: 3,
      label: `${GetLabel('guest_contributors')}`,
      routeName: 'AppStackFlow',
      flow_name: 'GuestContributors',
    },
  ]);

  const ProfileView = data => {
    return (
      <View style={styles.profileCard}>
        <FlatList
          style={{
            alignSelf: 'center',
          }}
          data={data}
          keyExtractor={(item, index) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                if (item.id == 1) {
                  navigation.navigate('PaymentMethods', {
                    fromBookingDetail: false,
                  });
                } else {
                  navigation.navigate(item.routeName, {
                    screen: item.flow_name,
                  });
                }
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.flatListTxt,
                    {textAlign: 'left', width: wp(310)},
                  ]}>
                  {item.label}
                </Text>
                <Image
                  style={[
                    styles.flatListImage,
                    {
                      borderRadius: 16,
                      height: wp(14),
                      tintColor: Colors.GREY_80,
                    },
                  ]}
                  source={Images.RIGHT_ARROW}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.titleTextStyle}>{GetLabel('for_traveller')}</Text>

        {ProfileView(ProfileList)}
        <View style={styles.drawline} />
        <Text style={styles.titleTextStyle}>{GetLabel('for_host')}</Text>
        {ProfileView(ProfileListSecond)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  loginCard: {
    marginTop: wp(24),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    shadowColor: Colors.CARD_BORDER_COLOR,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    borderRadius: 16,
    padding: wp(10),
    marginLeft: wp(16),
    marginRight: wp(16),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  imageTopImage: {
    width: wp(30),
    height: wp(38),
  },
  letsPackForUrTrip: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    marginTop: wp(16),
  },
  newHereTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    padding: 15,
  },
  flatListImage: {
    width: wp(14),
    height: wp(14),
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  flatListTxt: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
    padding: wp(13),
    paddingLeft: 16,
    color: Colors.GREY_80,
  },
  flatListTxt1: {
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.MEDIUM,
    paddingBottom: 16,
    paddingLeft: 16,
    color: Colors.SEARCH_TEXT,
  },
  profileCard: {
    marginTop: wp(24),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.CARD_BORDER_COLOR,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    borderRadius: 16,
    marginLeft: wp(16),
    marginRight: wp(16),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineViewList: {
    height: 1,
    width: wp(343),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  profileView: {
    flexDirection: 'row',
    height: wp(90),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  profileImageView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    marginTop: wp(20),
    alignContent: 'center',
  },
  circleImage: {
    width: wp(56),
    height: wp(56),
    alignSelf: 'center',
    borderRadius: wp(56) / 2,
    marginLeft: wp(10),
    marginRight: wp(10),
  },
  profileName: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_16,
  },
  logOutButton: {
    width: wp(343),
    marginLeft: wp(16),
    marginRight: wp(16),
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    height: wp(45),
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: wp(20),
    marginBottom: wp(10),
  },
  logoutTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: FontSizes.Size_12,
    textAlign: 'center',
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  titleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginHorizontal: wp(16),
    marginTop: wp(20),
  },
  drawline: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
    marginTop: wp(20),
  },
});
