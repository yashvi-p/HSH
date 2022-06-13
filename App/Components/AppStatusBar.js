import React from 'react';
import {StatusBar} from 'react-native';
import {Colors} from '../Assets/Colors';

const WhiteStatusBar = () => {
  return (
    <StatusBar
      hidden={false}
      animated={true}
      barStyle="dark-content"
      backgroundColor={Colors.WHITE}
    />
  );
};

const CustomStatusBar = ({backgroundColor}) => {
  return (
    <StatusBar
      hidden={false}
      animated={true}
      barStyle="dark-content"
      backgroundColor={backgroundColor}
    />
  );
};

export {WhiteStatusBar, CustomStatusBar};
