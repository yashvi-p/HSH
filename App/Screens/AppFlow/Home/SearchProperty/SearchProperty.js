import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import SwipeUpDown from 'react-native-swipe-up-down';
import {Colors} from '../../../../Assets/Colors';
import {wp} from '../../../../Helper/Responsive';
import {Images} from '../../../../Assets/Images';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Fonts} from '../../../../Assets/Fonts';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {getLabelValue} from '../../../../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import CardViewFlatList from '../../../../Components/CardViewFlatList';
import ActionSheet from '../../../../Components/ActionSheet';
import moment from 'moment';
import {useEffect} from 'react';
import {ApiConfigFormData} from '../../../../Helper/ApiConfig';
import axios from 'axios';
import {setSearchApiCalling} from '../../../../Redux/Actions/generalAction';
import {useState} from 'react';
import LoaderView from '../../../../Components/LoaderView';
import MapView, {Marker} from 'react-native-maps';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../Components/ToastMessage';

export default function SearchProperty() {
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const placeApiAddress = useSelector(
    state => state.generalReducer.placeApiAddress,
  );
  const [isLoading, setIsLoading] = useState(true);

  const startDate = useSelector(state => state.generalReducer.startDate);
  const endDate = useSelector(state => state.generalReducer.endDate);
  const adult = useSelector(state => state.generalReducer.adult);
  const children = useSelector(state => state.generalReducer.children);
  const room = useSelector(state => state.generalReducer.room);

  const dispatch = useDispatch();
  const searchListData = useSelector(
    state => state.generalReducer.searchListData,
  );

  const searchListDataCurrentPage = useSelector(
    state => state.generalReducer.searchListDataCurrentPage,
  );

  const totalSearchListPage = useSelector(
    state => state.generalReducer.totalSearchListPage,
  );

  const swipeUpDownRef = useRef();
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const navigation = useNavigation();
  const array = [
    {
      id: 1,
      hostType: 'SUPERHOST',
      image:
        'https://www.brickunderground.com/sites/default/files/blog/images/Screen%20Shot%202019-10-10%20at%2011.42.52%20AM_0.png',
      isLiked: false,
      title: 'Furnished room near Cornavin',
      description: 'Superior One-Bedroom Apartment',
      rent: '£320',
      type: '/night',
      rating: '3.7',
      review: '(8 reviews)',
    },
    {
      id: 2,
      hostType: '',
      image:
        'https://c1.wallpaperflare.com/preview/260/731/810/bedroom-bed-wall-decoration.jpg',
      isLiked: false,
      title: 'Strling Hotel Residence',
      description: 'Superior One-Bedroom Apartment',
      rent: '£420',
      type: '/night',
      rating: '4.7',
      review: '(8 reviews)',
    },
    {
      id: 3,
      hostType: 'SUPERHOST',
      image:
        'https://www.freegreatpicture.com/files/photo101/50465-residential-villas-furnished-living-room.jpg',
      isLiked: true,
      title: 'Fraser Suit Geneva',
      description: 'Superior One-Bedroom Apartment',
      rent: '£520',
      type: '/night',
      rating: '3.9',
      review: '(10 reviews)',
    },
  ];

  const ItemMini = () => {
    return (
      <ScrollView>
        <View style={styles.itemMiniView}>
          <View style={styles.lineView} />
          <Text
            style={{
              color: 'White',
              fontSize: FontSizes.Size_12,
              textTransform: 'uppercase',
              marginTop: wp(15),
            }}>
            {GetLabel('showing')} 200+ {GetLabel('properties')}
          </Text>
          <View
            style={[
              styles.lineView,
              {
                width: wp(343),
                height: 1,
                borderRadius: 0,
                marginTop: 10,
                marginBottom: 10,
              },
            ]}
          />

          {FlatListView()}
        </View>
      </ScrollView>
    );
  };

  const SwiperView = () => {
    return (
      <SwipeUpDown
        itemMini={show => <ItemMini show={show} />}
        itemFull={hide => <ItemMini hide={hide} />}
        onShowMini={() => console.log('mini')}
        onShowFull={() => console.log('full')}
        animation="linear"
        disableSwipeIcon
        extraMarginTop={60}
        iconColor="yellow"
        // iconSize={30}
        swipeHeight={wp(350)}
        style={{backgroundColor: '#fff'}} // style for swipe
        ref={swipeUpDownRef}
      />
    );
  };

  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.imageLeft} source={Images.LEFT_ARROW} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.SEARCH_BACKGROUND,
            marginLeft: wp(40),
            marginRight: wp(35),
            marginBottom: wp(10),
            marginTop: wp(10),
            borderRadius: 10,
            padding: wp(5),
            width: wp(225),
          }}>
          <Image
            style={{
              height: wp(14),
              width: wp(14),
              alignSelf: 'center',
              marginLeft: wp(15),
              marginRight: wp(15),
              tintColor: Colors.SEARCH_TEXT,
            }}
            source={Images.SEARCH_ICON}
          />
          <Text
            style={{
              color: Colors.SEARCH_TEXT,
              fontFamily: Fonts.REGULAR,
              fontSize: FontSizes.Size_15,
              alignSelf: 'center',
            }}>
            {GetLabel('search')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'FilterSelection'});
          }}>
          <Image style={styles.imageRight} source={Images.FILTER} />
        </TouchableOpacity>
      </View>
    );
  };

  const TopTabSection = () => {
    return (
      <View style={styles.checkingStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'AddDates'});
          }}
          style={styles.checkingStyleTouchable}>
          <Text style={styles.topTabTxt1}>{GetLabel('check_in')}</Text>
          <Text
            style={
              startDate != '' ? styles.topTabTxt2Selected : styles.topTabTxt2
            }>
            {startDate != ''
              ? moment(startDate).format('ddd, MMM DD')
              : GetLabel('add_date')}
          </Text>
        </TouchableOpacity>
        <View style={styles.lineView1} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'AddDates'});
          }}
          style={[styles.checkingStyleTouchable, {alignItems: 'center'}]}>
          <Text style={styles.topTabTxt1}>{GetLabel('check_out')}</Text>
          <Text
            style={
              endDate != '' ? styles.topTabTxt2Selected : styles.topTabTxt2
            }>
            {endDate != ''
              ? moment(endDate).format('ddd, MMM DD')
              : GetLabel('add_date')}
          </Text>
        </TouchableOpacity>
        <View style={styles.lineView1} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'AddGuest'});
          }}
          style={[styles.checkingStyleTouchable, {alignItems: 'flex-end'}]}>
          <Text style={styles.topTabTxt1}>{GetLabel('1_room')}</Text>

          <Text
            style={
              adult != 0 && children != 0 && room != 0
                ? styles.topTabTxt2Selected
                : styles.topTabTxt2
            }>
            {adult != 0 && children != 0 && room != 0
              ? `${adult + children + room} ${GetLabel('1_guest')}`
              : GetLabel('1_guest')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    SearchListApiCall();
  }, []);

  const SearchListApiCall = () => {
    let arr = placeApiAddress.details.description;
    var data = new FormData();
    data.append('page', '1');
    data.append('q', `${arr[0]}`);

    axios(ApiConfigFormData(data, 'search_listing'))
      .then(function (response) {
        dispatch(setSearchApiCalling(response.data[0]));
        console.log('setSearchApiCalling', searchListData);
        setIsLoading(false);
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

  const FlatListView = () => {
    return (
      <CardViewFlatList
        item={searchListData}
        imageSize={wp(280)}
        onPress={data => {
          console.log('OnClick of Item', data);
          navigation.navigate('PropertyDetail', {property_id: data._id});
        }}
        onHeartPressed={() => {
          console.log('onHeartPressed clicked');
        }}
        onHeartUnPressed={() => {
          console.log('onHeartUnPressed clicked');
        }}
      />
    );
  };

  const ShowBottomAction = () => {
    return (
      <ActionSheet>
        <View style={styles.itemMiniView}>
          <View style={styles.lineView} />
          <Text
            style={{
              color: 'White',
              fontSize: FontSizes.Size_12,
              textTransform: 'uppercase',
              marginTop: wp(15),
              fontFamily: Fonts.MEDIUM,
            }}>
            {GetLabel('showing')} 200+ {GetLabel('properties')}
          </Text>
          <View
            style={[
              styles.lineView,
              {
                width: wp(343),
                height: 1,
                borderRadius: 0,
                marginTop: 10,
                marginBottom: 10,
              },
            ]}
          />

          {FlatListView()}
        </View>
      </ActionSheet>
    );
  };

  const MapView1 = () => {
    return (
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
    );
    //  <Image style={styles.mapImage} source={Images.MAP} />;
  };

  return (
    <>
      <WhiteStatusBar />
      {isLoading == true ? <LoaderView /> : null}

      {/* <SafeAreaView style={styles.container}> */}

      <View style={styles.container}>
        {HeaderView()}
        {TopTabSection()}
        {MapView1()}
        {ShowBottomAction()}
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerView: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? wp(100) : wp(55),
    backgroundColor: Colors.WHITE,
    alignContent: 'center',
    elevation: 3,
    paddingTop: Platform.OS === 'ios' ? wp(50) : wp(1),
  },
  imageLeft: {
    width: wp(14),
    height: wp(14),
    alignSelf: 'center',
    marginLeft: wp(20),
    marginTop: wp(35) / 2,
  },
  imageRight: {
    width: wp(16),
    height: wp(16),
    alignSelf: 'center',
    marginLeft: wp(5),
    marginTop: wp(35) / 2,
  },
  itemMiniView: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: wp(32),
    borderTopRightRadius: wp(32),
    padding: wp(15),
  },
  lineView: {
    width: wp(29),
    height: wp(4),
    backgroundColor: Colors.SEARCH_BORDER,
    borderRadius: 26,
    alignSelf: 'center',
  },
  checkingStyle: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.WHITE,
    paddingLeft: 25,
    // elevation: 5,
    marginBottom: wp(5),
    justifyContent: 'space-between',
  },
  checkingStyleTouchable: {
    // flex: 1,
    alignSelf: 'center',
  },
  topTabTxt1: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_10,
  },
  topTabTxt2: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_12,
    lineHeight: 24,
    paddingTop: 5,
  },
  topTabTxt2Selected: {
    color: Colors.RED_TXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_12,
    lineHeight: 24,
    paddingTop: 5,
  },
  lineView1: {
    width: 1,
    height: 35,
    backgroundColor: Colors.SEARCH_BORDER,
    marginRight: wp(14),
  },

  containerSwipe: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainerSwipe: {
    flex: 1,
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

const stylesList = StyleSheet.create({
  flatListImage: {
    width: wp(327),
    height: wp(260),
    overflow: 'hidden',
    borderRadius: 16,
  },
  heartFillIcon: {
    width: wp(28),
    height: wp(28),
  },
  typesTxt: {
    color: Colors.WHITE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_11,
    padding: 10,
    textAlign: 'center',
  },
  heartView: {
    width: wp(28),
    height: wp(28),
    backgroundColor: 'rgba(48, 56, 55, 0.3)',
    borderRadius: 8,
    position: 'absolute',
    marginTop: wp(25),
    right: 30,
  },

  hostType: {
    width: wp(91),
    backgroundColor: 'rgba(48, 56, 55, 0.3)',
    borderRadius: 8,
    marginLeft: wp(16),
    position: 'absolute',
    marginTop: wp(25),
  },
  ratingImage: {
    width: wp(14),
    height: wp(14),
  },
  flatListTxt: {
    fontSize: FontSizes.Size_15,
    fontFamily: Fonts.MEDIUM,
    padding: 8,
    paddingLeft: 16,
    color: Colors.GREY_TONE,
  },
  flatListTxt1: {
    fontSize: FontSizes.Size_11,
    fontFamily: Fonts.MEDIUM,
    paddingBottom: 16,
    paddingLeft: 16,
    color: Colors.SEARCH_TEXT,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
