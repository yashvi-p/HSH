import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Colors} from '../../../Assets/Colors';
import {Fonts} from '../../../Assets/Fonts';
import {FontSizes} from '../../../Assets/FontSizes';
import {Images} from '../../../Assets/Images';
import {wp} from '../../../Helper/Responsive';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import ImagePicker from 'react-native-image-crop-picker';
import {
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {useState} from 'react';
import AppTextInput from '../../../Components/AppTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../../Components/CustomButton';
import {getLabelValue} from '../../../Helper/database';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function MyProfile() {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState({});

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const data = [
    {label: 'Select Gender', value: '0'},
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
  ];

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(GetLabel('name_is_required')),
  });

  const FlatListData = [
    {
      id: 1,
      name: 'Email',
      isEdited: '1',
      detail: 'sarahschmid@gmail.com',
      routeName: 'AppStackFlow',
      flow_name: 'Email',
    },
    {
      id: 2,
      name: 'Phone number',
      isEdited: '1',
      detail: '+41 835 523 132',
      routeName: 'AppStackFlow',
      flow_name: 'PhoneNumber',
    },
    {
      id: 3,
      name: 'Address',
      isEdited: '0',
      detail: '',
      routeName: 'AppStackFlow',
      flow_name: 'Address',
    },
    {
      id: 4,
      name: 'Government ID',
      isEdited: '0',
      detail: '',
      routeName: 'AppStackFlow',
      flow_name: 'GovernmentId',
    },
    {
      id: 5,
      name: 'Emergency contact',
      isEdited: '0',
      detail: '',
      routeName: 'AppStackFlow',
      flow_name: 'EmergencyContact',
    },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [datePickerModal, SetDatePickerModal] = useState(false);
  const [selectedDates, setSelectedDate] = useState();

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
      fontFamily: Fonts.SEMIBOLD,
      fontSize: FontSizes.Size_16,
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
          <Image source={Images.LEFT_ARROW} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Profile',
  });

  const getStoragePermission = async fileType => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(response => {
          console.log('Android', response);
          if (response === RESULTS.GRANTED) {
            OpenGallery();

            console.log('Granted Storage Permission');
          } else {
            openSettings().catch(error => console.log(error));
            console.log('Storage Permission Denied');
          }
        })
        .catch(error => {
          console.warn('Storage Permission denied');
          console.log(error);
        });
    } else {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(response => {
          console.log('IOS', response);
          if (response === RESULTS.GRANTED) {
            OpenGallery();

            console.log('Granted Storage Permission');
          } else {
            openSettings().catch(error => console.log(error));
            console.log('Storage Permission Denied');
          }
        })
        .catch(error => {
          console.warn('Storage Permission Denied');
          console.log(error);
        });
    }
  };

  const OpenGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 400,
      height: 400,
      compressImageQuality: 0.3,
      cropping: true,
    }).then(response => {
      console.log('response', response);
      setImageData(response);
    });
  };

  const isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  const ImageView = () => {
    console.log('imageData', isEmpty(imageData));
    return (
      <>
        <View style={styles.imagesView}>
          <Image
            style={styles.imageView}
            source={
              isEmpty(imageData)
                ? Images.DASHBOARD_IMAGE
                : {uri: imageData.path}
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            getStoragePermission();
          }}>
          <Text style={styles.updatePhoto}>{GetLabel('update_photo')}</Text>
        </TouchableOpacity>
      </>
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
          labelText={GetLabel('legal_name')}
          placeHolderText={GetLabel('enter_name')}
          value={values.name}
          onChangeText={handleChange('name')}
        />
        {!touched.name || !errors.name ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.name}
          />
        )}

        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: Colors.RED_TXT}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? `${GetLabel('select_gender')}` : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            SetDatePickerModal(true);
          }}
          style={[
            {
              paddingTop: 10,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: wp(16),
              marginLeft: wp(3),
            },
          ]}>
          <Text style={styles.textWithBorder}>
            {' '}
            {GetLabel('date_of_birth')}
          </Text>
          <View style={[styles.inputWithBorder, {height: wp(50)}]}>
            <Text
              style={[styles.textInputTxt, {flex: 1, paddingTop: wp(13)}]}
              placeholderTextColor={Colors.SEARCH_TEXT}
              placeholder={''}>
              {selectedDates == undefined
                ? GetLabel('select_date')
                : moment(selectedDates.toString()).format('ddd, DD MMM YYYY')}
            </Text>
            <Image style={styles.imageViews} source={Images.CALENDER_ICON} />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={datePickerModal}
          date={selectedDates == undefined ? new Date() : selectedDates}
          mode="date"
          maximumDate={new Date()}
          onConfirm={selectedDate => {
            setSelectedDate(selectedDate);
            SetDatePickerModal(false);
            console.log('', selectedDates, '&', typeof selectedDates);
          }}
          onCancel={() => {
            SetDatePickerModal(false);
          }}
        />
      </>
    );
  };

  const FlatListView = () => {
    return (
      <View>
        <View
          style={[
            styles.lineView,
            {width: wp(343), alignSelf: 'center', marginTop: wp(20)},
          ]}
        />
        <FlatList
          style={{
            marginLeft: wp(16),
            marginTop: wp(10),
            marginBottom: wp(25),
          }}
          data={FlatListData}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              <TouchableOpacity>
                <View style={styles.mainListViewContainer}>
                  <View style={styles.listView}>
                    <Text style={styles.emailTxt}>{item.name}</Text>
                    <Text style={styles.detailTxt}>
                      {item.detail != '' ? item.detail : 'Not Provided'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={
                      item.isEdited == '1'
                        ? [styles.borderButton, {width: wp(85)}]
                        : styles.borderButton
                    }
                    onPress={() => {
                      navigation.navigate(item.routeName, {
                        screen: item.flow_name,
                      });
                    }}>
                    <Text style={styles.updateTxt}>
                      {item.isEdited == '1'
                        ? GetLabel('update')
                        : GetLabel('add')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <View
                style={[styles.lineView, {width: wp(343), alignSelf: 'center'}]}
              />
            </>
          )}
        />
      </View>
    );
  };

  const ButtonView = () => {
    return (
      <CustomButton
        additionalStyleText={{
          fontSize: FontSizes.Size_14,
          textTransform: 'uppercase',
          fontFamily: Fonts.MEDIUM,
        }}
        additionalStyle={{
          alignSelf: 'center',
          marginTop: wp(20),
          height: wp(46),
          marginLeft: wp(16),
          marginRight: wp(16),
          justifyContent: 'center',
          marginBottom: wp(30),
        }}
        buttonWidth={wp(343)}
        onPress={() => {
          navigation.goBack();
        }}
        title={GetLabel('save')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={[styles.container, {paddingLeft: wp(5), paddingRight: wp(5)}]}>
        <Formik
          initialValues={{
            street: '',
            flat_suit: '',
            city: '',
            postcode: '',
          }}
          onSubmit={(values, {resetForm}) => {
            navigation.goBack();

            console.log('Values', values);
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
            <>
              {ImageView()}
              {FormView(handleChange, handleSubmit, touched, errors, values)}
              {FlatListView()}
              {ButtonView()}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageView: {
    width: wp(72),
    height: wp(72),
    alignSelf: 'center',
    borderRadius: wp(72) / 2,
  },
  imagesView: {
    width: wp(80),
    height: wp(80),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    borderRadius: wp(80) / 2,
    margin: wp(16),
    justifyContent: 'center',
  },
  updatePhoto: {
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
    marginTop: wp(10),
    alignSelf: 'center',
  },
  dropdown: {
    height: wp(50),
    borderColor: Colors.GREY_80,
    borderWidth: 1,
    borderRadius: 8,
    width: wp(343),
    marginTop: wp(10),
    marginLeft: wp(16),
    marginRight: wp(16),
    paddingLeft: wp(16),
    paddingRight: wp(16),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
  },
  selectedTextStyle: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
  },
  inputWithBorder: {
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    flexDirection: 'row',
    borderRadius: 8,

    height: wp(50),
    width: wp(343),
  },
  textWithBorder: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 100,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  imageViews: {
    width: wp(14),
    height: wp(14),
    alignSelf: 'center',
    marginRight: wp(16),
    resizeMode: 'contain',
  },
  textInputTxt: {
    paddingLeft: wp(16),
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
    color: Colors.SEARCH_TEXT,
    alignSelf: 'flex-start',
  },
  listView: {
    marginTop: wp(20),
    marginBottom: wp(20),
    alignContent: 'center',
  },
  mainListViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: wp(343),
  },
  emailTxt: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY_TONE,
  },
  detailTxt: {
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY_80,
  },
  borderButton: {
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: wp(38),
    alignSelf: 'center',
    width: wp(60),
    justifyContent: 'center',
  },
  updateTxt: {
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_12,
  },
});
