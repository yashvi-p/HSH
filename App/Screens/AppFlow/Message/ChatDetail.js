import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../Assets/Colors';
import {FontSizes} from '../../../Assets/FontSizes';
import {Fonts} from '../../../Assets/Fonts';
import {wp} from '../../../Helper/Responsive';
import {Images} from '../../../Assets/Images';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {useRef} from 'react';

export default function ChatDetail() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  const [chatdetail, setchatdetail] = useState([
    {
      id: 1,
      name: 'Vishal',
      message: `I'm a paragraph. I’m a great place for you to tell a story and let your users know a little more about you.`,
      is_sender_id: 0,
      date_time: new Date(),
    },

    {
      id: 2,
      name: 'Jayesh',
      message: 'Hi,Vishal',
      is_sender_id: 1,
      date_time: new Date(),
    },
    {
      id: 3,
      name: 'Vishal',
      message: `I'm a paragraph. I’m a great place for you to tell a story and let your users know a little more about you.`,
      is_sender_id: 1,
      date_time: new Date(),
    },

    {
      id: 4,
      name: 'Jayesh',
      message: 'Hi,Vishal here',
      is_sender_id: 0,
      date_time: new Date(),
    },
    {
      id: 5,
      name: 'Vishal',
      message: `let your users know a little more about you.`,
      is_sender_id: 1,
      date_time: new Date(),
    },

    {
      id: 6,
      name: 'Jayesh',
      message: 'Vishal',
      is_sender_id: 1,
      date_time: new Date(),
    },
  ]);

  const flatListRef = useRef();

  // however you detect new items
  flatListRef?.current?.scrollToEnd();

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
    headerTitle: 'Cuwa Mika',
    headerRight: props => <View></View>,
  });
  const flatChatDetail = data => {
    return (
      <FlatList
        data={data}
        style={{marginBottom: wp(74)}}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => data.id}
        keyboardShouldPersistTaps={'handled'}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef?.current?.scrollToEnd({animated: true})
        }
        onLayout={() => flatListRef?.current?.scrollToEnd({animated: true})}
        renderItem={({item}) => (
          <View style={{alignItems: 'baseline'}}>
            <Text
              style={
                item.is_sender_id == 0
                  ? [
                      styles.isSenderIdZeroTextStyle,
                      styles.isSenderIdZeroViewStyle,
                    ]
                  : [
                      styles.isSenderIdOneTextStyle,
                      styles.isSenderIdOneViewStyle,
                    ]
              }>
              {item.message}
            </Text>
            <Text
              style={
                item.is_sender_id == 0
                  ? styles.isSenderIdZeroDateTimeStyle
                  : styles.isSenderIdOneDateTimeStyle
              }>
              {moment(new Date(item.date_time)).format('ddd, hh:mm A')}
            </Text>
          </View>
        )}
      />
    );
  };

  const AddMessage = () => {
    setchatdetail(chatList => [
      ...chatList,
      {
        id: chatList[chatList.length - 1] + 1,
        name: 'Vishal',
        message: text,
        is_sender_id: 1,
        date_time: new Date(),
      },
    ]);
    onChangeText('');
  };

  const BottomView = () => {
    return (
      <View style={styles.bottomViewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={data => {
            onChangeText(data);
          }}
          value={text}
          placeholder="Type something"
          placeholderTextColor={Colors.GREY_80}
        />
        <TouchableOpacity
          onPress={() => {
            AddMessage();
          }}>
          <Image source={Images.SEND} style={styles.sendImageStyle} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.lineView} />

      {flatChatDetail(chatdetail)}
      {BottomView()}
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
    marginBottom: wp(15),
  },
  firstTxt: {color: Colors.TEXT_GREY},
  secondTxt: {color: Colors.WHITE},
  first: {backgroundColor: Colors.SEARCH_BACKGROUND},
  second: {backgroundColor: Colors.TEXT_GREY},
  mainViewStyle: {
    marginTop: wp(20),
  },
  isSenderIdZeroViewStyle: {
    marginLeft: wp(16),
    justifyContent: 'flex-start',
    paddingHorizontal: wp(16),
    paddingVertical: wp(15),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginRight: wp(15),
    alignSelf: 'flex-start',
    borderTopRightRadius: 16,
  },
  isSenderIdZeroTextStyle: {
    lineHeight: 24,
    fontSize: FontSizes.Size_14,
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    lineHeight: 18,
    justifyContent: 'flex-start',
    marginLeft: wp(16),
    marginTop: wp(8),
  },
  isSenderIdOneViewStyle: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Colors.GREY_TONE,
    marginRight: wp(15),
    paddingHorizontal: wp(16),
    paddingVertical: wp(15),
    marginLeft: wp(15),
    marginTop: wp(20),
    alignSelf: 'flex-end',
  },
  isSenderIdOneTextStyle: {
    fontSize: FontSizes.Size_16,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    justifyContent: 'flex-end',
  },
  isSenderIdZeroDateTimeStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    lineHeight: 18,
    justifyContent: 'flex-start',
    marginLeft: wp(16),
    marginTop: wp(8),
  },
  isSenderIdOneDateTimeStyle: {
    fontSize: FontSizes.Size_12,
    color: Colors.GREY_80,
    fontFamily: Fonts.REGULAR,
    lineHeight: 18,
    marginRight: wp(16),
    marginTop: wp(8),
    marginLeft: wp(270),
  },
  bottomViewStyle: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    height: wp(74),
    width: wp(375),
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: wp(0),
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
  textInputStyle: {
    height: wp(36),
    width: wp(303),
    paddingLeft: wp(8),
    paddingVertical: wp(6),
    backgroundColor: Colors.SEARCH_BACKGROUND,
    marginLeft: wp(20),
    marginTop: wp(10),
    borderRadius: 4,
    fontFamily: Fonts.REGULAR,
    FontSizes: FontSizes.Size_20,
    lineHeight: 24,
  },
  sendImageStyle: {
    width: wp(36),
    height: wp(36),
    borderRadius: 4,
    marginRight: wp(16),
    marginLeft: wp(8),
    marginTop: wp(10),
  },
});
