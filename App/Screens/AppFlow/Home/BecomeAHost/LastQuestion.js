import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {Colors} from '../../../../Assets/Colors';
import {wp} from '../../../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import CircleCheckBox from '../../../../Components/CircleCheckBox';
import SquareCheckBox from '../../../../Components/SquareCheckBox';
import {useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';

export default function LastQuestion() {
  const navigation = useNavigation();

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const [flatListData, setFlatListData] = useState([
    {
      isRadioButton: true,
      question: 'How are you hosting on Home Swiss Home? ',
      options: [
        {option_id: 1, option_name: 'I’m hosting as a private individual'},
        {option_id: 2, option_name: 'm hosting as part of a business '},
      ],
      id: 1,
    },
    {
      isRadioButton: false,
      question: 'Do you have any of these at your place?',
      options: [
        {option_id: 1, option_name: 'Security camera(s)'},
        {option_id: 2, option_name: 'Weapons '},
        {option_id: 3, option_name: 'Dangerous animals '},
      ],
      id: 2,
    },
    {
      isRadioButton: true,
      question: 'How are you hosting on Home Swiss Home? ',
      options: [
        {option_id: 1, option_name: 'I’m hosting as a private individual'},
        {option_id: 2, option_name: 'm hosting as part of a business '},
      ],
      id: 3,
    },
    {
      isRadioButton: false,
      question: 'Do you have any of these at your place?',
      options: [
        {option_id: 1, option_name: 'Security camera(s)'},
        {option_id: 2, option_name: 'Weapons '},
        {option_id: 3, option_name: 'Dangerous animals '},
      ],
      id: 4,
    },
    {
      title: 'Some important things to know',
      description: ` Be sure to comply with your local laws and review Home swiss home's nondiscrimination policy and guest and Host fees. Update your cancellation policy. after you publish.`,
      id: 0,
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

  const TopView = (handleChange, handleSubmit, touched, errors, values) => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={[styles.hostTxt, {fontSize: FontSizes.Size_17}]}>
          {GetLabel('just_a_few_last_questions')}
        </Text>
      </View>
    );
  };

  const FlatListView = () => {
    return (
      <View style={{marginBottom: wp(110)}}>
        <FlatList
          style={{
            marginLeft: wp(16),
            marginRight: wp(16),
          }}
          data={flatListData}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              {item.id == 0 ? (
                <>
                  <Text style={styles.sortFlatListTxt}>{item.title}</Text>
                  <Text
                    style={[
                      styles.sortFlatListTxt,
                      {
                        color: Colors.SEARCH_TEXT,
                        fontSize: FontSizes.Size_14,
                      },
                    ]}>
                    {item.description}
                  </Text>

                  <View
                    style={[
                      styles.lineView,
                      {
                        backgroundColor: Colors.SEARCH_BORDER,
                        marginTop: wp(20),
                        marginBottom: wp(20),
                      },
                    ]}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.sortFlatListTxt}>{item.question}</Text>

                  {item.options != undefined
                    ? item.options.map(data => {
                        return (
                          <View style={styles.sortListView}>
                            <Text
                              style={[
                                styles.sortFlatListTxt,
                                {
                                  color: Colors.SEARCH_TEXT,
                                  fontSize: FontSizes.Size_14,
                                },
                              ]}>
                              {data.option_name}
                            </Text>
                            {item.isRadioButton ? (
                              <CircleCheckBox
                                onPress={() => {
                                  console.log('CircleCheckBox');
                                }}
                              />
                            ) : (
                              <SquareCheckBox />
                            )}
                          </View>
                        );
                      })
                    : null}
                  <View
                    style={[
                      styles.lineView,
                      {
                        backgroundColor: Colors.SEARCH_BORDER,
                        marginTop: wp(20),
                        marginBottom: wp(20),
                      },
                    ]}
                  />
                </>
              )}
            </>
          )}
        />
      </View>
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
          progressValue={9}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            navigation.navigate('CheckOutListing');
          }}
          showNextVisible={true}
          labelText={GetLabel('review_your_listing')}
          viewWidth={wp(160)}
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
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
    marginLeft: wp(20),
    marginRight: wp(20),
  },
  sortListView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortFlatListTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_15,
    flex: 1,
    marginTop: wp(16),
  },
});
