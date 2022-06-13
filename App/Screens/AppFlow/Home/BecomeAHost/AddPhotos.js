import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {WhiteStatusBar} from '../../../../Components/AppStatusBar';
import {wp} from '../../../../Helper/Responsive';
import {Colors} from '../../../../Assets/Colors';
import BackAndNextBottom from '../../../../Components/BackAndNextBottom';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import {Fonts} from '../../../../Assets/Fonts';
import {FontSizes} from '../../../../Assets/FontSizes';
import {Images} from '../../../../Assets/Images';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {getLabelValue} from '../../../../Helper/database';
import {setPlacePhotos} from '../../../../Redux/Actions/generalAction';
import Toast from 'react-native-root-toast';
import {toastMessageConfig} from '../../../../Components/ToastMessage';

export default function AddPhotos() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [imageData, setImageData] = useState([]);
  const placePhotos = useSelector(state => state.generalReducer.placePhotos);

  const dispatch = useDispatch();

  const [flatListData, setFlatListData] = useState([
    {id: 1, image: Images.DASHBOARD_IMAGE},
    {id: 2, image: Images.DASHBOARD_IMAGE1},
    {id: 3, image: Images.DASHBOARD_IMAGE2},
    {id: 4, image: Images.DASHBOARD_IMAGE},

    {id: 5, image: Images.DASHBOARD_IMAGE1},
    {id: 6, image: Images.DASHBOARD_IMAGE2},
    {id: 7, image: Images.DASHBOARD_IMAGE},
    {id: 8, image: Images.DASHBOARD_IMAGE1},
  ]);

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
      fontFamily: Fonts.MEDIUM,
      fontSize: FontSizes.Size_15,
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
    headerTitle: ``,
    headerRight: props => (
      <View
        style={{
          marginRight: wp(16),
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts.MEDIUM,
            color: Colors.SEARCH_TEXT,
            fontSize: FontSizes.Size_12,
            textTransform: 'uppercase',
          }}>
          {GetLabel('need_help')}
        </Text>
      </View>
    ),
  });

  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      compressImageQuality: 0.3,
      cropping: true,
    }).then(response => {
      console.log(response);
      setImageData(arr => [...arr, response]);
    });
  };

  const OpenGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 400,
      height: 400,
      compressImageQuality: 0.3,
      cropping: true,
    }).then(response => {
      console.log('response', response);
      setImageData(arr => [...arr, response]);
      console.log('ImageData', imageData);
    });
  };

  const getCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const permissions = [PERMISSIONS.ANDROID.CAMERA];
      await requestMultiple(permissions)
        .then(response => {
          console.log('Android', response);
          if (
            response[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED
            // &&
            // response[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
            //   RESULTS.GRANTED
          ) {
            OpenCamera();
            console.log('Granted Camera & Storage Permission');
          } else {
            openSettings().catch(error => console.log(error));
            console.log('Camera & Storage Permission denied');
          }
        })
        .catch(error => {
          console.warn('Camera & Storage Permission denied');
          console.log(error);
        });
    } else {
      const permissions = [PERMISSIONS.IOS.CAMERA];
      await requestMultiple(permissions)
        .then(response => {
          console.log('IOS', response);
          if (
            response[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED
            // &&
            // response[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED
          ) {
            OpenCamera();
            console.log('Granted Camera & Storage Permission');
          } else {
            openSettings().catch(error => console.log(error));
            console.log('Camera & Storage Permission denied');
          }
        })
        .catch(error => {
          console.warn('Camera & Storage Permission denied');
          console.log(error);
        });
    }
  };

  const getStoragePermission = async fileType => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(response => {
          console.log('Android', response);
          if (response === RESULTS.GRANTED) {
            OpenGallery();

            console.log('Granted Storage Permission');
          } else {
            openSettings().catch(error => console.log(error));
            console.log('Storage Permission Denied');
          }
        })
        .catch(error => {
          console.warn('Storage Permission denied');
          console.log(error);
        });
    } else {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(response => {
          console.log('IOS', response);
          if (response === RESULTS.GRANTED) {
            OpenGallery();

            console.log('Granted Storage Permission');
          } else {
            openSettings().catch(error => console.log(error));
            console.log('Storage Permission Denied');
          }
        })
        .catch(error => {
          console.warn('Storage Permission Denied');
          console.log(error);
        });
    }
  };

  const TopView = () => {
    return (
      <View style={styles.flatListContainerView}>
        <Text style={styles.hostTxt}>
          {GetLabel('lets_add_some_photos_of_your_place')}
        </Text>
        <Text
          style={[
            styles.hostTxt,
            {
              fontSize: FontSizes.Size_14,
              color: Colors.GREY_80,
              marginTop: wp(8),
            },
          ]}>
          {GetLabel('add_at_least_photos')}
        </Text>
      </View>
    );
  };

  const ImageViewSelection = () => {
    return (
      <View style={{marginTop: wp(24)}}>
        <TouchableOpacity
          onPress={() => {
            setSelected('Gallery');
            getStoragePermission();
          }}>
          <Image style={styles.uploadImage} source={Images.UPLOAD_GALLERY} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelected('Camera');
            getCameraPermission();
          }}
          style={{marginTop: wp(24)}}>
          <Image style={styles.uploadImage} source={Images.UPLOAD_CAMERA} />
        </TouchableOpacity>
      </View>
    );
  };
  const FlatListView = () => {
    return (
      <>
        {imageData.length == 0 ? ImageViewSelection() : null}
        {selected != '' ? (
          <FlatList
            style={{
              marginLeft: wp(16),
              marginTop: wp(20),
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={imageData}
            keyExtractor={(item, index) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={[
                  styles.listImage,
                  {
                    marginTop: wp(10),
                    marginLeft: wp(5),
                    marginRight: wp(5),
                  },
                ]}>
                <Image
                  style={styles.listImage}
                  resizeMode={'stretch'}
                  source={{uri: item.path}}
                />
                <TouchableOpacity
                  style={styles.crossIconView}
                  onPress={() => {
                    setImageData(
                      imageData.filter(todo => {
                        if (todo !== item) return true;
                      }),
                    );
                  }}>
                  <Image style={styles.crossIcon} source={Images.GREY_CROSS} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : null}
      </>
    );
  };

  const UploadMore = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          getStoragePermission();
        }}
        style={styles.loadMoreView}>
        <Image style={styles.add} source={Images.PLUS} />
        <Text style={styles.uploadMore}>{GetLabel('upload_more')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteStatusBar />
      <View style={styles.lineView} />
      <ScrollView style={[styles.container, {marginBottom: wp(100)}]}>
        {TopView()}
        {FlatListView()}
        {imageData.length == 0 ? null : UploadMore()}
      </ScrollView>
      <View style={styles.backView}>
        <BackAndNextBottom
          progressValue={5}
          backPressed={() => {
            navigation.goBack();
          }}
          nextPressed={() => {
            if (imageData.length == 0)
              Toast.show(`Please select atleast one image`, toastMessageConfig);
            else {
              navigation.navigate('AddTitle');
              dispatch(setPlacePhotos(JSON.stringify(imageData)));
            }
          }}
          showNextVisible={true}
        />
      </View>
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
  },
  backView: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: Platform.OS === 'android' ? 0 : wp(30),
    backgroundColor: Colors.WHITE,
  },

  flatListContainerView: {
    marginLeft: wp(16),
    marginRight: wp(16),
    marginTop: wp(24),
  },
  backView: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: Platform.OS === 'android' ? 0 : wp(30),
    backgroundColor: Colors.WHITE,
  },
  hostTxt: {
    color: Colors.GREY_TONE,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_18,
    textAlign: 'center',
    marginLeft: wp(20),
    marginRight: wp(20),
  },
  uploadImage: {
    width: wp(343),
    height: wp(182),
    alignSelf: 'center',
  },
  listImage: {
    width: wp(164),
    height: wp(110),
    flex: 1,
    borderRadius: wp(10),
  },
  crossIcon: {
    width: wp(28),
    height: wp(28),
  },
  crossIconView: {
    position: 'absolute',
    marginTop: Platform.OS === 'android' ? wp(10) : wp(30),
    marginLeft: wp(130),
  },
  loadMoreView: {
    width: wp(343),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREY_80,
    borderStyle: 'dashed',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: wp(40),
  },
  add: {
    width: wp(12),
    height: wp(12),
    alignSelf: 'center',
    marginRight: wp(8),
  },
  uploadMore: {
    color: Colors.TEXT_GREY,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSizes.Size_12,
  },
});
