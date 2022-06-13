import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../../Assets/Fonts';
import {FontSizes} from '../../../../../Assets/FontSizes';
import {wp} from '../../../../../Helper/Responsive';
import {Images} from '../../../../../Assets/Images';
import {Colors} from '../../../../../Assets/Colors';
import {WhiteStatusBar} from '../../../../../Components/AppStatusBar';
import AppTextInput from '../../../../../Components/AppTextInput';
import CountryPicker from 'react-native-country-picker-modal';
import {useState} from 'react';
import CustomButton from '../../../../../Components/CustomButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../../../Components/ErrorMessage';
import {useDispatch, useSelector} from 'react-redux';
import {setAddressData} from '../../../../../Redux/Actions/generalAction';
import {getLabelValue} from '../../../../../Helper/database';
import Modal from 'react-native-modal';
import CountryCodes from '../../../../../Helper/CountryCodes';
import CheckImage from '../../../../../Components/CheckImage';
import CardViewWrapper from '../../../../../Components/CardViewWrapper';

export default function ConfirmAddress() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const [countryItemModal, setCountyItemModal] = useState(false);
  const countryData = useSelector(state => state.authReducer.countryData);
  const [countryDataArray, setCountryDataArray] = useState(countryData);

  const validationSchema = Yup.object().shape({
    street: Yup.string()
      .trim()
      .required(`${GetLabel('street_is_confirmed')}`),
    flat_suit: Yup.string()
      .trim()
      .required(`${GetLabel('flat_suit_required')}`),
    city: Yup.string()
      .trim()
      .required(`${GetLabel('city_is_confirmed')}`),
    state: Yup.string()
      .trim()
      .required(`${GetLabel('state_is_required')}`),
    postcode: Yup.string()
      .trim()
      .min(4, `${GetLabel('must_be_4_digit')}`)
      .max(6, `${GetLabel('must_be_valid_number')}`)
      .required(`${GetLabel('postcode_is_confirmed')}`),
  });

  const [country, setCountry] = useState(null);
  const [withFilter, setWithFilter] = useState(true);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState('FR');

  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
    setOpenCountryModal(false);

    console.log('On select country--->', country);
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
      fontSize: FontSizes.Size_14,
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
            source={Images.LEFT_ARROW}
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
    headerTitle: `${GetLabel('confirm_your_address')}`,
  });

  const CallCountryModal = () => {
    return (
      <>
        <View
        // style={{marginTop: '100%'}}
        >
          {/* <CountryPicker
            {...{
              withAlphaFilter,
              onSelect,
            }}
            visible={openCountryModal}
          /> */}
          <AppTextInput
            additionalStyleView={{
              width: wp(343),
              alignSelf: 'center',
              marginTop: wp(15),
            }}
            onPressCountryRegion={() => {
              console.log('Clicked');
              // setOpenCountryModal(true);
              setCountyItemModal(true);
            }}
            labelText={GetLabel('country_region')}
            isPlaceHolderTextInput={false}
            placeHolderText={''}
            onChangeText={value => {
              console.log('On change text', value);
            }}
            textInputValue={
              country != null
                ? `${country.name} (+ ${country.country_phone_code})`
                : GetLabel('select_country')
            }
          />
        </View>
      </>
    );
  };

  const SearchFilterFunction = text => {
    const arr = countryDataArray;
    const newData = arr.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setCountryDataArray(newData);
  };

  const CountryModal = data => {
    return (
      <View style={{height: '70%'}}>
        <Modal
          animationType="slide"
          onBackdropPress={() => {
            setCountyItemModal(!countryItemModal);
          }}
          closeOnClick={true}
          transparent={true}
          isVisible={countryItemModal}
          style={{justifyContent: 'flex-end', margin: 0, height: '70%'}}>
          <View>
            <CardViewWrapper padding={5}>
              <View style={styles.modalTopLineStyle} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.modalTitleTextStyle}>Country</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCountyItemModal(false);
                  }}
                  style={{marginTop: 5}}>
                  <Image
                    source={Images.CROSS_ICON}
                    style={styles.closeImageStyle}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholderTextColor={Colors.SEARCH_TEXT}
                style={styles.textInputStyle}
                placeholder={GetLabel('search')}
                onChangeText={data => {
                  SearchFilterFunction(data);
                }}
              />
              <FlatList
                style={{height: '60%', marginTop: wp(20)}}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={data => data.country_id}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCountyItemModal(false);
                      setCountry(item);
                    }}>
                    <View>
                      <View style={styles.ModalViewStyle}>
                        <Text style={styles.modalTextStyle}>{item.name}</Text>
                        <View style={styles.verticalLineStyle} />
                        <Text style={styles.modalTextStyle}>
                          {item.county_short_code}
                        </Text>
                        <CheckImage
                          onPressed={() => {
                            setCountyItemModal(false);
                            setCountry(item);
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.modalBottomLineStyle} />
            </CardViewWrapper>
          </View>
        </Modal>
      </View>
    );
  };

  const FormView = (handleChange, handleSubmit, touched, errors, values) => {
    return (
      <>
        <AppTextInput
          isLabelTextInput
          additionalStyleView={{
            marginTop: wp(15),
            marginLeft: wp(16),
            marginRight: wp(16),
            width: wp(343),
          }}
          labelText={GetLabel('street')}
          placeHolderText={GetLabel('enter_street_address')}
          value={values.street}
          onChangeText={handleChange('street')}
        />
        {!touched.street || !errors.street ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.street}
          />
        )}
        <AppTextInput
          additionalStyleView={{marginTop: wp(20), alignSelf: 'center'}}
          isPlaceHolderTextInput
          placeHolderText={GetLabel('flat_suit_optional')}
          value={values.flat_suit}
          onChangeText={handleChange('flat_suit')}
        />
        {!touched.flat_suit || !errors.flat_suit ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.flat_suit}
          />
        )}
        <AppTextInput
          additionalStyleView={{marginTop: wp(20), alignSelf: 'center'}}
          isPlaceHolderTextInput
          placeHolderText={GetLabel('city')}
          value={values.city}
          onChangeText={handleChange('city')}
        />
        {!touched.city || !errors.city ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.city}
          />
        )}
        <AppTextInput
          additionalStyleView={{marginTop: wp(20), alignSelf: 'center'}}
          isPlaceHolderTextInput
          placeHolderText={GetLabel('state_optional')}
          value={values.state}
          onChangeText={handleChange('state')}
        />
        {!touched.state || !errors.state ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.state}
          />
        )}
        <AppTextInput
          additionalStyleView={{marginTop: wp(20), alignSelf: 'center'}}
          isPlaceHolderTextInput
          placeHolderText={GetLabel('postcode')}
          value={values.postcode}
          onChangeText={handleChange('postcode')}
          keyboardType={'numeric'}
        />
        {!touched.postcode || !errors.postcode ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.postcode}
          />
        )}

        {CallCountryModal()}

        {country != null ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={GetLabel('country_is_required')}
          />
        )}

        <CustomButton
          additionalStyleText={{
            fontSize: FontSizes.Size_14,
            fontFamily: Fonts.SEMIBOLD,
          }}
          additionalStyle={{
            alignSelf: 'center',
            marginTop: wp(20),
            height: wp(46),

            justifyContent: 'center',
          }}
          buttonWidth={wp(343)}
          onPress={handleSubmit}
          title={GetLabel('confirm')}
        />
        {CountryModal(countryDataArray)}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            street: '',
            flat_suit: '',
            city: '',
            state: '',
            postcode: '',
          }}
          onSubmit={(values, {resetForm}) => {
            navigation.goBack();
            let obj = values;
            Object.assign(obj, {country_id: country.country_id});
            Object.assign(obj, {country_name: country.name.trim()});
            Object.assign(obj, {
              country_code: country.country_phone_code.trim(),
            });
            console.log('Values', obj);

            dispatch(setAddressData(values));
            resetForm({values: ''});
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            values,
          }) => (
            <>{FormView(handleChange, handleSubmit, touched, errors, values)}</>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  modalTopLineStyle: {
    backgroundColor: Colors.GREY_80,
    height: wp(4),
    width: wp(30),
    borderRadius: 30,
    opacity: 0.5,
    marginTop: wp(16),
    alignSelf: 'center',
  },
  modalTitleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginTop: wp(30),
    marginLeft: wp(16),
  },
  closeImageStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    marginLeft: wp(20),
    tintColor: Colors.GREY_80,
    marginRight: wp(16),
    marginTop: wp(8),
  },
  ModalViewStyle: {
    height: wp(58),
    marginTop: wp(16),
    marginHorizontal: wp(16),
    borderColor: Colors.SEARCH_BORDER,
    padding: wp(16),
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 26,
    maxWidth: wp(100),
  },
  verticalLineStyle: {
    height: wp(16),
    width: wp(1),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  modalBottomLineStyle: {
    backgroundColor: Colors.NOTIFICATION_BG,
    height: wp(5),
    width: wp(134),
    borderRadius: 10,
    opacity: 0.5,
    bottom: wp(8),
    marginTop: wp(20),
    alignSelf: 'center',
  },
  textInputStyle: {
    padding: 0,
    marginLeft: 18,
    marginRight: 18,
    color: Colors.SEARCH_TEXT,
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    height: wp(45),
    paddingLeft: wp(10),
  },
});
