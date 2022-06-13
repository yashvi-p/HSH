import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Images} from '../../../Assets/Images';
import {wp} from '../../../Helper/Responsive';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../Assets/Colors';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setPlaceApiAddress} from '../../../Redux/Actions/generalAction';

export default function SearchScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const placeApiAddress = useSelector(
    state => state.generalReducer.placeApiAddress,
  );
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={styles.containerView}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              marginRight: 10,
              width: wp(24),
              height: wp(24),
              alignSelf: 'center',
            }}>
            <Image style={styles.arrowImage} source={Images.LEFT_ARROW} />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              let objectAddress = {};
              objectAddress.data = data;
              objectAddress.details = details;
              dispatch(setPlaceApiAddress(objectAddress));

              setTimeout(() => {
                navigation.navigate('SearchProperty');
              }, 200);
            }}
            query={{
              key: 'AIzaSyByZoECTFi_Xb0FJs5Pe4WEIaPWdpF9x6M',
              language: 'en',
            }}
            styles={{
              textInputContainer: {
                padding: 0,
                height: wp(30),
              },
              textInput: {
                fontFamily: Fonts.REGULAR,
                fontSize: FontSizes.Size_15,
                color: Colors.BLACK,
                height: wp(30),
                padding: 0,
              },
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{width: wp(12), height: wp(12), alignSelf: 'center'}}
              source={Images.CROSS_ICON}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lineView} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  arrowImage: {
    width: wp(14),
    height: wp(14),
    alignSelf: 'center',
  },
  lineView: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.SEARCH_BORDER,
    // marginLeft: wp(16),
    // marginRight: wp(16),
    marginTop: wp(16),
  },
});
