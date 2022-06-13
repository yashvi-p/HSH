import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState, createContext} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {Colors} from '../../../../Assets/Colors';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import CardViewWrapper from '../../../../Components/CardViewWrapper';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {useDispatch, useSelector} from 'react-redux';
import {setHostPlace} from '../../../../Redux/Actions/generalAction';
import {getLabelValue} from '../../../../Helper/database';

export default function QuestionAndAnswerStep() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [initialStep, setInitialStep] = useState(0);

  const [initialQuestion, setInitialQuestion] = useState(0);
  const [selectedFlatListData, setSelectedFlatListData] = useState([]);

  const [categoryList, setCategoryList] = useState([
    {
      category_id: 1,
      category_name: 'Apartment',
      image:
        'https://www.pymnts.com/wp-content/uploads/2016/05/Hotel-Room-Secondary-Market.jpg',
    },
    {
      category_id: 2,
      category_name: 'House',
      image:
        'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg',
    },
    {
      category_id: 3,
      category_name: 'Secondary unit',
      image:
        'https://images.adsttc.com/media/images/5fff/247e/63c0/17e1/3600/00b7/large_jpg/Lehouse7120.jpg?1610556519',
    },
    {
      category_id: 4,
      category_name: 'Unique space',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAmv0zF2itvpeIoUTaL1edImMcw8bxCFvrrDD3r3CmGHJt_dDt2-BEIt51KHShHU0TrUg&usqp=CAU',
    },
    {
      category_id: 5,
      category_name: 'Bed and breakfast',
      image:
        'https://media.istockphoto.com/photos/breakfast-in-bed-picture-id493769748?k=20&m=493769748&s=612x612&w=0&h=qTlIHlHIbabYCQhgyDehZVODPX8c2k8IZRC8ErNDZSo=',
    },
    {
      category_id: 6,
      category_name: 'Boutique hotel',
      image:
        'https://media.istockphoto.com/photos/breakfast-in-bed-picture-id493769748?k=20&m=493769748&s=612x612&w=0&h=qTlIHlHIbabYCQhgyDehZVODPX8c2k8IZRC8ErNDZSo=',
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

  const FlatListViewCategory = () => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={styles.hostTxt}>
          {GetLabel('what_kind_of_place_will_you_host')}
        </Text>
        <FlatList
          style={{
            alignSelf: 'center',
            marginTop: wp(16),
          }}
          showsVerticalScrollIndicator={false}
          data={categoryList}
          keyExtractor={(item, index) => item.category_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryId(item.category_id);
                setSelectedCategory(item);
                setInitialQuestion(initialQuestion + 1);
              }}>
              <View style={{marginTop: wp(16), width: wp(343)}}>
                <CardViewWrapper padding={wp(5)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.flatListTxt}>{item.category_name}</Text>
                    <Image
                      style={styles.flatListImage}
                      source={{uri: item.image}}
                    />
                  </View>
                </CardViewWrapper>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const QuestionAndAnswerView = () => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={styles.hostTxt}>{questionList[initialQuestion]}</Text>

        {initialQuestion == 2
          ? optionsCatTwo.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    const arr = selectedFlatListData;
                    if (arr.includes(data.option_id)) {
                      setSelectedFlatListData(
                        arr.filter(item => {
                          return item !== data.option_id;
                        }),
                      );
                    } else {
                      setSelectedFlatListData(arr => [...arr, data.option_id]);
                    }
                  }}>
                  <View style={{marginTop: wp(16), width: wp(343)}}>
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        },
                        selectedFlatListData.includes(data.option_id)
                          ? styles.cardViewSelected
                          : styles.cardView,
                      ]}>
                      <Text style={[styles.flatListTxt, {padding: 16}]}>
                        {data.option_name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          : optionsFirstCat.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    const arr = selectedFlatListData;
                    if (arr.includes(data.option_id)) {
                      setSelectedFlatListData(
                        arr.filter(item => {
                          return item !== data.option_id;
                        }),
                      );
                    } else {
                      setSelectedFlatListData(arr => [...arr, data.option_id]);
                    }
                  }}>
                  <View style={{marginTop: wp(16), width: wp(343)}}>
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        },
                        selectedFlatListData.includes(data.option_id)
                          ? styles.cardViewSelected
                          : styles.cardView,
                      ]}>
                      <Text style={[styles.flatListTxt, {padding: 16}]}>
                        {data.option_name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        {optionsFirstCat.map(data => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('Done');
              }}>
              <View style={{marginTop: wp(16), width: wp(343)}}>
                <CardViewWrapper padding={wp(5)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[styles.flatListTxt, {padding: 16}]}>
                      {data.option_name}
                    </Text>
                  </View>
                </CardViewWrapper>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <View style={styles.lineView} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {initialQuestion == 0 ? (
            <View style={{flex: 1}}>{FlatListViewCategory()}</View>
          ) : (
            QuestionAndAnswerView()
          )}
        </ScrollView>
        <View style={styles.backView}>
          <BackAndNextBottom
            progressValue={1}
            backPressed={() => {
              setInitialQuestion(initialQuestion - 1);
            }}
            nextPressed={() => {
              if (initialQuestion == 2) {
                // const resetAction = CommonActions.reset({
                //   index: 0,
                //   routes: [{name: 'SelectAddress'}],
                // });
                // navigation.dispatch(resetAction);
                console.log('selectedCategoryId', selectedCategoryId);
                if (selectedCategoryId != 0) {
                  navigation.navigate('SelectAddress');
                  dispatch(setHostPlace(selectedCategory));
                }
              } else setInitialQuestion(initialQuestion + 1);
            }}
            showNextVisible={true}
          />
        </View>
      </SafeAreaView>
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
  flatListContainerView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(24),
    flex: 1,
  },
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
  },
  flatListImage: {
    width: wp(71),
    height: wp(71),
    overflow: 'hidden',
    borderRadius: 16,
    marginRight: wp(5),
  },
  flatListTxt: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
    padding: 8,
    paddingLeft: 16,
    color: Colors.GREY_TONE,
  },
  flatListTxt1: {
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.MEDIUM,
    paddingBottom: 16,
    paddingLeft: 16,
    color: Colors.SEARCH_TEXT,
  },
  cardView: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.CARD_BORDER_COLOR,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.CARD_BORDER_COLOR,
    borderRadius: 16,
  },
  cardViewSelected: {
    backgroundColor: Colors.SEARCH_BACKGROUND,
    shadowColor: Colors.GREY_80,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: Platform.OS === 'android' ? 0 : wp(85),
  },
  backView: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: Platform.OS === 'android' ? 0 : wp(30),
    backgroundColor: Colors.WHITE,
  },
});

const optionsFirstCat = [
  {
    option_id: 1,
    option_name: 'Rental unit',
  },
  {
    option_id: 2,
    option_name: 'Apartment',
  },
  {
    option_id: 3,
    option_name: 'Loft',
  },
  {
    option_id: 4,
    option_name: 'Serviced apartment',
  },
  {
    option_id: 5,
    option_name: 'Casa particular',
  },
  {
    option_id: 6,
    option_name: 'Holiday home',
  },
];

const optionsSecondCat = [
  {
    option_id: 1,
    option_name: 'Residential home',
  },
  {
    option_id: 2,
    option_name: 'Cabin',
  },
  {
    option_id: 3,
    option_name: 'Villa',
  },
  {
    option_id: 4,
    option_name: 'Townhouse',
  },
  {
    option_id: 5,
    option_name: 'Cottage',
  },
  {
    option_id: 6,
    option_name: 'Bungalow',
  },
  {
    option_id: 7,
    option_name: 'Earth house',
  },
  {
    option_id: 8,
    option_name: 'Houseboat',
  },
  {
    option_id: 9,
    option_name: 'Hut',
  },
  {
    option_id: 10,
    option_name: 'Farm stay',
  },
  {
    option_id: 11,
    option_name: 'Dome house',
  },
  {
    option_id: 12,
    option_name: 'Cycladic house',
  },
  {
    option_id: 13,
    option_name: 'Chalet',
  },
  {
    option_id: 14,
    option_name: 'Dammuso',
  },
  {
    option_id: 15,
    option_name: 'Lighthouse',
  },
  {
    option_id: 16,
    option_name: 'Shepherd’s hut',
  },
  {
    option_id: 17,
    option_name: 'Tiny house',
  },
  {
    option_id: 18,
    option_name: 'Trullo',
  },
  {
    option_id: 19,
    option_name: 'Casa particular',
  },
  {
    option_id: 20,
    option_name: 'Pension',
  },
  {
    option_id: 21,
    option_name: 'Holiday home',
  },
];

const optionsThirdCat = [
  {
    option_id: 1,
    option_name: 'Guest house',
  },
  {
    option_id: 2,
    option_name: 'Guest suite',
  },
  {
    option_id: 3,
    option_name: 'Farm stay',
  },
];

const optionsFourthCat = [
  {
    option_id: 1,
    option_name: 'Barn',
  },
  {
    option_id: 2,
    option_name: 'Boat',
  },
  {
    option_id: 3,
    option_name: 'Bus',
  },
  {
    option_id: 4,
    option_name: 'Campervan/motorhome',
  },
  {
    option_id: 5,
    option_name: 'Treehouse',
  },
  {
    option_id: 6,
    option_name: 'Campsite',
  },
  {
    option_id: 7,
    option_name: 'Castle',
  },
  {
    option_id: 8,
    option_name: 'Cave',
  },
  {
    option_id: 9,
    option_name: 'Dome house',
  },
  {
    option_id: 10,
    option_name: 'Earth house',
  },
  {
    option_id: 11,
    option_name: 'Farm stay',
  },
  {
    option_id: 12,
    option_name: 'Holiday park',
  },
  {
    option_id: 13,
    option_name: 'Hut',
  },
  {
    option_id: 14,
    option_name: 'Igloo',
  },
  {
    option_id: 15,
    option_name: 'Island',
  },
  {
    option_id: 16,
    option_name: 'Lighthouse',
  },
  {
    option_id: 17,
    option_name: 'Plane',
  },
  {
    option_id: 18,
    option_name: 'Ranch',
  },
  {
    option_id: 19,
    option_name: 'Religious building',
  },
  {
    option_id: 20,
    option_name: 'Shepherd’s hut',
  },
  {
    option_id: 21,
    option_name: 'Shipping container',
  },
  {
    option_id: 22,
    option_name: 'Tiny house',
  },
  {
    option_id: 23,
    option_name: 'Tipi',
  },
  {
    option_id: 24,
    option_name: 'Tower',
  },
  {
    option_id: 25,
    option_name: 'Windmill',
  },
  {
    option_id: 26,
    option_name: 'Holiday home',
  },
];

const optionsFifthCat = [
  {
    option_id: 1,
    option_name: 'Bed and breakfast',
  },
  {
    option_id: 2,
    option_name: 'Nature lodge',
  },
  {
    option_id: 3,
    option_name: 'Farm stay',
  },

  {
    option_id: 4,
    option_name: 'Minsu',
  },
  {
    option_id: 5,
    option_name: 'Casa particular',
  },
  {
    option_id: 6,
    option_name: 'Ryokan',
  },
];

const optionsSixthCat = [
  {
    option_id: 1,
    option_name: 'Hotel',
  },
  {
    option_id: 2,
    option_name: 'Hostel',
  },
  {
    option_id: 3,
    option_name: 'Resort',
  },

  {
    option_id: 4,
    option_name: 'Nature lodge',
  },
  {
    option_id: 5,
    option_name: 'Boutique hotel',
  },
  {
    option_id: 6,
    option_name: 'Aparthotel',
  },
];

const optionsCatTwo = [
  {
    option_id: 1,
    option_name: 'An entire place',
  },
  {
    option_id: 2,
    option_name: 'A private room',
  },
  {
    option_id: 3,
    option_name: 'A shared room',
  },
];

const questionList = [
  '',
  'Which of these best describes your place?',
  'What kind of space will guests have?',
];
