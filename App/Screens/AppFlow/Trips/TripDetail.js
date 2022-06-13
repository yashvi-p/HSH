import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../Assets/Colors';
import {FontSizes} from '../../../Assets/FontSizes';
import {Fonts} from '../../../Assets/Fonts';
import {wp} from '../../../Helper/Responsive';
import {Images} from '../../../Assets/Images';
import {useSelector} from 'react-redux';
import {getLabelValue} from '../../../Helper/database';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
export default function TripDetail() {
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);

  const [data, setData] = useState({
    booking_id: 'BOOKING ID - NU5487788WSI',
    entire_rental_unit: 'Entire rental unit',
    furnished_room_near_Cornavin: 'Furnished room near Cornavin',
    rating: '3.7',
    reviews: '(8 reviews)',
    super_host: 'Super host',
    Check_in: 'CHECK IN',
    Check_out: 'CHECK OUT',

    Tue_Feb_21: 'Tue, Feb 21',
    from10: 'from 10:15 am',
    Fri_Feb_24: 'Fri, Feb 24',
    at_9: 'at 9:00 am',
    checkin_checkout: '3 NIGHT',
    //Price details
    Price_details: 'Price details',
    Nights: '3 NIGHTS',
    Discount: 'DISCOUNT',
    Service_fee: 'SERVICE FEE',
    Occupancy_taxes_fees: 'OCCUPANCY TAXES & FEES',
    Nights_rate: '£960',
    Discount_rate: '-£40',
    Service_fee_rate: '£20',
    Occupancy_taxes_fees_rate: '£10',
    Total: 'TOTAL',
    Total_rate: '£950',
    Paid: 'PAID',
    Paid_rate: '£475',
    Due_on_15_mar_2022: 'Due on 15 mar 2022',
    Due_on_15_mar_2022_rate: '£475',
  });
  const [flatdata, setflatData] = useState([
    {
      Guest: '2 Guest',
      Night: '3 Night',
      Bedroom: '2 Bedroom',
      Bed: '1 Bed',
      Kitchen: 'Kitchen',
      Wifi: 'Wifi',
      Air_conditioning: 'Air conditioning',
    },
  ]);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const flateListView = () => {
    return (
      <View>
        <FlatList
          data={flatdata}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item}) => (
            <View style={styles.rowViewStyle}>
              <Text style={styles.textstyle}>{item.Guest}</Text>
              <View style={styles.circleViewStyle} />
              <Text style={styles.textstyle}>{item.Night}</Text>
              <View style={styles.circleViewStyle} />
              <Text style={styles.textstyle}>{item.Bedroom}</Text>
              <View style={styles.circleViewStyle} />
              <Text style={styles.textstyle}>{item.Bed}</Text>
              <View style={styles.circleViewStyle} />
              <Text style={styles.textstyle}>{item.Kitchen}</Text>
              <View style={styles.circleViewStyle} />
              <Text style={styles.textstyle}>{item.Wifi}</Text>
              <View style={styles.circleViewStyle} />
              <Text style={styles.textstyle}>{item.Air_conditioning}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.bookingIdViewStyle}>
            <Text style={styles.bookingIdTextStyle}>{data.booking_id}</Text>
          </View>
          <View style={styles.viewStyle}>
            <View>
              <Text style={styles.entireRentalTextStyle}>
                {data.entire_rental_unit}
              </Text>
              <Text style={styles.furnishedRoomStyle}>
                {data.furnished_room_near_Cornavin}
              </Text>
              <View style={styles.flexdirectionRowView}>
                <Image
                  source={Images.RATE_IMAGE}
                  style={styles.StarMemberImageStyle}
                />
                <Text style={styles.rateTextStyle}> {data.rating}</Text>
                <Text style={styles.checkTimeStyle}> {data.reviews}</Text>
                <View style={styles.roundViewStyle}></View>
                <Image
                  source={Images.MEMBER}
                  style={styles.StarMemberImageStyle}
                />
                <Text style={styles.checkTimeStyle}> {data.super_host}</Text>
              </View>
            </View>

            <View>
              <Image source={Images.PLACED} style={styles.imageStyle} />
            </View>
          </View>
          <View style={styles.drawline1} />
          {flateListView()}
          <View style={styles.drawline} />
          <View style={styles.checkViewStyle}>
            <View>
              <Text style={styles.checktextstyle}>{data.Check_in}</Text>
              <Text style={styles.checkDateStyle}>{data.Tue_Feb_21}</Text>
              <Text style={styles.checkTimeStyle}>{data.from10}</Text>
            </View>
            <View>
              <Text style={styles.checkStyle}>{data.checkin_checkout}</Text>
            </View>
            <View>
              <Text style={styles.checktextstyle}>{data.Check_out}</Text>
              <Text style={styles.checkDateStyle}>{data.Fri_Feb_24}</Text>
              <Text style={styles.checkTimeStyle}>{data.at_9}</Text>
            </View>
          </View>

          <View style={styles.drawline} />
          <Text style={styles.pricetextstyle}>{data.Price_details}</Text>
          <View style={styles.pricedetailViewStyle}>
            <View>
              <Text style={styles.priceStyle}>{data.Nights}</Text>
              <Text style={styles.priceStyle}>{data.Discount}</Text>
              <Text style={styles.priceStyle}>{data.Service_fee}</Text>
              <Text style={styles.priceStyle}>{data.Occupancy_taxes_fees}</Text>
              <Text
                style={[styles.totaltextstyle, {fontSize: FontSizes.Zie_14}]}>
                {data.Total}
              </Text>
            </View>
            <View>
              <Text style={styles.priceRateStyle}>{data.Nights_rate}</Text>
              <Text style={styles.discountRateStyle}>{data.Discount_rate}</Text>
              <Text style={styles.priceRateStyle}>{data.Service_fee_rate}</Text>
              <Text style={styles.priceRateStyle}>
                {data.Occupancy_taxes_fees_rate}
              </Text>
              <Text
                style={[styles.priceRateStyle, {fontSize: FontSizes.Size_14}]}>
                {data.Total_rate}
              </Text>
            </View>
          </View>
          <View style={styles.paidViewStyle}>
            <View>
              <Text
                style={[styles.totaltextstyle, {fontSize: FontSizes.Size_14}]}>
                {data.Paid}
              </Text>
              <Text style={[styles.paiddate, {fontSize: FontSizes.Size_14}]}>
                {data.Due_on_15_mar_2022}
              </Text>
            </View>
            <View>
              <Text
                style={[styles.paidRateStyle, {fontSize: FontSizes.Size_12}]}>
                {data.Paid_rate}
              </Text>
              <Text
                style={[styles.paiddateStyle, {fontSize: FontSizes.Size_12}]}>
                {data.Due_on_15_mar_2022_rate}
              </Text>
            </View>
          </View>
          <View style={styles.buttonViewStyle}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTextStyle}>
                {GetLabel('download_invoice')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonViewStyle, {marginBottom: wp(20)}]}>
            <TouchableOpacity style={styles.cancelTripbutton}>
              <Text style={styles.cancelTripbuttonTextStyle}>
                {GetLabel('cancel_trip')}
              </Text>
            </TouchableOpacity>
          </View>
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
  circleViewStyle: {
    width: wp(4),
    height: wp(4),
    borderRadius: 150 / 2,
    backgroundColor: Colors.SEARCH_BORDER,
    marginTop: wp(16),
  },
  viewStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: wp(16),
    marginTop: wp(5),
  },
  bookingIdViewStyle: {
    marginHorizontal: wp(16),
    borderRadius: 8,
    paddingHorizontal: wp(16),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    marginTop: wp(20),
  },
  bookingIdTextStyle: {
    textAlign: 'center',
    margin: wp(5),
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_13,
    fontFamily: Fonts.REGULAR,
  },
  roundViewStyle: {
    width: wp(4),
    height: wp(4),
    borderRadius: 150 / 2,
    backgroundColor: Colors.SEARCH_BORDER,
    marginTop: wp(8),
    marginHorizontal: wp(3),
  },
  imageStyle: {
    height: wp(104),
    width: wp(83),
    resizeMode: 'contain',
    borderRadius: 4,
  },
  entireRentalTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(16),
  },
  furnishedRoomStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(4),
  },
  drawline: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginTop: wp(20),
    marginHorizontal: wp(16),
  },
  drawline1: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: wp(16),
    opacity: 0.5,
    marginTop: wp(10),
    marginHorizontal: wp(16),
  },
  textstyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    margin: wp(8),
  },
  rowViewStyle: {
    flexDirection: 'row',
    marginTop: wp(20),
    flexWrap: 'wrap',
    marginHorizontal: wp(16),
  },
  checkViewStyle: {
    flexDirection: 'row',
    marginHorizontal: wp(16),
    justifyContent: 'space-between',
    marginTop: wp(20),
  },
  checktextstyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
  },
  paiddate: {
    fontSize: wp(16),
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
  },
  pricetextstyle: {
    fontSize: FontSizes.Size_17,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
    marginHorizontal: wp(16),
  },
  totaltextstyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
  },
  pricedetailViewStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: wp(16),
  },
  priceStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
  },
  priceRateStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(20),
  },
  paidRateStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
  },
  paiddateStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
    marginBottom: wp(22),
  },
  discountRateStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREEN,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
  },
  paidViewStyle: {
    marginHorizontal: wp(16),
    borderRadius: 8,
    paddingHorizontal: wp(16),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    marginTop: wp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: wp(10),
    borderColor: Colors.RED_TXT,
    borderWidth: wp(1),
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: Colors.RED_TXT,
    fontFamily: Fonts.MEDIUM,
  },
  buttonViewStyle: {
    marginHorizontal: wp(16),
    marginTop: wp(25),
  },
  cancelTripbutton: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: wp(10),
    borderColor: Colors.GRAY_BUTTONCOLOR,
    borderWidth: wp(1),
    borderRadius: 10,
    marginBottom: wp(10),
  },
  cancelTripbuttonTextStyle: {
    color: Colors.GRAY_BUTTONCOLOR,
    fontFamily: Fonts.MEDIUM,
  },
  flexdirectionRowView: {
    flexDirection: 'row',
    marginTop: wp(10),
  },
  StarMemberImageStyle: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  rateTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  checkDateStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(8),
    lineHeight: 24,
  },
  checkTimeStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
  },
  checkStyle: {
    borderRadius: 4,
    paddingHorizontal: wp(8),
    paddingVertical: wp(2),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    marginTop: wp(30),
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_10,
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
});
