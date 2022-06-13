import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {Colors} from '../../../Assets/Colors';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import axios from 'axios';
import {ApiConfigFormData} from '../../../Helper/ApiConfig';

import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../Components/ToastMessage';
import {wp} from '../../../Helper/Responsive';
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Images} from '../../../Assets/Images';
import Navigation from '../../../Navigator/Navigation';
import {getLabelValue} from '../../../Helper/database';
import LoaderView from '../../../Components/LoaderView';

export default function CmsPage() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [htmlStr, setHtmlStr] = useState([]);

  useEffect(() => {
    CMSApiCall();
  }, []);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const CMSApiCall = () => {
    console.log('routeParam', route.params.routeParam);
    var data = new FormData();
    data.append('language_id', `1`);
    data.append(
      'cms_id',
      route.params.routeParam == `${GetLabel('privacy')}`
        ? '3'
        : route.params.routeParam == `${GetLabel('terms_of_services')}`
        ? '2'
        : '1',
    ); //1= About us,2=Terms & Condition ,3=Privacy Policy
    axios(ApiConfigFormData(data, 'cms'))
      .then(function (response) {
        console.log('response---->', response.data[0].result);

        if (response.data[0].code == '1') {
          setTimeout(() => {
            setIsLoading(false);
            setHtmlStr(response.data[0].result);
            console.log('htmlStr', htmlStr);
          }, 1000);
        } else {
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
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <WhiteStatusBar />
      {isLoading == true ? <LoaderView /> : null}

      <>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: wp(15),
                height: wp(15),
                alignSelf: 'center',
                marginLeft: wp(16),
              }}
              source={Images.CROSS_ICON}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.SEMIBOLD,
              fontSize: FontSizes.Size_18,
              color: Colors.BLACK,
              margin: wp(20),
              textAlign: 'center',
            }}>
            {htmlStr.length > 0 ? htmlStr[0].title : ''}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: Colors.GREY_BACKGROUND,
            marginBottom: 10,
          }}
        />
        <WebView
          scrollEnabled
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          style={styles.webViewStyle}
          onLoad={() => {
            // setIsLoading(false);
            console.log('Loading Webview');
          }}
          containerStyle={styles.webViewContentStyle}
          originWhitelist={['*']}
          source={{
            html: `${htmlStr.length > 0 ? htmlStr[0].content : ''}`,
          }}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: wp(20),
    borderTopRightRadius: wp(20),
  },
  webViewContentStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: wp(20),
    borderTopRightRadius: wp(20),
    paddingBottom: Platform.OS === 'ios' ? wp(20) : 0,
    paddingHorizontal: wp(10),
  },
});
