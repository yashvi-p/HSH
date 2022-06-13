import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {Colors} from '../../../../Assets/Colors';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Fonts} from '../../../../Assets/Fonts';
import {Header} from '@react-navigation/stack';
import IncrementDecrement from '../../../../Components/IncrementDecrement';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setGuestData} from '../../../../Redux/Actions/generalAction';
import {getLabelValue} from '../../../../Helper/database';

export default function GuestSelection() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const [guestCount, setGuestCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [bedRoomCount, setBedRoomCount] = useState(0);
  const [bathRoomCount, setBathRoomCount] = useState(0);

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

  const TopView = () => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={styles.hostTxt}>
          {GetLabel('how_many_guest_do_you_liked_to_welcome')}
        </Text>
      </View>
    );
  };

  const GuestSelectionView = (title, onPress) => {
    return (
      <View style={styles.scrollItemView}>
        <Text style={styles.titleText}>{title}</Text>

        <View style={{marginRight: 15}}>
          <IncrementDecrement
            onPressed={data => {
              onPress(data);
            }}
          />
        </View>
      </View>
    );
  };

  const GuestChange = data => {
    setGuestCount(data);
  };

  const BedsChange = data => {
    setBedCount(data);
  };

  const BedroomsChange = data => {
    setBedRoomCount(data);
  };

  const BathroomsChange = data => {
    setBathRoomCount(data);
  };

  const ScrollItem = () => {
    return (
      <View style={{alignSelf: 'center', marginTop: wp(10)}}>
        {GuestSelectionView('Guests', GuestChange)}
        {GuestSelectionView('Beds', BedsChange)}
        {GuestSelectionView('Bedrooms', BedroomsChange)}
        {GuestSelectionView('Bathrooms', BathroomsChange)}
      </View>
    );
  };

  const goToNextScreen = () => {
    let object = {
      guestCount: guestCount,
      bedCount: bedCount,
      bedRoomCount: bedRoomCount,
      bathRoomCount: bathRoomCount,
    };
    console.log(object);
    dispatch(setGuestData(object));

    navigation.navigate('GuestOffers');
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <View showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {TopView()}
        {ScrollItem()}
      </View>
      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={3}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            goToNextScreen();
          }}
          showNextVisible={true}
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
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
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
  scrollItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    backgroundColor: Colors.WHITE,
    height: wp(64),
    width: wp(343),
    marginTop: wp(16),
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: wp(16),
  },
  titleText: {
    fontSize: FontSizes.Size_15,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY_TONE,
    lineHeight: 26,
  },
});
