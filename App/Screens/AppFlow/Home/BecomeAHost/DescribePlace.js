import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../../Assets/Colors';
import {wp} from '../../../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../Components/ToastMessage';

export default function DescribePlace() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const [selectedFlatListData, setSelectedFlatListData] = useState([]);
  const [flatListData, setFlatListData] = useState([
    {
      id: 1,
      name: 'Peaceful',
    },
    {
      id: 2,
      name: 'Unique',
    },
    {
      id: 3,
      name: 'Family-friendly',
    },
    {
      id: 4,
      name: 'Central',
    },
    {
      id: 5,
      name: 'Spacious',
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

  const TopView = () => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={styles.hostTxt}>
          {GetLabel('now_lets_describe_your_place')}
        </Text>
        <Text
          style={[
            styles.hostTxt,
            {
              fontSize: FontSizes.Size_14,
              color: Colors.GREY_80,
              marginTop: wp(8),
            },
          ]}>
          {GetLabel('choose_upto_3_highlight')}
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
        data={flatListData}
        keyExtractor={(item, index) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              const arr = selectedFlatListData;
              if (arr.includes(item.id)) {
                setSelectedFlatListData(
                  arr.filter(item => {
                    return item !== item.id;
                  }),
                );
              } else {
                setSelectedFlatListData(arr => [...arr, item.id]);
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
                  selectedFlatListData.includes(item.id)
                    ? styles.cardViewSelected
                    : styles.cardView,
                ]}>
                <Text style={[styles.flatListTxt, {padding: 16}]}>
                  {item.name}
                </Text>
              </View>
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
      <ScrollView style={[styles.container, {marginBottom: wp(100)}]}>
        {TopView()}
        {FlatListView()}
      </ScrollView>
      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={5}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            if (selectedFlatListData.length > 4) {
              Toast.show(`Please select upto 3 highlights`, toastMessageConfig);
            } else {
              navigation.navigate('AddDescription');
            }
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
  flatListTxt: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
    padding: 8,
    paddingLeft: 16,
    color: Colors.GREY_TONE,
  },
});
