import {
  ADDRESS_DATA,
  ADULT,
  AMENITIES_DATA,
  BECOME_HOST_DATA,
  CHECK_SELECTION_LISTING,
  CHILDREN,
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

const setBecomeHostData = data => {
  return {
    type: BECOME_HOST_DATA,
    payload: data,
  };
};

const setHostPlace = data => {
  return {
    type: HOST_PLACE,
    payload: data,
  };
};

const setAddressData = data => {
  return {
    type: ADDRESS_DATA,
    payload: data,
  };
};

const setGuestData = data => {
  return {
    type: GUEST_DATA,
    payload: data,
  };
};

const setAmenities = data => {
  return {
    type: AMENITIES_DATA,
    payload: data,
  };
};

const setPlacePhotos = data => {
  return {
    type: PLACE_PHOTOS,
    payload: data,
  };
};

const setPlaceDescription = data => {
  return {
    type: PLACE_DESCRIPTION,
    payload: data,
  };
};

const setPlaceName = data => {
  return {
    type: PLACE_NAME,
    payload: data,
  };
};

const setStartDate = data => {
  return {
    type: START_DATE,
    payload: data,
  };
};

const setEndDate = data => {
  return {
    type: END_DATE,
    payload: data,
  };
};

const setAdult = data => {
  return {
    type: ADULT,
    payload: data,
  };
};

const setChildren = data => {
  return {
    type: CHILDREN,
    payload: data,
  };
};

const setRoom = data => {
  return {
    type: ROOM,
    payload: data,
  };
};

const setSelectionListing = data => {
  return {
    type: CHECK_SELECTION_LISTING,
    payload: data,
  };
};

const setSearchApiCalling = data => {
  return {
    type: SEARCH_API_CALLING,
    payload: data,
  };
};

const setPropertyDetail = data => {
  return {
    type: PROPERTY_DETAIL,
    payload: data,
  };
};

const setPlacePrice = data => {
  return {
    type: PLACE_PRICE,
    payload: data,
  };
};

const setNetInfo = data => {
  return {
    type: NET_INFO_DATA,
    payload: data,
  };
};

const setPlaceApiAddress = data => {
  return {
    type: PLACE_API_ADDRESS,
    payload: data,
  };
};

export {
  setBecomeHostData,
  setHostPlace,
  setAddressData,
  setGuestData,
  setAmenities,
  setPlacePhotos,
  setPlaceName,
  setPlaceDescription,
  setStartDate,
  setEndDate,
  setAdult,
  setChildren,
  setRoom,
  setSelectionListing,
  setSearchApiCalling,
  setPropertyDetail,
  setPlacePrice,
  setNetInfo,
  setPlaceApiAddress,
};
