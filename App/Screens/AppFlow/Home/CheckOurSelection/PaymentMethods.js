import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import {Colors} from '../../../../Assets/Colors';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {getLabelValue} from '../../../../Helper/database';
import CardViewWrapper from '../../../../Components/CardViewWrapper';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {Header} from '@react-navigation/stack';
import {useEffect} from 'react';
import moment from 'moment';
export default function PaymentMethods() {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    console.log(
      ' route.params.fromBookingDetail',
      route.params.fromBookingDetail,
    );
  }, []);

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
    headerTitle: 'Payment methods',
    headerRight: props => <View></View>,
  });

  const [fromBookingView1, setFromBookingView1] = useState(false);
  const [fromBookingView2, setFromBookingView2] = useState(false);

  const [savedCard, setSavedCard] = useState([
    {
      id: 1,
      image: Images.MASTER_CARD_PAYMENT,
      cardName: `${GetLabel('master_card')}`,
      CardNumber: `${GetLabel('master_card_number')}`,
      status: Images.DEFAULT,
      rightArrow: Images.RIGHT_ARROW,
    },
    {
      id: 2,
      image: Images.PAYPAL_CARD_PAYMENT,
      cardName: `${GetLabel('debit_card')}`,
      CardNumber: `${GetLabel('debit_card_number')}`,
      status: '',
      rightArrow: Images.RIGHT_ARROW,
    },
  ]);
  const SavedCardView = data => {
    return (
      <View style={styles.mainViewStyle}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.id}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ConfirmationBooking');
              }}>
              <View style={styles.cardViewStyle}>
                <CardViewWrapper padding={5}>
                  <View style={styles.viewStyle}>
                    <Image
                      source={item.image}
                      style={styles.paymentImageStyle}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                      <View>
                        <View style={styles.viewRowStyle}>
                          <Text style={styles.cardNameTextStyle}>
                            {item.cardName}
                          </Text>
                          <View style={styles.defaultImageViewStyle}>
                            <Image
                              source={item.status}
                              style={styles.defaultImageStyle}
                            />
                          </View>
                        </View>

                        <View style={styles.viewRowStyle}>
                          <Image
                            source={Images.BOTTOM_DOT_IMAGE}
                            style={styles.bottomDotImageStyle}
                          />
                          <Image
                            source={Images.BOTTOM_DOT_IMAGE}
                            style={styles.bottomDotImageStyle}
                          />
                          <Image
                            source={Images.BOTTOM_DOT_IMAGE}
                            style={styles.bottomDotImageStyle}
                          />

                          <Text style={styles.cardNumberTextStyle}>
                            {item.CardNumber}
                          </Text>
                        </View>
                      </View>

                      <Image
                        source={Images.DOT_RIGHT}
                        style={styles.rightDotStyle}
                      />
                    </View>
                  </View>
                </CardViewWrapper>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  const [addPayment, setAddPayment] = useState([
    {
      id: 0,
      image: Images.MASTER_CARD_PAYMENT,
      label: `${GetLabel('credit_debit_cards')}`,
      rightArrow: Images.RIGHT_ARROW,
    },
    {
      id: 1,
      image: Images.PAYPAL_CARD_PAYMENT,
      label: `${GetLabel('paypal')}`,
      rightArrow: Images.RIGHT_ARROW,
    },
    {
      id: 2,
      image: Images.GPAY_CARD_PAYMENT,
      label: `${GetLabel('google_pay')}`,
      rightArrow: Images.RIGHT_ARROW,
    },
  ]);
  const AddPaymentView = data => {
    return (
      <View style={styles.mainViewStyle}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.id}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (item.id == 0)
                  navigation.navigate('AppStackFlow', {screen: 'AddCard'});
              }}>
              <View style={styles.cardViewStyle}>
                <CardViewWrapper padding={5}>
                  <View style={styles.viewStyle}>
                    <Image
                      source={item.image}
                      style={styles.paymentImageStyle}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                      <View>
                        <Text style={styles.addPaymentTextStyle}>
                          {item.label}
                        </Text>
                        <Text style={styles.cardNumberTextStyle}>
                          {item.CardNumber}
                        </Text>
                      </View>

                      <Image
                        source={Images.RIGHT_ARROW}
                        style={styles.rightImageStyle}
                      />
                    </View>
                  </View>
                </CardViewWrapper>
              </View>
            </TouchableOpacity>
          )}
        />
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
        <TouchableOpacity style={styles.checkingStyleTouchable}>
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
          style={styles.checkingStyleTouchable}>
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

  const PriceDetail = () => {
    return (
      <View style={styles.bookingDetailViewContainer}>
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>3 Nights</Text>
          <Text style={styles.priceTxtDetail}>$350</Text>
        </View> */}
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>Discount</Text>
          <Text style={[styles.priceTxtDetail, {color: Colors.GREEN}]}>
            - $50
          </Text>
        </View> */}
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>Service Fee</Text>
          <Text style={[styles.priceTxtDetail]}>$20</Text>
        </View> */}
        {/* <View style={styles.priceDetailView}>
          <Text style={styles.priceTxt}>Occupancy taxes & fees</Text>
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
      </View>
    );
  };

  const FromBookingView = () => {
    return (
      <>
        {fromBookingView1 ? (
          <TouchableOpacity
            onPress={() => {
              setFromBookingView1(false);
            }}>
            <View style={styles.fromBookingView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.fromBookingTxt}>
                  {propertyDetail[0].property_title}
                </Text>
                <Image style={styles.fromBookingImg} source={Images.UP_ARROW} />
              </View>
              <View
                style={[styles.lineView, {width: wp(310), marginTop: wp(15)}]}
              />
              {TopTabSection()}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFromBookingView1(true);
            }}>
            <View style={[styles.fromBookingView, {flexDirection: 'row'}]}>
              <Text style={styles.fromBookingTxt}>
                {propertyDetail[0].property_title}
              </Text>
              <Image style={styles.fromBookingImg} source={Images.DOWN_ARROW} />
            </View>
          </TouchableOpacity>
        )}

        {fromBookingView2 ? (
          <TouchableOpacity
            onPress={() => {
              setFromBookingView2(false);
            }}>
            <View style={styles.fromBookingView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.fromBookingTxt}>
                  {propertyDetail[0].property_title}
                </Text>
                <Image style={styles.fromBookingImg} source={Images.UP_ARROW} />
              </View>
              <View
                style={[styles.lineView, {width: wp(310), marginTop: wp(15)}]}
              />
              {PriceDetail()}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFromBookingView2(true);
            }}>
            <View style={[styles.fromBookingView, {flexDirection: 'row'}]}>
              <Text style={styles.fromBookingTxt}>Amount to be paid</Text>
              <Text style={[styles.fromBookingTxt, {flex: 0}]}>
                {propertyDetail[0].property_price.currency}{' '}
                {propertyDetail[0].property_price.basePrice}
                {'  '}
              </Text>
              <Image style={styles.fromBookingImg} source={Images.DOWN_ARROW} />
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {route.params.fromBookingDetail == true ? FromBookingView() : null}
        <Text style={styles.titleTextStyle}>{GetLabel('saved_card')}</Text>
        {SavedCardView(savedCard)}
        <View style={styles.lineStyle} />
        <Text style={styles.titleTextStyle}>
          {GetLabel('add_payment_method')}
        </Text>

        {AddPaymentView(addPayment)}
      </ScrollView>
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
    backgroundColor: Colors.SEARCH_BORDER,
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  titleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginHorizontal: wp(16),
    marginTop: wp(20),
  },
  addPaymentTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.BOLD,
    lineHeight: 18,
    marginTop: wp(28),
    marginLeft: wp(16),
  },
  cardViewStyle: {
    flex: 1,
    marginHorizontal: wp(16),
    marginBottom: 0,
  },
  viewStyle: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: wp(8),
    marginRight: wp(16),
  },
  rightImageStyle: {
    width: wp(14),
    height: wp(14),
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: wp(28),
  },
  rightDotStyle: {
    width: wp(5),
    height: wp(16),

    marginTop: wp(28),
  },
  paymentImageStyle: {
    height: wp(36),
    width: wp(60),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(20),
    marginBottom: wp(20),
    marginLeft: wp(8),
  },
  mainViewStyle: {
    marginTop: wp(20),
  },
  cardNameTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginTop: wp(16),
    marginLeft: wp(16),
  },
  cardNumberTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 18,
    marginTop: wp(4),
    marginLeft: wp(16),
  },
  defaultImageStyle: {
    height: wp(16),
    width: wp(52),
    resizeMode: 'contain',
    marginTop: wp(20),
  },
  defaultImageViewStyle: {
    flex: 1,
    marginLeft: wp(6),
  },
  lineStyle: {
    height: 1,
    marginTop: wp(20),
    width: wp(343),
    marginLeft: wp(16),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  bottomDotImageStyle: {
    width: wp(32),
    height: wp(30),
    marginTop: wp(7),
    marginLeft: wp(16),
  },
  viewRowStyle: {
    flexDirection: 'row',
  },
  fromBookingView: {
    padding: 16,
    backgroundColor: Colors.SEARCH_BACKGROUND,
    borderRadius: 16,
    // flexDirection: 'row',
    marginTop: wp(20),
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  fromBookingTxt: {
    color: Colors.GREY_TONE,
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
    flex: 1,
  },
  fromBookingImg: {
    width: wp(14),
    height: wp(10),
    alignSelf: 'center',
  },

  // Top Selection View
  checkingStyle: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 25,
    marginBottom: wp(5),
    alignSelf: 'center',
    width: wp(343),
    justifyContent: 'space-around',
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
  bookingDetailViewContainer: {
    margin: wp(10),
  },
  titleTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
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
