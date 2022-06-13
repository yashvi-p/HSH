import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../Assets/Colors';
import {FontSizes} from '../../../Assets/FontSizes';
import {Fonts} from '../../../Assets/Fonts';
import {wp} from '../../../Helper/Responsive';
import CardViewWrapper from '../../../Components/CardViewWrapper';
import {Images} from '../../../Assets/Images';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../Helper/database';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import CustomButton from '../../../Components/CustomButton';
import AppTextInput from '../../../Components/AppTextInput';
import {WhiteStatusBar} from '../../../Components/AppStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../Components/ErrorMessage';

export default function Wishlist() {
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const isUserLoggedIn = useSelector(state => state.authReducer.isUserLoggedIn);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const validationSchema = Yup.object().shape({
    wishlistName: Yup.string()
      .trim()
      .required(GetLabel('wishlist_name_is_required')),
  });

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([
    // {
    //   id: 1,
    //   wishlist: 'Winter vacation',
    //   properties: '3 Properties',
    // },
    // {
    //   id: 2,
    //   wishlist: 'Family trip',
    //   properties: '8 Properties',
    // },
  ]);

  const flatlistView = data => {
    return (
      <View style={styles.flatViewStyle}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.id}
          keyboardShouldPersistTaps={'handled'}
          ListEmptyComponent={() => (
            <TouchableOpacity style={{marginTop: wp(80)}}>
              <View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Images.HEART_ICON}
                    style={styles.heartIconImageStyle}
                  />

                  <Text style={styles.textStyle}>
                    You have not yet added any properties to your wishlists
                  </Text>
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        isUserLoggedIn == '1'
                          ? setModalVisible(true)
                          : navigation.navigate('UserAuthFlow', {
                              screen: 'LoginScreen',
                            });
                      }}>
                      <Text style={styles.buttonTextStyle}>
                        {GetLabel('add_new_wishlist')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          renderItem={({item}) => (
            <View>
              <View style={styles.cardViewStyle}>
                <CardViewWrapper padding={5}>
                  <Text style={styles.wishlistTextStyle}>{item.wishlist}</Text>
                  <Text style={styles.propertiesTextStyle}>
                    {item.properties}
                  </Text>
                </CardViewWrapper>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const OpenModal = () => {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            // onBackdropPress={() => {
            //   setModalVisible(!modalVisible);
            // }}
            closeOnClick={true}
            transparent={true}
            isVisible={modalVisible}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <Formik
              initialValues={{
                wishlistName: '',
              }}
              onSubmit={(values, {resetForm}) => {
                setModalVisible(!modalVisible);

                setWishlist(wishlist => [
                  ...wishlist,
                  {
                    id: 1,
                    wishlist: values.wishlistName,
                    properties: '0 Properties',
                  },
                ]);
                console.log('Values', wishlist);
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
                  <View style={styles.centeredView}>
                    <CardViewWrapper padding={5}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.modalTextStyle}>
                          {GetLabel('add_a_wishlist')}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(false);
                          }}
                          style={{marginTop: 5}}>
                          <Image
                            source={Images.CROSS_ICON}
                            style={styles.closeImageStyle}
                          />
                        </TouchableOpacity>
                      </View>

                      <AppTextInput
                        additionalStyleView={{
                          marginTop: wp(15),
                          marginLeft: wp(16),
                          marginRight: wp(16),
                          width: wp(311),
                        }}
                        labelText={'Wishlist name'}
                        placeHolderText={'Enter wishlist board'}
                        value={values.wishlistName}
                        onChangeText={handleChange('wishlistName')}
                        isLabelTextInput
                      />
                      {!touched.wishlistName || !errors.wishlistName ? null : (
                        <ErrorMessage
                          errorStyle={{marginRight: wp(20)}}
                          error={errors.wishlistName}
                        />
                      )}
                      <CustomButton
                        additionalStyleText={{
                          fontSize: FontSizes.Size_14,
                        }}
                        additionalStyle={{
                          alignSelf: 'center',
                          marginTop: wp(20),
                          height: wp(46),
                          marginLeft: wp(16),
                          marginRight: wp(16),
                          justifyContent: 'center',
                          marginBottom: wp(20),
                        }}
                        buttonWidth={wp(311)}
                        onPress={handleSubmit}
                        title={'ADD'}
                      />
                    </CardViewWrapper>
                  </View>
                </>
              )}
            </Formik>
          </Modal>
        </View>
      </View>
    );
  };

  const TopView = () => {
    return (
      <View style={styles.WishlistStyle}>
        <Text style={styles.headerTitleStyle}>{GetLabel('wishlist')}</Text>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            isUserLoggedIn == '1'
              ? setModalVisible(true)
              : navigation.navigate('UserAuthFlow', {
                  screen: 'LoginScreen',
                });
          }}>
          <View style={styles.WishlistStyle}>
            <Image source={Images.PLUS} style={styles.addIconStyle} />
            <Text style={styles.WishlistRightTextStyle}>{GetLabel('add')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={styles.container}>
        <WhiteStatusBar />
        <View>
          <View style={styles.centeredView}></View>
        </View>
        {TopView()}
        <View style={styles.drawlineHeaderStyle}></View>

        {flatlistView(wishlist)}
        {OpenModal()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cardViewStyle: {
    flex: 1,
  },
  wishlistTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    paddingHorizontal: wp(16),
    marginTop: wp(16),
    lineHeight: 20,
  },
  propertiesTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    paddingHorizontal: wp(16),
    marginTop: wp(4),
    lineHeight: 26,
    marginBottom: wp(10),
  },
  flatViewStyle: {
    marginTop: wp(20),
    marginHorizontal: wp(10),
  },
  drawlineHeaderStyle: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    marginTop: wp(5),
  },
  heartIconImageStyle: {
    height: wp(40),
    width: wp(40),
    resizeMode: 'contain',
    tintColor: Colors.SEARCH_BORDER,
  },
  textStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(18),
    lineHeight: 26,
    // marginHorizontal: wp(46),
    width: wp(290),
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.WHITE,
    marginTop: wp(15),
    paddingHorizontal: wp(16),
    paddingVertical: wp(10),
    borderColor: Colors.RED_TXT,
    borderWidth: wp(1),
    borderRadius: 10,
  },

  buttonTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.RED_TXT,
    fontFamily: Fonts.BOLD,
    lineHeight: 18,
  },
  addIconStyle: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: wp(6),
    marginBottom: wp(10),
    marginTop: wp(16),
  },
  WishlistStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  WishlistRightTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    lineHeight: 18,
    marginRight: wp(13),
    marginBottom: wp(10),
    marginTop: wp(16),
  },
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSizes.Size_18,
    fontFamily: Fonts.BOLD,
    lineHeight: 26,
    marginBottom: wp(10),
    marginTop: wp(16),
  },
  touchableStyle: {
    position: 'absolute',
    right: wp(0),
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(6),
  },
  cardViewStyle: {
    flex: 1,
    margin: wp(10),
  },
  modalTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.MEDIUM,
    marginLeft: wp(16),
    marginTop: wp(16),
    marginBottom: wp(10),
    lineHeight: 20,
  },
  closeImageStyle: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
    marginLeft: wp(20),
    tintColor: Colors.GREY_80,
    marginRight: wp(16),
    marginTop: wp(10),
  },
});
