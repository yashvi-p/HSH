import {LogConst} from './LogConst';

const apiUrl = 'https://homeswisshome.vrinsoft.in/api/';
const authorizationToken =
  'Basic MDM1YTljOTRlOGRmZTgzMmI1Y2ZmMDlhMzI3ZjhjYzc6MzlhZDdmZWI3Mzc5N2NiZjBkYjkxNjEyZDFhMzBmOTc=';

const ApiConfigFormData = (data, apiName) => {
  let config = {
    method: 'post',
    url: `${apiUrl}${apiName}`,
    headers: {
      Authorization: `${authorizationToken}`,
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  };
  if (LogConst() == true) {
    console.log('Api Log-----=>', config);
  }
  return config;
};

const ApiConfigApplicationJson = (data, apiName) => {
  let config = {
    method: 'post',
    url: `${apiUrl}${apiName}`,
    headers: {
      Authorization: `${authorizationToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  if (LogConst() == true) {
    console.log('Api Log-----=>', config);
  }
  return config;
};

const ApiConfigForWithoutParam = apiName => {
  let config = {
    method: 'post',
    url: `${apiUrl}${apiName}`,
    headers: {
      // Authorization: `${authorizationToken}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  if (LogConst() == true) {
    console.log('Api Log-----=>', config);
  }
  return config;
};

export {ApiConfigFormData, ApiConfigApplicationJson, ApiConfigForWithoutParam};
