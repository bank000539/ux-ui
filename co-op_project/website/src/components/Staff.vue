<template>
     <v-container class="table-full">
<v-toolbar flat color="white">
      <v-toolbar-title>Staff</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <p class="text-head-table">{{ current_user.branch_name }}</p>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="#EF3124" dark class="text-white" v-bind:to="`/staff/add`">New Staff</v-btn>
               </v-dialog>
    </v-toolbar>
      <div id="app">
  <v-app id="inspire">
       <v-data-table
       :headers="headers"
       :items="indexedStaffs"
       item-key="id">
         <template slot="items" slot-scope="props" v-if="props.item.branch == current_user.branch_name">
          <td align="left">{{ props.item.staffname }}</td>
          <td align="left">{{ props.item.telephone }}</td>
          <td align="right">
          <v-btn
        v-bind:to="`/staff/edit/${props.item._id}`"
        color="#EF3124"
        class="text-white"
       >
         EDIT
       </v-btn>
          <v-btn
          v-bind:to="`/staff/edit/${props.item._id}`"
          @click="deleteItem"
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
  name: "Staffs",
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "left",
          value: "staffname"
        },
        {
          text: "Telephone",
          align: "left",
          value: "telephone"
        },
        { text: "Action", align: "right", sortable: false }
      ],
      staffs: [],
      current_user: null
    };
  },
  computed: {
    indexedStaffs() {
      return this.staffs.map((staff, index) => ({
        id: index,
        ...staff
      }));
    }
  },
  mounted() {
    this.fetchStaffs();
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
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
    async fetchStaffs() {
      return axios({
        method: "get",
        url: "http://localhost:8081/staffs"
      })
        .then(response => {
          this.staffs = response.data.staffs;
        })
        .catch(() => {});
    },
    async deleteStaff(id) {
      return axios({
        method: "delete",
        url: `http://localhost:8081/staffs/${this.$route.params.id}`
      })
        .then(() => {
          this.$swal("Great!", "Staff delete successfully!", "success");
          this.$router.push({ name: "Staff" });
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not delete the Staff!", "error");
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
