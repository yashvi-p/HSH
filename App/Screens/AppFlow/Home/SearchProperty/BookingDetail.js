import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../../../Assets/Colors';

import {wp} from '../../../../Helper/Responsive';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';

import {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {getLabelValue} from '../../../../Helper/database';
import CustomButton from '../../../../Components/CustomButton';
import {useEffect} from 'react';

export default function BookingDetail() {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState({});
  const [selected, setSelected] = useState(1);
  const route = useRoute();
  const dispatch = useDispatch();
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
          <Image source={Images.LEFT_ARROW} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Booking details',
    headerRight: props => <View style={styles.manageListStyle}></View>,
  });

  const BookingDetailView = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.bookingTextCategory}>Entire rental unit</Text>
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
              <Text style={styles.reviewTxt}>{GetLabel('super_host')}</Text>
            </View>
          </View>
          <Image
            style={styles.propertyImage}
            source={{
              uri: propertyDetail[0].pictures[0].original,
            }}
          />
        </View>
        <View style={styles.lineView1} />
      </View>
    );
  };

  const TripDetailView = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_18, flex: 1}]}>
          {GetLabel('trip_detail')}
        </Text>
        <View style={styles.tripFlexDirection}>
          <Image style={styles.tripDetailImage} source={Images.CALENDER_ICON} />
          <Text style={[styles.dateTxt, {flex: 1}]}>
            Tue, Feb 8 - Tue, Feb 15
          </Text>
          <Text
            style={[
              styles.dateTxt,
              {
                fontFamily: Fonts.MEDIUM,
                color: Colors.TEXT_GREY,
                fontSize: FontSizes.Size_12,
                alignSelf: 'center',
              },
            ]}>
            {GetLabel('edit')}
          </Text>
        </View>
        <View style={styles.tripFlexDirection}>
          <Image style={styles.tripDetailImage} source={Images.CALENDER_ICON} />
          <Text style={[styles.dateTxt, {flex: 1}]}>
            {' '}
            2 {GetLabel('1_guest')}
          </Text>
          <Text
            style={[
              styles.dateTxt,
              {
                fontFamily: Fonts.MEDIUM,
                color: Colors.TEXT_GREY,
                fontSize: FontSizes.Size_12,
                alignSelf: 'center',
              },
            ]}>
            {GetLabel('edit')}
          </Text>
        </View>
        <View style={styles.lineView1} />
      </View>
    );
  };

  const ChooseHowToPay = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        <Text style={[styles.titleTxt, {fontSize: FontSizes.Size_18, flex: 1}]}>
          {GetLabel('choose_how_to_pay')}
        </Text>
        <View style={styles.payView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.payTxt}>{GetLabel('pay_in_full')}</Text>
              <Text style={styles.payTxt1}>
                {GetLabel('pay_the_total_now_and_you_are_all_set')}
              </Text>
            </View>
            <View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(1);
                  }}
                  style={
                    selected == 1
                      ? CircleCheckBox.circleSelectedView
                      : CircleCheckBox.circleView
                  }
                />
              </View>
              <Text
                style={[
                  styles.payTxt1,
                  {
                    fontFamily: Fonts.SEMIBOLD,
                    fontSize: FontSizes.Size_12,
                    color: Colors.GREY_TONE,
                    marginTop: wp(5),
                  },
                ]}>
                {propertyDetail[0].property_price.currency}{' '}
                {propertyDetail[0].property_price.basePrice}
              </Text>
            </View>
          </View>
          <View style={styles.lineView1} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: wp(10),
            }}>
            <View style={{width: wp(245)}}>
              <Text style={styles.payTxt}>
                {GetLabel('pay_part_now_part_later')}{' '}
              </Text>
              <Text style={styles.payTxt1}>
                Pay £475 now, and the rest (£475) will be automatically charged
                to the same payment method on 3 Feb 2022. No extra fees.
              </Text>
            </View>
            <View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(2);
                  }}
                  style={
                    selected == 2
                      ? CircleCheckBox.circleSelectedView
                      : CircleCheckBox.circleView
                  }
                />
              </View>
              <Text
                style={[
                  styles.payTxt1,
                  {
                    fontFamily: Fonts.SEMIBOLD,
                    fontSize: FontSizes.Size_12,
                    color: Colors.GREY_TONE,
                    marginTop: wp(5),
                  },
                ]}>
                {propertyDetail[0].property_price.currency}{' '}
                {propertyDetail[0].property_price.basePrice / 2}
              </Text>
            </View>
          </View>
        </View>
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
        <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>3 {GetLabel('nights')}</Text>
          {/* <Text style={styles.priceTxtDetail}>$350</Text> */}
        </View>
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>{GetLabel('discount')}</Text>
          <Text style={[styles.priceTxtDetail, {color: Colors.GREEN}]}>
            - $50
          </Text>
        </View> */}
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>{GetLabel('servie_fee')}</Text>
          <Text style={[styles.priceTxtDetail]}>$20</Text>
        </View> */}
        {/* <View style={styles.priceDetailView}>
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
            {propertyDetail[0].property_price.currency}{' '}
            {propertyDetail[0].property_price.basePrice}
          </Text>
        </View>
        {selected == 2 ? (
          <View
            style={{
              backgroundColor: Colors.SEARCH_BACKGROUND,
              borderRadius: 10,
              marginTop: wp(20),
              elevation: 1,
            }}>
            <View
              style={[styles.priceDetailView, {marginTop: wp(1), padding: 15}]}>
              <Text
                style={[
                  styles.priceTxt,
                  {
                    fontSize: FontSizes.Size_14,
                    color: Colors.GREY_TONE,
                    fontFamily: Fonts.MEDIUM,
                  },
                ]}>
                {GetLabel('due_now')}
              </Text>
              <Text style={[styles.priceTxtDetail]}>
                {' '}
                {propertyDetail[0].property_price.currency}{' '}
                {propertyDetail[0].property_price.basePrice / 2}
              </Text>
            </View>
            <View
              style={[
                styles.priceDetailView,
                {marginTop: wp(1), padding: 15, paddingTop: wp(1)},
              ]}>
              <Text
                style={[
                  styles.priceTxt,
                  {
                    fontSize: FontSizes.Size_14,
                    color: Colors.SEARCH_TEXT,
                    fontFamily: Fonts.MEDIUM,
                  },
                ]}>
                DUE ON 15 JULY, 2022
              </Text>
              <Text style={[styles.priceTxtDetail]}>
                {propertyDetail[0].property_price.currency}{' '}
                {propertyDetail[0].property_price.basePrice / 2}
              </Text>
            </View>
          </View>
        ) : null}
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
        }}
        buttonWidth={wp(343)}
        onPress={() => {
          navigation.navigate('PaymentMethods', {fromBookingDetail: true});
        }}
        title={GetLabel('confirm_and_pay')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={[styles.container, {paddingLeft: wp(5), paddingRight: wp(5)}]}>
        {BookingDetailView()}
        {TripDetailView()}
        {ChooseHowToPay()}
        {PriceDetail()}
        {BottomButton()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  lineView1: {
    height: 1,
    width: wp(343),
    backgroundColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
    marginTop: wp(20),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  addIconStyle: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: wp(6),
    marginBottom: wp(10),
    marginTop: wp(16),
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  bookingDetailViewContainer: {
    margin: wp(10),
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
  },
  titleTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  tripFlexDirection: {
    flexDirection: 'row',
    flex: 1,
    marginTop: wp(16),
  },
  tripDetailImage: {
    width: wp(14),
    height: wp(14),
    alignSelf: 'center',
  },
  dateTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    marginLeft: wp(8),
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
  payView: {
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    padding: 10,
    marginTop: wp(15),
    flex: 1,
  },
  payTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
  },
  payTxt1: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_14,
    marginTop: 10,
  },
});

const CircleCheckBox = StyleSheet.create({
  circleView: {
    width: wp(25),
    borderRadius: wp(25) / 2,
    height: wp(25),
    borderWidth: 2,
    borderColor: Colors.SEARCH_BORDER,
    alignSelf: 'center',
  },
  circleSelectedView: {
    width: wp(25),
    height: wp(25),
    borderWidth: 4,
    borderColor: Colors.RED_TXT,
    borderRadius: wp(25) / 2,
    alignSelf: 'center',
  },
});
