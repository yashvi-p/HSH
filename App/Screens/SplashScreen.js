import {
  DevSettings,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {CustomStatusBar} from '../Components/AppStatusBar';
import {Colors} from '../Assets/Colors';
import {Images} from '../Assets/Images';
import {applyQuery, createDatabase} from '../Helper/database';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCountryData,
  setDeviceToken,
  setLabels,
  setUserLanguage,
} from '../Redux/Actions/authAction';
import {LabelsDB} from '../Assets/LabelsDB';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import {ApiConfigFormData, ApiConfigForWithoutParam} from '../Helper/ApiConfig';
import {setLanguageData} from '../Redux/Actions/authAction';
import NetInfo from '@react-native-community/netinfo';
import {setNetInfo} from '../Redux/Actions/generalAction';
import firebase, {RemoteMessage} from 'react-native-firebase';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/core';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../Components/ToastMessage';

export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const labelApiResponse = useSelector(
    state => state.authReducer.labelApiResponse,
  );

  const userLanguage = useSelector(state => state.authReducer.userLanguage);
  const languageData = useSelector(state => state.authReducer.languageData);
  const language_id = useSelector(state => state.authReducer.language_id);
  const countryData = useSelector(state => state.authReducer.countryData);
  const netInfo = useSelector(state => state.generalReducer.netInfo);
  const route = useRoute();
  // useEffect(() => {
  //   NetInfo.addEventListener(async state => {
  //     let connection = state.isConnected;
  //     dispatch(setNetInfo(connection));

  //     if (!connection) {
  //       navigation.navigate('NoInternet', {show: {connection}});
  //       return;
  //     }
  //   });
  // }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      var connection = state.isInternetReachable;
      console.log('connection', state);
      if (!netInfo) {
        if (connection) {
          if (route.name == 'SplashScreen') {
            DevSettings.reload();
          }
        }
      }
      dispatch(setNetInfo(connection));
    });
  });

  useEffect(() => {
    // CallLabelDatabaseQuery();

    LabelApiCall();
    LanguageApiCall();
    CountryApiCalling();
    console.log('languageData', languageData);

    setTimeout(() => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'AppFlow'}],
      });
      navigation.dispatch(resetAction);
    }, 3000);
  }, []);

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  //3
  const getToken = async () => {
    let fcmToken = await firebase.messaging().getToken();
    dispatch(setDeviceToken(fcmToken));
    console.log('fcmToken------->Splash', fcmToken);
  };

  //2
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
    }
  };
  const getNotificationCount = async () => {
    var notificationData = await axoisPost('notification_count.php', {
      user_id: store.getState().userDetails.user_id,

      token: store.getState().userDetails.token,
    });
    reactotron.log('Notification Data ::: ' + JSON.stringify(notificationData));
    if (notificationData.code === 1) {
      store.dispatch(notification(notificationData.total_unread));
      store.dispatch(chatcount(notificationData.total_unread));
    }
  };
  const createNotificationListeners = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(async notification => {
        // getNotificationCount();
        //   debugger;

        if (notification.data.type == 'chat_details') {
          global.chatMessageData = [];
          global.chatMessageData.push(
            JSON.parse(notification.data.chat_array)[0],
          );
        }
        //   debugger;
        //For Hide count and top up notification
        notification.android.setAutoCancel(true);
        if (Platform.OS === 'android') {
          this.messageListener = firebase.messaging().onMessage(message => {});
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
            //icon:Images.VISALOGO
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setAutoCancel(true)
            .android.setChannelId('FindHelpie') // e.g. the id you chose above

            .android.setColor('#1B7BCE') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);

          const channel = new firebase.notifications.Android.Channel(
            'daily',
            'Reminders',
            firebase.notifications.Android.Importance.High,
          ).setDescription('Reminds you....');

          const channelId = new firebase.notifications.Android.Channel(
            'FindHelpie',
            'FindHelpie',
            firebase.notifications.Android.Importance.High,
          );

          // Create the channel

          //  debugger;
          if (notification.data.type == 'chat_details') {
            var currentScreen = await AsyncStorage.getItem('currentPage');
            var chatID = await AsyncStorage.getItem('chatID');

            if (currentScreen == 'chatmessage') {
              if (
                chatID != JSON.parse(notification.data.chat_array)[0].chat_id
              ) {
                firebase.notifications().android.createChannel(channelId);
                firebase.notifications().displayNotification(localNotification);

                firebase
                  .notifications()
                  .android.createChannel(channel)
                  .then(response => {
                    firebase
                      .notifications()
                      .displayNotification(localNotification)
                      .catch(err => {});
                  });
              }
            } else {
              firebase.notifications().android.createChannel(channelId);
              firebase.notifications().displayNotification(localNotification);

              firebase
                .notifications()
                .android.createChannel(channel)
                .then(response => {
                  firebase
                    .notifications()
                    .displayNotification(localNotification)
                    .catch(err => {});
                });
            }
          } else {
            firebase.notifications().android.createChannel(channelId);
            firebase.notifications().displayNotification(localNotification);

            firebase
              .notifications()
              .android.createChannel(channel)
              .then(response => {
                firebase
                  .notifications()
                  .displayNotification(localNotification)
                  .catch(err => {});
              });
          }
          firebase.notifications().onNotificationOpened(notificationOpen => {
            const {title, body, data} = notificationOpen.notification;

            console.log('title', title);
          });
        } else {
          const localNotification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .ios.setBadge(1);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch(err => {});
        }
      });

    await checkPermission();
  };

  useEffect(async () => {
    createNotificationListeners();
    await checkPermission();
  }, []);

  const CountryApiCalling = () => {
    // console.log(
    //   'responseresponseresponse',
    //   countryData,
    //   typeof countryData,
    //   countryData.length == 0,
    // );
    if (countryData.length == 0) {
      axios(ApiConfigForWithoutParam('country_list'))
        .then(function (response) {
          console.log('response', response);
          dispatch(setCountryData(response.data[0].result));
        })
        .catch(function (error) {
          console.log(error);
          if (error.toString() == 'AxiosError: Network Error')
            Toast.show(
              `${GetLabel('poor_internet_connection')}`,
              toastMessageConfig,
            );
          else Toast.show(`${error}`, toastMessageConfig);
        });
    }
  };

  const LabelApiCall = () => {
    var data = new FormData();
    data.append('language_id', `${language_id}`);
    data.append('updated_date_time', '');

    axios(ApiConfigFormData(data, 'labels'))
      .then(function (response) {
        dispatch(setLabels(response.data[0].result));
      })
      .catch(function (error) {
        console.log(error);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const LanguageApiCall = () => {
    axios(ApiConfigForWithoutParam('language'))
      .then(function (response) {
        dispatch(setLanguageData(response.data[0].result));
        console.log('language Data', languageData);
      })
      .catch(function (error) {
        console.log(error);
        if (error.toString() == 'AxiosError: Network Error')
          Toast.show(
            `${GetLabel('poor_internet_connection')}`,
            toastMessageConfig,
          );
        else Toast.show(`${error}`, toastMessageConfig);
      });
  };

  const ContainItemInArray = item => {
    let arr = [];
    arr = JSON.parse(labelApiResponse);

    let hasMagenicVendor = arr.some(vendor => vendor.key == item);

    return hasMagenicVendor;
  };

  const CallLabelDatabaseQuery = async () => {
    createDatabase();

    var labelArr = [];
    var query = 'SELECT * FROM label';
    var parameter = [];
    var responseData = await applyQuery(query, parameter);

    if (responseData.rows.length > 0) {
      for (let i = 0; i < responseData.rows.length; i++) {
        labelArr.push(responseData.rows.item(i));
      }
    }

    dispatch(setLabels(JSON.stringify(labelArr)));
    if (labelApiResponse != '') {
      let arr = [];
      arr = JSON.parse(labelApiResponse);

      console.log(
        'labelApiResponse length',
        arr.length,
        'LabelsDB length',
        LabelsDB.length,
      );

      if (arr.length == LabelsDB.length) {
        console.log('Label is not updated');
      } else {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < LabelsDB.length; j++) {
            if (!(arr[i].key == LabelsDB[j][0])) {
              if (ContainItemInArray(LabelsDB[j][0]) == false) {
                for (let i = 0; i < LabelsDB.length; i++) {
                  var query =
                    'INSERT INTO label (key, en, fr, de, it) VALUES (?,?,?,?,?)';
                  var parameter = LabelsDB[i];
                  var responseData = await applyQuery(query, parameter);
                  console.log('inserted 1 raw');

                  var labelArr = [];
                  var query = 'SELECT * FROM label';
                  var parameter = [];
                  var responseData = await applyQuery(query, parameter);

                  if (responseData.rows.length > 0) {
                    for (let i = 0; i < responseData.rows.length; i++) {
                      labelArr.push(responseData.rows.item(i));
                    }
                  }

                  dispatch(setLabels(JSON.stringify(labelArr)));
                }
              }
            }
          }
        }
      }
    } else {
      for (let i = 0; i < LabelsDB.length; i++) {
        var query =
          'INSERT INTO label (key, en, fr, de, it) VALUES (?,?,?,?,?)';
        var parameter = LabelsDB[i];
        var responseData = await applyQuery(query, parameter);
        console.log('responseData+++++++++++++++++++++++++++', responseData);

        var labelArr = [];
        var query = 'SELECT * FROM label';
        var parameter = [];
        var responseData = await applyQuery(query, parameter);

        if (responseData.rows.length > 0) {
          for (let i = 0; i < responseData.rows.length; i++) {
            labelArr.push(responseData.rows.item(i));
          }
        }

        dispatch(setLabels(JSON.stringify(labelArr)));
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomStatusBar backgroundColor={Colors.RED_TXT} />
      <Image
        style={{width: '100%', height: '100%'}}
        source={Images.SPLASH_SCREEN_IMAGE}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
