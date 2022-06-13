import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Colors} from '../../../../Assets/Colors';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getLabelValue} from '../../../../Helper/database';
import axios from 'axios';
import {ApiConfigApplicationJson} from '../../../../Helper/ApiConfig';
import LoaderView from '../../../../Components/LoaderView';
import {setPropertyDetail} from '../../../../Redux/Actions/generalAction';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../Components/ToastMessage';

export default function CheckOutListing() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const hostPlace = useSelector(state => state.generalReducer.hostPlace);
  const addressData = useSelector(state => state.generalReducer.addressData);
  const guestData = useSelector(state => state.generalReducer.guestData);
  const placePrice = useSelector(state => state.generalReducer.placePrice);
  const amenitiesData = useSelector(
    state => state.generalReducer.amenitiesData,
  );
  const placePhotos = useSelector(state => state.generalReducer.placePhotos);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const placeDescription = useSelector(
    state => state.generalReducer.placeDescription,
  );
  const placeName = useSelector(state => state.generalReducer.placeName);
  useEffect(() => {
    console.log('placePhotos', amenitiesData);
  }, [amenitiesData]);
  const [data, setData] = useState([
    {id: 1, image: Images.OFFER1, offer_title: 'Kitchen'},
    {id: 2, image: Images.OFFER2, offer_title: 'Free on-street parking'},
    {id: 3, image: Images.OFFER3, offer_title: 'Washing machine'},
    {id: 4, image: Images.OFFER4, offer_title: 'Hair dryer'},
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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

  const TopView = (handleChange, handleSubmit, touched, errors, values) => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={[styles.hostTxt, {fontSize: FontSizes.Size_17}]}>
          {GetLabel('check_out_your_listing')}
        </Text>
      </View>
    );
  };

  const TitleImageView = () => {
    const photo = JSON.parse(placePhotos);
    return (
      <View style={{elevation: 5}}>
        <Image style={styles.listingImage} source={{uri: photo[0].path}} />
        <Text style={styles.listingText}>{placeName}</Text>
        <View
          style={[
            styles.lineView,
            {
              backgroundColor: Colors.SEARCH_BORDER,
              marginLeft: wp(16),
              width: wp(343),
            },
          ]}
        />
      </View>
    );
  };

  const ProfileImageView = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            margin: wp(16),
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.nameTxt}>
            {hostPlace.category_name} {GetLabel('hosted_by')} Sarah
          </Text>
          <Image style={styles.profileImage} source={Images.AD2} />
        </View>
        <View
          style={[
            styles.lineView,
            {
              backgroundColor: Colors.SEARCH_BORDER,
              marginLeft: wp(16),
              width: wp(343),
            },
          ]}
        />
      </>
    );
  };

  const GuestViewSelection = () => {
    return (
      <>
        <View
          style={{
            margin: wp(16),
            flexDirection: 'row',
            width: wp(343),
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.guestTxt, {marginLeft: 0}]}>
            {guestData.guestCount != undefined
              ? `${guestData.guestCount} ${GetLabel('1_guest')}`
              : null}
          </Text>
          <View style={styles.circleView} />
          <Text style={styles.guestTxt}>
            {guestData.bedRoomCount != undefined
              ? `${guestData.bedRoomCount} ${GetLabel('bedrooms')}`
              : null}
          </Text>
          <View style={styles.circleView} />
          <Text style={styles.guestTxt}>
            {guestData.bedCount != undefined
              ? `${guestData.bedCount} ${GetLabel('bed')}`
              : null}
          </Text>
          <View style={styles.circleView} />
          <Text style={styles.guestTxt}>
            {guestData.bathRoomCount != undefined
              ? `${guestData.bathRoomCount} Bathrooms`
              : null}
          </Text>
        </View>
        <View
          style={[
            styles.lineView,
            {
              backgroundColor: Colors.SEARCH_BORDER,
              marginLeft: wp(16),
              width: wp(343),
            },
          ]}
        />
      </>
    );
  };

  const TitleView = () => {
    return (
      <>
        <View style={{margin: wp(16), flexDirection: 'row'}}>
          <Text style={styles.titleTxt}>{placeDescription}</Text>
        </View>
        <View
          style={[
            styles.lineView,
            {
              backgroundColor: Colors.SEARCH_BORDER,
              marginLeft: wp(16),
              width: wp(343),
            },
          ]}
        />
      </>
    );
  };

  const AmenitiesView = () => {
    return (
      <>
        <View style={{margin: wp(16)}}>
          <Text
            style={[
              styles.titleTxt,
              {
                fontFamily: Fonts.MEDIUM,
                fontSize: FontSizes.Size_16,
                color: Colors.GREY_TONE,
              },
            ]}>
            {GetLabel('amenities')}
          </Text>
          <FlatList
            style={{
              marginLeft: wp(16),
            }}
            showsVerticalScrollIndicator={false}
            data={amenitiesData}
            keyExtractor={(item, index) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.sortListView}>
                  <Image
                    style={styles.listImage}
                    resizeMode={'contain'}
                    source={item.image}
                  />
                  <Text style={styles.sortFlatListTxt}>{item.amenities}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={[
            styles.lineView,
            {
              backgroundColor: Colors.SEARCH_BORDER,
              marginLeft: wp(16),
              width: wp(343),
            },
          ]}
        />
      </>
    );
  };

  const LocationView = () => {
    return (
      <>
        <View style={{margin: wp(16)}}>
          <Text
            style={[
              styles.titleTxt,
              {
                fontFamily: Fonts.MEDIUM,
                fontSize: FontSizes.Size_16,
                color: Colors.GREY_TONE,
              },
            ]}>
            {GetLabel('location')}
          </Text>

          <Text
            style={[
              styles.titleTxt,
              {
                fontFamily: Fonts.REGULAR,
                fontSize: FontSizes.Size_14,
                color: Colors.SEARCH_TEXT,
                marginTop: wp(5),
              },
            ]}>
            {`${addressData.flat_suit}, ${addressData.street}, ${addressData.city} - ${addressData.postcode}`}
          </Text>
        </View>
      </>
    );
  };

  const CreatePropertyApiCall = () => {
    setIsLoading(true);
    let amenitiesArray = amenitiesData.map(data => {
      return data.amenities;
    });

    var data = JSON.stringify({
      nickname: placeName,
      tags: 'Clengs',
      title: placeName,
      propertyType: `${hostPlace.category_name}`,
      roomType: 'Entire home/apt',
      accommodates: '25',
      bedrooms: `${
        guestData.guestCount != undefined ? `${guestData.guestCount}` : null
      }`,
      beds: `${
        guestData.bedRoomCount != undefined ? `${guestData.bedRoomCount}` : null
      }`,
      bathrooms: `${
        guestData.bathRoomCount != undefined
          ? `${guestData.bathRoomCount}`
          : null
      }`,
      amenities: amenitiesArray,
      terms: {
        minNights: '2',
        maxNights: '5',
      },
      defaultCheckInTime: '03:00',
      defaultCheckOutTime: '10:00',
      financial: {
        basePrice: `2000`,
        currency: 'USD',
      },
      address: {
        full: `${addressData.flat_suit}, ${addressData.street}, ${addressData.city} - ${addressData.postcode}`,
        city: `${addressData.city}`,
        state: `${addressData.state}`,
        county: `${addressData.country_name}`,
        zipcode: `${addressData.postcode}`,
        neighborhood: '',
        apartment: '',
        lat: '72.54279009999999',
        lng: '72.52583690000002',
        floor: `${addressData.flat_suit}`,
        unit: '',
      },
      pictures: [
        {
          thumbnail:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big15305461091d191dd06d589aac39faa7dd897bff8e.jpg?v=20200416',
          regular:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big15305461091d191dd06d589aac39faa7dd897bff8e.jpg?v=20200416',
        },
        {
          thumbnail:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big1530546105af1b474a46c6378214c87a10c455db6c.jpg?v=20200416',
          regular:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big1530546105af1b474a46c6378214c87a10c455db6c.jpg?v=20200416',
        },
        {
          thumbnail:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big15305461061162f964484fe6a97fdb5066fb7eb437.jpg?v=20200416',
          regular:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big15305461061162f964484fe6a97fdb5066fb7eb437.jpg?v=20200416',
        },
        {
          thumbnail:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big1534494550d2d2db7f8186d5493e7e6f4bb2437c23.jpg?v=20200416',
          regular:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big1534494550d2d2db7f8186d5493e7e6f4bb2437c23.jpg?v=20200416',
        },
        {
          thumbnail:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big15305461083b69efd94df596f3f8552b2e10e80182.jpg?v=20200416',
          regular:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big15305461083b69efd94df596f3f8552b2e10e80182.jpg?v=20200416',
        },
        {
          thumbnail:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big153054610614e20889aba71ae3a1543189f169f159.jpg?v=20200416',
          regular:
            'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big153054610614e20889aba71ae3a1543189f169f159.jpg?v=20200416',
        },
      ],
      picture: {
        thumbnail:
          'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big153054610614e20889aba71ae3a1543189f169f159.jpg?v=20200416',
        regular:
          'https://www.swisstours.com/Hotel/Handler.ashx?file=http://img.crs.itsolutions.es/fotos/2/1530546098835806156ff7762d6a0d043832de8dbc/big153054610614e20889aba71ae3a1543189f169f159.jpg?v=20200416',
      },
    });

    axios(ApiConfigApplicationJson(data, 'create_property'))
      .then(function (response) {
        console.log('response[Api- create_property]', response.data[0]);
        dispatch(setPropertyDetail(response.data[0].result));
        navigation.navigate('Confirmation');
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

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView style={[styles.container, {marginBottom: wp(110)}]}>
        {isLoading == true ? (
          <LoaderView />
        ) : (
          <>
            {TopView()}
            {TitleImageView()}
            {ProfileImageView()}
            {GuestViewSelection()}
            {TitleView()}
            {AmenitiesView()}
            {LocationView()}
          </>
        )}
      </ScrollView>

      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={10}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            // navigation.navigate('Confirmation');
            CreatePropertyApiCall();
          }}
          showNextVisible={true}
          labelText={GetLabel('save_and_publish')}
          viewWidth={wp(160)}
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
  },
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
    marginLeft: wp(20),
    marginRight: wp(20),
  },
  listingImage: {
    width: wp(343),
    height: wp(230),
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: wp(20),
    elevation: 5,
  },
  listingText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_22,
    margin: wp(16),
  },
  nameTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_15,
    flex: 1,
  },
  profileImage: {
    width: wp(56),
    height: wp(56),
    borderRadius: wp(56) / 2,
  },
  guestTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    marginLeft: wp(8),
    marginRight: wp(8),
  },
  circleView: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(6) / 2,
    backgroundColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
  },
  titleTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
  },

  sortFlatListTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_15,
    marginLeft: wp(15),
    alignSelf: 'center',
  },
  sortListView: {
    marginRight: wp(16),
    backgroundColor: Colors.WHITE,
    marginTop: wp(16),
    flexDirection: 'row',
  },
  listImage: {
    width: wp(24),
    height: wp(24),
    marginRight: wp(20),
  },
});
