import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const hp = px => {
  return heightPercentageToDP(((px / 812) * 100).toFixed(2));
};

const wp = px => {
  return widthPercentageToDP(((px / 375) * 100).toFixed(2));
};

export {hp, wp};
