import {
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
import {useSelector} from 'react-redux';
import {Header} from '@react-navigation/stack';
import CustomButton from '../../../../Components/CustomButton';
import AppTextInput from '../../../../Components/AppTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../../Components/ErrorMessage';

export default function TravelForWork() {
  const navigation = useNavigation();
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email(GetLabel('email_is_not_in_valid_format'))
      .required(GetLabel('email_is_required')),
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
          <Image source={Images.LEFT_ARROW} style={styles.leftArrowStyle} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: 'Travel for work',
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
          additionalStyleView={{
            width: wp(343),
            marginTop: wp(24),
            marginHorizontal: wp(16),
          }}
          labelText={GetLabel('work_email_address')}
          placeHolderText={GetLabel('enter_work_email_address')}
          value={values.email}
          onChangeText={handleChange('email')}
          isLabelTextInput
        />
        <View style={{marginRight: wp(16)}}>
          {!touched.email || !errors.email ? null : (
            <ErrorMessage error={errors.email} />
          )}
        </View>
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
        title={GetLabel('add')}
        // title={'ADD'}
      />
    );
  };
  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.titleTextStyle}>
          {GetLabel('join_home_swiss_home_for_Work')}
        </Text>
        <Text style={styles.textStyle}>
          {GetLabel('travel_for_work_string')}
        </Text>
        <View>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values, {resetForm}) => {
              navigation.navigate('AppFlow', {screen: 'AccountScreen'});
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
              </>
            )}
          </Formik>
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
  titleTextStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    lineHeight: 23,
    marginTop: wp(24),
    marginHorizontal: wp(16),
  },
  textStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginHorizontal: wp(16),
    marginTop: wp(16),
  },
});
