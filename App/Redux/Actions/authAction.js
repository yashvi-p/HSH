import {
  BLANK_USER_DETAIL,
  COUNTRY_RESPONSE,
  DEVICE_TOKEN,
  IS_USER_LOGGEDIN,
  LABEL_API_RESPONSE,
  LANGUAGE_DATA,
  LANGUAGE_ID,
  USER_DATA,
  USER_LANGUAGE,
  VERIFY_OTP_DATA,
} from '../ActionType';

const setLabels = data => {
  return {
    type: LABEL_API_RESPONSE,
    payload: data,
  };
};

const setUserLanguage = data => {
  return {
    type: USER_LANGUAGE,
    payload: data,
  };
};

const setUserLoggedInData = data => {
  return {
    type: IS_USER_LOGGEDIN,
    payload: data,
  };
};

const setBlankUserData = data => {
  return {
    type: BLANK_USER_DETAIL,
    payload: data,
  };
};

const setUserLanguageId = data => {
  return {
    type: LANGUAGE_ID,
    payload: data,
  };
};

const setLanguageData = data => {
  return {
    type: LANGUAGE_DATA,
    payload: data,
  };
};

const setCountryData = data => {
  return {
    type: COUNTRY_RESPONSE,
    payload: data,
  };
};

const setUserData = data => {
  return {
    type: USER_DATA,
    payload: data,
  };
};

const setDeviceToken = data => {
  return {
    type: DEVICE_TOKEN,
    payload: data,
  };
};

const setVerifyOtpData = data => {
  return {
    type: VERIFY_OTP_DATA,
    payload: data,
  };
};

export {
  setLabels,
  setUserLanguage,
  setUserLoggedInData,
  setBlankUserData,
  setUserLanguageId,
  setLanguageData,
  setCountryData,
  setUserData,
  setDeviceToken,
  setVerifyOtpData,
};
