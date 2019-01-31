<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container fluid>

      <p class="bullet-info">Menu Info</p>
      
      <v-layout row wrap>
      <v-flex sm8 md6>
       <v-text-field
         label="Menu Name"
         v-model="name"
         :rules="nameRules"
         color="red darken-3"
         readonly
       ></v-text-field>
       </v-flex>

      <v-flex sm2 md3>
      <v-select
         label="Size"
         v-model="size"
         :items="sizes"
         :rules="nameRules"
         color="red darken-3"
         readonly
       ></v-select>
       </v-flex>

      <v-flex sm2 md3>
      <v-text-field
         label="Price"
         v-model="price"
         :rules="nameRules"
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>
       
       <v-text-field
         label="Picture URL"
         v-model="picture"
         :rules="nameRules"
         color="red darken-3"
         readonly
       ></v-text-field>
       <v-btn
         @click="add"
         :disabled="!valid"
         color="#EF3124"
         class="text-white"
       >
         Add This Menu
       </v-btn>
       <v-btn @click="clear"
       color="#FFFFFF"
        class="text-red">clear</v-btn>
    </v-container>
  </v-form>
</template>
   
<script>
import axios from "axios";
import bus from "../bus";

export default {
  name: "Item",
  data() {
    return {
      branch: "",
      name: "",
      sizes: ["s","m","l"],
      size: "",
      price: "",
      picture: "",
      nameRules: [v => !!v || "This input is required"],
      current_user: null
    };
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
    this.fetchItem();
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
          this.branch = response.data.current_user.branch_name;
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
    async fetchItem() {
      return axios({
        method: "get",
        url: `http://localhost:8081/Item/${this.$route.params.id}`
      })
        .then(response => {
          this.name = response.data.name;
          this.size = response.data.size;
          this.price = response.data.price;
          this.picture = response.data.picture;
        })
        .catch(() => {});
    },
    add() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "post",
          data: {
            branch: this.branch,
            name: this.name,
            size: this.size,
            price: this.price,
            picture: this.picture
          },
          url: "http://localhost:8081/branchitems",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$swal("Great!", "Menu added successfully!", "success");
            this.$router.push({ name: "ManageItem" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not add the Menu!", "error");
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>