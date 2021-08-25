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
const search = (type, page, size) => request.get(URLS.search, {
  params: {
    type, page, size,
  },
});
const fuzzyQuery = (likeValue) => request.get(URLS.likeSearch, {
  params: {
    likeValue,
  },
});
const getGoodsByIds = (value) => request.get(URLS.getGoodsByIds, {
  params: {
    value,
  },
});
export default {
  getSideBarList,
  getGoodsList,
  search,
  fuzzyQuery,
  getGoodsByIds,
};
