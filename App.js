import React, {useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, LogBox} from 'react-native';
import {Fonts} from './App/Assets/Fonts';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './App/Navigator/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './App/Redux/index';
import firebase, {RemoteMessage} from 'react-native-firebase';

const App = () => {
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
    console.log('fcmToken------->', fcmToken);
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
      console.log(this.props);

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
    LogBox.ignoreAllLogs(true);
    SplashScreen.hide();

    createNotificationListeners();
    await checkPermission();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation store={store} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {useEffect} from 'react';
// import {StyleSheet, LogBox, Platform} from 'react-native';
// import {Fonts} from './App/Assets/Fonts';
// import SplashScreen from 'react-native-splash-screen';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Navigation from './App/Navigator/Navigation';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {store, persistor} from './App/Redux/index';
// import messaging from '@react-native-firebase/messaging';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   //Android Setup
//   async requestUserPermissionAndroid() {
//     console.log('requestUserPermissionAndroid');
//     const authStatus = await messaging().requestPermission();

//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       this.getFcmTokenAndroid();
//     }
//   }

//   getFcmTokenAndroid = async () => {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       console.log(fcmToken);
//       console.log('Your Firebase Token is:', fcmToken);
//     } else {
//       console.log('Failed', 'No token received');
//     }
//   };

//   showNotification = () => {
//     messaging().onMessage(async remoteMessage => {
//       console.log('app open app state........:', remoteMessage);
//     });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('app open from background state........:', remoteMessage);
//     });

//     // Check whether an initial notification is available
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage,
//           );
//           // navigation.navigate('notification');
//         }
//       });
//   };

//   //1
//   async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//       this.getToken();
//     } else {
//       this.requestPermission();
//     }
//   }

//   //3
//   async getToken() {
//     fcmToken = await firebase.messaging().getToken();
//     console.log('fcmToken------->', fcmToken);
//   }

//   async requestPermission() {
//     try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//     } catch (error) {
//       // User has rejected permissions
//     }
//   }

//   async createNotificationListeners() {
//     this.notificationListener = firebase
//       .notifications()
//       .onNotification(async notification => {
//         if (notification.data.type == 'chat_details') {
//           global.chatMessageData = [];
//           global.chatMessageData.push(
//             JSON.parse(notification.data.chat_array)[0],
//           );
//         }
//         //   debugger;
//         //For Hide count and top up notification
//         notification.android.setAutoCancel(true);
//         if (Platform.OS === 'android') {
//           this.messageListener = firebase.messaging().onMessage(message => {});
//           const localNotification = new firebase.notifications.Notification({
//             sound: 'default',
//             show_in_foreground: true,
//             //icon:Images.VISALOGO
//           })
//             .setNotificationId(notification.notificationId)
//             .setTitle(notification.title)
//             .setSubtitle(notification.subtitle)
//             .setBody(notification.body)
//             .setData(notification.data)
//             .android.setAutoCancel(true)
//             .android.setChannelId('FindHelpie') // e.g. the id you chose above

//             .android.setColor('#1B7BCE') // you can set a color here
//             .android.setPriority(firebase.notifications.Android.Priority.High);

//           const channel = new firebase.notifications.Android.Channel(
//             'daily',
//             'Reminders',
//             firebase.notifications.Android.Importance.High,
//           ).setDescription('Reminds you....');

//           const channelId = new firebase.notifications.Android.Channel(
//             'FindHelpie',
//             'FindHelpie',
//             firebase.notifications.Android.Importance.High,
//           );

//           // Create the channel

//           //  debugger;
//           if (notification.data.type == 'chat_details') {
//             var currentScreen = await AsyncStorage.getItem('currentPage');
//             var chatID = await AsyncStorage.getItem('chatID');

//             if (currentScreen == 'chatmessage') {
//               if (
//                 chatID != JSON.parse(notification.data.chat_array)[0].chat_id
//               ) {
//                 firebase.notifications().android.createChannel(channelId);
//                 firebase.notifications().displayNotification(localNotification);

//                 firebase
//                   .notifications()
//                   .android.createChannel(channel)
//                   .then(response => {
//                     firebase
//                       .notifications()
//                       .displayNotification(localNotification)
//                       .catch(err => {});
//                   });
//               }
//             } else {
//               firebase.notifications().android.createChannel(channelId);
//               firebase.notifications().displayNotification(localNotification);

//               firebase
//                 .notifications()
//                 .android.createChannel(channel)
//                 .then(response => {
//                   firebase
//                     .notifications()
//                     .displayNotification(localNotification)
//                     .catch(err => {});
//                 });
//             }
//           } else {
//             firebase.notifications().android.createChannel(channelId);
//             firebase.notifications().displayNotification(localNotification);

//             firebase
//               .notifications()
//               .android.createChannel(channel)
//               .then(response => {
//                 firebase
//                   .notifications()
//                   .displayNotification(localNotification)
//                   .catch(err => {});
//               });
//           }
//           firebase.notifications().onNotificationOpened(notificationOpen => {
//             const {title, body, data} = notificationOpen.notification;

//             console.log('title', title);
//           });
//         } else {
//           const localNotification = new firebase.notifications.Notification()
//             .setNotificationId(notification.notificationId)
//             .setTitle(notification.title)
//             .setSubtitle(notification.subtitle)
//             .setBody(notification.body)
//             .setData(notification.data)
//             .ios.setBadge(1);

//           firebase
//             .notifications()
//             .displayNotification(localNotification)
//             .catch(err => {});
//         }
//       });

//     await this.checkPermission();
//   }

//   async componentDidMount() {
//     LogBox.ignoreAllLogs(true);
//     SplashScreen.hide();

//     if (Platform.OS === 'ios') {
//       this.createNotificationListeners();
//       await this.checkPermission();
//     } else {
//       this.requestUserPermissionAndroid();
//       this.showNotification();
//     }
//   }

//   render() {
//     return (
//       <SafeAreaProvider>
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={persistor}>
//             <Navigation store={store} />
//           </PersistGate>
//         </Provider>
//       </SafeAreaProvider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   ForSafeArea: {
//     flex: 1,
//   },
// });

// export default App;
