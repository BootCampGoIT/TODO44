import { data } from './data';

const getStorage = key => {
  const items = JSON.parse(localStorage.getItem(key));
  if (items) {
    data[key].items = items;
    return items
  }
};
const setStorage = key => {
  localStorage.setItem(key, JSON.stringify(data[key].items));
};

export const persister = { getStorage, setStorage };
