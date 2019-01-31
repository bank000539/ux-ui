<template>
     <v-container class="table-full">
<v-toolbar flat color="white">
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <p class="text-head-table">{{ current_user.branch_name }}</p>
      <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="#EF3124"
         class="text-white" dark v-bind:to="`/manageitems/add`" >Add Menu</v-btn>
               </v-dialog>
    </v-toolbar>
      <div id="app">
  <v-app id="inspire">
       <v-data-table
       :headers="headers"
       :items="indexedBranchItems"
       item-key="id">
         <template slot="items" slot-scope="props" v-if="props.item.branch == current_user.branch_name">
           <td><img class="img" :src="props.item.picture"></td>
          <td align="left">{{ props.item.name }}</td>
          <td align="left">{{ props.item.size }}</td>
          <td align="left">{{ props.item.price }}</td>
          <td align="right">
        <v-btn
          v-bind:to="`/manageitems/edit/${props.item._id}`"
          color="#EF3124"
         class="text-white"
        >
         EDIT
       </v-btn>
       <v-btn
          v-bind:to="`/manageitems/edit/${props.item._id}`"
          @click="deleteBranchItem"
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
import bus from "../bus";

export default {
  name: "BranchItems",
  data() {
    return {
      headers: [
        {
          text: "",
          align: "left",
          value: "picture",
          sortable: false
        },
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        {
          text: "Size",
          align: "left",
          value: "size"
        },
        {
          text: "Price",
          align: "left",
          value: "price",
          sortable: false
        },
        { text: "Action", align: "right", sortable: false }
      ],
      items: [],
      branchitems: [],
      current_user: null
    };
  },
  computed: {
    indexedBranchItems() {
      return this.branchitems.map((branchitem, index) => ({
        id: index,
        ...branchitem
      }));
    }
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
    this.fetchBranchItems();
    this.fetchItems();
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
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
    async fetchBranchItems() {
      return axios({
        method: "get",
        url: "http://localhost:8081/branchitems"
      })
        .then(response => {
          this.branchitems = response.data.branchitems;
        })
        .catch(() => {});
    },
    async fetchItems() {
      return axios({
        method: "get",
        url: "http://localhost:8081/items"
      })
        .then(response => {
          this.items = response.data.items;
        })
        .catch(() => {});
    },
    async deleteBranchItem(id) {
      return axios({
        method: "delete",
        url: `http://localhost:8081/branchitems/${this.$route.params.id}`
      })
        .then(() => {
          this.$swal("Great!", "Item delete successfully!", "success");
          this.$router.push({ name: "ManageItem" });
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not delete the Item!", "error");
        });
    }
  }
};
</script>

<style type="text/css">
.img {
  height: 166px;
  padding: 16px;
}
</style>
