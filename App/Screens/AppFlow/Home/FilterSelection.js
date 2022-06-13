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
import {wp} from '../../../Helper/Responsive';
import {Colors} from '../../../Assets/Colors';
import {Header} from '@react-navigation/stack';
import {Labels} from '../../../Assets/Labels';
import CircleCheckBox from '../../../Components/CircleCheckBox';
import SquareCheckBox from '../../../Components/SquareCheckBox';
import IncrementDecrement from '../../../Components/IncrementDecrement';
import CustomButton from '../../../Components/CustomButton';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import ToggleButton from '../../../Components/ToggleButton';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderCustomLabel from '../../../Components/SliderCustomLabel';
import {getLabelValue} from '../../../Helper/database';
import {useSelector} from 'react-redux';
const SliderPad = 12;

export default function FilterSelection({navigation}) {
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const textTransformerTimes = value => {
    return value === 0
      ? '12am'
      : (value < 13 ? value : value - 12) + (value < 12 ? 'am' : 'pm');
  };
  const TIME = {min: 0, max: 24};

  const DoubleSlider = ({}) => {
    const {min, max} = TIME;
    const [width, setWidth] = useState(280);
    const [selected, setSelected] = useState(null);

    if (!selected) {
      setSelected([min, max]);
    }

    // Callbacks
    const onLayout = event => {
      setWidth(event.nativeEvent.layout.width - SliderPad * 2);
    };
    const onValuesChangeFinish = values => {
      setSelected(values);
    };

    return (
      <View onLayout={onLayout} style={styles.wrapper}>
        <MultiSlider
          min={min}
          max={max}
          allowOverlap
          values={selected}
          sliderLength={width}
          onValuesChangeFinish={onValuesChangeFinish}
          enableLabel={true}
          customLabel={SliderCustomLabel(textTransformerTimes)}
          trackStyle={{
            height: 10,
            borderRadius: 8,
          }}
          markerOffsetY={3}
          selectedStyle={{
            backgroundColor: Colors.ORANGE,
          }}
          unselectedStyle={{
            backgroundColor: '#BBCDDC',
          }}
        />
      </View>
    );
  };

  const [sortByData, setSortByData] = useState([
    {
      label: 'Most relevant',
    },
    {
      label: 'Newest first',
    },
    {
      label: 'Price: low to high',
    },
    {
      label: 'Price: high to low',
    },
  ]);

  const [typeOfData, setTypeOfData] = useState([
    {
      label: 'Entire place',
    },
    {
      label: 'Private room',
    },
    {
      label: 'Hotel room',
    },
    {
      label: 'Shared room',
    },
  ]);

  const [amenities, setAmenities] = useState([
    {
      label: 'Wifi',
    },
    {
      label: 'Heating',
    },
    {
      label: 'Kitchen',
    },
    {
      label: 'Air conditioning',
    },
  ]);

  const [accessibilityFeatures, setAccessibilityFeatures] = useState([
    {
      label: 'Step-free guest entrance',
    },
    {
      label: 'Shower grab bar',
    },
    {
      label: 'Accessible parking spot',
    },
    {
      label: 'Ceiling or mobile hoist',
    },
  ]);

  const [rooms, setRooms] = useState([
    {
      label: 'Rooms',
    },
    {
      label: 'Beds',
    },
    {
      label: 'Bedrooms',
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
    headerTitle: `${GetLabel('filter')}`,
    headerRight: props => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AppStackFlow', {screen: 'FilterSelection'});
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
              fontSize: FontSizes.Size_11,
              marginRight: 16,
            }}>
            {GetLabel('reset')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  });

  const SortByView = () => {
    return (
      <>
        <Text style={styles.labelTxt}>{GetLabel('sortby')}</Text>

        <FlatList
          style={{
            marginLeft: wp(16),
            marginRight: wp(16),
          }}
          data={sortByData}
          keyExtractor={(item, index) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.sortListView}>
              <Text style={styles.sortFlatListTxt}>{item.label}</Text>
              <CircleCheckBox
                onPress={() => {
                  console.log('CircleCheckBox Clicked');
                }}
              />
            </View>
          )}
        />

        <View style={styles.lineView} />
      </>
    );
  };

  const TypeOfPlace = () => {
    return (
      <>
        <Text style={styles.labelTxt}>{GetLabel('type_of_place')}</Text>

        <FlatList
          style={{
            marginLeft: wp(16),
            marginRight: wp(16),
          }}
          data={typeOfData}
          keyExtractor={(item, index) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.sortListView}>
              <Text style={[styles.sortFlatListTxt, {marginTop: wp(20)}]}>
                {item.label}
              </Text>
              <SquareCheckBox />
            </View>
          )}
        />

        <View style={styles.lineView} />
      </>
    );
  };

  const RangeSeekBar = () => {
    return (
      // <MultiSlider
      //   style={{
      //     containerStyle: {paddingHorizontal: 15},
      //     selectedStyle: {backgroundColor: Colors.RED_TXT},
      //   }}
      //   values={[0, 1000]}
      //   onValuesChangeFinish={values => {
      //     console.log('Values', values);
      //   }}
      //   onValuesChange={values => {
      //     console.log('Values', values);
      //   }}
      //   enabledOne={false}
      //   enabledTwo={true}
      //   sliderLength={SLIDER_WIDTH}
      //   isMarkersSeparated={true}
      //   min={0}
      //   max={1000}
      // />
      <DoubleSlider />
    );
  };

  const PriceRange = () => {
    return (
      <>
        <Text style={styles.labelTxt}>{GetLabel('price_range')}</Text>
        <Text style={styles.instantBookDes}>
          {GetLabel('average_price_is_£180')}
        </Text>
        {RangeSeekBar()}
        <View style={styles.lineView} />
      </>
    );
  };

  const RoomsAndBeds = () => {
    return (
      <>
        <Text style={styles.labelTxt}>{GetLabel('rooms_&_beds')}</Text>
        <FlatList
          style={{
            marginLeft: wp(16),
            marginRight: wp(16),
          }}
          data={rooms}
          keyExtractor={(item, index) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.sortListView}>
              <Text style={[styles.sortFlatListTxt, {marginTop: wp(25)}]}>
                {item.label}
              </Text>
              <IncrementDecrement
                onPressed={data => {
                  console.log('Data', data);
                }}
              />
            </View>
          )}
        />
        <View style={styles.lineView} />
      </>
    );
  };

  const Amenities = () => {
    return (
      <>
        <Text style={styles.labelTxt}>{GetLabel('amenities')}</Text>

        <FlatList
          style={{
            marginLeft: wp(16),
            marginRight: wp(16),
          }}
          data={amenities}
          keyExtractor={(item, index) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.sortListView}>
              <Text style={[styles.sortFlatListTxt, {marginTop: wp(20)}]}>
                {item.label}
              </Text>
              <SquareCheckBox />
            </View>
          )}
        />

        <View style={styles.lineView} />
      </>
    );
  };

  const MoreOptions = () => {
    return (
      <>
        <Text style={styles.labelTxt}>{GetLabel('more_options')}</Text>
        {ToggleButtonView(
          `${GetLabel(
            'you_can_book_listings_without_having_to_wait_for_approval_from_the_host',
          )}`,
        )}
        <Text style={styles.instantBookDes}>{GetLabel('instant_book')}</Text>
        {ToggleButtonView(`${GetLabel('free_cancellation')}`)}
        <Text style={styles.instantBookDes}>
          {GetLabel('book_with_no_worries')}
        </Text>

        {ToggleButtonView(`${GetLabel('superhost')}`)}
        <Text style={styles.instantBookDes}>
          {GetLabel('stay_with_recognized_hosts')}
        </Text>

        <View style={styles.lineView} />
      </>
    );
  };

  const AccessibilityFeatures = () => {
    return (
      <>
        <Text style={styles.labelTxt}>
          {GetLabel('accessibility_features')}
        </Text>

        <FlatList
          style={{
            marginLeft: wp(16),
            marginRight: wp(16),
          }}
          data={accessibilityFeatures}
          keyExtractor={(item, index) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.sortListView}>
              <Text style={[styles.sortFlatListTxt, {marginTop: wp(20)}]}>
                {item.label}
              </Text>
              <SquareCheckBox />
            </View>
          )}
        />

        <View style={styles.lineView} />
      </>
    );
  };

  const ApplyButton = () => {
    return (
      <CustomButton
        additionalStyle={{
          alignSelf: 'center',
          marginBottom: wp(30),
          marginTop: wp(15),
        }}
        buttonWidth={wp(343)}
        onPress={() => {
          navigation.navigate('AppStackFlow', {
            screen: 'CheckOurSelection',
          });
        }}
        title={GetLabel('apply')}
      />
    );
  };

  const ToggleButtonView = title => {
    return (
      <View style={styles.toggleButtonView}>
        <Text style={styles.toggleButtonText}>{title}</Text>
        <ToggleButton />
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <WhiteStatusBar />
      <ScrollView
        style={styles.containerView}
        showsVerticalScrollIndicator={false}>
        {SortByView()}
        {TypeOfPlace()}
        {PriceRange()}
        {RoomsAndBeds()}
        {Amenities()}
        {MoreOptions()}
        {AccessibilityFeatures()}
        {ApplyButton()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  wrapper: {
    flex: 1,
    margin: SliderPad * 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  instantBookDes: {
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_13,
    marginLeft: wp(16),
    marginRight: wp(16),
  },
  toggleButtonView: {
    flexDirection: 'row',
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(15),
  },
  toggleButtonText: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_15,
    flex: 1,
  },
  labelTxt: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_17,
    color: Colors.SEARCH_TEXT,
    marginLeft: wp(16),
    marginTop: wp(20),
    marginBottom: wp(20),
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
  lineView: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.SEARCH_BORDER,
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(16),
  },
});
