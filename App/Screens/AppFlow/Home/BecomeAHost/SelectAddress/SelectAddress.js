import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useContext} from 'react';
import {WhiteStatusBar} from '../../../../../Components/AppStatusBar';
import BackAndNextBottom from '../../../../../Components/BackAndNextBottom';
import {Colors} from '../../../../../Assets/Colors';
import {wp} from '../../../../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../../Assets/Fonts';
import {FontSizes} from '../../../../../Assets/FontSizes';
import {Images} from '../../../../../Assets/Images';
import CardViewWrapper from '../../../../../Components/CardViewWrapper';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../../Components/ToastMessage';
import {getLabelValue} from '../../../../../Helper/database';
import MapView, {Marker} from 'react-native-maps';

export default function SelectAddress() {
  const navigation = useNavigation();
  const addressData = useSelector(state => state.generalReducer.addressData);
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  useEffect(() => {
    console.log('addressData', addressData.street);
  }, [addressData]);

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
    headerTitle: ``,
    headerRight: props => (
      <View
        style={{
          marginRight: wp(16),
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts.MEDIUM,
            color: Colors.SEARCH_TEXT,
            fontSize: FontSizes.Size_12,
            textTransform: 'uppercase',
          }}>
          {GetLabel('need_help')}
        </Text>
      </View>
    ),
  });

  const TopView = () => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={styles.hostTxt}>
          {GetLabel('wheres_your_place_located')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ConfirmAddress');
          }}>
          <View style={[styles.textInputView, {margin: wp(16)}]}>
            <Image style={styles.searchImage} source={Images.MAP_ICON} />
            <Text style={styles.textInputStyle}>
              {addressData.street != undefined
                ? `${addressData.street}, ${addressData.flat_suit}, ${addressData.city}- ${addressData.postcode}`
                : GetLabel('enter_your_address')}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <Image style={styles.mapImage} source={Images.MAP} /> */}
        <MapView
          style={{height: '100%', width: '100%'}}
          initialRegion={{
            latitude: 23.091129,
            longitude: 72.512512,

            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={data => {
            console.log('MapView', data);
          }}>
          <Marker
            coordinate={{latitude: 23.091129, longitude: 72.512512}}
            // image={Images.APP_LOGO}
            // style={{width: wp(10), height: wp(10), alignSelf: 'center'}}
          >
            <View style={{padding: 10}}>
              <Image
                source={Images.APP_LOGO}
                resizeMode={'contain'}
                style={{width: wp(25), height: wp(25), alignSelf: 'center'}}
              />
              <Text
                style={[
                  {
                    fontSize: FontSizes.Size_10,
                    width: wp(100),
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: Colors.BLACK,
                  },
                ]}
                numberOfLines={2}></Text>
            </View>
          </Marker>
        </MapView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <View showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {TopView()}
      </View>
      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={2}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            if (addressData.street != undefined) {
              navigation.navigate('GuestSelection');
            } else {
              Toast.show(GetLabel('please_select_address'), toastMessageConfig);
            }
          }}
          showNextVisible={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  backView: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: Platform.OS === 'android' ? 0 : wp(30),
    backgroundColor: Colors.WHITE,
  },
  flatListContainerView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(24),
    flex: 1,
  },
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
  },
  textInputStyle: {
    padding: 0,
    marginLeft: 10,
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
  },
  textInputView: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.SEARCH_BACKGROUND,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    // height: wp(50),
  },
  searchImage: {
    width: wp(14),
    height: wp(14),
    resizeMode: 'contain',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
