import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {wp} from '../../../../Helper/Responsive';
import {Images} from '../../../../Assets/Images';
import {Colors} from '../../../../Assets/Colors';
import {useNavigation} from '@react-navigation/native';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {useState} from 'react';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {useDispatch, useSelector} from 'react-redux';
import {setAmenities} from '../../../../Redux/Actions/generalAction';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../Components/ToastMessage';
import {getLabelValue} from '../../../../Helper/database';

export default function GuestOffers() {
  const navigation = useNavigation();
  const [flatListData, setFlatListData] = useState([
    {
      id: 1,
      image:
        'https://icon-library.com/images/kitchen-icon-png/kitchen-icon-png-21.jpg',
      amenities: 'Kitchen',
    },
    {
      id: 2,
      image:
        'data:image/png;base64,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',
      amenities: 'Free on-street parking',
    },
    {
      id: 3,
      image:
        'https://cdn3.iconfinder.com/data/icons/everyday-life/96/70-512.png',
      amenities: 'Washing machine',
    },
    {
      id: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2FoS4iVWIftUHcfAejpWOJb6EdCDRawLHQ&usqp=CAU',
      amenities: 'Hair dryer',
    },

    {
      id: 5,
      image:
        'data:image/png;base64,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',
      amenities: 'Wifi',
    },
    {
      id: 6,
      image: 'https://cdn-icons-png.flaticon.com/512/114/114735.png?w=360',
      amenities: 'Air conditioning',
    },
    {
      id: 7,
      image:
        'https://banner2.cleanpng.com/20180615/eus/kisspng-cable-television-computer-icons-icon-tv-5b240428b98fc6.3060099315290870167601.jpg',
      amenities: 'TV with standard cable',
    },
    {
      id: 8,
      image:
        'https://icons-for-free.com/download-icon-freezer+fridge+kitchen+refrigerator+icon-1320085808854834658_512.png',
      amenities: 'Refrigerator',
    },

    {
      id: 9,
      image:
        'https://png.pngtree.com/png-vector/20190326/ourlarge/pngtree-vector-barbecue-icon-png-image_867757.jpg',
      amenities: 'BBQ grill',
    },
    {
      id: 10,
      image:
        'https://t4.ftcdn.net/jpg/03/87/22/15/360_F_387221599_m9c2LAqVtNmfCQlSLDDgUBsBZbjloInR.jpg',
      amenities: 'Elevator',
    },
    {
      id: 11,
      image:
        'https://www.creativefabrica.com/wp-content/uploads/2020/01/07/1578393054/Fireplace-icon-black-580x386.jpg',
      amenities: 'Indoor fireplace',
    },
    {
      id: 12,
      image: 'https://icon-library.com/images/iron-icon/iron-icon-25.jpg',
      amenities: 'Iron',
    },
  ]);
  const dispatch = useDispatch();

  const [selectedFlatListData, setSelectedFlatListData] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
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
          {GetLabel('let_guest_know_about_your_place_has_to_offer')}
        </Text>
      </View>
    );
  };

  const FlatListView = () => {
    return (
      <FlatList
        style={{
          marginLeft: wp(16),
          marginBottom: wp(100),
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={flatListData}
        keyExtractor={(item, index) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              const arr = selectedFlatListData;
              if (arr.includes(item.id)) {
                setSelectedFlatListData(
                  arr.filter(data => {
                    return data !== item.id;
                  }),
                );
                setSelectedAmenities(
                  arr.filter(data => {
                    return data !== item.id;
                  }),
                );
              } else {
                setSelectedFlatListData(arr => [...arr, item.id]);
                setSelectedAmenities(arr => [...arr, item]);
              }
            }}>
            <View
              style={
                selectedFlatListData.includes(item.id)
                  ? styles.sortListViewSelected
                  : styles.sortListView
              }>
              <Image
                style={styles.listImage}
                resizeMode={'contain'}
                source={{uri: item.image}}
              />
              <Text style={styles.sortFlatListTxt}>{item.amenities}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />

      {TopView()}
      {FlatListView()}

      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={4}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            if (selectedFlatListData.length > 0) {
              dispatch(setAmenities(selectedAmenities));
              navigation.navigate('AddPhotos');
            } else {
              Toast.show(
                `${GetLabel('please_select_atleast_one_amenities')}`,
                toastMessageConfig,
              );
            }
          }}
          showNextVisible={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainerView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(24),
  },
  backView: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: Platform.OS === 'android' ? 0 : wp(30),
    backgroundColor: Colors.WHITE,
  },
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
    marginLeft: wp(20),
    marginRight: wp(20),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },

  sortListView: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(16),
    height: wp(136),
    width: wp(164),
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    borderRadius: 10,
    marginTop: wp(16),
  },
  sortListViewSelected: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(16),
    height: wp(136),
    width: wp(164),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    borderRadius: 10,
    marginTop: wp(16),
  },
  sortFlatListTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_15,
    flex: 1,
    marginLeft: wp(15),
    marginRight: wp(15),
    textAlign: 'center',
  },
  listImage: {
    width: wp(32),
    height: wp(32),
    flex: 1,
    marginTop: wp(28),
  },
});
