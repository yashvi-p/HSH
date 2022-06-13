import {
  Alert,
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
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {Images} from '../../../Assets/Images';
import {wp} from '../../../Helper/Responsive';
import {Colors} from '../../../Assets/Colors';
import CardViewWrapper from '../../../Components/CardViewWrapper';
import CustomButton from '../../../Components/CustomButton';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {getLabelValue} from '../../../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import {setUserLoggedInData} from '../../../Redux/Actions/authAction';

const IS_LOGGEDIN = 1;
const isHost = 0;

export default function AccountScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userData = useSelector(state => state.authReducer.userData);
  const isUserLoggedIn = useSelector(state => state.authReducer.isUserLoggedIn);
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  useEffect(() => {
    console.log('isUserLoggedIn', isUserLoggedIn);
  }, [isUserLoggedIn]);

  const [ProfileList, setProfileList] = useState([
    {
      id: 1,
      label: `${GetLabel('become_a_host')}`,
      routeName: 'UserAuthFlow',
      flow_name: 'LoginScreen',
    },
    {
      id: 2,
      label: `${GetLabel('global_preferance')}`,
      routeName: 'AppStackFlow',
      flow_name: 'GlobalPreferences',
    },
    {
      id: 3,
      label: `${GetLabel('refer_a_host')}`,
      routeName: 'AppStackFlow',
      flow_name: 'ReferAHost',
    },
  ]);
  const [ProfileListAfterLogin, setProfileListAfterLogin] = useState([
    {
      id: 1,
      label: `Manage Listing`,
      routeName: 'AppStackFlow',
      flow_name: 'ManageListings',
    },
    {
      id: 2,
      label: `${GetLabel('payment_payouts')}`,
      routeName: 'AppStackFlow',
      flow_name: 'PaymentsPayouts',
    },
    {
      id: 3,
      label: `${GetLabel('notification_setting')}`,
      routeName: 'AppStackFlow',
      flow_name: 'NotificationSetting',
    },
    {
      id: 4,
      label: `${GetLabel('travel_for_work')}`,
      routeName: 'AppStackFlow',
      flow_name: 'TravelForWork',
    },
    {
      id: 5,
      label: `${GetLabel('global_preferance')}`,
      routeName: 'AppStackFlow',
      flow_name: 'GlobalPreferences',
    },
    {
      id: 6,
      label: `${GetLabel('refer_a_host')}`,
      routeName: 'AppStackFlow',
      flow_name: 'ReferAHost',
    },
  ]);
  const [ProfileListSecond, setProfileListSecond] = useState([
    {
      id: 1,
      label: `${GetLabel('need_help')}`,
      routeName: 'AccountStack',
      flow_name: 'CmsPage',
      routeParam: `${GetLabel('need_help')}`,
    },
    {
      id: 2,
      label: `${GetLabel('privacy')}`,
      routeName: 'AccountStack',
      flow_name: 'CmsPage',
      routeParam: `${GetLabel('privacy')}`,
    },
    {
      id: 3,
      label: `${GetLabel('terms_of_services')}`,
      routeName: 'AccountStack',
      flow_name: 'CmsPage',
      routeParam: `${GetLabel('terms_of_services')}`,
    },
  ]);

  const ProfileViewImage = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AccountStack', {screen: 'MyProfile'});
        }}
        style={styles.profileImageView}>
        <View style={styles.profileView}>
          <Image
            style={styles.circleImage}
            source={{
              uri: 'https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg',
            }}
          />
          <View
            style={{
              marginLeft: wp(16),
              marginRight: wp(16),
              alignSelf: 'center',
              flex: 1,
            }}>
            <Text style={styles.profileName}>
              {' '}
              {userData != undefined && userData.length > 0
                ? userData[0].full_name
                : ''}{' '}
            </Text>
            <Text
              style={[
                styles.profileName,
                {
                  color: Colors.GREY_80,
                  fontSize: FontSizes.Size_12,
                  marginTop: wp(4),
                },
              ]}>
              {' '}
              {GetLabel('edit_profile')}{' '}
            </Text>
          </View>
          <Image
            style={[
              styles.flatListImage,
              {
                borderRadius: 16,
                height: wp(14),
                tintColor: Colors.GREY_80,
                marginRight: wp(16),
                alignSelf: 'center',
              },
            ]}
            source={Images.RIGHT_ARROW}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const LoginView = () => {
    return (
      <View style={styles.loginCard}>
        <Image style={styles.imageTopImage} source={Images.APP_LOGO} />
        <Text style={styles.letsPackForUrTrip}>
          {' '}
          {GetLabel('lets_pack_for_your_trip')}
        </Text>
        <CustomButton
          additionalStyleText={{
            fontSize: FontSizes.Size_14,
          }}
          additionalStyle={{
            alignSelf: 'center',
            marginTop: wp(20),
            height: wp(46),
            marginLeft: wp(16),
            marginRight: wp(16),
            justifyContent: 'center',
          }}
          buttonWidth={wp(311)}
          onPress={() => {
            navigation.navigate('UserAuthFlow', {screen: 'LoginScreen'});
          }}
          title={GetLabel('login')}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserAuthFlow', {screen: 'Register'});
          }}>
          <Text style={styles.newHereTxt}>
            {GetLabel('new_here')}{' '}
            <Text
              style={[
                styles.newHereTxt,
                {color: Colors.GREY_TONE, marginLeft: wp(10)},
              ]}>
              {GetLabel('create_an_acount')}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
                navigation.navigate(item.routeName, {
                  screen: item.flow_name,
                });
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
              <View style={styles.lineViewList} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const ProfileViewSecond = data => {
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
                navigation.navigate(item.routeName, {
                  screen: item.flow_name,
                  params: {
                    routeParam: item.routeParam,
                  },
                });
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
              <View style={styles.lineViewList} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const ShowAlert = () => {
    return Alert.alert('HSH', GetLabel('are_you_sure_want_to_logout_app'), [
      {
        text: GetLabel('no'),
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: GetLabel('yes'),
        onPress: () => dispatch(setUserLoggedInData('0')),
      },
    ]);
  };

  const LogOutButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          ShowAlert();
        }}
        style={styles.logOutButton}>
        <Text style={styles.logoutTxt}>{GetLabel('logout')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {isUserLoggedIn == '1' ? ProfileViewImage() : LoginView()}
        {ProfileView(
          isUserLoggedIn == '1' ? ProfileListAfterLogin : ProfileList,
        )}
        {ProfileViewSecond(ProfileListSecond)}
        {isUserLoggedIn == '1' ? LogOutButton() : null}

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {
              screen: 'ManageListings',
            });
          }}>
          <Text> ManageListings</Text>
        </TouchableOpacity> */}
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
  titleTextStyle: {},
});
