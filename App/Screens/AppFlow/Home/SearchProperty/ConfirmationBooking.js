import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header} from '@react-navigation/stack';
import {Colors} from '../../../../Assets/Colors';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {useEffect} from 'react';
import {Images} from '../../../../Assets/Images';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {wp} from '../../../../Helper/Responsive';
import {useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';
import CustomButton from '../../../../Components/CustomButton';

export default function ConfirmationBooking() {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {}, []);

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const propertyDetail = useSelector(
    state => state.generalReducer.propertyDetail,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
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
      fontFamily: Fonts.BOLD,
      fontSize: FontSizes.Size_18,
      color: Colors.SEARCH_TEXT,
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
          <Image source={Images.CROSS_ICON} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Confirmation',
    headerRight: props => <View></View>,
  });

  const CardView = () => {
    return (
      <View style={styles.cardView}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image
            source={Images.CONFIRMATION_GIF}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.confirmTxt}>
            {GetLabel('your_booking_at_furnished_room_is_confirmed')}
          </Text>
        </View>
        <View style={[styles.lineView, {width: wp(311), marginTop: wp(5)}]} />
        <Text style={styles.thankyouTxt}>{GetLabel('thankyou_txt')}</Text>
      </View>
    );
  };

  const BookingDetailView = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        <Text style={styles.bookingDetailText}>
          {GetLabel('booking_detail')}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <Text style={styles.bookingTextCategory}>
              {propertyDetail[0].roomType}
            </Text>
            <Text style={styles.bookingText}>
              {propertyDetail[0].property_title}
            </Text>
            <View style={{flexDirection: 'row', marginTop: wp(5)}}>
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
              <Text style={[styles.reviewTxt, {marginRight: wp(10)}]}>
                {GetLabel('super_host')}
              </Text>
            </View>
          </View>
          <Image
            style={styles.propertyImage}
            source={{uri: propertyDetail[0].pictures[0].original}}
          />
        </View>
        <View style={styles.lineView1} />
      </View>
    );
  };

  const DateSection = () => {
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
        <View style={styles.lineViewDate} />
        <TouchableOpacity style={styles.checkingStyleTouchable}>
          <Text style={styles.topTabTxt1}>{GetLabel('check_out')}</Text>
          <Text style={styles.topTabTxt2}>{GetLabel('add_date')}</Text>
        </TouchableOpacity>
        <View style={styles.lineViewDate} />
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

  const TripDetail = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        <Text style={[styles.bookingDetailText, {marginTop: wp(0)}]}>
          {GetLabel('trip_detail')}
        </Text>
        {DateSection()}
        <View style={styles.lineView1} />
      </View>
    );
  };

  const LocationView = () => {
    return (
      <View style={{marginLeft: wp(16), marginRight: wp(16)}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image style={styles.mapImage} source={Images.MAP_ICON} />
          <Text style={styles.mapText}>{propertyDetail[0].address.full}</Text>
        </View>
        <Image style={styles.mapViewImage} source={Images.MAP} />
        <View style={styles.lineView1} />
      </View>
    );
  };

  const PriceDetail = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_18, flex: 1}]}>
          {GetLabel('price_detail')}
        </Text>
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>3 {GetLabel('nights')}</Text>
          <Text style={styles.priceTxtDetail}>{propertyDetail[0].property_price.basePrice}</Text>
        </View>
        <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>{GetLabel('discount')}</Text>
          <Text style={[styles.priceTxtDetail, {color: Colors.GREEN}]}>
            - $50
          </Text>
        </View>
        <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>{GetLabel('servie_fee')}</Text>
          <Text style={[styles.priceTxtDetail]}>$20</Text>
        </View>
        <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>
            {GetLabel('occupancy_taxes_fees')}
          </Text>
          <Text style={[styles.priceTxtDetail]}>$20</Text>
        </View> */}
        <View style={styles.priceDetailView}>
          <Text style={[styles.priceTxt, {fontSize: FontSizes.Size_18}]}>
            Total
          </Text>
          <Text style={[styles.priceTxtDetail]}>
            {propertyDetail[0].property_price.currency}
            {'  '} {propertyDetail[0].property_price.basePrice}
          </Text>
        </View>

        <View style={styles.lineView1} />
      </View>
    );
  };

  const BottomButton = () => {
    return (
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
          marginBottom: wp(20),
        }}
        onPress={() => {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: 'AppFlow'}],
          });
          navigation.dispatch(resetAction);
        }}
        buttonWidth={wp(343)}
        title={GetLabel('back_to_home')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineView} />

      <ScrollView style={[styles.container, {marginTop: wp(10)}]}>
        <View style={styles.containerScroll}>
          {CardView()}
          {BookingDetailView()}
          {TripDetail()}
          {LocationView()}
          {PriceDetail()}

          {BottomButton()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  containerScroll: {
    flex: 1,
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(15),
  },
  cardView: {
    borderRadius: 20,
    padding: wp(16),
    backgroundColor: Colors.WHITE,
    elevation: 3,
    margin: wp(5),
    flex: 1,
  },
  confirmTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_16,
    alignSelf: 'center',
    flex: 1,
    marginLeft: wp(15),
  },
  thankyouTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_14,
    alignSelf: 'center',
    lineHeight: 24,
    flex: 1,
    textAlign: 'center',
    marginTop: wp(10),
  },
  bookingDetailViewContainer: {
    margin: wp(10),
  },
  titleTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  bookingTextCategory: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    lineHeight: 26,
  },
  bookingText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_16,
    lineHeight: 26,
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
    fontSize: FontSizes.Size_14,
    marginLeft: wp(5),
    lineHeight: 26,
  },
  circleView: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5) / 2,
    backgroundColor: Colors.TEXT_GREY,
    marginLeft: wp(16),
    alignSelf: 'center',
  },
  propertyImage: {
    width: wp(104),
    height: wp(83),
    borderRadius: 4,
    marginRight: wp(20),
  },
  lineView1: {
    height: 1,
    width: wp(343),
    backgroundColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
    marginTop: wp(20),
  },
  bookingDetailText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    lineHeight: 26,
    marginTop: wp(10),
    marginBottom: wp(20),
  },

  //Top date section

  checkingStyle: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 25,
    marginBottom: wp(5),
    alignSelf: 'center',
    width: wp(343),
    justifyContent: 'space-around',
    backgroundColor: Colors.SEARCH_BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    borderRadius: 10,
  },
  checkingStyleTouchable: {
    flex: 1,
    paddingBottom: wp(10),
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
  lineViewDate: {
    width: 1,
    height: 35,
    backgroundColor: Colors.SEARCH_BORDER,
    marginRight: wp(14),
  },
  mapImage: {
    width: wp(10),
    height: wp(14),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginRight: wp(16),
  },
  mapText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_14,
  },
  mapViewImage: {
    width: wp(343),
    height: wp(150),
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: wp(20),
    marginBottom: wp(10),
  },
  priceDetailView: {
    marginTop: wp(16),
    flexDirection: 'row',
  },
  priceTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
    flex: 1,
  },
  priceTxtDetail: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
  },
});
