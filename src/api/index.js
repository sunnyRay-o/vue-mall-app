import axios from 'axios';
import baseURL, { URLS } from './URLS';

const request = axios.create({
  baseURL,
  params: {
    appkey: 'dd_1597654682810',
  },
});
request.interceptors.response.use((resp) => resp.data);
const getSideBarList = (type) => request.get(URLS.getSideList, {
  params: {
    type,
  },
});
const getGoodsList = (type, page, size, sort) => request.get(URLS.getGoodsList, {
  params: {
    type,
    page,
    size,
    sort,
  },
});
export default {
  getSideBarList,
  getGoodsList,
};
