<template>
  <h4>Total Sales: {{totalsales}}</h4>
</template>



<script>
import axios from "axios";

import "../assets/stylesheets/main.css";
import bus from "../bus";

export default {
  name: "Orders",
  data() {
    return {
      search: "",
      orders: [],
      current_user: null
    };
  },
  computed: {
    indexedOrders() {
      return this.orders.map((order, index) => ({
        id: index,
        ...order
      }));
    },
  },
  mounted() {
    this.fetchOrders();
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    async fetchOrders() {
      return axios({
        method: "get",
        url: "http://localhost:8081/orders"
      })
        .then(response => {
          this.orders = response.data.orders;
        })
        .catch(() => {});
    },
    async deleteOrders(id) {
      return axios({
        method: "delete",
        url: `http://localhost:8081/orders/${this.$route.params.id}`
      })
        .then(() => {
          this.$swal("Great!", "Order delete successfully!", "success");
          this.$router.push({ name: "Order" });
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not delete the Order!", "error");
        });
    },
    listenToEvents() {
      bus.$on("refreshUser", () => {
        this.fetchUser();
      });
    },
    async fetchUser() {
      return axios({
        method: "get",
        url: "/api/current_user"
      })
        .then(response => {
          this.current_user = response.data.current_user;
        })
        .catch(() => {});
    },
    logout() {
      return axios({
        method: "get",
        url: "/api/logout"
      })
        .then(() => {
          bus.$emit("refreshUser");
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
  }
};
</script>

<style type="text/css">
</style>
