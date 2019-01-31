<template>
     <v-container class="table-full">
<v-toolbar flat color="white">
      <v-spacer></v-spacer>
            <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        color="red darken-3"
      ></v-text-field>
    </v-toolbar>
      <div id="app">
  <v-app id="inspire">
       <v-data-table
       :headers="headers"
       :items="indexedOrders"
       :search="search"
       item-key="id">
         <template slot="items" slot-scope="props" v-if="props.item.branch == current_user.branch_name">
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
         </template>
         <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
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
      search: '',
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
