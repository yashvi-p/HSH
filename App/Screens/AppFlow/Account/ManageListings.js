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
import GreyIconSearchTextInput from '../../../Components/GreyIconSearchTextInput';
import {Header} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../Helper/database';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
export default function ManageListings({navigation}) {
  const [selected, setSelected] = useState(false);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const [data, setData] = useState([
    {
      id: 1,
      furnished_room_near_cornavin: 'Furnished room near Cornavin',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      remove_button: 'REMOVE',
      edit_button: 'EDIT',
      preview_button: 'PREVIEW',
      status: 'PENDING',
    },
    {
      id: 2,
      furnished_room_near_cornavin: 'Swiss Luxury Apartments',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      remove_button: 'REMOVE',
      edit_button: 'EDIT',
      preview_button: 'PREVIEW',
      status: 'ACTIVE',
    },
    {
      id: 3,
      furnished_room_near_cornavin: 'Geneva - Cozy Apartment',
      date: 'Tue, Feb 8  -  Tue, Feb 15',
      remove_button: 'REMOVE',
      edit_button: 'EDIT',
      preview_button: 'PREVIEW',
      status: 'ACTIVE',
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
          // height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            // height: '30%',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Images.LEFT_ARROW} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Manage listings',
    headerRight: props => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BecomeHostStack', {screen: 'GetStarted'});
        }}>
        <View
          style={[
            styles.manageListStyle,
            {justifyContent: 'center', alignItems: 'center', marginTop: wp(16)},
          ]}>
          <Image
            source={Images.PLUS}
            style={[styles.addIconStyle, {marginTop: 0}]}
          />
          <Text style={[styles.ManageListTextStyle, {marginTop: 0}]}>
            {/* {labelString(labelApiResponse, 'add', userLanguage)} */}
            {GetLabel('add')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  });
  const ManageListingsView = data => {
    return (
      <FlatList
        data={data}
        style={{marginTop: wp(20)}}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.cardViewStyle}>
              <CardViewWrapper>
                <View style={styles.manageListStyle}>
                  <View style={styles.buttonStyle}>
                    {item.status == 'PENDING' ? (
                      <TouchableOpacity
                        onPress={() => {}}
                        style={styles.PendingButtonStyle}>
                        <Text style={styles.PendingButtonTextStyle}>
                          {item.status}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {}}
                        style={styles.ActiveButtonStyle}>
                        <Text style={styles.ActiveButtonTextStyle}>
                          {item.status}
                        </Text>
                      </TouchableOpacity>
                    )}

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
                <View style={styles.drawLine} />
                <View style={styles.viewStyle}>
                  <Text style={styles.removeButtonStyle}>
                    {item.remove_button}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.EditButtonStyle}>
                    <Text style={styles.EditButtonTextStyle}>
                      {item.edit_button}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.PreviewButtonStyle}>
                    <Text style={styles.PreviewButtonTextStyle}>
                      {item.preview_button}
                    </Text>
                  </TouchableOpacity>
                </View>
              </CardViewWrapper>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  const ManageListingSearch = () => {
    return (
      <View style={styles.searchMainView}>
        <View style={[styles.searchViewStyle]}>
          <GreyIconSearchTextInput />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'FilterSelection'});
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={Images.FILTER}
            style={[
              styles.filterImageStyle,
              {alignSelf: 'center', marginTop: wp(0)},
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineViewStyle} />
      <View style={styles.mainViewStyle} />
      {ManageListingSearch()}
      {ManageListingsView(data)}
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
    margin: wp(10),
    marginBottom: 0,
  },
  furnishedRoomStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 20,
    marginTop: wp(8),
    width: wp(190),
  },
  imageStyle: {
    width: wp(104),
    height: wp(83),
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: wp(16),
  },

  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(16),
  },
  searchMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(16),
    marginTop: wp(20),
  },
  drawLine: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
    marginTop: wp(16),
  },
  removeButtonStyle: {
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    fontSize: FontSizes.Size_12,
    lineHeight: 18,
    marginBottom: wp(20),
    marginTop: wp(30),
  },
  EditButtonStyle: {
    backgroundColor: Colors.WHITE,
    marginBottom: wp(20),
    marginTop: wp(20),
    width: wp(63),
    height: wp(38),
    borderColor: Colors.GREY_80,
    borderWidth: wp(1),
    borderRadius: 10,
    marginLeft: wp(100),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  EditButtonTextStyle: {
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    fontSize: FontSizes.Size_11,
    lineHeight: 18,
  },
  PreviewButtonStyle: {
    backgroundColor: Colors.WHITE,
    marginBottom: wp(20),
    marginTop: wp(20),
    borderColor: Colors.GREY_80,
    borderWidth: wp(1),
    borderRadius: 10,
    width: wp(92),
    height: wp(38),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(10),
  },
  PreviewButtonTextStyle: {
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    fontSize: FontSizes.Size_12,
    lineHeight: 18,
  },
  PendingButtonStyle: {
    marginTop: wp(16),
    backgroundColor: Colors.PENDING_BACKGROUND_COLOR,

    borderRadius: 8,
    height: wp(25),
    width: wp(70),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  PendingButtonTextStyle: {
    color: Colors.PENDING_TEXT_COLOR,
    fontFamily: Fonts.BOLD,
    fontSize: FontSizes.Size_10,
    lineHeight: 13,
  },
  ActiveButtonStyle: {
    backgroundColor: Colors.ACTIVE_TEXT_COLOR,
    paddingHorizontal: wp(12),
    paddingVertical: wp(6),
    borderRadius: 8,
    height: wp(25),
    width: wp(62),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(16),
  },
  ActiveButtonTextStyle: {
    color: Colors.ACTIVE_TEXT_COLOR,
    fontFamily: Fonts.BOLD,
    fontSize: FontSizes.Size_10,
    lineHeight: 13,
    textAlign: 'center',
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  mainViewStyle: {
    bottom: wp(10),
  },
  addIconStyle: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: wp(6),
    marginBottom: wp(10),
    marginTop: wp(16),
  },
  manageListStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: wp(16),
    marginLeft: wp(16),
  },
  ManageListTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    lineHeight: 18,
    marginRight: wp(13),
    marginBottom: wp(10),
    marginTop: wp(16),
  },

  lineViewStyle: {
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    elevation: 1,
  },
  searchViewStyle: {
    width: wp(297),
    height: wp(36),
  },
  filterImageStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    marginTop: wp(10),
    marginRight: wp(16),
  },
});
