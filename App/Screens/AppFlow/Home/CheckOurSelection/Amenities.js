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

import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../../../Assets/Images';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Fonts} from '../../../../Assets/Fonts';
import {Colors} from '../../../../Assets/Colors';
import {wp} from '../../../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';

export default function Amenities() {
  const navigation = useNavigation();
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

  const propertyDetail = useSelector(
    state => state.generalReducer.propertyDetail,
  );
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
    headerTitle: 'Amenities',
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
            <View style={styles.viewStyle}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/amenities-icon-simple-element-illustration-isolated-trendy-filled-white-background-can-be-used-web-mobile-ui-163775811.jpg',
                }}
              />

              <View style={styles.viewDecStyle}>
                <Text style={styles.textStyle}>{item}</Text>
              </View>
            </View>
            <View style={styles.drawLineStyle}></View>
          </View>
        )}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.drawLine}></View>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      {flatAmenities(propertyDetail[0].amenities)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  drawLineStyle: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
  },
  mainViewStyle: {
    marginTop: wp(20),
  },

  imageStyle: {
    height: wp(25),
    width: wp(25),
    resizeMode: 'contain',
    margin: wp(16),
    borderRadius: 10,
    bottom: wp(10),
  },
  textStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(10),
    lineHeight: 23,
  },
  viewStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  drawLine: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 1,
  },
  viewDecStyle: {
    flex: 1,
  },
});
