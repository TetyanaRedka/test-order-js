import axios from "axios";

axios.defaults.baseURL = "https://webtest.it.ua/testApp/api";

const getProducts = async () => await axios.get(`products`);

const getOrders = async () => await axios.get(`/orders`);

const getStatus = async () => await axios.get(`/statuses`);

const addOrder = async (newOrder) => await axios.post(`/orders/add`, newOrder);

const deleteOrder = async (orderId) =>
  await axios.post(`/orders/delete/${orderId}`);

const modifyOrder = async (modifiedOrder) =>
  await axios.post(`/orders/update`, modifiedOrder);

const api = {
  getProducts,
  getOrders,
  getStatus,
  addOrder,
  deleteOrder,
  modifyOrder,
};

export default api;
