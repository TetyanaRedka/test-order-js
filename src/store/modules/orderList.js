import api from "../../services/api";

export const orderList = {
  state: {
    orderList: [],
  },

  mutations: {
    SET_ORDERLIST(state, data) {
      state.orderList = data;
    },

    ADD_TY_ORDERLIST(state, newOrder) {
      state.orderList.orderList = state.orderList.push(newOrder);
    },

    FILTER_ORDERLIST(state, orderKey) {
      state.orderList = state.orderList.filter(
        (order) => order.id !== orderKey
      );
    },

    MODIFY_ORDERLIST(state, modifiedOrder) {
      state.orderList.map((order, i) =>
        order.id === modifiedOrder.id
          ? (state.orderList[i] = modifiedOrder)
          : order
      );
    },
  },

  actions: {
    async getOrderListAction(ctx) {
      const newOrderList = await api.getOrders();

      ctx.commit("SET_ORDERLIST", newOrderList.data);
    },

    async addOrderAction(ctx, newOrder) {
      const answer = await api.addOrder(newOrder);

      ctx.commit("ADD_TY_ORDERLIST", answer.data);
    },

    async deleteOrderAction(ctx, orderKey) {
      const answer = await api.deleteOrder(orderKey);

      if (answer.status === 200) {
        ctx.commit("FILTER_ORDERLIST", orderKey);
      }
    },

    async modifyOrderAction(ctx, modifiedOrder) {
      const answer = await api.modifyOrder(modifiedOrder);

      if (answer.status === 200) {
        ctx.commit("MODIFY_ORDERLIST", answer.data);
      }
    },
  },
};
