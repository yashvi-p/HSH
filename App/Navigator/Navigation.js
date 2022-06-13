import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../Assets/Colors';
import {Fonts} from '../Assets/Fonts';
import {Images} from '../Assets/Images';
import LoginScreen from '../Screens/AuthFlow/LoginScreen';
import Home from '../Screens/AppFlow/Home/Home';
import Wishlist from '../Screens/AppFlow/Wishlist/Wishlist';
import Trips from '../Screens/AppFlow/Trips/Trips';
import AccountScreen from '../Screens/AppFlow/Account/AccountScreen';
import {FontSizes} from '../Assets/FontSizes';
import SearchScreen from '../Screens/AppFlow/Home/SearchScreen';
import CheckOurSelection from '../Screens/AppFlow/Home/CheckOurSelection';
import FilterSelection from '../Screens/AppFlow/Home/FilterSelection';
import AddGuest from '../Screens/AppFlow/Home/AddGuest';
import AddDates from '../Screens/AppFlow/Home/AddDates';
import SplashScreen from '../Screens/SplashScreen';
import TripDetail from '../Screens/AppFlow/Trips/TripDetail';
import MessageScreen from '../Screens/AppFlow/Message/MessageScreen';
import PhoneVerification from '../Screens/AuthFlow/PhoneVerification';
import ThingsToKnow from '../Screens/AppFlow/Home/CheckOurSelection/ThingsToKnow';
import Amenities from '../Screens/AppFlow/Home/CheckOurSelection/Amenities';
import {wp} from '../Helper/Responsive';
import GuestReviews from '../Screens/AppFlow/Home/CheckOurSelection/GuestReviews';
import ChatDetail from '../Screens/AppFlow/Message/ChatDetail';
import PaymentsPayouts from '../Screens/AppFlow/Home/CheckOurSelection/PaymentsPayouts';
import GetStarted from '../Screens/AppFlow/Home/BecomeAHost/GetStarted';
import QuestionAndAnswerStep from '../Screens/AppFlow/Home/BecomeAHost/QuestionAndAnswerStep';
import SelectAddress from '../Screens/AppFlow/Home/BecomeAHost/SelectAddress/SelectAddress';
import ConfirmAddress from '../Screens/AppFlow/Home/BecomeAHost/SelectAddress/ConfirmAddress';
import NotificationSetting from '../Screens/AppFlow/Account/NotificationSetting';
import GlobalPreferences from '../Screens/AppFlow/Account/GlobalPreferences';
import GuestSelection from '../Screens/AppFlow/Home/BecomeAHost/GuestSelection';
import GuestOffers from '../Screens/AppFlow/Home/BecomeAHost/GuestOffers';
import AddPhotos from '../Screens/AppFlow/Home/BecomeAHost/AddPhotos';
import AddTitle from '../Screens/AppFlow/Home/BecomeAHost/AddTitle';
import DescribePlace from '../Screens/AppFlow/Home/BecomeAHost/DescribePlace';
import AddDescription from '../Screens/AppFlow/Home/BecomeAHost/AddDescription';
import SetPrice from '../Screens/AppFlow/Home/BecomeAHost/SetPrice';
import LastQuestion from '../Screens/AppFlow/Home/BecomeAHost/LastQuestion';
import ManageListings from '../Screens/AppFlow/Account/ManageListings';
import CheckOutListing from '../Screens/AppFlow/Home/BecomeAHost/CheckOutListing';
import Confirmation from '../Screens/AppFlow/Home/BecomeAHost/Confirmation';
import AddCard from '../Screens/AppFlow/Home/CheckOurSelection/AddCard';
import PaymentMethods from '../Screens/AppFlow/Home/CheckOurSelection/PaymentMethods';
import payoutMethods from '../Screens/AppFlow/Home/CheckOurSelection/payoutMethods';
import SearchProperty from '../Screens/AppFlow/Home/SearchProperty/SearchProperty';
import MyProfile from '../Screens/AppFlow/Account/MyProfile';
import PhoneNumber from '../Screens/AppFlow/Account/MyProfile/PhoneNumber';
import Email from '../Screens/AppFlow/Account/MyProfile/Email';
import Address from '../Screens/AppFlow/Account/MyProfile/Address';
import EmergencyContact from '../Screens/AppFlow/Account/MyProfile/EmergencyContact';
import GovernmentId from '../Screens/AppFlow/Account/MyProfile/GovernmentId';
import PropertyDetail from '../Screens/AppFlow/Home/SearchProperty/PropertyDetail';
import BookingDetail from '../Screens/AppFlow/Home/SearchProperty/BookingDetail';
import ConfirmationBooking from '../Screens/AppFlow/Home/SearchProperty/ConfirmationBooking';

import GiftCard from '../Screens/AppFlow/Home/CheckOurSelection/GiftCard';
import Coupons from '../Screens/AppFlow/Home/CheckOurSelection/Coupons';
import Taxes from '../Screens/AppFlow/Home/CheckOurSelection/Taxes';
import GuestContributors from '../Screens/AppFlow/Home/CheckOurSelection/GuestContributors';
import TravelForWork from '../Screens/AppFlow/Home/CheckOurSelection/TravelForWork';
import ReferAHost from '../Screens/AppFlow/Account/ReferAHost';
import NoInternet from '../Screens/NoInternet';
import Register from '../Screens/AuthFlow/Register';
import CmsPage from '../Screens/AppFlow/Account/CmsPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SearchIconHeader = () => {
  return (
    <TouchableOpacity>
      <Image
        source={Images.SEARCH_ICON}
        style={[styles.searchiconstyle, {tintColor: Colors.GREY_80}]}
      />
    </TouchableOpacity>
  );
};

const BackArrowWhite = ({onPressed}) => {
  return (
    <TouchableOpacity onPress={onPressed}>
      <Image source={Images.LEFT_ARROW} style={styles.backcloseiconStyle} />
    </TouchableOpacity>
  );
};

const CloseArrow = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={Images.CROSS_ICON} style={styles.backcloseiconStyle} />
    </TouchableOpacity>
  );
};
const WishlistRightHeader = ({onPressed}) => {
  return (
    <TouchableOpacity onPress={onPressed}>
      <View style={styles.WishlistRightHeaderStyle}>
        <Image source={Images.PLUS} style={styles.addIconStyle} />
        <Text style={styles.WishlistRightTextStyle}>{'ADD'}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, header: null}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="NoInternet"
          component={NoInternet}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="UserAuthFlow"
          component={UserAuthFlow}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="AppFlow"
          component={AppFlow}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="AppStackFlow"
          component={AppStackFlow}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="TripStackFlow"
          component={TripStackFlow}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="BecomeHostStack"
          component={BecomeHostStack}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="AccountStack"
          component={AccountStack}
          options={({navigation}) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="CmsPage"
        component={CmsPage}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const UserAuthFlow = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerification}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const AppStackFlow = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="SearchProperty"
        component={SearchProperty}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetail}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="CheckOurSelection"
        component={CheckOurSelection}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Amenities"
        component={Amenities}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="GuestReviews"
        component={GuestReviews}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="PaymentsPayouts"
        component={PaymentsPayouts}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="FilterSelection"
        component={FilterSelection}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="AddGuest"
        component={AddGuest}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="AddDates"
        component={AddDates}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ThingsToKnow"
        component={ThingsToKnow}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="GlobalPreferences"
        component={GlobalPreferences}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="ManageListings"
        component={ManageListings}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ConfirmationBooking"
        component={ConfirmationBooking}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="payoutMethods"
        component={payoutMethods}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="EmergencyContact"
        component={EmergencyContact}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="GovernmentId"
        component={GovernmentId}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="GiftCard"
        component={GiftCard}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Coupons"
        component={Coupons}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Taxes"
        component={Taxes}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="GuestContributors"
        component={GuestContributors}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="TravelForWork"
        component={TravelForWork}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />

      <Stack.Screen
        name="ReferAHost"
        component={ReferAHost}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const BecomeHostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="QuestionAndAnswerStep"
        component={QuestionAndAnswerStep}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="ConfirmAddress"
        component={ConfirmAddress}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="GuestSelection"
        component={GuestSelection}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="GuestOffers"
        component={GuestOffers}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="AddPhotos"
        component={AddPhotos}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="AddTitle"
        component={AddTitle}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="DescribePlace"
        component={DescribePlace}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="AddDescription"
        component={AddDescription}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="SetPrice"
        component={SetPrice}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="LastQuestion"
        component={LastQuestion}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />

      <Stack.Screen
        name="CheckOutListing"
        component={CheckOutListing}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
          headerStyle: styles.headerStyle,
          animationEnabled: false,
        })}
      />
    </Stack.Navigator>
  );
};

const TripStackFlow = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="TripDetail"
        component={TripDetail}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Upcoming trip',
          headerTintColor: Colors.GREY_TONE,
          headerTitleAlign: 'center',

          headerTitleStyle: [
            styles.headerTitleStyle,
            {color: Colors.SEARCH_TEXT},
          ],
          headerStyle: [styles.headerStyle, {backgroundColor: Colors.WHITE}],
          headerLeft: () => <CloseArrow onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
};

const AppFlow = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: true,
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: () => null,
          headerStyle: [styles.headerStyle, {backgroundColor: Colors.BLACK}],
          tabBarHideOnKeyboard: true,
          tabBarLabel: 'Home',
        })}
      />
      <Tab.Screen
        name="wishlist"
        component={Wishlist}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: 'WishList',
          headerTintColor: Colors.GREY_TONE,
          headerTitleAlign: 'center',

          headerTitleStyle: [
            styles.headerTitleStyle,
            {color: Colors.SEARCH_TEXT},
          ],
          headerStyle: [styles.headerStyle, {backgroundColor: Colors.WHITE}],
          headerLeft: () => null,
          headerRight: () => null,

          tabBarHideOnKeyboard: true,
          tabBarLabel: 'WishList',
        })}
      />
      <Tab.Screen
        name="trips"
        component={Trips}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Trips',
          headerTintColor: Colors.GREY_TONE,
          headerTitleAlign: 'center',

          headerTitleStyle: [
            styles.headerTitleStyle,
            {color: Colors.SEARCH_TEXT},
          ],
          headerStyle: [styles.headerStyle, {backgroundColor: Colors.WHITE}],
          headerLeft: () => null,
          headerRight: () => null,

          tabBarHideOnKeyboard: true,
          tabBarLabel: 'Trips',
        })}
      />
      <Tab.Screen
        name="messageScreen"
        component={MessageScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Message',
          headerTintColor: Colors.GREY_TONE,
          headerTitleAlign: 'center',

          headerTitleStyle: [
            styles.headerTitleStyle,
            {color: Colors.SEARCH_TEXT},
          ],
          headerStyle: [styles.headerStyle, {backgroundColor: Colors.WHITE}],
          headerLeft: () => null,
          headerRight: () => null,

          tabBarHideOnKeyboard: true,
          tabBarLabel: 'Message',
        })}
      />
      <Tab.Screen
        name="accountScreen"
        component={AccountScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Account',
          headerTintColor: Colors.GREY_TONE,
          headerTitleAlign: 'center',

          headerTitleStyle: [
            styles.headerTitleStyle,
            {color: Colors.SEARCH_TEXT},
          ],
          headerStyle: [styles.headerStyle, {backgroundColor: Colors.WHITE}],
          headerLeft: () => null,
          headerRight: () => null,

          tabBarHideOnKeyboard: true,
          tabBarLabel: 'Account',
        })}
      />
    </Tab.Navigator>
  );
};

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBarStyle}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.headerTitle !== undefined
            ? options.headerTitle
            : route.name;

        //console.log(route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {
                data: {
                  route_name: route.name,
                },
              },
            });
          }
        };

        const labelColor = isFocused ? Colors.RED_TXT : Colors.GREY;

        const homeSelected = Images.HOME_SELECTED_ICON;
        const homeUnSelected = Images.HOME_ICON;

        const heartSelected = Images.HEART_SELECTED_ICON;
        const heartUnselected = Images.HEART_ICON;

        const tripSelected = Images.TRIP_SELECTED_ICON;
        const tripUnselected = Images.TRIP_ICON;

        const messageSelected = Images.MESSAGE_SELECTED_ICON;
        const messageUnselected = Images.MESSAGE_ICON;

        const accountSelected = Images.ACCOUNT_SELECTED_ICON;
        const accountUnselected = Images.ACCOUNT_ICON;

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={route.name}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{flex: 1}}>
              <View style={styles.commonStyle2}>
                <Image
                  source={
                    route.name == 'home'
                      ? isFocused
                        ? homeSelected
                        : homeUnSelected
                      : route.name == 'wishlist'
                      ? isFocused
                        ? heartSelected
                        : heartUnselected
                      : route.name == 'trips'
                      ? isFocused
                        ? tripSelected
                        : tripUnselected
                      : route.name == 'messageScreen'
                      ? isFocused
                        ? messageSelected
                        : messageUnselected
                      : route.name == 'accountScreen'
                      ? isFocused
                        ? accountSelected
                        : accountUnselected
                      : null
                  }
                  style={styles.bottomTabImageStyle}
                />
                <Text
                  style={
                    isFocused
                      ? [
                          styles.bottomSelectedTabLabelStyle,
                          {color: labelColor},
                        ]
                      : [styles.bottomTabLabelStyle, {color: labelColor}]
                  }>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  searchiconstyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginRight: 20,
    tintColor: Colors.GRAY_BUTTONCOLOR,
  },
  backcloseiconStyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginLeft: 20,
    tintColor: Colors.GREY_80,
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: FontSizes.Size_18,
    fontFamily: Fonts.BOLD,
  },
  commonStyle2: {
    width: 100,
    alignItems: 'center',
    top: 0,
  },
  bottomTabLabelStyle: {
    fontSize: FontSizes.Size_12,
    fontFamily: Fonts.BOLD,
    marginTop: 5,
  },
  bottomSelectedTabLabelStyle: {
    fontSize: 12,
    fontFamily: Fonts.BOLD,
    marginTop: 5,
  },
  bottomTabImageStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginTop: 15,
  },
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 90 : 70,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    elevation: 10,
    shadowColor: Colors.BLACK,
    shadowOpacity: 2.0,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  backArrowStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  headerIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
    alignSelf: 'center',
    bottom: 15,
  },
  headerIconSearch: {
    width: 16,
    height: 16,
    marginRight: 50,
    alignSelf: 'center',

    marginTop: 20,
  },
  crossIconStyle: {
    height: 13,
    width: 13,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  addIconStyle: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    marginRight: 6,
  },
  WishlistRightHeaderStyle: {
    flexDirection: 'row',
  },
  WishlistRightTextStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.BOLD,
    lineHeight: 18,
    marginRight: 13,
  },
});

export default Navigation;
