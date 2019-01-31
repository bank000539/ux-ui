<template>
     <v-container class="table-full">
      <div id="app">
  <v-app id="inspire">
       <v-data-table
       :headers="headers"
       :items="indexedOrders"
       hide-actions
       item-key="id">
         <template slot="items" slot-scope="props" v-if="props.item.branch == current_user.branch_name && props.item.status!== 'Success' && props.item.status!== 'Cancle'">
          <td align="left">{{ props.item.date }}</td>
          <td align="left">{{ props.item.time  }}</td>
          <td align="left">{{ props.item.menu }}</td>
          <td align="left">{{ props.item.size }}</td>
          <td align="left">{{ props.item.price }}</td>
          <td align="left">{{ props.item.namecustomer }}</td>
          <td align="left">{{ props.item.phonecustomer }}</td>
          <td align="left">{{ props.item.staffname }}</td>
          <td align="left">{{ props.item.shippingplace }}</td>
          <td align="left">{{ props.item.deliverytime }}</td>
          <td align="left">{{ props.item.status }}</td>
          <td align="right">
          <v-btn
          v-bind:to="`/orders/${props.item._id}`"
        color="#EF3124"
         class="text-white"
       >
         EDIT
       </v-btn>
                    <v-btn
                    v-bind:to="`/orders/${props.item._id}`"
             @click="deleteOrders"
             color="#FFFFFF"
        class="text-red"
       >
         DELETE
       </v-btn>
       </td>
         </template>
       </v-data-table>
  </v-app>
</div>

     </v-container>
</template>



<script>
import axios from "axios";

import "../assets/stylesheets/main.css";
import bus from "../bus";

export default {
  name: "Orders",
  data() {
    return {
      headers: [
        { text: "Date", value: "date", },
        { text: "Time", value: "time" },
        { text: "Menu", value: "menu", sortable: false },
        { text: "Size", value: "size", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Customer Name", value: "namecustomer", sortable: false },
        { text: "Customer Telephone", value: "phonecustomer", sortable: false },
        { text: "Staff", value: "staffname", sortable: false },
        { text: "Shipping", value: "shippingplace", sortable: false },
        { text: "Delivery Time", value: "deliverytime" },
        { text: "Status", value: "status", sortable: false },
        { text: "Action", align: "right", sortable: false }
      ],
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
    }
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
          this.$swal("Oh oo!", "Could not delete  the Order!", "error");
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
    }
  }
};
</script>

<style type="text/css">

</style>
