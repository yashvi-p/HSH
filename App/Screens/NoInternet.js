import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../Assets/Colors';
import {FontSizes} from '../Assets/FontSizes';
import {Fonts} from '../Assets/Fonts';
import {Images} from '../Assets/Images';
import {wp} from '../Helper/Responsive';
import Modal from 'react-native-modal';
import {WhiteStatusBar} from '../Components/AppStatusBar';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/core';

export default function NoInternet({show}) {
  const _backAction = () => {
    Alert.alert('HSH', 'Are you sure want to exit app?', [
      {
        text: 'NO',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  // useEffect(() => {
  //   console.log('Calling from no internet', show);
  //   alert(route.params.show);
  // }, []);

  // const route = useRoute();

  return (
    <Modal
      isVisible={show}
      style={{margin: 0}}
      coverScreen
      backdropColor={Colors.WHITE}
      deviceHeight={Dimensions.get('screen').height}
      deviceWidth={Dimensions.get('screen').width}
      onBackButtonPress={() => _backAction()}>
      <View style={styles.viewStyle}>
        <WhiteStatusBar />
        <Image
          source={Images.NO_INTERNET}
          style={{width: wp(343), height: wp(300)}}
        />
        <Text style={styles.infoStyle}>
          You are offline please check internet connection
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  infoStyle: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    textAlign: 'center',
    marginHorizontal: wp(16),
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
