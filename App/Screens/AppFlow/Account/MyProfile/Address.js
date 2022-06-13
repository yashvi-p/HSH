import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
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
import {useSelector} from 'react-redux';
import {useState} from 'react';
import CustomButton from '../../../../Components/CustomButton';
import AppTextInput from '../../../../Components/AppTextInput';
import {Header} from '@react-navigation/stack';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../../Components/ErrorMessage';
import CountryCodes from '../../../../Helper/CountryCodes';
import CardViewWrapper from '../../../../Components/CardViewWrapper';
import Modal from 'react-native-modal';
import CheckImage from '../../../../Components/CheckImage';

export default function Address() {
  const navigation = useNavigation();
  const [country, setCountry] = useState(null);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const [countryItemModal, setCountyItemModal] = useState(false);

  const countryData = useSelector(state => state.authReducer.countryData);

  const [countryDataArray, setCountryDataArray] = useState(countryData);

  const CustomHeader = props => {
    return (
      <View style={{backgroundColor: Colors.WHITE}}>
        <Header {...props} />
      </View>
    );
  };

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .trim()
      .required(GetLabel('street_address_is_required')),
    aptSuite: Yup.string().trim().required(GetLabel('apt_suite_is_required')),
    city: Yup.string().trim().required(GetLabel('city_is_required')),
    postcode: Yup.string().trim().required(GetLabel('postcode_is_required')),
  });

  const [withAlphaFilter, setWithAlphaFilter] = useState(false);

  const onSelect = country => {
    setCountry(country);
    setOpenCountryModal(false);

    console.log('On select country--->', country);
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
    headerTitle: 'Address',
    headerRight: props => <View></View>,
  });
  const TextInputValuesView = (
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
  ) => {
    return (
      <View>
        <AppTextInput
          onPressCountryRegion={() => {
            // setOpenCountryModal(true);
            setCountyItemModal(true);
          }}
          labelText={GetLabel('country_region')}
          isPlaceHolderTextInput={false}
          placeHolderText={GetLabel('phone_number')}
          onChangeText={value => {
            console.log('On change text', value);
          }}
          textInputValue={
            country != null
              ? `${country.name} (+ ${country.country_phone_code})`
              : GetLabel('select_country')
          }
        />

        <AppTextInput
          additionalStyleView={{
            width: wp(343),
            marginTop: wp(20),
          }}
          labelText={GetLabel('street_address')}
          placeHolderText={GetLabel('enter_street_address')}
          value={values.address}
          onChangeText={handleChange('address')}
          isLabelTextInput
        />
        {!touched.address || !errors.address ? null : (
          <ErrorMessage error={errors.address} />
        )}
        <AppTextInput
          additionalStyleView={{
            width: wp(343),
            marginTop: wp(20),
          }}
          labelText={GetLabel('apt_suite_other')}
          placeHolderText={GetLabel('enter_apt_suite_other')}
          keyboardType={'numeric'}
          value={values.aptSuite}
          onChangeText={handleChange('aptSuite')}
          isLabelTextInput
        />
        {!touched.aptSuite || !errors.aptSuite ? null : (
          <ErrorMessage error={errors.aptSuite} />
        )}
        <AppTextInput
          additionalStyleView={{
            width: wp(343),
            marginTop: wp(20),
          }}
          labelText={GetLabel('city')}
          placeHolderText={GetLabel('enter_city')}
          value={values.city}
          onChangeText={handleChange('city')}
          isLabelTextInput
        />
        {!touched.city || !errors.city ? null : (
          <ErrorMessage error={errors.city} />
        )}
        <AppTextInput
          additionalStyleView={{
            width: wp(343),
            marginTop: wp(20),
          }}
          labelText={GetLabel('postcode')}
          placeHolderText={GetLabel('enter_postcode')}
          keyboardType={'numeric'}
          value={values.postcode}
          onChangeText={handleChange('postcode')}
          isLabelTextInput
        />
        {!touched.postcode || !errors.postcode ? null : (
          <ErrorMessage error={errors.postcode} />
        )}
      </View>
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

  const CallCountryModal = () => {
    return (
      <>
        <View style={{marginTop: '100%'}}>
          <CountryPicker
            {...{
              withAlphaFilter,
              onSelect,
            }}
            visible={openCountryModal}
          />
        </View>
      </>
    );
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

  const ContinueButton = handleSubmit => {
    return (
      <CustomButton
        additionalStyleText={{
          fontSize: FontSizes.Size_14,
          fontFamily: Fonts.BOLD,
        }}
        additionalStyle={{
          alignSelf: 'center',
          marginTop: wp(20),
          height: wp(46),

          justifyContent: 'center',
          marginBottom: wp(20),
        }}
        buttonWidth={wp(343)}
        onPress={handleSubmit}
        title={GetLabel('save')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainViewStyle}>
          <View>
            <Formik
              initialValues={{
                address: '',
                aptSuite: '',
                city: '',
                postcode: '',
              }}
              onSubmit={(values, {resetForm}) => {
                navigation.navigate('AccountStack', {screen: 'MyProfile'});

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
                <>
                  {TextInputValuesView(
                    handleChange,
                    handleSubmit,
                    touched,
                    errors,
                    values,
                  )}

                  {ContinueButton(handleSubmit)}
                  {/* {CallCountryModal()} */}
                  {CountryModal(countryDataArray)}
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  leftArrowStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(2),
    marginLeft: wp(16),
  },
  lineView: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  mainViewStyle: {
    marginHorizontal: wp(16),
    marginTop: wp(16),
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
