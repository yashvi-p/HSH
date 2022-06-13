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
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {Images} from '../../../Assets/Images';
import {hp, wp} from '../../../Helper/Responsive';
import {Colors} from '../../../Assets/Colors';
import {Labels} from '../../../Assets/Labels';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {Header} from '@react-navigation/stack';
import IncrementDecrement from '../../../Components/IncrementDecrement';
import CustomButton from '../../../Components/CustomButton';
import {getLabelValue} from '../../../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAdult,
  setChildren,
  setRoom,
} from '../../../Redux/Actions/generalAction';
import LoaderView from '../../../Components/LoaderView';

export default function AddGuest({navigation}) {
  const CustomHeader = props => {
    return (
      <View style={{backgroundColor: Colors.WHITE}}>
        <Header {...props} />
      </View>
    );
  };

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const [adult, setAdults] = useState(0);
  const [children, setChildrens] = useState(0);
  const [room, setRooms] = useState(0);

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
    headerTitle: `${GetLabel('add_guests')}`,
    headerRight: props => (
      <TouchableOpacity
        onPress={() => {
          dispatch(setAdult(''));
          dispatch(setChildren(''));
          dispatch(setRoom(''));
          setTimeout(() => {
            setIsLoading(false);

            navigation.goBack();
          }, 10);
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
          <Text
            style={{
              color: Colors.GREY_80,
              fontFamily: Fonts.MEDIUM,
              fontSize: FontSizes.Size_12,
              marginRight: 16,
            }}>
            {GetLabel('reset')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  });

  const ScrollItem = () => {
    return (
      <View>
        {ScrollItemView(GetLabel('adults'))}
        {ScrollItemView(GetLabel('children'))}
        {ScrollItemView(GetLabel('room'))}
      </View>
    );
  };

  const ApplyButton = () => {
    return (
      <View style={styles.applyButton}>
        <CustomButton
          additionalStyle={{
            alignSelf: 'center',
            marginBottom: wp(15),
            marginTop: wp(15),
          }}
          buttonWidth={wp(343)}
          onPress={() => {
            dispatch(setAdult(adult));
            dispatch(setChildren(children));
            dispatch(setRoom(room));
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);

              navigation.goBack();
            }, 10);
            // navigation.goBack();
            console.log('Total', adult + children + room);
          }}
          title={GetLabel('apply')}
        />
      </View>
    );
  };

  const ScrollItemView = title => {
    return (
      <View
        style={
          title == GetLabel('children')
            ? [styles.scrollItemView, {height: wp(82)}]
            : styles.scrollItemView
        }>
        {title == GetLabel('children') ? (
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={[styles.titleText, {color: Colors.GREY_80}]}>
              {GetLabel('ages_0-17')}
            </Text>
          </View>
        ) : (
          <Text style={styles.titleText}>{title}</Text>
        )}

        <View style={{marginRight: 15}}>
          <IncrementDecrement
            onPressed={data => {
              if (title == GetLabel('adults')) setAdults(data);

              if (title == GetLabel('children')) setChildrens(data);

              if (title == GetLabel('room')) setRooms(data);

              console.log('Data', data, 'title == ', title);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <WhiteStatusBar />

      <View style={styles.lineView} />
      {isLoading == true ? <LoaderView /> : null}

      <View style={styles.scrollView}>{ScrollItem()}</View>
      {ApplyButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  applyButton: {
    bottom: wp(20),
    position: 'absolute',
    alignSelf: 'center',
  },
  scrollView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(24),
    marginBottom: wp(16),
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  scrollItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    backgroundColor: Colors.WHITE,
    height: wp(64),
    width: wp(343),
    marginTop: wp(16),
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: wp(16),
  },
  titleText: {
    fontSize: FontSizes.Size_15,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY_TONE,
    lineHeight: 26,
  },
});
