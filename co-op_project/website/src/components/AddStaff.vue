<template>
 <v-form v-model="valid" ref="form" lazy-validation>
<v-container fluid>

  <p class="bullet-info">Staff Info</p>

        <v-layout row wrap>
          <v-flex sm12>
       <v-text-field
         label="Branch"
         v-model="branch"
         :rules="nameRules"
         readonly
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>

      <v-layout row wrap>
        <v-flex sm6>
      <v-text-field
         label="Staff Name"
         v-model="staffname"
         :rules="nameRules"
         color="red darken-3"
       ></v-text-field>
       </v-flex>

      <v-flex sm6>
      <v-text-field
         label="Telephone"
         v-model="telephone"
         :rules="nameRules"
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>

       <v-btn
         @click="submit"
         :disabled="!valid"
         color="#EF3124"
         class="text-white"
       >
         submit
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
  data: () => ({
    valid: true,
    branch: "",
    staffname: "",
    telephone: "",
    nameRules: [v => !!v || "This input is required"],
    current_user: null
  }),
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
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "post",
          data: {
            branch: this.branch,
            staffname: this.staffname,
            telephone: this.telephone,
          },
          url: "http://localhost:8081/staffs",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$swal("Great!", "Staff added successfully!", "success");
            this.$router.push({ name: "Staff" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not add the Staff!", "error");
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
