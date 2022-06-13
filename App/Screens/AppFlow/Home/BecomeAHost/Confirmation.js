import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../../Assets/Colors';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {
  useNavigation,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';
import {
  setAddressData,
  setAdult,
  setAmenities,
  setChildren,
  setEndDate,
  setGuestData,
  setHostPlace,
  setPlaceDescription,
  setPlaceName,
  setPlacePhotos,
  setRoom,
  setStartDate,
} from '../../../../Redux/Actions/generalAction';

export default function Confirmation() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const dispatch = useDispatch();

  return (
    <ImageBackground
      source={Images.CONFIRMATION_IMAGE}
      style={styles.imageBackground}>
      <View style={styles.cardView}>
        <Image
          source={Images.CONFIRMATION_GIF}
          style={{width: 100, height: 100}}
        />
        <Text style={styles.welcomeTxt}>{GetLabel('welcome')}, Sarah</Text>
        <Text style={styles.desTxt}>{GetLabel('welcome_description')}</Text>
        <TouchableOpacity
          style={styles.listingView}
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('AppStackFlow', {
                screen: 'ManageListings',
              }),
            );
          }}>
          <Text style={styles.listingTxt}>{GetLabel('view_listing')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{name: 'AppFlow'}],
            });
            navigation.dispatch(resetAction);
            dispatch(setAddressData({}));
            dispatch(setHostPlace({}));
            dispatch(setGuestData({}));
            dispatch(setAmenities({}));
            // dispatch(setPlacePhotos([]));
            dispatch(setPlaceName(''));
            dispatch(setPlaceDescription(''));
            dispatch(setStartDate(''));
            dispatch(setEndDate(''));
            dispatch(setAdult(0));
            dispatch(setChildren(0));
            dispatch(setRoom(0));
          }}
          style={[
            styles.listingView,
            {borderColor: Colors.GREY_80, marginBottom: wp(24)},
          ]}>
          <Text style={[styles.listingTxt, {color: Colors.GREY_80}]}>
            {GetLabel('back_to_home')}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  cardView: {
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
    padding: wp(16),
    width: wp(343),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(50),
  },
  gifView: {
    width: wp(100),
    height: wp(100),
  },
  welcomeTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  desTxt: {
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_16,
    margin: wp(16),
    textAlign: 'center',
  },
  listingTxt: {
    color: Colors.RED_TXT,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
    textAlign: 'center',
  },
  listingView: {
    width: wp(295),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.RED_TXT,
    height: wp(38),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(16),
  },
});
