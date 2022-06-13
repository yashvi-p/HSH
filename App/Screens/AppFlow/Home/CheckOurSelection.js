import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Header} from '@react-navigation/stack';
import {Colors} from '../../../Assets/Colors';
import {Images} from '../../../Assets/Images';
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {wp} from '../../../Helper/Responsive';
import {Labels} from '../../../Assets/Labels';
import CardViewFlatList from '../../../Components/CardViewFlatList';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {getLabelValue} from '../../../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import LoaderView from '../../../Components/LoaderView';
import moment from 'moment';
import {ApiConfigFormData} from '../../../Helper/ApiConfig';
import axios from 'axios';
import {setSelectionListing} from '../../../Redux/Actions/generalAction';
import {useRef} from 'react';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../Components/ToastMessage';

export default function CheckOurSelection({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const startDate = useSelector(state => state.generalReducer.startDate);
  const endDate = useSelector(state => state.generalReducer.endDate);
  const adult = useSelector(state => state.generalReducer.adult);
  const children = useSelector(state => state.generalReducer.children);
  const room = useSelector(state => state.generalReducer.room);
  const checkSelectionListData = useSelector(
    state => state.generalReducer.checkSelectionListData,
  );

  const checkSelectionListDataCurrentPage = useSelector(
    state => state.generalReducer.checkSelectionListDataCurrentPage,
  );

  const totalCheckSelectionListPage = useSelector(
    state => state.generalReducer.totalCheckSelectionListPage,
  );

  useEffect(() => {
    PropertyListApiCall();
  }, []);

  const PropertyListApiCall = () => {
    var data = new FormData();
    data.append('page', '1');
    axios(ApiConfigFormData(data, 'listing'))
      .then(function (response) {
        dispatch(setSelectionListing(response.data[0]));
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

  useEffect(() => {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
  }, [startDate != '']);

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
    {
      id: 4,
      hostType: '',
      image: 'https://images5.alphacoders.com/362/362711.jpg',
      isLiked: false,
      title: 'Furnished room near Cornavin',
      description: 'Superior One-Bedroom Apartment',
      rent: '£320',
      type: '/night',
      rating: '3.7',
      review: '(8 reviews)',
    },
    {
      id: 5,
      hostType: '',
      image: 'https://wallpaperaccess.com/full/902480.jpg',
      isLiked: false,
      title: 'Strling Hotel Residence',
      description: 'Superior One-Bedroom Apartment',
      rent: '£420',
      type: '/night',
      rating: '4.7',
      review: '(8 reviews)',
    },
    {
      id: 6,
      hostType: 'SUPERHOST',
      image: 'https://images5.alphacoders.com/541/541026.jpg',
      isLiked: true,
      title: 'Fraser Suit Geneva',
      description: 'Superior One-Bedroom Apartment',
      rent: '£520',
      type: '/night',
      rating: '3.9',
      review: '(10 reviews)',
    },
  ];

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
            source={Images.LEFT_ARROW}
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
    headerTitle: 'Check our selection',
    headerRight: props => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AppStackFlow', {screen: 'FilterSelection'});
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
            source={Images.FILTER}
            style={{
              height: wp(14),
              width: wp(14),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: wp(2),
              marginRight: wp(16),
            }}
          />
        </View>
      </TouchableOpacity>
    ),
  });

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
        <View style={styles.lineView} />
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
        <View style={styles.lineView} />
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

  return (
    <View style={{flex: 1}}>
      <WhiteStatusBar />
      {isLoading == true ? <LoaderView /> : null}

      {TopTabSection()}
      <CardViewFlatList
        onPress={data => {
          console.log('OnClick of Item', data);
          navigation.navigate('PropertyDetail', {property_id: data._id});
        }}
        imageSize={wp(324)}
        item={checkSelectionListData}
        customStyle={{
          alignSelf: 'center',
        }}
        onHeartPressed={() => {
          console.log('onHeartPressed clicked');
          navigation.navigate('WishListSelection');
        }}
        onHeartUnPressed={() => {
          console.log('onHeartUnPressed clicked');
        }}
        currentPage={checkSelectionListDataCurrentPage}
        totalPage={totalCheckSelectionListPage}
        CallEndReachedApi={() => {
          var data = new FormData();
          data.append('page', checkSelectionListDataCurrentPage);
          axios(ApiConfigFormData(data, 'listing'))
            .then(function (response) {
              dispatch(setSelectionListing(response.data[0]));
              setIsLoading(false);
            })
            .catch(function (error) {
              console.log(error.toString());
              setIsLoading(false);
              if (error.toString() == 'AxiosError: Network Error')
                Toast.show(
                  `${GetLabel('poor_internet_connection')}`,
                  toastMessageConfig,
                );
              else Toast.show(`${error}`, toastMessageConfig);
            });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checkingStyle: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.WHITE,
    elevation: 3,
    paddingLeft: 25,
    justifyContent: 'space-around',
  },
  checkingStyleTouchable: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  lineView: {
    width: 1,
    height: 35,
    backgroundColor: Colors.SEARCH_BORDER,
    marginRight: wp(14),
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
});
