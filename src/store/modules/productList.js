import api from "../../services/api";

export const productList = {
  state: {
    productList: [],
  },
  mutations: {
    SET_PRODUCTLIST(state, data) {
      state.productList = data;
    },
  },

  actions: {
    async getProductListAction(ctx) {
      const newproductList = await api.getProducts();

      ctx.commit("SET_PRODUCTLIST", newproductList.data);
    },
  },

  getters: {
    productById: (state) => (productId) => {
      return state.productList.find((product) => product.id === productId);
    },
  },
};
