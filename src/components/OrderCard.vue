<template>
  <div class="order-card">
    <CreateOrder
      v-if="edit"
      :actualOrder="orderData"
      :creating="false"
      v-on:edit="editChange"
    />
    <div class="order-info" v-if="!edit && productById && statustById">
      <div class="image">
        <el-image :src="productById.photoUrl" alt="Product-view"> </el-image>
      </div>
      <div class="order-detales" v-if="!edit && productById && statustById">
        <div>
          <p class="product__name product-data">{{ productById.name }}</p>

          <p class="product-data">Цена: {{ productById.price }}</p>

          <p class="product-data">Количество: {{ orderData.count }}</p>
          <p class="product-data">Сумма: {{ ammount }}</p>
          <p class="product-data">Cтатус: {{ statustById.name }}</p>
        </div>
        <div class="button-block">
          <el-button type="primary" v-if="!edit" @click="editChange()"
            >Редактировать</el-button
          >
          <el-button type="primary" @click="open">Удалить</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateOrder from "./CreateOrder.vue";

export default {
  name: "order-card",

  components: {
    CreateOrder,
  },

  props: {
    orderData: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      edit: false,
    };
  },

  computed: {
    productById() {
      return this.$store.getters.productById(this.orderData.productId);
    },
    statustById() {
      return this.$store.getters.statusById(this.orderData.statusId);
    },
    ammount() {
      return this.productById.price * this.orderData.count;
    },
  },

  methods: {
    deleteOrder: function (orderKey) {
      this.$store.dispatch("deleteOrderAction", orderKey);
    },

    editChange: function () {
      this.edit = !this.edit;
    },

    open() {
      this.$confirm("Вы удаляете заказ. Продолжить?", "Внимание!", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.deleteOrder(this.orderData.id);

          this.$message({
            type: "success",
            message: "Заказ удален",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Удаление отменено",
          });
        });
    },
  },
};
</script>

<style>
.order-card {
  margin: 15px;
  box-shadow: 10px 5px 5px grey;
  border-radius: 5px;
  background-color: white;
  width: 450px;
  padding: 10px;
}
.order-info {
  display: flex;
  height: 100%;
}
.image {
  padding: 5px;
  width: 150px;
}

.product__name {
  font-weight: bold;
}
.product-data {
  text-align: left;
  margin: 8px;
}
.order-detales {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.button-block {
  display: flex;
  justify-content: start;
  padding: 8px;
}
</style>
