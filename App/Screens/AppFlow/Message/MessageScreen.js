import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../Assets/Colors';
import {FontSizes} from '../../../Assets/FontSizes';
import {Fonts} from '../../../Assets/Fonts';
import {wp} from '../../../Helper/Responsive';
import {Images} from '../../../Assets/Images';
import {TabView, TabBar} from 'react-native-tab-view';

export default function MessageScreen({navigation}) {
  const [inboxdata, inboxData] = useState([
    {
      id: 1,
      image: Images.PERSON_IMAGE,
      name: 'Lek To',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 2,
      image: Images.PLACED,
      name: 'Cuwa Mika',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 0,
    },
    {
      id: 3,
      image: Images.PERSON_IMAGE,
      name: 'Celia Stewart',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 4,
      image: Images.DASHBOARD_IMAGE2,
      name: 'Micin lyfe',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 0,
    },
    {
      id: 5,
      image: Images.PERSON_IMAGE,
      name: 'Adlinda Kirana',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 6,
      image: Images.DASHBOARD_IMAGE1,
      name: 'Micin lyfe',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 0,
    },
    {
      id: 1,
      image: Images.PERSON_IMAGE,
      name: 'Lek To',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 2,
      image: Images.PLACED,
      name: 'Cuwa Mika',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 3,
      image: Images.PERSON_IMAGE,
      name: 'Celia Stewart',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 4,
      image: Images.DASHBOARD_IMAGE2,
      name: 'Micin lyfe',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 5,
      image: Images.PERSON_IMAGE,
      name: 'Adlinda Kirana',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 1,
    },
    {
      id: 6,
      image: Images.DASHBOARD_IMAGE1,
      name: 'Micin lyfe',
      description: 'Hello there, i’m a paragraph..',
      time: '15:24',
      read_count: 0,
    },
  ]);
  const [notificationdata, setnotificationData] = useState([
    {
      id: 1,
      image: Images.NOTIFICATION_UNREAD,
      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '2 MIN',
    },
    {
      id: 2,
      image: Images.NOTIFICATION_UNREAD,
      description: 'Invite a friend and earn 30GBP',
      time: '18 MIN',
    },
    {
      id: 3,
      image: Images.NOTIFICATION_READ,
      description:
        'Add your work email to unlock extra perks for business trips.',

      time: '21 MIN',
    },
    {
      id: 4,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 5,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 6,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 7,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 6,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 7,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 6,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
    {
      id: 7,
      image: Images.NOTIFICATION_READ,

      description:
        'Add your work email to unlock extra perks for business trips.',
      time: '24 MIN',
    },
  ]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Notification'},
    {key: '2', title: 'Inbox'},
  ]);

  const renderHeader = props => {
    return <TabBar {...props} />;
  };

  const flatListInbox = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AppStackFlow', {screen: 'ChatDetail'});
            }}>
            <View style={styles.inboxViewStyle}>
              <View style={styles.viewStyle}>
                <Image style={styles.imageStyle} source={item.image} />

                <View style={styles.viewDecStyle}>
                  <Text style={styles.nameStyle}>{item.name}</Text>
                  <Text style={styles.descriptionStyle}>
                    {item.description}
                  </Text>
                </View>
                <View>
                  <Text style={styles.timeStyle}>{item.time}</Text>
                  {item.read_count > 0 ? (
                    <View style={styles.roundIconStyle} />
                  ) : null}
                </View>
              </View>
              <View style={styles.drawline}></View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  const flatNotification = data => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        renderItem={({item}) => (
          <View style={styles.notificationViewStyle}>
            <View style={styles.viewStyle}>
              <Image
                style={styles.notificationImageStyle}
                source={item.image}
              />

              <View style={styles.viewDecStyle}>
                <Text style={styles.notificationDesStyle}>
                  {item.description}
                </Text>
                <Text style={styles.notificationtimeStyle}>{item.time}</Text>
              </View>
            </View>

            <View style={styles.drawlinenotification}></View>
          </View>
        )}
      />
    );
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return (
          <View style={styles.container}>
            <View style={styles.drawline} />
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            {flatNotification(notificationdata)}
          </View>
        );
      case '2':
        return (
          <View style={styles.container}>
            <View style={styles.drawline} />
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            {flatListInbox(inboxdata)}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <TabView
      style={styles.container}
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderHeader={renderHeader()}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({route, focused}) => (
            <Text
              style={[
                focused ? styles.activeTabTextColor : styles.tabTextColor,
                styles.tabFontStyle,
              ]}>
              {route.title}
            </Text>
          )}
          style={{backgroundColor: Colors.WHITE}}
          indicatorStyle={{backgroundColor: Colors.RED_TXT}}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageStyle: {
    height: wp(56),
    width: wp(56),
    margin: wp(16),
    borderRadius: 56 / 2,
    overflow: 'hidden',
  },
  viewStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  nameStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: wp(20),
    lineHeight: 26,
  },
  viewDecStyle: {
    flex: 1,
  },
  descriptionStyle: {
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(4),
    lineHeight: 24,
  },
  roundIconStyle: {
    height: wp(6),
    width: wp(6),
    resizeMode: 'contain',
    margin: wp(16),
    backgroundColor: Colors.RED_TXT,
    borderRadius: 6 / 2,
  },
  timeStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(16),
    marginRight: wp(16),
    lineHeight: 18,
  },
  drawline: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
  },
  drawlinenotification: {
    backgroundColor: Colors.SEARCH_BORDER,
    height: wp(1),
    borderRadius: 16,
    opacity: 0.5,
    marginHorizontal: wp(16),
    marginTop: wp(16),
  },
  notificationViewStyle: {
    marginTop: wp(20),
  },

  notificationImageStyle: {
    height: wp(40),
    width: wp(40),
    resizeMode: 'contain',
    margin: wp(16),
    backgroundColor: Colors.BACKGROUND_COLOR,
    borderColor: Colors.SOLID,
    borderRadius: 10,
  },
  notificationDesStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(16),
    lineHeight: 24,
    marginRight: wp(5),
  },
  notificationtimeStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    marginTop: wp(4),
    lineHeight: 18,
  },
  activeTabTextColor: {
    color: Colors.RED_TXT,
  },
  tabTextColor: {
    color: Colors.SEARCH_TEXT,
  },
  tabFontStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_16,
    lineHeight: 26,
  },
});
