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
const validationSchema = Yup.object().shape({
  gift: Yup.string().trim().required('Gift card pin is required'),
});

export default function GiftCard() {
  const navigation = useNavigation();
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
    headerTitle: 'Gift card',
    headerRight: props => <View></View>,
  });
  const GiftCardView = () => {
    return (
      <View style={styles.GiftCard}>
        <Text style={styles.textStyle}>{GetLabel('current_balance')}</Text>

        <View style={styles.buttonViewStyle}>
          <View style={styles.rowViewStyle}>
            <Text style={styles.poundTextStyle}>{'£'}</Text>
            <Text style={styles.buttonTextStyle}>{'320'}</Text>
          </View>
        </View>
        <View style={styles.marginTopView} />
      </View>
    );
  };
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
          labelText={GetLabel('gift_card_pin')}
          placeHolderText={GetLabel('enter_gift_card_pin')}
          value={values.gift}
          onChangeText={handleChange('gift')}
          isLabelTextInput
        />
        <View style={{marginRight: wp(16)}}>
          {!touched.gift || !errors.gift ? null : (
            <ErrorMessage error={errors.gift} />
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
        title={GetLabel('redeem_gift_card')}
      />
    );
  };
  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {GiftCardView()}
        <View style={styles.lineStyle} />
        <Text style={styles.haveYouTextStyle}>
          {GetLabel('have_you_received_a_gift_card')}
        </Text>
        <View>
          <Formik
            initialValues={{
              gift: '',
            }}
            onSubmit={(values, {resetForm}) => {
              navigation.navigate('PaymentsPayouts');
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
  GiftCard: {
    marginTop: wp(24),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    shadowColor: Colors.CARD_BORDER_COLOR,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 16,
    padding: wp(10),
    marginLeft: wp(16),
    marginRight: wp(16),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    lineHeight: 23,
    marginTop: wp(8),
  },
  buttonViewStyle: {
    backgroundColor: Colors.WHITE,
    marginTop: wp(16),
    paddingHorizontal: wp(99),
    paddingVertical: wp(16),
    height: wp(62),
    width: wp(256),
    borderColor: Colors.SEARCH_BORDER,
    borderWidth: wp(1),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
  marginTopView: {
    marginTop: wp(16),
  },
  lineStyle: {
    height: 1,
    width: wp(343),
    backgroundColor: Colors.SEARCH_BORDER,
    marginTop: wp(24),
    marginHorizontal: wp(16),
  },
  rowViewStyle: {
    flexDirection: 'row',
  },
  haveYouTextStyle: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_18,
    lineHeight: 23,
    marginTop: wp(24),
    marginLeft: wp(16),
  },
  poundTextStyle: {
    color: Colors.GREY_80,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_24,
  },
});
