import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {wp} from '../Helper/Responsive';
import CardViewWrapper from './CardViewWrapper';
import {FontSizes} from '../Assets/FontSizes';
import {Fonts} from '../Assets/Fonts';
import {Colors} from '../Assets/Colors';
import {Images} from '../Assets/Images';
import {useState} from 'react';
import {useRef} from 'react';

export default function CardViewFlatList({
  item,
  imageSize,
  onPress,
  customStyle,
  onHeartPressed,
  onHeartUnPressed,
  currentPage,
  totalPage,
  CallEndReachedApi,
}) {
  const [likedView, setLikedView] = useState([]);
  const onEndReachedCalledDuringMomentum = useRef(true);

  const handleRemoveItem = _id => {
    setLikedView(likedView.filter(item => item != _id));
  };

  return (
    <FlatList
      style={[
        customStyle,
        {
          marginTop: wp(10),
        },
      ]}
      data={item}
      keyExtractor={(item, index) => item.id}
      onEndReachedThreshold={0.000001}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
      onEndReached={() => {
        if (!onEndReachedCalledDuringMomentum.current) {
          if (currentPage <= totalPage) {
            CallEndReachedApi();
          }
        }
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.MEDIUM,
              fontSize: FontSizes.Size_16,
              color: Colors.TEXT_GREY,
            }}>
            No Data Found
          </Text>
          {/* <Label>No</Label> */}
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <CardViewWrapper>
          <TouchableWithoutFeedback>
            <View style={{padding: 10}}>
              <Image
                style={[
                  styles.flatListImage,
                  {width: imageSize ? imageSize : wp(327)},
                ]}
                source={{
                  uri:
                    item.property_image.length > 0
                      ? item.property_image[0].regular ||
                        item.property_image[0].thumbnail
                      : 'https://c1.wallpaperflare.com/preview/260/731/810/bedroom-bed-wall-decoration.jpg',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  onPress(item);
                }}>
                <Text style={styles.flatListTxt}>{item.property_title}</Text>
                <Text style={styles.flatListTxt1}>
                  {item.property_description}
                </Text>

                <View style={styles.rowView}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={[
                        styles.flatListTxt1,
                        {
                          color: Colors.GREY_TONE,
                          fontSize: FontSizes.Size_15,
                          marginRight: 5,
                        },
                      ]}>
                      {item.property_price.currency}{' '}
                      {item.property_price.basePrice}
                    </Text>
                    <Text
                      style={[
                        styles.flatListTxt1,
                        {
                          color: Colors.LIGHT_GREY,
                          fontSize: FontSizes.Size_15,
                          paddingLeft: 0,
                        },
                      ]}>
                      /night
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={styles.ratingImage}
                      source={Images.RATE_IMAGE}
                    />
                    <Text
                      style={[
                        styles.flatListTxt1,
                        {
                          color: Colors.GREY_TONE,
                          fontSize: FontSizes.Size_13,
                          marginRight: 5,
                          paddingLeft: 5,
                        },
                      ]}>
                      {item.review_count}
                    </Text>
                    <Text
                      style={[
                        styles.flatListTxt1,
                        {
                          color: Colors.LIGHT_GREY,
                          fontSize: FontSizes.Size_13,
                          paddingLeft: 0,
                        },
                      ]}>
                      {/* {item.review} */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {item.hostType == '' ? null : (
                <View style={styles.hostType}>
                  <Text style={styles.typesTxt}>{item.property_type}</Text>
                </View>
              )}

              {likedView.includes(item._id) ? (
                <TouchableOpacity
                  style={[
                    {
                      position: 'absolute',
                      right: 30,
                      marginTop: wp(25),
                    },
                    styles.heartView,
                  ]}
                  onPress={() => {
                    onHeartUnPressed(), handleRemoveItem(item._id);
                  }}>
                  <Image
                    style={[styles.heartFillIcon]}
                    source={Images.HEART_FILL_ICON}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 30,
                    marginTop: wp(25),
                  }}
                  onPress={() => {
                    onHeartPressed(),
                      setLikedView(oldArray => [...oldArray, item._id]);
                  }}>
                  <Image
                    style={[styles.heartFillIcon]}
                    source={Images.HEART_BOX_ICON}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </CardViewWrapper>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatListImage: {
    width: wp(327),
    height: wp(260),
    overflow: 'hidden',
    borderRadius: 16,
  },
  heartFillIcon: {
    width: wp(28),
    height: wp(28),
  },
  typesTxt: {
    color: Colors.WHITE,
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSizes.Size_11,
    padding: 10,
    textAlign: 'center',
  },
  heartView: {
    width: wp(28),
    height: wp(28),
    backgroundColor: 'rgba(48, 56, 55, 0.3)',
    borderRadius: 8,
    position: 'absolute',
    marginTop: wp(25),
    right: 30,
  },

  hostType: {
    width: wp(91),
    backgroundColor: 'rgba(48, 56, 55, 0.3)',
    borderRadius: 8,
    marginLeft: wp(16),
    position: 'absolute',
    marginTop: wp(25),
  },
  ratingImage: {
    width: wp(14),
    height: wp(14),
  },
  flatListTxt: {
    fontSize: FontSizes.Size_15,
    fontFamily: Fonts.MEDIUM,
    padding: 8,
    paddingLeft: 16,
    color: Colors.GREY_TONE,
  },
  flatListTxt1: {
    fontSize: FontSizes.Size_11,
    fontFamily: Fonts.MEDIUM,
    paddingBottom: 16,
    paddingLeft: 16,
    color: Colors.SEARCH_TEXT,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
