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
import {useNavigation} from '@react-navigation/native';
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
import AppTextInput from '../../../Components/AppTextInput';
import CustomButton from '../../../Components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../Helper/database';
import ToggleButton from '../../../Components/ToggleButton';
import {TOUCHABLE_STATE} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
export default function NotificationSetting() {
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );
  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const navigation = useNavigation();
  const [homeModal, setHomeModal] = useState(false);
  const [remindersModal, setRemaindersModal] = useState(false);
  const [promotionModal, setPromotionModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [accountModal, setAccountModal] = useState(false);

  const GetLabel = stringLabel => {
    return getLabelValue(labelApiResponse, `${stringLabel}`);
  };

  const [notification, setNotification] = useState([
    {
      id: 1,
      title: 'Home swiss home updates',
      description: 'Stay up to date on the latest news from Home swiss home',
      message: 'On: Text messages',
      edit_button: 'EDIT',
    },
    {
      id: 2,
      title: 'Reminders',
      description:
        'Reminders regarding your reservations, postings, and account activity ',
      message: 'On: Text messages, Email, Browser notifications',
      edit_button: 'EDIT',
    },
    {
      id: 3,
      title: 'Promotion and tips',
      description:
        'Personalized recommendations and special offers will help you plan your next trip.',
      message: 'On: Text messages, Email, Phone calls ',
      edit_button: 'EDIT',
      phone_calls: 'Phone calls',
    },
    {
      id: 4,
      title: 'Policy and community',
      description:
        'Receive notifications about our rules and policies, as well as tax and regulatory information.',
      message: 'Text messages, Email ',
      edit_button: 'EDIT',
      phone_calls: 'Phone calls',
    },
    {
      id: 5,
      title: 'Account support',
      description:
        'Receive notifications about  account activity, legal info, as well as terms of service.',
      message: 'Text messages, Email ',
      edit_button: 'EDIT',
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
    headerTitle: 'Notifications setting',
    headerRight: props => <View></View>,
  });
  const notificationView = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <View style={styles.mainViewStyle}>
            <View style={styles.viewStyle}>
              <Text style={styles.titleTextStyle}>{item.title}</Text>
              {item.title == 'Home swiss home updates' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    setHomeModal(true);
                  }}>
                  <Text style={styles.buttonTextStyle}>{item.edit_button}</Text>
                </TouchableOpacity>
              ) : null}
              {item.title == 'Reminders' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    setRemaindersModal(true);
                  }}>
                  <Text style={styles.buttonTextStyle}>{item.edit_button}</Text>
                </TouchableOpacity>
              ) : null}
              {item.title == 'Promotion and tips' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    setPromotionModal(true);
                  }}>
                  <Text style={styles.buttonTextStyle}>{item.edit_button}</Text>
                </TouchableOpacity>
              ) : null}
              {item.title == 'Policy and community' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    setPolicyModal(true);
                  }}>
                  <Text style={styles.buttonTextStyle}>{item.edit_button}</Text>
                </TouchableOpacity>
              ) : null}
              {item.title == 'Account support' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    setAccountModal(true);
                  }}>
                  <Text style={styles.buttonTextStyle}>{item.edit_button}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Text style={styles.descriptionTextStyle}>{item.description}</Text>
            <Text style={styles.messageTextStyle}>{item.message}</Text>
            <View style={styles.drawLineStyle}></View>
          </View>
        )}
      />
    );
  };

  const HomeModalView = () => {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setHomeModal(!homeModal);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={homeModal}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={styles.centeredView}>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('home_swiss_home_updates')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setHomeModal(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('email')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('text_messages')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('browser_notifications')}
                    </Text>
                    <ToggleButton />
                  </View>
                </View>
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  const RemindersModalView = () => {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setRemaindersModal(!remindersModal);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={remindersModal}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={styles.centeredView}>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('reminders')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setRemaindersModal(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('email')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('text_messages')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('browser_notifications')}
                    </Text>
                    <ToggleButton />
                  </View>
                </View>
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  const PromotionModalView = () => {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setPromotionModal(!promotionModal);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={promotionModal}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={styles.centeredView}>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('promotion_and_tips')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setPromotionModal(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('email')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('text_messages')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('phone_calls')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('browser_notifications')}
                    </Text>
                    <ToggleButton />
                  </View>
                </View>
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  const PolicyModalView = () => {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setPolicyModal(!policyModal);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={policyModal}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={styles.centeredView}>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('policy_and_community')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setPolicyModal(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('email')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('text_messages')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('phone_calls')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('browser_notifications')}
                    </Text>
                    <ToggleButton />
                  </View>
                </View>
                <View style={styles.modalBottomLineStyle} />
              </CardViewWrapper>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  const AccountModalView = () => {
    return (
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            onBackdropPress={() => {
              setAccountModal(!accountModal);
            }}
            closeOnClick={true}
            transparent={true}
            isVisible={accountModal}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={styles.centeredView}>
              <CardViewWrapper padding={5}>
                <View style={styles.modalTopLineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalTitleTextStyle}>
                    {GetLabel('account_support')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAccountModal(false);
                    }}
                    style={{marginTop: 5}}>
                    <Image
                      source={Images.CROSS_ICON}
                      style={styles.closeImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('email')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('text_messages')}
                    </Text>
                    <ToggleButton />
                  </View>
                  <View style={styles.modalTextViewStyle}>
                    <Text style={styles.modalTextStyle}>
                      {GetLabel('browser_notifications')}
                    </Text>
                    <ToggleButton />
                  </View>
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
      <View style={styles.drawLineHeader}></View>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      {notificationView(notification)}
      {HomeModalView()}
      {RemindersModalView()}
      {PromotionModalView()}
      {PolicyModalView()}
      {AccountModalView()}
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
    marginBottom: wp(10),
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
  messageTextStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    lineHeight: 24,
    marginTop: wp(8),
    marginBottom: wp(20),
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
  modalTextViewStyle: {
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
  modalTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.SEARCH_TEXT,
    fontFamily: Fonts.REGULAR,
    lineHeight: 26,
  },
});
