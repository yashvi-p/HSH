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

const initialState = {
  labelApiResponse: [],
  userLanguage: '',
  isUserLoggedIn: '0',
  language_id: 1,
  //language Detail
  languageData: [],
  countryData: [],
  userData: [],
  deviceToken: '',
  verifyOtpData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LABEL_API_RESPONSE:
      return {
        ...state,
        labelApiResponse: action.payload,
      };

    case USER_LANGUAGE:
      return {
        ...state,
        userLanguage: action.payload,
      };

    case IS_USER_LOGGEDIN:
      return {
        ...state,
        isUserLoggedIn: action.payload,
      };

    case LANGUAGE_ID:
      return {
        ...state,
        language_id: action.payload,
      };

    case LANGUAGE_DATA:
      return {
        ...state,
        languageData: action.payload,
      };

    case COUNTRY_RESPONSE:
      return {
        ...state,
        countryData: action.payload,
      };

    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    case DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.payload,
      };

    case VERIFY_OTP_DATA:
      return {
        ...state,
        verifyOtpData: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
