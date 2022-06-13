import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {Colors} from '../../../Assets/Colors';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {FontSizes} from '../../../Assets/FontSizes';
import {Fonts} from '../../../Assets/Fonts';
import {Header} from '@react-navigation/stack';
import {Images} from '../../../Assets/Images';
import {Labels} from '../../../Assets/Labels';
import {wp} from '../../../Helper/Responsive';
import CustomButton from '../../../Components/CustomButton';
import {getLabelValue} from '../../../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {setEndDate, setStartDate} from '../../../Redux/Actions/generalAction';
import LoaderView from '../../../Components/LoaderView';

export default function AddDates({navigation}) {
  const [dates, setDates] = useState({});
  const [dateCount, setDateCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const dispatch = useDispatch();

  const FindDatesBetweenTwoDates = (firstDate, secondDate) => {
    var daylist = GetDaysArray(new Date(firstDate), new Date(secondDate));

    return daylist;
  };

  const GetDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(moment(new Date(dt)).format('YYYY-MM-DD'));
    }

    var origin = arr.shift();
    var destination = arr.pop();
    console.log('array', arr);
    return arr;
  };

  const selectDate = day => {
    let selectedDate = day.dateString;
    if (dates[selectedDate]) {
      const newDates = dates;
      delete newDates[selectedDate];
      setDates(newDates);
    } else {
      const newDates = dates;
      if (dateCount == 0) {
        newDates[selectedDate] = {
          startingDay: true,
          color: `${Colors.RED_TXT}`,
          textColor: 'white',
        };
      } else {
        newDates[selectedDate] = {
          endingDay: true,
          color: `${Colors.RED_TXT}`,
          textColor: 'white',
        };
      }

      if (Object.keys(dates).length == 2) {
        const datesArr = dates;
        setDates([]);
        let arr = Object.keys(datesArr);
        let FinalDatesBetweenTwoDates = FindDatesBetweenTwoDates(
          arr[0],
          arr[1],
        );

        FinalDatesBetweenTwoDates.forEach(data => {
          newDates[data] = {
            color: `${Colors.LIGHT_RED_TXT}`,
          };
        });
      }

      setDates(newDates);
    }
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
    headerTitle: `${GetLabel('add_dates')}`,
    headerRight: props => (
      <TouchableOpacity
        onPress={() => {
          dispatch(setStartDate(''));
          dispatch(setEndDate(''));
          setIsLoading(true);
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
            let objectKeys = Object.keys(dates);
            // console.log(
            //   'objectKeys',
            //   moment(new Date(objectKeys[1])).format('dddd MMMM DD'),
            // );
            dispatch(setStartDate(objectKeys[0]));
            dispatch(setEndDate(objectKeys[1]));
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);

              navigation.goBack();
            }, 10);
          }}
          title={GetLabel('apply')}
        />
      </View>
    );
  };

  return (
    <View>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      {isLoading == true ? <LoaderView /> : null}
      <CalendarList
        onVisibleMonthsChange={months => {
          // console.log('now these months are visible', months);
        }}
        pagingEnabled={true}
        pastScrollRange={0}
        futureScrollRange={12}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={day => {
          if (Object.keys(dates).length < 2) {
            setDateCount(dateCount + 1);
            selectDate(day);
            console.log('Day Selected After', dates);
          }
        }}
        markingType={'period'}
        // markedDates={{
        //   '2022-05-21': {
        //     startingDay: true,
        //     color: `${Colors.RED_TXT}`,
        //     textColor: 'white',
        //   },
        //   '2022-05-22': {color: `${Colors.LIGHT_RED_TXT}`},
        //   '2022-05-23': {
        //     color: `${Colors.LIGHT_RED_TXT}`,
        //     marked: true,
        //   },
        //   '2022-05-24': {color: `${Colors.LIGHT_RED_TXT}`},
        //   '2022-05-25': {
        //     endingDay: true,
        //     color: `${Colors.RED_TXT}`,
        //     textColor: 'white',
        //   },
        // }}
        markedDates={dates}
        theme={{
          textDayFontFamily: Fonts.REGULAR,
          textDayFontSize: FontSizes.Size_13,
          textDayHeaderFontFamily: Fonts.REGULAR,
          textDayHeaderFontSize: FontSizes.Size_13,
          'stylesheet.calendar.header': {
            monthText: {
              fontSize: FontSizes.Size_16,
              fontFamily: Fonts.REGULAR,
              color: Colors.BLACK,
              textAlign: 'left',
            },
          },
        }}
      />

      {ApplyButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  applyButton: {
    bottom: wp(10),
    position: 'absolute',
    alignSelf: 'center',
  },
});
