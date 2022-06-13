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
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {Images} from '../../../Assets/Images';
import {wp} from '../../../Helper/Responsive';
import {Colors} from '../../../Assets/Colors';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {useState} from 'react';
import {Header} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import CardViewWrapper from '../../../Components/CardViewWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../Helper/database';
import CheckImage from '../../../Components/CheckImage';
import AppTextInput from '../../../Components/AppTextInput';
import CustomButton from '../../../Components/CustomButton';
import {Formik} from 'formik';
import {setLabels, setUserLanguageId} from '../../../Redux/Actions/authAction';
import axios from 'axios';
import LoaderView from '../../../Components/LoaderView';
import {ApiConfigFormData} from '../../../Helper/ApiConfig';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../Components/ToastMessage';

export default function GlobalPreferences() {
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const languageData = useSelector(state => state.authReducer.languageData);
  const [isLoading, setIsLoading] = useState(false);

  console.log('languageData', languageData);
  const navigation = useNavigation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [timezoneModal, setTimezoneModal] = useState(false);
  const language_id = useSelector(state => state.authReducer.language_id);

  const [selected, setSelected] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language_id);
  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };
  const dispatch = useDispatch();
  const [global, setGlobal] = useState([
    {
      id: 1,
      title: GetLabel('preferred_language'),
      description: language_id,
      edit_button: 'EDIT',
    },
    {
      id: 2,
      title: GetLabel('preferred_currency'),
      description: 'Pound sterling',
      edit_button: 'EDIT',
    },
    {
      id: 3,
      title: GetLabel('time_zone'),
      description: '(GMT+01:00) Europe/Paris',
      edit_button: 'EDIT',
    },
  ]);
  const [language, setLanguage] = useState([
    {
      id: 1,
      label: ` ${GetLabel('english')}`,
      language: `${GetLabel('united_Kingdom')}`,
    },
    {
      id: 2,
      label: `${GetLabel('français')}`,
      language: `${GetLabel('france')}`,
    },
    {
      id: 3,
      label: `${GetLabel('deutsch')}`,
      language: `${GetLabel('deutschland')}`,
    },
    {
      id: 4,
      label: `${GetLabel('italiano')}`,
      language: `${GetLabel('italia')}`,
    },
  ]);

  const [currency, setCurremcy] = useState([
    {
      id: 1,
      label: `${GetLabel('us_dollar')}`,
      currency: `${GetLabel('usd_currency')}`,
    },
    {
      id: 2,
      label: `${GetLabel('euro')}`,
      currency: `${GetLabel('euro_currency')}`,
    },
    {
      id: 3,
      label: `${GetLabel('pound_sterling')}`,
      currency: `${GetLabel('pound_currency')}`,
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
    headerTitle: 'Global preferences',
    headerRight: props => <View></View>,
  });
  const GlobalView = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <View style={styles.mainViewStyle}>
            <View style={styles.viewStyle}>
              <View>
                <Text style={styles.titleTextStyle}>{item.title}</Text>
                <Text style={styles.descriptionTextStyle}>
                  {item.description}
                </Text>
              </View>

              <View>
                {item.title == GetLabel('preferred_language') ? (
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      setLanguageModalVisible(true);
                    }}>
                    <Text style={styles.buttonTextStyle}>
                      {item.edit_button}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {item.title == GetLabel('preferred_currency') ? (
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      setCurrencyModalVisible(true);
                    }}>
                    <Text style={styles.buttonTextStyle}>
                      {item.edit_button}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {item.title == GetLabel('time_zone') ? (
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      setTimezoneModal(true);
                    }}>
                    <Text style={styles.buttonTextStyle}>
                      {item.edit_button}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            <View style={styles.drawLineStyle}></View>
          </View>
        )}
      />
    );
  };

  const LabelApiCall = language_id => {
    setIsLoading(true);
    var data = new FormData();
    data.append('language_id', `${language_id}`);
    data.append('updated_date_time', '');

    axios(ApiConfigFormData(data, 'labels'))
      .then(function (response) {
        dispatch(setLabels(response.data[0].result));
        setIsLoading(false);
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'AppFlow'}],
        });
        navigation.dispatch(resetAction);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const LanguageModal = data => {
    return (
      <View>
        <View>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setLanguageModalVisible(!languageModalVisible);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={languageModalVisible}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('language')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setLanguageModalVisible(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={data => data.language_id}
                  keyboardShouldPersistTaps={'handled'}
                  renderItem={({item}) => (
                    <View>
                      <View>
                        <View style={styles.ModalViewStyle}>
                          <Text style={styles.modalTextStyle}>
                            {item.language_name}
                          </Text>
                          <View style={styles.verticalLineStyle} />
                          {/* <Text style={styles.modalTextStyle}>
                            {item.language}
                          </Text> */}
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedLanguage(item.language_id);
                              setLanguageModalVisible(false);
                              dispatch(setUserLanguageId(item.language_id));
                              LabelApiCall(item.language_id);
                            }}>
                            {selectedLanguage == item.language_id ? (
                              <Image
                                style={styles.imageStyle}
                                source={Images.CHECK_CIRCLE}
                              />
                            ) : (
                              <Image
                                style={styles.imageStyle}
                                source={Images.UNCHECK_CIRCLE}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                />
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  const CurrencyModal = data => {
    return (
      <View>
        <View>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setCurrencyModalVisible(!currencyModalVisible);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={currencyModalVisible}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('currency')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrencyModalVisible(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={data => data.id}
                  keyboardShouldPersistTaps={'handled'}
                  renderItem={({item}) => (
                    <View>
                      <View>
                        <View style={styles.ModalViewStyle}>
                          <Text style={styles.modalTextStyle}>
                            {item.label}
                          </Text>
                          <View style={styles.verticalLineStyle} />
                          <Text style={styles.modalTextStyle}>
                            {item.currency}
                          </Text>
                          <CheckImage onPressed={() => {}} />
                        </View>
                      </View>
                    </View>
                  )}
                />
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  const TextInputValuesView = () => {
    return (
      <View>
        <AppTextInput
          onPressCountryRegion={() => {
            console.log('Clicked');
          }}
          labelText={GetLabel('choose')}
          isPlaceHolderTextInput={false}
          onChangeText={value => {
            console.log('On change text', value);
          }}
          textInputValue={GetLabel('gmt_timezone')}
        />
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
          marginHorizontal: wp(16),
          justifyContent: 'center',
        }}
        buttonWidth={wp(320)}
        onPress={handleSubmit}
        title={GetLabel('save')}
      />
    );
  };
  const TimeZoneModal = () => {
    return (
      <View>
        <View>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setTimezoneModal(!timezoneModal);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={timezoneModal}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('time_zone')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setTimezoneModal(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: wp(20), marginHorizontal: wp(16)}}>
                  <Formik>
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
                      </>
                    )}
                  </Formik>
                </View>
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      {isLoading == true ? <LoaderView /> : null}

      <View style={styles.drawLineHeader}></View>
      {GlobalView(global)}
      {LanguageModal(languageData)}
      {CurrencyModal(currency)}
      {TimeZoneModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  mainViewStyle: {
    marginTop: wp(20),
    marginHorizontal: wp(16),
  },
  drawLineHeader: {
    height: 1,
    width: wp(375),
    backgroundColor: Colors.SEARCH_BORDER,
  },
  drawLineStyle: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: 1,
    borderRadius: 16,
    opacity: 0.5,
    marginTop: wp(20),
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 26,
  },
  descriptionTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginTop: wp(4),
    width: wp(250),
  },

  buttonStyle: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: wp(16),
    paddingVertical: wp(10),
    borderColor: Colors.GREY_80,
    borderWidth: wp(1),
    borderRadius: 10,
  },

  buttonTextStyle: {
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 18,
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
  modalTitleTextStyle: {
    fontSize: FontSizes.Size_18,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    lineHeight: 23,
    marginTop: wp(30),
    marginLeft: wp(16),
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
    justifyContent: 'space-between',
  },
  checkModalViewStyle: {
    height: wp(58),
    marginTop: wp(16),
    marginHorizontal: wp(16),
    borderColor: Colors.SEARCH_BORDER,
    padding: wp(16),
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },

  modalTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 26,
  },
  verticalLineStyle: {
    height: wp(16),
    width: wp(1),
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  checkImageStyle: {
    height: wp(24),
    width: wp(24),
    resizeMode: 'contain',
  },
  imageStyle: {
    height: wp(24),
    width: wp(24),
    resizeMode: 'contain',
  },
});
