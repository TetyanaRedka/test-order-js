<template>
  <Modal v-if="createOrder" v-on:edit="ChangeModal" />

  <el-button type="primary" @click="ChangeModal()">Добавить заказ</el-button>

  <div
    class="order-list"
    v-if="
      orderList.length > 0 && productList.length > 0 && statustList.length > 0
    "
  >
    <OrderCard v-for="item in orderList" :key="item.id" :orderData="item" />
  </div>
</template>

<script>
import OrderCard from "./components/OrderCard.vue";

import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    OrderCard,

    Modal,
  },
  data() {
    return {
      createOrder: false,
    };
  },

  mounted: function () {
    this.$store.dispatch("getProductListAction");
    this.$store.dispatch("getStatusListAction");
    this.$store.dispatch("getOrderListAction");
  },

  computed: {
    orderList() {
      return this.$store.state.orderList.orderList;
    },
    productList() {
      return this.$store.state.productList.productList;
    },
    statustList() {
      return this.$store.state.statusList.statusList;
    },
  },
  methods: {
    ChangeModal: function () {
      this.createOrder = !this.createOrder;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(245, 245, 245);
  padding-top: 60px;
}

body {
  margin: 0;
}

.order-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
