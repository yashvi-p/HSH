import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Fonts} from '../../Assets/Fonts';
import {Colors} from '../../Assets/Colors';
import {WhiteStatusBar} from '../../Components/AppStatusBar';
import {Header} from '@react-navigation/stack';
import {FontSizes} from '../../Assets/FontSizes';
import {Images} from '../../Assets/Images';
import {wp} from '../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../Helper/database';
import AppTextInput from '../../Components/AppTextInput';
import CustomButton from '../../Components/CustomButton';
import SocialView from '../../Components/SocialView';
import CountryPicker from 'react-native-country-picker-modal';
import {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../Components/ErrorMessage';
import {setUserData, setUserLoggedInData} from '../../Redux/Actions/authAction';
import Modal from 'react-native-modal';
import CardViewWrapper from '../../Components/CardViewWrapper';
import CheckImage from '../../Components/CheckImage';
import CountryCodes from '../../Helper/CountryCodes';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import LoaderView from '../../Components/LoaderView';
import axios from 'axios';
import {ApiConfigFormData} from '../../Helper/ApiConfig';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../Components/ToastMessage';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default function LoginScreen() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const deviceToken = useSelector(state => state.authReducer.deviceToken);

  const [isLoading, setIsLoading] = useState(false);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required(GetLabel('password_is_required')),
    phoneNumber: Yup.string()
      .trim()
      .required(GetLabel('phone_number_is_required')),
  });

  useEffect(() => {
    GoogleSignin.configure();

    checkSignedIn();
  }, []);

  const checkSignedIn = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
    } catch (error) {
      await GoogleSignin.signOut();
      console.log(error);
    }
  };

  const CallSocialLoginApiGoogle = userInfo => {
    console.log('userInfo', userInfo.user.id);

    // dispatch(setUserLoggedInData('1'));
    // navigation.navigate('PhoneVerification');
    var data = new FormData();
    data.append('social_id', `${userInfo.user.id}`);
    data.append('login_type', `3`); //1= normal,2=facebook,3=google
    data.append('firebase_token', `${deviceToken}`);
    data.append('full_name', `${userInfo.user.name}`);
    data.append('email', `${userInfo.user.email}`);

    axios(ApiConfigFormData(data, 'social_login'))
      .then(function (response) {
        console.log('response---->', response.data[0].result);
        if (response.data[0].code == '1') {
          dispatch(setUserLoggedInData('1'));
          dispatch(setUserData(response.data[0].result));
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('AppFlow');
            Toast.show(
              `${GetLabel('you_have_logged_in_successfully')}`,
              toastMessageConfig,
            );
          }, 1000);
        } else {
          console.log('response.data[0]', response.data[0]);
          setIsLoading(false);
          Toast.show(
            `${GetLabel(response.data[0].message)}`,
            toastMessageConfig,
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const CallSocialLoginApiFacebook = userInfo => {
    setIsLoading(true);

    console.log('userInfo', userInfo);

    // dispatch(setUserLoggedInData('1'));
    // navigation.navigate('PhoneVerification');
    var data = new FormData();
    data.append('social_id', `${userInfo.id}`);
    data.append('login_type', `2`); //1= normal,2=facebook,3=google
    data.append('firebase_token', `${deviceToken}`);
    data.append('full_name', `${userInfo.name}`);
    data.append('email', `${userInfo.email}`);

    axios(ApiConfigFormData(data, 'social_login'))
      .then(function (response) {
        console.log('response---->', response.data[0].result);
        if (response.data[0].code == '1') {
          dispatch(setUserData(response.data[0].result));
          dispatch(setUserLoggedInData('1'));

          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('AppFlow');
            Toast.show(
              `${GetLabel('you_have_logged_in_successfully')}`,
              toastMessageConfig,
            );
          }, 1000);
        } else {
          console.log('response.data[0]', response.data[0]);
          setIsLoading(false);
          Toast.show(
            `${GetLabel(response.data[0].message)}`,
            toastMessageConfig,
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const signIn = async () => {
    checkSignedIn();
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        CallSocialLoginApiGoogle(userInfo);
      }
      console.log(userInfo, 'userInfo.user.email', userInfo.user.email);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.error(error, '& Error Code', error.code);
      }
    }
  };

  const FacebookLogin = () => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Cancelled', result);
        } else {
          AccessToken.getCurrentAccessToken().then(token => {
            let accessToken = token.accessToken;

            const responseInfoCallback = async (error, result) => {
              if (error) {
                console.log('error from facebook', error);
                alert('Error fetching data: ' + error.toString());
              } else {
                console.log('Response from facebook', result.id);
                CallSocialLoginApiFacebook(result);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string:
                      'email,name,first_name,middle_name,last_name,picture.type(large)',
                  },
                },
              },
              responseInfoCallback,
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        //'Something has gone wrong. Please try again.'
        console.log('error', error);
      },
    );
  };

  const dispatch = useDispatch();
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [countryItemModal, setCountyItemModal] = useState(false);

  const countryData = CountryCodes;

  const [countryCode, setCountryCode] = useState('FR');
  const [countryDataArray, setCountryDataArray] = useState(countryData);

  const [country, setCountry] = useState(null);
  const [withFilter, setWithFilter] = useState(true);

  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
    setOpenCountryModal(false);

    console.log('On select country--->', country);
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
      fontFamily: Fonts.MEDIUM,
      fontSize: FontSizes.Size_15,
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
          <Image
            source={Images.CROSS_ICON}
            style={{
              height: wp(14),
              width: wp(14),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: wp(2),
              marginLeft: wp(16),
            }}
          />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: '',
    headerRight: props => <View></View>,
  });

  const SearchFilterFunction = text => {
    const arr = countryDataArray;
    const newData = arr.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setCountryDataArray(newData);
  };

  const TopImageView = () => {
    return (
      <View style={styles.topImageView}>
        <Image style={styles.imageTopImage} source={Images.APP_LOGO} />
        <Text style={styles.txtTopImage}>{GetLabel('login')}</Text>
      </View>
    );
  };

  const TextInputValuesView = (
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
  ) => {
    return (
      <View style={styles.textInputValuesView}>
        <AppTextInput
          additionalStyleView={{marginTop: wp(20)}}
          isPlaceHolderTextInput
          placeHolderText={`${GetLabel('phone_number')} / ${GetLabel('email')}`}
          value={values.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          // keyboardType={'numeric'}
        />
        {!touched.phoneNumber || !errors.phoneNumber ? null : (
          <ErrorMessage error={errors.phoneNumber} />
        )}

        <AppTextInput
          additionalStyleView={{marginTop: wp(20)}}
          isPlaceHolderTextInput
          placeHolderText={GetLabel('password')}
          value={values.password}
          onChangeText={handleChange('password')}
          isSecureEntry={true}
        />
        {!touched.password || !errors.password ? null : (
          <ErrorMessage error={errors.password} />
        )}
      </View>
    );
  };

  const ContinueButton = handleSubmit => {
    return (
      <CustomButton
        additionalStyleText={{
          fontSize: FontSizes.Size_14,
        }}
        additionalStyle={{
          alignSelf: 'center',
          marginTop: wp(20),
          height: wp(46),

          justifyContent: 'center',
        }}
        buttonWidth={wp(343)}
        onPress={handleSubmit}
        title={GetLabel('continue')}
      />
    );
  };

  const SocialMediaView = () => {
    return (
      <View style={styles.mainSocialView}>
        <View style={styles.socialMediaMainView}>
          <View style={styles.lineViewSocial} />
          <Text style={styles.socialDummyText}>
            {GetLabel('or_use_one_of_these_options')}
          </Text>
          <View style={styles.lineViewSocial} />
        </View>
        <View style={{flexDirection: 'row', marginTop: wp(20)}}>
          <SocialView
            imageIcon={Images.FACEBOOK_LOGO}
            onPress={() => {
              FacebookLogin();
            }}
            title={GetLabel('facebook')}
          />
          <SocialView
            imageIcon={Images.GOOGLE_LOGO}
            onPress={() => {
              signIn();
            }}
            title={GetLabel('google')}
          />
        </View>
        <Text style={styles.agreedTxt}>
          {GetLabel('by_log_in_or_sign_up_you_re_agreed_to_our')}
          <Text
            style={{
              color: Colors.GREY_TONE,
              fontFamily: Fonts.REGULAR,
              fontSize: FontSizes.Size_14,
              textAlign: 'center',
            }}>
            {GetLabel('terms_conditions_privacy_policy')}
          </Text>
        </Text>
      </View>
    );
  };

  const CountryModal = data => {
    return (
      <View style={{height: '70%'}}>
        <Modal
          animationType="slide"
          onBackdropPress={() => {
            setCountyItemModal(!countryItemModal);
          }}
          closeOnClick={true}
          transparent={true}
          isVisible={countryItemModal}
          style={{justifyContent: 'flex-end', margin: 0, height: '80%'}}>
          <View>
            <CardViewWrapper padding={5}>
              <View style={styles.modalTopLineStyle} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.modalTitleTextStyle}>Country</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCountyItemModal(false);
                  }}
                  style={{marginTop: 5}}>
                  <Image
                    source={Images.CROSS_ICON}
                    style={styles.closeImageStyle}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholderTextColor={Colors.SEARCH_TEXT}
                style={styles.textInputStyle}
                placeholder={GetLabel('search')}
                onChangeText={data => {
                  SearchFilterFunction(data);
                }}
              />
              <FlatList
                style={{height: '70%', marginTop: wp(20)}}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={data => data.name}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCountyItemModal(false);
                      setCountry(item);
                    }}>
                    <View>
                      <View style={styles.ModalViewStyle}>
                        <Text style={styles.modalTextStyle}>{item.name}</Text>
                        <View style={styles.verticalLineStyle} />
                        <Text style={styles.modalTextStyle}>{item.code}</Text>
                        <CheckImage onPressed={() => {}} />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.modalBottomLineStyle} />
            </CardViewWrapper>
          </View>
        </Modal>
      </View>
    );
  };

  const LoginApiCall = (values, resetForm) => {
    setIsLoading(true);

    var data = new FormData();
    data.append('mobile_email', `${values.phoneNumber}`);
    data.append('password', `${values.password}`);

    axios(ApiConfigFormData(data, 'login'))
      .then(function (response) {
        if (response.data[0].code == '1') {
          setIsLoading(false);
          if (response.data[0].result[0].is_verified == 1) {
            dispatch(setUserLoggedInData('1'));
            dispatch(setUserData(response.data[0].result));

            setTimeout(() => {
              resetForm({values: ''});
              setIsLoading(false);
              navigation.navigate('AppFlow');
              Toast.show(
                `${GetLabel('you_have_logged_in_successfully')}`,
                toastMessageConfig,
              );
            }, 1000);
          } else {
            Toast.show(
              `${GetLabel('otp_has_not_been_verified_into_this_account')}`,
              toastMessageConfig,
            );
          }
        } else {
          console.log('response.data[0]', response.data[0]);
          setIsLoading(false);
          Toast.show(
            `${GetLabel(response.data[0].message)}`,
            toastMessageConfig,
          );
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
        {isLoading == true ? <LoaderView /> : null}

        <Formik
          initialValues={{
            phoneNumber: '',
            password: '',
          }}
          onSubmit={(values, {resetForm}) => {
            LoginApiCall(values, resetForm);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            values,
          }) => (
            <>
              {TopImageView()}
              {TextInputValuesView(
                handleChange,
                handleSubmit,
                touched,
                errors,
                values,
              )}
              {ContinueButton(handleSubmit)}
              {SocialMediaView()}
              {/* {CallCountryModal()} */}
              {CountryModal(countryDataArray)}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  agreedTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    textAlign: 'center',
    marginTop: FontSizes.Size_24,
  },
  socialDummyText: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  topImageView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp(30),
  },
  imageTopImage: {
    width: wp(30),
    height: wp(38),
  },
  txtTopImage: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    marginTop: wp(16),
    lineHeight: 23,
    color: Colors.GREY_TONE,
  },
  textInputValuesView: {
    marginTop: wp(30),
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  lineViewSocial: {
    height: 1.5,
    backgroundColor: Colors.SEARCH_BACKGROUND,
    flex: 1,
  },
  socialMediaMainView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: wp(20),
  },
  mainSocialView: {
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  modalTopLineStyle: {
    backgroundColor: Colors.GREY_80,
    height: wp(4),
    width: wp(30),
    borderRadius: 30,
    opacity: 0.5,
    marginTop: wp(16),
    alignSelf: 'center',
  },
  modalTitleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginTop: wp(30),
    marginLeft: wp(16),
  },
  closeImageStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    marginLeft: wp(20),
    tintColor: Colors.GREY_80,
    marginRight: wp(16),
    marginTop: wp(8),
  },
  ModalViewStyle: {
    height: wp(58),
    marginTop: wp(16),
    marginHorizontal: wp(16),
    borderColor: Colors.SEARCH_BORDER,
    padding: wp(16),
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 26,
    maxWidth: wp(100),
  },
  verticalLineStyle: {
    height: wp(16),
    width: wp(1),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  modalBottomLineStyle: {
    backgroundColor: Colors.NOTIFICATION_BG,
    height: wp(5),
    width: wp(134),
    borderRadius: 10,
    opacity: 0.5,
    bottom: wp(8),
    marginTop: wp(20),
    alignSelf: 'center',
  },
  textInputStyle: {
    padding: 0,
    marginLeft: 18,
    marginRight: 18,
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    height: wp(45),
    paddingLeft: wp(10),
  },
});
