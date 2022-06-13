import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {wp} from '../../../../Helper/Responsive';
import {Colors} from '../../../../Assets/Colors';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {getLabelValue} from '../../../../Helper/database';
import CardViewWrapper from '../../../../Components/CardViewWrapper';
import CustomButton from '../../../../Components/CustomButton';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {Header} from '@react-navigation/stack';
export default function PaymentMethods() {
  const navigation = useNavigation();
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
          <Image source={Images.CROSS_ICON} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Payout methods',
    headerRight: props => <View></View>,
  });

  const [savedCard, setSavedCard] = useState([
    {
      id: 1,
      image: Images.ACCOUNT,
      label: `${GetLabel('bank_account_ending_in_6576')}`,
      status: Images.DEFAULT,
    },
    {
      id: 2,
      image: Images.ACCOUNT,
      label: `${GetLabel('bank_account_ending_in_6576')}`,
      status: '',
    },
  ]);
  const SavedCardView = data => {
    return (
      <View style={styles.mainViewStyle}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.id}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.cardViewStyle}>
                <CardViewWrapper padding={5}>
                  <View style={styles.viewStyle}>
                    <Image
                      source={item.image}
                      style={styles.paymentImageStyle}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                      {item.status == Images.DEFAULT ? (
                        <View>
                          <Text style={styles.defaultLabelTextStyle}>
                            {item.label}
                          </Text>
                          <View style={styles.defaultImageViewStyle}>
                            <Image
                              source={item.status}
                              style={styles.defaultImageStyle}
                            />
                          </View>
                        </View>
                      ) : (
                        <View>
                          <Text style={styles.labelTextStyle}>
                            {item.label}
                          </Text>
                          <View style={styles.defaultImageViewStyle}>
                            <Image
                              source={item.status}
                              style={styles.defaultImageStyle}
                            />
                          </View>
                        </View>
                      )}

                      <Image
                        source={Images.DOT_RIGHT}
                        style={styles.rightImageStyle}
                      />
                    </View>
                  </View>
                </CardViewWrapper>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleTextStyle}>{GetLabel('saved_account')}</Text>
        {SavedCardView(savedCard)}
        <CustomButton
          additionalStyleText={{
            fontSize: FontSizes.Size_14,
            fontFamily: Fonts.BOLD,
          }}
          additionalStyle={{
            alignSelf: 'center',
            marginTop: wp(24),
            height: wp(46),
            justifyContent: 'center',
            marginBottom: wp(20),
          }}
          buttonWidth={wp(343)}
          onPress={() => {
            navigation.navigate('AppStackFlow', {screen: 'PaymentsPayouts'});
          }}
          title={GetLabel('add_payout_method')}
        />
      </ScrollView>
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
    backgroundColor: Colors.SEARCH_BORDER,
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  titleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginHorizontal: wp(16),
    marginTop: wp(24),
  },
  cardViewStyle: {
    flex: 1,
    marginHorizontal: wp(16),
    marginBottom: 0,
  },
  viewStyle: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: wp(8),
    marginRight: wp(16),
  },
  rightImageStyle: {
    width: wp(5),
    height: wp(15),

    marginTop: wp(28),
  },
  paymentImageStyle: {
    height: wp(22),
    width: wp(24),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(24),
    marginBottom: wp(24),
    marginLeft: wp(16),
  },
  mainViewStyle: {
    marginTop: wp(16),
  },
  defaultLabelTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginTop: wp(14),
    marginLeft: wp(16),
  },
  labelTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginTop: wp(24),
    marginLeft: wp(16),
  },
  defaultImageStyle: {
    height: wp(16),
    width: wp(52),
    resizeMode: 'contain',
    marginTop: wp(4),
  },
  defaultImageViewStyle: {
    flex: 1,
    marginLeft: wp(16),
  },
});
