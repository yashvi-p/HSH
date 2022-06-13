import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import OTPTextInput from '@twotalltotems/react-native-otp-input';
import {hp, wp} from '../../Helper/Responsive';
import {Colors} from '../../Assets/Colors';
import {useState} from 'react';
import {FontSizes} from '../../Assets/FontSizes';
import {Fonts} from '../../Assets/Fonts';
import {Header} from '@react-navigation/stack';
import {Images} from '../../Assets/Images';
import {getLabelValue} from '../../Helper/database';
import {useEffect} from 'react';
import CustomButton from '../../Components/CustomButton';
import axios from 'axios';
import {ApiConfigFormData} from '../../Helper/ApiConfig';
import LoaderView from '../../Components/LoaderView';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../Components/ToastMessage';
import {setVerifyOtpData} from '../../Redux/Actions/authAction';

export default function PhoneVerification() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const verifyOtpData = useSelector(state => state.authReducer.verifyOtpData);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(7);
  const [second, setSecond] = useState(59);
  const [isLoading, setIsLoading] = useState(false);

  let timer = () => {};

  useEffect(() => {
    startTimer();
    // console.log('verifyOtpData--', verifyOtpData[0].otp);
    // console.log('verifyOtpData--', verifyOtpData[0].token);
    // console.log('verifyOtpData--', verifyOtpData[0].user_id);

    return () => clearTimeout(timer);
  }, []);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (second <= 0) {
        clearTimeout(timer);
        return false;
      }
      setSecond(second - 1);
    }, 1000);
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
    headerTitle: 'Phone verification',
    headerRight: props => <View></View>,
  });

  const CallVerifyOtp = () => {
    setIsLoading(true);

    var data = new FormData();
    data.append('user_id', `${verifyOtpData[0].user_id}`);
    data.append('otp', `${otp}`);
    data.append('token', `${verifyOtpData[0].token}`);

    axios(ApiConfigFormData(data, 'verify_otp'))
      .then(function (response) {
        if (response.data[0].code == '1') {
          console.log('data', response.data[0].result);

          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('LoginScreen');
            Toast.show(
              `${GetLabel('otp_has_been_verified')}`,
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

  const ResendCallOtp = () => {
    setIsLoading(true);

    var data = new FormData();
    data.append('user_id', `${verifyOtpData[0].user_id}`);
    data.append('token', `${verifyOtpData[0].token}`);

    axios(ApiConfigFormData(data, 'resend_otp'))
      .then(function (response) {
        if (response.data[0].code == '1') {
          console.log('data', response.data[0].result);
          dispatch(setVerifyOtpData(response.data[0].result));

          setTimeout(() => {
            setIsLoading(false);
            // navigation.navigate('LoginScreen');
            Toast.show(
              `${GetLabel('otp_has_been_sent_successfully')}`,
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
        setIsLoading(false);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const OtpView = () => {
    return (
      <View style={styles.otpView}>
        <Text style={styles.expirationTxt}>
          {GetLabel(
            'we_have_sent_you_a_verification_code_on_your_mobile_number',
          )}
        </Text>
        <OTPTextInput
          style={styles.otpInputParentViewStyle}
          autoFocusOnLoad
          pinCount={4}
          codeInputFieldStyle={styles.otpInputViewStyle}
          codeInputHighlightStyle={[
            styles.otpInputViewStyle,
            {borderColor: Colors.BLACK},
          ]}
          onCodeChanged={otp => setOtp(otp)}
        />
        <Text style={styles.expireIn}>
          {GetLabel('expiring_in')} {second}
        </Text>
        <Text style={[styles.expireIn, {marginTop: wp(5)}]}>
          {GetLabel('otp_hint')} : {verifyOtpData[0].otp}
        </Text>
        <CustomButton
          additionalStyle={{
            alignSelf: 'center',
            marginTop: wp(24),
          }}
          buttonWidth={wp(343)}
          onPress={() => {
            CallVerifyOtp();
          }}
          title={GetLabel('verify')}
        />
        <TouchableOpacity
          onPress={() => {
            ResendCallOtp();
          }}>
          <Text style={styles.didNotReceiveTxt}>
            {GetLabel('did_not_receive_code')}
            <Text style={[styles.didNotReceiveTxt, {color: Colors.GREY_TONE}]}>
              {'  '}
              {`${GetLabel('resend')}`}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.scrollView}>
      <View style={styles.lineView} />
      {isLoading == true ? <LoaderView /> : null}

      {OtpView()}
    </View>
  );
}

const styles = StyleSheet.create({
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  otpInputParentViewStyle: {
    height: wp(40),
    marginTop: hp(22),
    marginHorizontal: wp(80),
  },
  otpInputViewStyle: {
    borderWidth: 1,
    fontSize: FontSizes.Size_18,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    borderColor: Colors.SEARCH_BORDER,
    height: wp(40),
    borderRadius: 6,
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },

  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  otpView: {
    marginTop: wp(40),
  },
  expirationTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
    marginLeft: wp(25),
    marginRight: wp(25),
  },
  expireIn: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    textAlign: 'center',
    marginTop: wp(24),
  },
  didNotReceiveTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    textAlign: 'center',
    marginTop: wp(24),
  },
});
