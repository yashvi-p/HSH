import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {wp} from '../../../../Helper/Responsive';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {Header} from '@react-navigation/stack';
import {Colors} from '../../../../Assets/Colors';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../../Assets/Images';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';
import {setPlacePrice} from '../../../../Redux/Actions/generalAction';

export default function SetPrice() {
  const navigation = useNavigation();
  const [count, setCount] = useState(2000);
  const dispatch = useDispatch();
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

  const TopView = (handleChange, handleSubmit, touched, errors, values) => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={[styles.hostTxt, {fontSize: FontSizes.Size_17}]}>
          {GetLabel('now_comes_the_fun_part_set_your_price')}
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
          {GetLabel('you_can_adjust_price_at_any_time')}
        </Text>
      </View>
    );
  };

  const IncrementAndDecrementView = () => {
    return (
      <>
        <View style={styles.containerView}>
          <TouchableOpacity
            onPress={() => {
              setCount(count > 1 ? count - 1 : 0);
            }}>
            <Image
              style={[styles.incrementImage, {marginLeft: wp(16)}]}
              source={Images.DECREMENT}
            />
          </TouchableOpacity>
          <Text style={styles.countTxt}>{count} USD</Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}>
            <Image
              style={[styles.incrementImage, {marginRight: wp(16)}]}
              source={Images.INCREMENT}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.perNightTxt}>{GetLabel('per_night')}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      {TopView()}
      {IncrementAndDecrementView()}
      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={8}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            dispatch(setPlacePrice(count));
            navigation.navigate('LastQuestion');
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
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
    marginLeft: wp(20),
    marginRight: wp(20),
  },

  containerView: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(20),
  },
  incrementImage: {
    width: wp(32),
    height: wp(32),
    alignSelf: 'center',
  },
  countTxt: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_24,
    color: Colors.GREY_TONE,
    textAlign: 'center',
    width: wp(224),
    alignSelf: 'center',
    textAlignVertical: 'center',
    height: wp(78),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.SEARCH_BORDER,
    margin: 10,
    paddingTop: Platform.OS == 'ios' ? wp(78) / 4 : 0,
  },
  perNightTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_12,
    textAlign: 'center',
  },
});
