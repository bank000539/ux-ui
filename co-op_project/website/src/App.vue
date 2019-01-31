<template>
  <v-app id="app">
    <v-navigation-drawer fixed v-model="drawer" app id="myDIV">
      <div class="head-drawer" v-if="current_user">
        <v-icon class="icon-head-drawer">fas fa-store</v-icon>
        <p class="text-head-drawer">{{current_user.branch_name }}</p>
      </div>

      <v-list v-if="!current_user" class="side_bar_link">
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          :to="item.route"
          active-class="red-text hamburger"
        >
          <v-list-tile-action>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list v-if="current_user" class="side_bar_link">
        <v-list-tile
          v-for="(item, index) in itemsb"
          :key="index"
          :to="item.route"
          active-class="red-text hamburger"
        >
          <v-list-tile-action>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="#EF3124" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Back Office</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn id="logout_btn" flat v-if="current_user" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
        <div id="app">
          <router-view/>
        </div>
    </v-content>
    <v-footer color="#F75856" app></v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import "./assets/stylesheets/main.css";
import bus from "./bus";

import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";

import AddOrder from "./components/AddOrder";
import Order from "./components/Order";
import OrderHistory from "./components/OrderHistory";
import ManageItem from "./components/ManageItem";
import Staff from "./components/Staff";

export default {
  name: "app",
  components: {
    Login,
    AdminLogin
  },
  data: () => ({
    drawer: null,
    current_user: null,
    items: [
      {
        action: "fas fa-store",
        route: "/branchs/login",
        title: "Branch Login"
      },
      {
        action: "fas fa-user",
        route: "/admin/login",
        title: "Admin Login"
      }
    ],
    itemsb: [
      {
        action: "fas fa-plus",
        route: "/orders/add",
        title: "New Order"
      },
      {
        action: "assignment",
        route: "/",
        title: "Manage Order"
      },
      {
        action: "history",
        route: "/orderhistory",
        title: "History Order"
      },
      {
        action: "fas fa-coffee",
        route: "/manageitems",
        title: "Manage Menu"
      },
      {
        action: "fas fa-user-friends",
        route: "/staff",
        title: "Manage Staff"
      }
    ]
  }),
  props: {
    source: String
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
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
          this.$router.push({ name: "Login" });
        })
        .catch(() => {});
    }
  }
};
</script>

<style type="text/css">
p {
  margin-top: 1rem;
}

.v-navigation-drawer > .v-list:not(.v-list--dense) .v-list__tile {
  font-weight: 800;
}

.theme--light.v-icon {
  color: #f75856;
}

.red-text {
  color: #8c1912 !important;
  caret-color: #8c1912 !important;
  padding-left: 40px;
}

.hamburger {
  background: url("./img/hamburger.png") no-repeat left;
  background-size: 24px 16px;
  margin-left: -16px;
}

.head-drawer {
  background-color: #f4f4f4;
  height: 48px;
  box-shadow: 0px 1px 4px rgba(81, 67, 67, 0.5);
  position: relative;
}

.text-head-drawer {
  float: left;
  color: #ef3124 !important;
  font-weight: 800;
}

.icon-head-drawer {
  float: left;
  margin: 12px 16px 0px 14px;
  color: #ef3124 !important;
}
</style>
