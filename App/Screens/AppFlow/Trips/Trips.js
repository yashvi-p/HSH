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
import CardViewWrapper from '../../../Components/CardViewWrapper';
import {Images} from '../../../Assets/Images';

import {TabView, TabBar} from 'react-native-tab-view';
import {getLabelValue} from '../../../Helper/database';
import {useSelector} from 'react-redux';

export default function Trips({navigation}) {
  const [data, setData] = useState([
    // {
    //   id: 1,
    //   entire_rental_unit: 'Entire rental unit',
    //   furnished_room_near_cornavin: 'Furnished room near Cornavin',
    //   date: 'Tue, Feb 8  -  Tue, Feb 15',
    //   button_name: 'DETAILS',
    //   status: 'Upcomming',
    // },
    // {
    //   id: 2,
    //   entire_rental_unit: 'Entire rental unit',
    //   furnished_room_near_cornavin: 'Furnished room near Cornavin',
    //   date: 'Tue, Feb 8  -  Tue, Feb 15',
    //   button_name: 'DETAILS',
    //   status: 'Upcomming',
    // },
    // {
    //   id: 3,
    //   entire_rental_unit: 'Entire rental unit',
    //   furnished_room_near_cornavin: 'Furnished room near Cornavin',
    //   date: 'Tue, Feb 8  -  Tue, Feb 15',
    //   button_name: 'DETAILS',
    //   status: 'Upcomming',
    // },
  ]);
  const [data1, setData1] = useState([
    {
      id: 1,
      entire_rental_unit: 'Entire rental units',
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      button_name: 'DETAILS',
      status: 'Upcomming',
    },
    {
      id: 2,
      entire_rental_unit: 'Entire rental unit',
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      button_name: 'DETAILS',
      status: 'Upcomming',
    },
    {
      id: 3,
      entire_rental_unit: 'Entire rental unit',
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      button_name: 'DETAILS',
      status: 'Upcomming',
    },
  ]);
  const [data2, setData2] = useState([
    {
      id: 1,
      entire_rental_unit: 'Entire rental unit',
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      button_name: 'DETAILS',
      status: 'Upcomming',
    },
    {
      id: 2,
      entire_rental_unit: 'Entire rental unit',
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      button_name: 'DETAILS',
      status: 'Upcomming',
    },
    {
      id: 3,
      entire_rental_unit: 'Entire rental unit',
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      button_name: 'DETAILS',
      status: 'Upcomming',
    },
  ]);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Upcoming'},
    {key: '2', title: 'Cancelled'},
    {key: '3', title: 'Completed'},
  ]);

  const renderHeader = props => {
    return <TabBar {...props} />;
  };

  const flateListView = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        ListEmptyComponent={() => (
          <TouchableOpacity style={{marginTop: wp(1)}}>
            <View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.TRIP_ICON}
                  style={styles.heartIconImageStyle}
                />

                <Text style={styles.textStyle}>
                  {GetLabel('looks_empty_you_have_no_upcoming_trips')}
                </Text>
                <View>
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => {
                      navigation.navigate('AppStackFlow');
                    }}>
                    <Text style={styles.buttonTextStyle1}>
                      {GetLabel('plan_a_trip')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.cardViewStyle}>
              <CardViewWrapper padding={5}>
                <View style={styles.viewStyle}>
                  <View>
                    <Text style={styles.entireRentalTextStyle}>
                      {item.entire_rental_unit}
                    </Text>
                    <Text style={styles.furnishedRoomStyle}>
                      {item.furnished_room_near_cornavin}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={Images.DASHBOARD_IMAGE1}
                      style={styles.imageStyle}
                    />
                  </View>
                </View>
                <View style={styles.drawline} />
                <View style={styles.viewStyle}>
                  <View>
                    <Text style={styles.dateStyle}>{item.date}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TripStackFlow');
                      }}
                      style={styles.button}>
                      <Text style={styles.buttonTextStyle}>
                        {item.button_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </CardViewWrapper>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return (
          <View style={styles.container}>
            {/* <View style={styles.drawline} /> */}
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            {flateListView(data)}
          </View>
        );
      case '2':
        return (
          <View style={styles.container}>
            {/* <View style={styles.drawline} /> */}
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            {flateListView(data1)}
          </View>
        );
      case '3':
        return (
          <View style={styles.container}>
            {/* <View style={styles.drawline} /> */}
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            {flateListView(data2)}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      style={styles.container}
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderHeader={renderHeader()}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({route, focused}) => (
            <Text
              style={[
                focused ? styles.activeTabTextColor : styles.tabTextColor,
                styles.tabFontStyle,
              ]}>
              {route.title}
            </Text>
          )}
          style={{backgroundColor: Colors.WHITE}}
          indicatorStyle={{backgroundColor: Colors.RED_TXT}}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cardViewStyle: {
    flex: 1,
    margin: wp(10),
    marginBottom: 0,
  },

  entireRentalTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(16),
    lineHeight: 24,
  },
  furnishedRoomStyle: {
    fontSize: FontSizes.Size_15,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(4),
    lineHeight: 20,
  },
  imageStyle: {
    width: wp(80),
    height: wp(70),
    //resizeMode: 'contain',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: wp(16),
  },

  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  drawline: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
    marginTop: wp(16),
  },
  dateStyle: {
    fontSize: FontSizes.Size_15,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(20),
    opacity: 0.8,
    marginBottom: wp(20),
  },
  button: {
    backgroundColor: Colors.WHITE,
    marginTop: wp(15),
    padding: wp(10),
    borderColor: Colors.RED_TXT,
    borderWidth: wp(1),
    borderRadius: 10,
  },

  buttonTextStyle: {
    color: Colors.RED_TXT,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 18,
    fontSize: FontSizes.Size_12,
  },
  buttonTextStyle1: {
    fontSize: FontSizes.Size_12,
    color: Colors.RED_TXT,
    fontFamily: Fonts.BOLD,
    lineHeight: 18,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabTextColor: {
    color: Colors.RED_TXT,
  },
  tabTextColor: {
    color: Colors.SEARCH_TEXT,
  },
  tabFontStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_16,
    lineHeight: 26,
  },
  heartIconImageStyle: {
    height: wp(45),
    width: wp(45),
    resizeMode: 'contain',
    tintColor: Colors.SEARCH_BORDER,
  },
  button1: {
    backgroundColor: Colors.WHITE,
    marginTop: wp(15),
    paddingHorizontal: wp(16),
    paddingVertical: wp(10),
    borderColor: Colors.RED_TXT,
    borderWidth: wp(1),
    borderRadius: 10,
  },
  textStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(18),
    lineHeight: 26,
    width: wp(290),
    textAlign: 'center',
  },
});
