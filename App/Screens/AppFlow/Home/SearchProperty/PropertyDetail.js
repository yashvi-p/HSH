import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../../Assets/Colors';
import {hp, wp} from '../../../../Helper/Responsive';
import {Images} from '../../../../Assets/Images';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import CardViewWrapper from '../../../../Components/CardViewWrapper';
import {useState} from 'react';
import {useCallback} from 'react';
import {getLabelValue} from '../../../../Helper/database';
import * as Progress from 'react-native-progress';
import CustomButton from '../../../../Components/CustomButton';
import {SliderBox} from 'react-native-image-slider-box';
import ImageSlider from '../../../../Components/ImageSlider';
import axios from 'axios';
import {ApiConfigFormData} from '../../../../Helper/ApiConfig';
import {setPropertyDetail} from '../../../../Redux/Actions/generalAction';
import LoaderView from '../../../../Components/LoaderView';
import {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../Components/ToastMessage';

export default function PropertyDetail({props}) {
  const isBookNow = 1;

  const navigation = useNavigation();
  const route = useRoute();

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false);
  const [likedView, setLikedView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    'https://vistapointe.net/images/resort-1.jpg',
    'https://images5.alphacoders.com/362/362711.jpg',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc29ydHxlbnwwfHwwfHw%3D&w=1000&q=80',
    'https://wallpaperaccess.com/full/902480.jpg', // Network image
    'https://cdn.wallpapersafari.com/7/64/8EoGTQ.jpg',
    'https://media.istockphoto.com/photos/luxury-travel-romantic-couple-in-beach-hotel-picture-id1213840216?k=20&m=1213840216&s=612x612&w=0&h=XTT-5KD8VdcQJnlq02dH2-znH41R0P4p7F36vMiWfPY=',
    'https://images5.alphacoders.com/541/541026.jpg',
  ];

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const startDate = useSelector(state => state.generalReducer.startDate);
  const endDate = useSelector(state => state.generalReducer.endDate);
  const adult = useSelector(state => state.generalReducer.adult);
  const children = useSelector(state => state.generalReducer.children);
  const room = useSelector(state => state.generalReducer.room);
  const propertyDetail = useSelector(
    state => state.generalReducer.propertyDetail,
  );

  const dispatch = useDispatch();
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  useEffect(() => {
    console.log('propertyDetail', propertyDetail);
  }, [propertyDetail]);

  const [amenities, setAmenities] = useState([
    {
      id: 1,
      image: Images.REFRIGERATOR,
      description: 'Kitchen',
    },
    {
      id: 2,
      image: Images.FREEPARKING,
      description: 'Free on-street parking',
    },
    {
      id: 3,
      image: Images.HAIRDRYER,
      description: 'Hair dryer',
    },
    {
      id: 4,
      image: Images.INTERNET,
      description: 'Wifi',
    },
    {
      id: 5,
      image: Images.AIRCONDITIONER,
      description: 'airconditioner.png',
    },
    {
      id: 6,
      image: Images.TV,
      description: 'TV with standard cable',
    },
    {
      id: 7,
      image: Images.KITCHEN,
      description: 'Refrigerator',
    },
    {
      id: 8,
      image: Images.AIRCONDITIONER,
      description: 'airconditioner.png',
    },
    {
      id: 9,
      image: Images.INTERNET,
      description: 'Wifi',
    },
  ]);

  const [guestreviews, setguestreview] = useState([
    {
      id: 1,
      name: 'Michela',
      date: 'OCTOBER 2020',
      description: `I had a great time at Sarah's, excellent value for money everything is very clean and very well equipped and above all a very good location close to everything!`,
      readmore: 'READ MORE',
      image: Images.DASHBOARD_IMAGE,
    },
    {
      id: 2,
      name: 'Arno',
      date: 'OCTOBER 2020',
      description: `I had a great time at Sarah's, excellent value for money everything is very clean and very well equipped and above all a very good location close to everything!`,
      readmore: 'READ MORE',
      image: Images.DASHBOARD_IMAGE2,
    },
    {
      id: 3,
      name: 'Sergi',
      date: 'OCTOBER 2020',
      description: `I had a great time at Sarah's, excellent value for money everything is very clean and very well equipped and above all a very good location close to everything!`,
      readmore: 'READ MORE',
      image: Images.DASHBOARD_IMAGE2,
    },
  ]);

  const [data, setData] = useState({
    cleanliness: 'CLEANLINESS',
    communication: 'COMMUNICATION',
    check_in: 'CHECK IN',
    location: 'LOCATION',
    reviews: '3.7',
    reviews_8: '(8 reviews)',
  });

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  useEffect(() => {
    PropertyDetailApiCall();
    console.log('props.route.params.property_id', route.params.property_id);
  }, []);

  const PropertyDetailApiCall = () => {
    var data = new FormData();
    data.append('id', `${route.params.property_id}`);

    axios(ApiConfigFormData(data, 'property_details'))
      .then(function (response) {
        dispatch(setPropertyDetail(response.data[0].result));
        console.log('property_details---------', propertyDetail[0]);
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

  const TopView = () => {
    return (
      <ImageBackground
        // source={Images.DASHBOARD_IMAGE1}
        style={styles.topViewImage}>
        <ImageSlider
          images={propertyDetail[0].pictures.map(data => {
            return data.regular;
          })}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: wp(40),
            position: 'absolute',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              marginLeft: wp(16),
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <Image style={styles.iconImages} source={Images.LEFT_FILL} />
          </TouchableOpacity>

          {likedView ? (
            <TouchableOpacity
              onPress={() => {
                setLikedView(!likedView);
              }}
              style={{
                marginLeft: wp(16),
                backgroundColor: 'rgba(48, 56, 55, 0.3)',
                borderRadius: 8,
              }}>
              <Image
                style={[styles.iconImages]}
                source={Images.HEART_FILL_ICON}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLikedView(!likedView);
              }}
              style={{marginLeft: wp(16)}}>
              <Image style={styles.iconImages} source={Images.HEART_BOX_ICON} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginLeft: wp(16), marginRight: wp(16)}}>
            <Image style={styles.iconImages} source={Images.SHARE_ICON} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  const DetailView = () => {
    return (
      <View style={styles.detailView}>
        <Text style={styles.titleTxt}>{propertyDetail[0].property_title}</Text>
        <View style={{flexDirection: 'row', marginTop: wp(20)}}>
          <Image style={styles.imageView} source={Images.RATE_IMAGE} />
          <Text style={styles.reviewTxt}>
            {propertyDetail[0].review_count}
            <Text style={[styles.reviewTxt, {color: Colors.GREY_80}]}>
              {' '}
              {propertyDetail[0].review_count == 0
                ? '(0 reviews)'
                : '(8 reviews)'}
            </Text>
          </Text>
          <View style={styles.circleView} />
          <Image
            style={[styles.imageView, {marginLeft: wp(16)}]}
            source={Images.MEMBER}
          />
          <Text style={styles.reviewTxt}>{GetLabel('super_host')}</Text>
        </View>
      </View>
    );
  };

  const LocationView = () => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          marginLeft: wp(16),
          marginRight: wp(16),
          flexDirection: 'row',
          marginTop: wp(5),
        }}>
        <Image
          style={[styles.imageView, {tintColor: Colors.GREY_80}]}
          source={Images.MAP_ICON}
        />
        <Text style={[styles.reviewTxt, {marginLeft: wp(5)}]}>
          {propertyDetail[0].address.full}
        </Text>
      </View>
    );
  };

  const HostView = () => {
    return (
      <View style={{margin: wp(8)}}>
        <CardViewWrapper>
          <View
            style={{
              flexDirection: 'row',
              padding: wp(5),
              marginTop: wp(5),
            }}>
            <Text style={styles.hostTxt}>
              Entire rental unit {GetLabel('hosted_by')} Sarah
            </Text>
            <Image
              style={styles.imageHost}
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', padding: wp(10), marginTop: wp(10)}}>
            <Text
              style={[
                styles.hostTxt,
                {
                  color: Colors.TEXT_GREY,
                  fontSize: FontSizes.Size_16,
                  marginRight: wp(0),
                },
              ]}>
              3 {GetLabel('1_guest')}
            </Text>
            <View style={[styles.circleView, {marginLeft: wp(0)}]} />
            <Text
              style={[
                styles.hostTxt,
                {
                  color: Colors.TEXT_GREY,
                  fontSize: FontSizes.Size_16,
                  marginRight: wp(5),
                },
              ]}>
              {propertyDetail[0].bedrooms} {GetLabel('bedrooms')}
            </Text>
            <View style={[styles.circleView, {marginLeft: wp(5)}]} />
            <Text
              style={[
                styles.hostTxt,
                {
                  color: Colors.TEXT_GREY,
                  marginRight: wp(8),
                  fontSize: FontSizes.Size_16,
                },
              ]}>
              {propertyDetail[0].beds} {GetLabel('bed')}
            </Text>
          </View>
        </CardViewWrapper>
      </View>
    );
  };

  const DescriptionView = () => {
    return (
      <View style={styles.detailView}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_16}]}>
          {GetLabel('description')}
        </Text>
        <Text
          onTextLayout={onTextLayout}
          style={[styles.descriptionText, {textAlign: 'justify'}]}
          numberOfLines={textShown ? undefined : 4}>
          {/* {GetLabel('property_description')} */}
          {propertyDetail[0].property_description}
        </Text>
        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{lineHeight: 21, marginTop: 10}}>
            {textShown ? 'Read less...' : 'Read more...'}
          </Text>
        ) : null}
        <View style={styles.lineView} />
      </View>
    );
  };

  const AvailableDates = () => {
    return (
      <View style={styles.detailView}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_16}]}>
          {GetLabel('availaible_date')}
        </Text>
        {TopTabSection()}
        <View style={styles.lineView} />
      </View>
    );
  };

  const flatAmenities = data => {
    return (
      <FlatList
        style={{
          marginLeft: wp(16),
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.sortListView}>
              <Image
                style={styles.listImage}
                resizeMode={'contain'}
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/amenities-icon-simple-element-illustration-isolated-trendy-filled-white-background-can-be-used-web-mobile-ui-163775811.jpg',
                }}
              />
              <Text style={styles.sortFlatListTxt}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  const Amenities = () => {
    return (
      <View style={styles.detailView}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_16}]}>
          {GetLabel('amenities')}
        </Text>
        {flatAmenities(propertyDetail[0].amenities.slice(0, 4))}
        {propertyDetail[0].amenities.length -
          propertyDetail[0].amenities.slice(0, 4).length ==
        0 ? null : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Amenities');
            }}
            style={styles.amenitiesView}>
            <Text style={styles.amenitiesLength}>
              {propertyDetail[0].amenities.length -
                propertyDetail[0].amenities.slice(0, 4).length}{' '}
              {GetLabel('more_amenities')}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.lineView} />
      </View>
    );
  };

  const ProgressBar = () => {
    return (
      <View style={guestStyle.progressView}>
        <Progress.Bar
          borderWidth={0}
          color={Colors.TEXT_GREY}
          unfilledColor={Colors.SEARCH_BORDER}
          progress={0.1 * 5}
          width={wp(160)}
        />
      </View>
    );
  };

  const GuestListView = data => {
    return (
      <View style={{justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          {GuestListItem(data.cleanliness, data)}
          {GuestListItem(data.check_in, data)}
        </View>

        <View style={{flexDirection: 'row'}}>
          {GuestListItem(data.communication, data)}
          {GuestListItem(data.location, data)}
        </View>
      </View>
    );
  };

  const GuestListItem = (item1, data) => {
    return (
      <View style={{marginRight: wp(15)}}>
        <View style={guestStyle.guestView}>
          <Text
            style={[
              guestStyle.nameStyle,
              {fontSize: FontSizes.Size_14, color: Colors.SEARCH_TEXT, flex: 1},
            ]}>
            {item1}
          </Text>
          <Text
            style={[
              guestStyle.nameStyle,
              {
                fontSize: FontSizes.Size_14,
                color: Colors.BLACK,
                textAlign: 'right',
              },
            ]}>
            {data.reviews}
          </Text>
        </View>
        {ProgressBar()}
      </View>
    );
  };

  const FlatListGuestReview = data => {
    return (
      <>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.id}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item}) => (
            <View style={guestStyle.mainViewStyle}>
              <View style={guestStyle.cardViewStyle}>
                <CardViewWrapper padding={5}>
                  <View style={guestStyle.viewStyle}>
                    <View>
                      <Text style={guestStyle.nameStyle}>{item.name}</Text>
                      <Text style={guestStyle.dateStyle}>{item.date}</Text>
                    </View>
                    <Image
                      source={Images.DASHBOARD_IMAGE1}
                      style={guestStyle.imageStyle}
                    />
                  </View>

                  <Text style={guestStyle.descriptionStyle}>
                    {item.description}
                  </Text>
                  <Text style={guestStyle.readmoreStyle}>{item.readmore}</Text>
                </CardViewWrapper>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GuestReviews');
          }}
          style={styles.amenitiesView}>
          <Text style={styles.amenitiesLength}>
            {guestreviews.length - guestreviews.slice(0, 1).length}{' '}
            {GetLabel('more_reviews')}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const GuestReview = () => {
    return (
      <View style={styles.detailView}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[styles.titleTxt, {fontSize: FontSizes.Size_16, flex: 1}]}>
            {GetLabel('guest_review')}
          </Text>
          <View
            style={[guestStyle.flexdirectionRowView, {alignSelf: 'center'}]}>
            <Image
              source={Images.RATE_IMAGE}
              style={[guestStyle.StarMemberImageStyle, {alignSelf: 'center'}]}
            />

            <Text style={guestStyle.topRatingStyle}> {data.reviews}</Text>

            <Text style={guestStyle.topReviewsStyle}> {data.reviews_8}</Text>
          </View>
        </View>
        {GuestListView(data)}
        {FlatListGuestReview(guestreviews.slice(0, 1))}
        <View style={styles.lineView} />
      </View>
    );
  };

  const LocationMapView = () => {
    return (
      <View style={styles.detailView}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_16}]}>
          {GetLabel('location')}
        </Text>

        <MapView
          style={styles.map}
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
                  styles.titleTxt,
                  {
                    fontSize: FontSizes.Size_10,
                    width: wp(100),
                    alignSelf: 'center',
                    textAlign: 'center',
                  },
                ]}
                numberOfLines={2}>
                {propertyDetail[0].property_title}
              </Text>
            </View>
          </Marker>
        </MapView>
        <View style={styles.lineView} />
      </View>
    );
  };
  const HostProfileDetail = () => {
    return (
      <View style={hostProfile.profileDataContainer}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View>
            <Text style={hostProfile.hostedTxt}>
              {GetLabel('hosted_by')} Sarah
            </Text>
            <View style={hostProfile.flexDirectionView}>
              <Image style={hostProfile.rateImage} source={Images.RATE_IMAGE} />
              <Text style={hostProfile.reviewTxt}>
                12 {GetLabel('reviews')}
              </Text>
              <View style={styles.circleView} />
              <Image
                style={[styles.imageView, {marginLeft: wp(16)}]}
                source={Images.SECURITY_ICON}
              />
              <Text style={styles.reviewTxt}>
                {GetLabel('identity_verified')}
              </Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.imageHost}
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
            />
          </View>
        </View>
        <View style={hostProfile.flexDirectionView}>
          <Image style={hostProfile.rateImage} source={Images.MEMBER} />
          <Text style={styles.reviewTxt}>{GetLabel('super_host')}</Text>
        </View>
        <Text style={hostProfile.hostDes}>{GetLabel('super_host_des')}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GuestReviews');
          }}
          style={styles.amenitiesView}>
          <Text style={styles.amenitiesLength}>{GetLabel('contact_host')}</Text>
        </TouchableOpacity>
        <View style={styles.lineView} />
      </View>
    );
  };

  const ThingsToKnow = () => {
    return (
      <>
        <TouchableOpacity
          style={{marginBottom: wp(20)}}
          onPress={() => {
            navigation.navigate('ThingsToKnow');
          }}>
          <View
            style={[
              styles.detailView,
              {
                flexDirection: 'row',
                paddingTop: wp(20),
                paddingBottom: wp(20),
                flex: 1,
              },
            ]}>
            <Text
              style={[styles.titleTxt, {fontSize: FontSizes.Size_18, flex: 1}]}>
              {GetLabel('things_to_know')}
            </Text>
            <Image
              style={{
                width: wp(14),
                height: wp(14),
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
              }}
              source={Images.RIGHT_ARROW}
            />
          </View>
          <View style={[styles.lineView, {marginTop: wp(1)}]} />
        </TouchableOpacity>
      </>
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
          <Text style={styles.topTabTxt2}>{GetLabel('add_date')}</Text>
        </TouchableOpacity>
        <View style={styles.lineView1} />
        <TouchableOpacity style={styles.checkingStyleTouchable}>
          <Text style={styles.topTabTxt1}>{GetLabel('check_out')}</Text>
          <Text style={styles.topTabTxt2}>{GetLabel('add_date')}</Text>
        </TouchableOpacity>
        <View style={styles.lineView1} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'AddGuest'});
          }}
          style={styles.checkingStyleTouchable}>
          <Text style={styles.topTabTxt1}>{GetLabel('1_room')}</Text>
          <Text style={styles.topTabTxt2}>{GetLabel('1_guest')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const BottomStickyView = () => {
    return (
      <>
        <View style={[styles.lineView, {width: '100%'}]} />

        <View style={styles.bottomStickyView}>
          <View style={{marginLeft: wp(16), marginRight: wp(20)}}>
            <Text style={[styles.reviewTxt, {fontFamily: Fonts.SEMIBOLD}]}>
              {propertyDetail[0].property_price.currency}{' '}
              {propertyDetail[0].property_price.basePrice}{' '}
              <Text
                style={[
                  styles.reviewTxt,
                  {fontFamily: Fonts.REGULAR, color: Colors.GREY_80},
                ]}>
                /night
              </Text>
            </Text>
            {isBookNow == 1 ? (
              <Text
                style={[guestStyle.topRatingStyle, {color: Colors.RED_TXT}]}>
                Feb 8 - Feb 15
              </Text>
            ) : (
              <View
                style={[guestStyle.flexdirectionRowView, {marginLeft: wp(5)}]}>
                <Image
                  source={Images.RATE_IMAGE}
                  style={[
                    guestStyle.StarMemberImageStyle,
                    {alignSelf: 'center'},
                  ]}
                />

                <Text style={guestStyle.topRatingStyle}> {data.reviews}</Text>
              </View>
            )}
          </View>
          <CustomButton
            additionalStyle={{
              alignSelf: 'center',
            }}
            buttonWidth={isBookNow == 1 ? wp(149) : wp(215)}
            onPress={() => {
              navigation.navigate('BookingDetail');
            }}
            title={
              isBookNow == 1
                ? GetLabel('book_now')
                : GetLabel('check_availaibility')
            }
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
        <View style={styles.containerView}>
          {isLoading == true ? (
            <LoaderView />
          ) : (
            <>
              {propertyDetail != undefined &&
              propertyDetail &&
              isLoading == false &&
              propertyDetail.length > 0 ? (
                <>
                  {TopView()}
                  {DetailView()}
                  {LocationView()}
                  {HostView()}
                  {DescriptionView()}
                  {AvailableDates()}
                  {Amenities()}
                  {GuestReview()}
                  {LocationMapView()}
                  {HostProfileDetail()}
                  {ThingsToKnow()}
                </>
              ) : null}
            </>
          )}
        </View>
      </ScrollView>
      {propertyDetail != undefined &&
      propertyDetail &&
      isLoading == false &&
      propertyDetail.length > 0
        ? BottomStickyView()
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  map: {
    width: wp(343),
    height: hp(250),
    zIndex: -1,
  },
  containerView: {
    // paddingLeft: wp(16),
    // paddingRight: wp(16),
  },
  topViewImage: {
    width: wp(375),
    height: wp(250),
  },
  iconImages: {
    width: wp(30),
    height: wp(30),
    elevation: 5,
  },
  heartView: {
    width: wp(30),
    height: wp(30),
    backgroundColor: 'rgba(48, 56, 55, 0.3)',
    borderRadius: 8,
  },
  detailView: {
    margin: wp(16),
  },
  titleTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  imageView: {
    width: wp(14),
    height: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  reviewTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    marginLeft: wp(5),
  },
  circleView: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5) / 2,
    backgroundColor: Colors.TEXT_GREY,
    marginLeft: wp(16),
    alignSelf: 'center',
  },
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    marginLeft: wp(5),
    flex: 1,
    alignSelf: 'center',
    marginRight: wp(35),
  },
  imageHost: {
    width: wp(56),
    height: wp(56),
    borderRadius: wp(56) / 2,
  },
  descriptionText: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    marginLeft: wp(5),
    marginTop: wp(5),
  },
  lineView: {
    height: 1,
    width: wp(343),
    backgroundColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
    marginTop: wp(20),
  },
  checkingStyle: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.SEARCH_BACKGROUND,
    paddingLeft: 25,
    marginBottom: wp(5),
    marginTop: wp(10),
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  checkingStyleTouchable: {
    flex: 1,
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
  lineView1: {
    width: 1,
    height: 35,
    backgroundColor: Colors.SEARCH_BORDER,
    marginRight: wp(14),
  },
  mainViewStyle: {
    marginTop: wp(20),
  },
  viewStyle: {
    flexDirection: 'row',
    flex: 1,
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
    width: wp(30),
    height: wp(30),
    marginRight: wp(20),
    resizeMode: 'contain',
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
  bottomStickyView: {
    backgroundColor: Colors.WHITE,
    elevation: 3,
    marginTop: wp(2),
    height: wp(74),
    flexDirection: 'row',
    padding: wp(12),
    justifyContent: 'space-between',
  },
});

const guestStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cardViewStyle: {
    flex: 1,
    marginHorizontal: wp(16),
    marginBottom: 0,
  },
  imageStyle: {
    height: wp(56),
    width: wp(56),

    marginTop: wp(16),
    borderRadius: 56 / 2,
    overflow: 'hidden',
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(16),
  },
  mainViewStyle: {
    marginTop: wp(20),
  },
  nameStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(16),
    lineHeight: 26,
  },
  descriptionStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginHorizontal: wp(16),
    marginTop: wp(16),
  },

  dateStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(4),
    lineHeight: 26,
  },
  readmoreStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    margin: wp(16),
    lineHeight: 18,
    marginHorizontal: wp(16),
  },
  drawlineStyle: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 1,
    marginHorizontal: wp(16),
    marginTop: wp(20),
  },
  topViewStyle: {
    justifyContent: 'space-between',
    marginHorizontal: wp(20),
    flexDirection: 'row',
    marginTop: wp(20),
  },
  toptextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 18,
  },
  textStyle: {
    marginTop: wp(20),
  },
  flexdirectionRowView: {
    flexDirection: 'row',

    marginHorizontal: wp(16),
  },
  StarMemberImageStyle: {
    width: wp(14),
    height: wp(14),
    resizeMode: 'contain',
  },
  rateTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  checkDateStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(8),
  },
  topRatingStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
  },
  topReviewsStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
  },
  drawlineHeaderStyle: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    marginTop: wp(5),
  },
  progressView: {
    marginTop: hp(10),
    backgroundColor: Colors.TEXT_GREY,
    borderRadius: 10,
  },
  guestView: {
    flexDirection: 'row',
    marginRight: wp(16),
  },
});

const hostProfile = StyleSheet.create({
  profileDataContainer: {
    marginTop: wp(20),
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  hostedTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
  },
  flexDirectionView: {
    flexDirection: 'row',
    padding: wp(5),
  },
  rateImage: {
    width: wp(14),
    height: wp(14),
    resizeMode: 'contain',
  },
  reviewTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_14,
    marginLeft: wp(16),
  },
  hostDes: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    marginLeft: wp(16),
    lineHeight: 24,
  },
});
