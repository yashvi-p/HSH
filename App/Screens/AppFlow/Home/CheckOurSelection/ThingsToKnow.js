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
import {getLabelValue} from '../../../../Helper/database';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Fonts} from '../../../../Assets/Fonts';
import {Colors} from '../../../../Assets/Colors';
import {wp} from '../../../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';

export default function ThingsToKnow() {
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const navigation = useNavigation();
  const [houseRules, setHouseRules] = useState([
    {
      id: 1,
      description: 'Check-in: Flexible',
      image: Images.NOUN_CLOCK,
    },
    {
      id: 2,
      description: 'Check out: 11:00 am',
      image: Images.NOUN_CLOCK,
    },
    {
      id: 3,
      description: 'Not suitable for children and infants',
      image: Images.NOUN_STROLLER,
    },
    {
      id: 4,
      description: 'No smoking',
      image: Images.NOUN_NO_SMOKING,
    },
  ]);
  const [healthSafety, setHealthSafety] = useState([
    {
      id: 1,
      description: 'No carbon monoxide alarm',
      image: Images.CAUTION,
    },
    {
      id: 2,
      description: 'No smoke alarm',
      image: Images.CAUTION,
    },
    {
      id: 3,
      description: 'Nearby lake, river, other body of water',
      image: Images.CAUTION,
    },
    {
      id: 4,
      description: 'Potential for noise',
      image: Images.CAUTION,
    },
  ]);

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
    headerTitle: 'Things to know',
    headerRight: props => <View></View>,
  });

  const flatlist = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <View>
            <View style={styles.viewStyle}>
              <Image style={styles.imageStyle} source={item.image} />
              <Text style={styles.descriptionTextStyle}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.drawlineHeaderStyle}></View>
        <View style={styles.mainViewStyle}>
          <View>
            <Text style={styles.titleTextStyle}>{GetLabel('house_rules')}</Text>
          </View>
          {flatlist(houseRules)}
          <View style={styles.drawline}></View>
          <Text style={styles.titleTextStyle}>
            {GetLabel('health_&_Safety')}
          </Text>
          {flatlist(healthSafety)}
          <View style={styles.drawline}></View>
          <Text style={styles.titleTextStyle}>
            {GetLabel('cancellation_policy')}
          </Text>
          <Text style={styles.descriptionTextStyle}>
            {
              'Free cancellation before 11 Feb Review the Host’s full cancellation policy which applies even if you cancel for disruptions caused by COVID-19.'
            }
          </Text>
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
  titleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginTop: wp(20),
    marginHorizontal: wp(16),
  },
  drawlineHeaderStyle: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
  },
  descriptionTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 26,
    marginLeft: wp(10),
    marginTop: wp(20),
  },
  imageStyle: {
    height: wp(20),
    width: wp(20),
    marginLeft: wp(16),
    marginTop: wp(20),
  },
  mainViewStyle: {},
  viewStyle: {
    flexDirection: 'row',
  },
  drawline: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
    marginTop: wp(20),
  },
});
