import api from "../../services/api";

export const statusList = {
  state: {
    statusList: [],
  },
  mutations: {
    SET_STATUSLIST(state, data) {
      state.statusList = data;
    },
  },

  actions: {
    async getStatusListAction(ctx) {
      const newStatusList = await api.getStatus();

      ctx.commit("SET_STATUSLIST", newStatusList.data);
    },
  },
  getters: {
    statusById: (state) => (id) => {
      return state.statusList.find((status) => status.id === id);
    },
  },
};
