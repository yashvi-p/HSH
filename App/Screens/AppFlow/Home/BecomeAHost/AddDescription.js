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
import {useNavigation} from '@react-navigation/native';
import {wp} from '../../../../Helper/Responsive';
import {Colors} from '../../../../Assets/Colors';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import AppTextInput from '../../../../Components/AppTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../../Components/ErrorMessage';
import {useDispatch, useSelector} from 'react-redux';
import {setPlaceDescription} from '../../../../Redux/Actions/generalAction';
import {getLabelValue} from '../../../../Helper/database';

export default function AddDescription() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .trim()
      .max(550, GetLabel('should_be_less_than_550_characters'))
      .required(GetLabel('description_is_required')),
  });

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
        <Text style={styles.hostTxt}>Create your description</Text>
        <TextInput
          placeholder={GetLabel('enter_a_description')}
          value={values.name}
          onChangeText={handleChange('description')}
          style={styles.textInput}
          textAlignVertical={'top'}
          multiline
        />

        {!touched.description || !errors.description ? null : (
          <ErrorMessage
            errorStyle={{marginRight: wp(20)}}
            error={errors.description}
          />
        )}

        <Text style={styles.countText}>{values.description.length}/550</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          description: '',
        }}
        onSubmit={(values, {resetForm}) => {
          dispatch(setPlaceDescription(values.description));

          navigation.navigate('SetPrice');
          console.log('Values', values);
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
            <WhiteStatusBar />
            <ScrollView style={[styles.container, {marginBottom: wp(100)}]}>
              <View style={styles.lineView} />
              {TopView(handleChange, handleSubmit, touched, errors, values)}
            </ScrollView>
            <View style={styles.backView}>
              <BackAndNextBottom
                progressValue={7}
                backPressed={() => {
                  navigation.goBack();
                }}
                nextPressed={handleSubmit}
                showNextVisible={true}
              />
            </View>
          </>
        )}
      </Formik>
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
  textInput: {
    marginTop: wp(20),
    height: wp(165),
    paddingLeft: wp(16),
    fontSize: FontSizes.Size_16,
    fontFamily: Fonts.REGULAR,
    color: Colors.SEARCH_TEXT,
    alignSelf: 'flex-start',
    width: wp(343),
    borderWidth: 1,
    borderColor: Colors.SEARCH_BORDER,
    borderRadius: 8,
    backgroundColor: Colors.SEARCH_BACKGROUND,
  },
  countText: {
    color: Colors.GREY_80,
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.REGULAR,
    textAlign: 'right',
    marginRight: wp(10),
    marginTop: wp(10),
  },
});
