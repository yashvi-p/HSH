import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchTextInput from '../../../Components/SearchTextInput';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {Colors} from '../../../Assets/Colors';
import {FontSizes} from '../../../Assets/FontSizes';
import {Fonts} from '../../../Assets/Fonts';
import {wp} from '../../../Helper/Responsive';
import CardViewWrapper from '../../../Components/CardViewWrapper';
import {Images} from '../../../Assets/Images';
import CustomButton from '../../../Components/CustomButton';
import Navigation from '../../../Navigator/Navigation';
import {
  applyQuery,
  createDatabase,
  getLabelValue,
} from '../../../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LoaderView from '../../../Components/LoaderView';
import RedDot from '../../../Components/RedDot';
import NoInternet from '../../NoInternet';
import AppLink from 'react-native-app-link';
import axios from 'axios';
import {ApiConfigFormData} from '../../../Helper/ApiConfig';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../Components/ToastMessage';

export default function Home() {
  const navigation = useNavigation();
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const netInfo = useSelector(state => state.generalReducer.netInfo);

  const [placeData, setPlaceData] = useState([]);

  const [advertisement, setAdvertisement] = useState([
    {
      image: Images.AD1,
      name: 'AD 1',
    },
    {
      image: Images.AD2,
      name: 'AD 2',
    },
  ]);

  const OpenApplication = async (
    app_name,
    app_store_id,
    app_store_local,
    play_store_id,
    url,
  ) => {
    const appName = app_name;
    const appStoreId = app_store_id;
    const appStoreLocale = app_store_local;
    const playStoreId = play_store_id;

    AppLink.maybeOpenURL(url, {
      appName,
      appStoreId,
      appStoreLocale,
      playStoreId,
    })
      .then(data => {
        // do stuff
        console.error('data URL', data);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const [isLoading, setIsLoading] = useState(1);

  const PropertyListApiCall = () => {
    var data = new FormData();
    data.append('page', '1');
    axios(ApiConfigFormData(data, 'listing'))
      .then(function (response) {
        setPlaceData(response.data[0].result);
        setIsLoading(0);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(0);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const GetStartedPartitionView = () => {
    return (
      <>
        <ImageBackground
          source={Images.DASHBOARD_IMAGE2}
          // resizeMode={'stretch'}
          style={{
            width: Dimensions.get('window').width,
            height: wp(360),
            padding: 16,
            marginTop: wp(40),
            // backgroundColor: 'rgba(1,1,1,0.5)',
          }}>
          <View style={[styles.discoverView, {marginTop: wp(10)}]}>
            <View style={styles.lineView} />
            <Text style={styles.destinationText}>
              {GetLabel('start_your_hosting_journey')}
            </Text>
            <View style={styles.lineView} />
          </View>
          <Text style={styles.tagLineTxt}>
            {GetLabel('Lets_get_your_listing_set_up_together')}
          </Text>
          <CustomButton
            additionalStyle={{
              alignSelf: 'center',
              marginTop: 20,
            }}
            buttonWidth={wp(150)}
            onPress={() => {
              navigation.navigate('BecomeHostStack', {screen: 'GetStarted'});
            }}
            title={GetLabel('get_started')}
          />
        </ImageBackground>
      </>
    );
  };

  const FlatListView = () => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            style={{
              alignSelf: 'center',
              marginLeft: wp(16),
              marginRight: wp(16),
              marginTop: wp(10),
            }}
            data={[...placeData.slice(4, 8), {nextArrow: true}]}
            horizontal
            keyExtractor={(item, index) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              if (item.nextArrow) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AppStackFlow', {
                        screen: 'CheckOurSelection',
                      });
                    }}
                    style={{
                      width: wp(50),
                      height: wp(50),
                      backgroundColor: Colors.GREY_BACKGROUND,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      borderRadius: wp(50) / 2,
                      margin: wp(10),
                      elevation: 1,
                    }}>
                    <Image
                      style={{
                        width: wp(20),
                        height: wp(20),
                        tintColor: Colors.RED_TXT,
                        marginLeft: wp(5),
                      }}
                      source={Images.RIGHT_ARROW}
                    />
                  </TouchableOpacity>
                );
              }
              return (
                <CardViewWrapper>
                  <Image
                    style={styles.flatListImage}
                    source={{uri: item.picture.thumbnail}}
                  />
                  <Text style={styles.flatListTxt}>{item.property_title}</Text>
                  <Text style={styles.flatListTxt1}>
                    {item.property_description}
                  </Text>
                </CardViewWrapper>
              );
            }}
          />
        </View>
      </>
    );
  };

  useEffect(() => {
    PropertyListApiCall();
    setTimeout(function () {
      createDatabase();
    }, 1000);
  }, []);

  const CallDB = async () => {
    var query = 'INSERT INTO label (key, en, fr, de, it) VALUES (?,?,?,?,?)';
    var parameter = [
      'CHECK OUR SELECTION',
      'CHECK OUR SELECTION',
      'VOIR NOTRE SÉLECTION',
      'PRÜFEN SIE UNSERE AUSWAHL',
      'CONTROLLA LA NOSTRA SELEZIONE',
    ];
    var responseData = await applyQuery(query, parameter);
    console.log('ResponseData', responseData);

    var query = 'SELECT * FROM label WHERE key=?';
    var parameter = ['Unique Experience \n Refreshing & Peaceful'];
    var responseData = await applyQuery(query, parameter);
    var len = responseData.rows.length;
    console.log('Length of key', len);
    for (let i = 0; i < responseData.rows.length; i++) {
      console.log('Length of Key from Database', responseData.rows.item(i));
    }

    var labelArr = [];
    var query = 'SELECT * FROM label';
    var parameter = [];
    var responseData = await applyQuery(query, parameter);

    if (responseData.rows.length > 0) {
      for (let i = 0; i < responseData.rows.length; i++) {
        labelArr.push(responseData.rows.item(i));
        console.log('CallLabelDatabaseQuery', labelArr);
      }
    }
  };

  const BottomView = () => {
    return (
      <View style={styles.BottomView}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: wp(30),
          }}>
          <Text style={[styles.homeTxt, {textAlign: 'center'}]}>
            {GetLabel('home')}
          </Text>
          <Text
            style={[styles.homeTxt, {color: Colors.RED_TXT, paddingLeft: 5}]}>
            {GetLabel('swiss')}
          </Text>
          <Text style={[styles.homeTxt, {marginLeft: 5}]}>
            {GetLabel('home')}
          </Text>
        </View>
        <Text
          style={[
            styles.homeTxt,
            {
              marginLeft: 15,
              marginRight: 15,
              fontSize: FontSizes.Size_14,
              color: Colors.SEARCH_TEXT,
              textAlign: 'center',
              fontFamily: Fonts.REGULAR,
              marginTop: 10,
            },
          ]}>
          Lorem ipsum dolor sit amet, consect adipiscing elitae dolor sit
          pellent massa metus consect.
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Image style={styles.socialIcon} source={Images.FB} />
          <TouchableOpacity
            onPress={() => {
              OpenApplication(
                'Twitter',
                '',
                '',
                'com.twitter.android',
                'https://homeswisshome.vrinsoft.in/',
              );
            }}>
            <Image style={styles.socialIcon} source={Images.TWITTER} />
          </TouchableOpacity>
          <Image style={styles.socialIcon} source={Images.LINKEDIN} />
          <Image style={styles.socialIcon} source={Images.INSTAGRAM} />
        </View>
        {/* <Button
          title="Add Label"
          onPress={() => {
            CallDB();
          }}
        /> */}
      </View>
    );
  };

  const AdvertisementFlatListView = () => {
    return (
      <FlatList
        style={{
          alignSelf: 'center',
          // marginLeft: wp(16),
          marginTop: wp(10),
        }}
        data={advertisement}
        keyExtractor={(item, index) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <CardViewWrapper>
            <Image
              style={[
                styles.flatListImage,
                {borderRadius: 16, height: wp(190)},
              ]}
              source={item.image}
            />
            <Text
              style={[
                styles.flatListTxt,
                {
                  position: 'absolute',
                  fontSize: FontSizes.Size_36,
                  color: Colors.WHITE,
                  alignSelf: 'center',
                  marginTop: wp(75),
                },
              ]}>
              {item.name}
            </Text>
          </CardViewWrapper>
        )}
      />
    );
  };

  const TopBannerSection = () => {
    return (
      <>
        <ImageBackground
          source={Images.DASHBOARD_IMAGE}
          style={{
            width: Dimensions.get('window').width,
            height: wp(590),
            padding: 16,
          }}>
          <Text style={styles.topBannerText}>
            {GetLabel('unique_experience_refreshing_peaceful')}
            <RedDot />
          </Text>
          <CardViewWrapper padding={FontSizes.Size_12}>
            <SearchTextInput
              placeholderText={GetLabel('where_would_you_like_to_go')}
              searchClick={() => {
                navigation.navigate('AppStackFlow');
              }}
            />
          </CardViewWrapper>
        </ImageBackground>
      </>
    );
  };

  const CheckSelectionView = () => {
    return (
      <View style={styles.checkSelectionView}>
        <CardViewWrapper padding={FontSizes.Size_12}>
          <Text style={styles.bestHomeText}>
            {GetLabel('the_best_homes_in_switzerland')}
            <RedDot />
          </Text>
          <CustomButton
            additionalStyle={{
              alignSelf: 'center',
            }}
            buttonWidth={wp(215)}
            onPress={() => {
              navigation.navigate('AppStackFlow', {
                screen: 'CheckOurSelection',
              });
            }}
            title={GetLabel('check_our_selection')}
          />
        </CardViewWrapper>
      </View>
    );
  };

  const DiscoverPartitionView = () => {
    return (
      <View style={styles.discoverView}>
        <View style={styles.lineView} />
        <Text style={styles.destinationText}>
          {GetLabel('discover_the_destination')}
        </Text>
        <View style={styles.lineView} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.containerView}>
        {/* <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}> */}

        <WhiteStatusBar />
        {isLoading == 1 ? <LoaderView /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {/* TopBannerSection Starts */}
          {TopBannerSection()}
          {CheckSelectionView()}
          {DiscoverPartitionView()}
          {FlatListView()}
          {GetStartedPartitionView()}
          {AdvertisementFlatListView()}
          {BottomView()}
        </ScrollView>
        {/* </SafeAreaView> */}
      </View>
      {!netInfo ? <NoInternet show={!netInfo ? true : false} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  amenitiesLength: {
    color: Colors.GREY_80,
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.REGULAR,
    textAlign: 'center',
  },
  amenitiesView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    paddingTop: wp(10),
    paddingBottom: wp(10),
    marginTop: wp(20),
  },
  socialIcon: {
    width: wp(15),
    height: wp(15),
    marginRight: 28,
    marginTop: 28,
    marginBottom: 28,
  },
  homeTxt: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
  },
  BottomView: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? wp(20) : 0,
  },
  tagLineTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_14,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  flatListImage: {
    width: wp(327),
    height: wp(177),
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  flatListTxt: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
    padding: 8,
    paddingLeft: 16,
    color: Colors.GREY_TONE,
  },
  flatListTxt1: {
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.MEDIUM,
    paddingBottom: 16,
    paddingLeft: 16,
    color: Colors.SEARCH_TEXT,
  },
  destinationText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    paddingLeft: 16,
    paddingRight: 16,
  },
  lineView: {
    height: 1,
    width: wp(56),
    backgroundColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
  },
  discoverView: {
    marginTop: 140,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSelectionView: {
    position: 'absolute',
    marginTop: wp(540),
    width: Dimensions.get('window').width,
    padding: 16,
  },
  topBannerText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_24,
    textAlign: 'center',
    margin: wp(16),
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === 'android' ? 0 : wp(35),
  },
  bestHomeText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    textAlign: 'center',
    margin: FontSizes.Size_16,
  },
});
