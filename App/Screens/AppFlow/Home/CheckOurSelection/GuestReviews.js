import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../../../Assets/Images';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Fonts} from '../../../../Assets/Fonts';
import {Colors} from '../../../../Assets/Colors';
import {wp} from '../../../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import CardViewWrapper from '../../../../Components/CardViewWrapper';
// import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
export default function GuestReviews() {
  const navigation = useNavigation();

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
    headerTitle: 'Guest review',
    headerRight: props => <View></View>,
  });

  const flatAmenities = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <View style={styles.mainViewStyle}>
            <View style={styles.cardViewStyle}>
              <CardViewWrapper padding={5}>
                <View style={styles.viewStyle}>
                  <View>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                    <Text style={styles.dateStyle}>{item.date}</Text>
                  </View>
                  <Image
                    source={Images.DASHBOARD_IMAGE1}
                    style={styles.imageStyle}
                  />
                </View>

                <Text style={styles.descriptionStyle}>{item.description}</Text>
                <Text style={styles.readmoreStyle}>{item.readmore}</Text>
              </CardViewWrapper>
            </View>
          </View>
        )}
      />
    );
  };
  const TopView = () => {
    return (
      <View>
        <View style={styles.mainViewStyle}>
          <View style={styles.flexdirectionRowView}>
            <Image
              source={Images.RATE_IMAGE}
              style={styles.StarMemberImageStyle}
            />

            <Text style={styles.topRatingStyle}> {data.reviews}</Text>

            <Text style={styles.topReviewsStyle}> {data.reviews_8}</Text>
          </View>
          <View style={styles.topViewStyle}>
            <View>
              <Text style={styles.toptextStyle}>{data.cleanliness}</Text>
              <Text style={styles.textStyle}>{data.communication}</Text>
              <Text style={styles.textStyle}>{data.check_in}</Text>
              <Text style={styles.textStyle}>{data.location}</Text>
            </View>
            <View>
              <Text style={styles.toptextStyle}>{data.reviews}</Text>
              <Text style={styles.textStyle}>{data.reviews}</Text>
              <Text style={styles.textStyle}>{data.reviews}</Text>
              <Text style={styles.textStyle}>{data.reviews}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <WhiteStatusBar /> */}
      <View style={styles.drawlineHeaderStyle} />
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>

      {TopView(data)}
      <View style={styles.drawlineStyle} />
      {flatAmenities(guestreviews)}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
