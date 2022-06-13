import {
  ADDRESS_DATA,
  ADULT,
  AMENITIES_DATA,
  BECOME_HOST_DATA,
  CHECK_SELECTION_LISTING,
  CHILDREN,
  DESCRIBE_PLACE,
  END_DATE,
  GUEST_DATA,
  HOST_PLACE,
  LANGUAGE_DATA,
  NET_INFO_DATA,
  PLACE_API_ADDRESS,
  PLACE_DESCRIPTION,
  PLACE_NAME,
  PLACE_PHOTOS,
  PLACE_PRICE,
  PROPERTY_DETAIL,
  ROOM,
  SEARCH_API_CALLING,
  START_DATE,
} from '../ActionType';

const initialState = {
  becomeHostData: {},
  hostPlace: {},
  addressData: {},
  guestData: {},
  amenitiesData: {},
  placePhotos: [],
  placeName: '',
  placeDescription: '',
  placePrice: '',
  startDate: '',
  endDate: '',
  adult: 0,
  children: 0,
  room: 0,
  //check selection
  checkSelectionListData: [],
  totalCheckSelectionListPage: 0,
  checkSelectionListDataCurrentPage: 1,

  //search List
  searchListData: [],
  totalSearchListPage: 0,
  searchListDataCurrentPage: 1,

  //property Detail
  propertyDetail: [],

  netInfo: true,
  placeApiAddress: {},
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case BECOME_HOST_DATA:
      return {
        ...state,
        becomeHostData: action.payload,
      };

    case HOST_PLACE:
      return {
        ...state,
        hostPlace: action.payload,
      };
    case ADDRESS_DATA:
      return {
        ...state,
        addressData: action.payload,
      };

    case GUEST_DATA:
      return {
        ...state,
        guestData: action.payload,
      };

    case AMENITIES_DATA:
      return {
        ...state,
        amenitiesData: action.payload,
      };

    case PLACE_PHOTOS:
      return {
        ...state,
        placePhotos: action.payload,
      };

    case PLACE_NAME:
      return {
        ...state,
        placeName: action.payload,
      };

    case PLACE_DESCRIPTION:
      return {
        ...state,
        placeDescription: action.payload,
      };
    case PLACE_PRICE:
      return {
        ...state,
        placePrice: action.payload,
      };

    case START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };

    case ADULT:
      return {
        ...state,
        adult: action.payload,
      };
    case CHILDREN:
      return {
        ...state,
        children: action.payload,
      };
    case ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case CHECK_SELECTION_LISTING:
      return {
        ...state,
        checkSelectionListDataCurrentPage: parseInt(action.payload.page) + 1,
        totalCheckSelectionListPage: action.payload.total_records,
        checkSelectionListData:
          parseInt(action.payload.page) > 1
            ? [...state.checkSelectionListData, ...action.payload.result]
            : action.payload.result,
      };

    case SEARCH_API_CALLING:
      return {
        ...state,
        searchListDataCurrentPage: parseInt(action.payload.page) + 1,
        totalSearchListPage: action.payload.total_records,
        searchListData:
          parseInt(action.payload.page) > 1
            ? [...state.searchListData, ...action.payload.result]
            : action.payload.result,
      };

    case PROPERTY_DETAIL:
      return {
        ...state,
        propertyDetail: action.payload,
      };

    case NET_INFO_DATA:
      return {
        ...state,
        netInfo: action.payload,
      };

    case PLACE_API_ADDRESS:
      return {
        ...state,
        placeApiAddress: action.payload,
      };

    default:
      return state;
  }
};

export default generalReducer;
