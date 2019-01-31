<template>
  <v-form v-model='valid' ref='form' lazy-validation>
    <v-container fluid>
      <p class="bullet-info">Branch Info</p>

      <v-layout row wrap>
        <v-flex sm6>
       <v-text-field
         label='Branch Name'
         v-model='branch_name'
         :rules='nameRules'
         required
         color="red darken-3"
       ></v-text-field>
      </v-flex>

      <v-flex sm6>
        <v-text-field
         label='Telephone'
         v-model='telephone'
         :rules='nameRules'
         required
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>

      <v-layout row wrap>
        <v-flex sm6>
        <v-text-field
         label='Username'
         v-model='username'
         :rules='nameRules'
         required
         color="red darken-3"
       ></v-text-field>
        </v-flex>
       </v-layout>

       <v-btn
         @click='update'
         :disabled='!valid'
         color="#EF3124"
         class="text-white"
       >
         Edit
       </v-btn>
       <v-btn @click='clear'
       color="#FFFFFF"
        class="text-red">clear</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import bus from "./../bus";

export default {
  name: "Branchs",
  data() {
    return {
      branch_name: "",
      telephone: "",
      username: "",
      nameRules: [v => !!v || "This input is required"],
      select: null
    };
  },
  mounted() {
    this.fetchBranch();
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
          this.$router.push({ name: "Branch" });
        })
        .catch(() => {});
    },
    async fetchBranch() {
      return axios({
        method: "get",
        url: `http://localhost:8081/api/branchs/${this.$route.params.id}`
      })
        .then(response => {
          this.branch_name = response.data.branch_name;
          this.telephone = response.data.telephone;
          this.username = response.data.username;
          this.password = response.data.password;
        })
        .catch(() => {});
    },
    update() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "put",
          url: `http://localhost:8081/api/branchs/${this.$route.params.id}`,
          data: {
            branch_name: this.branch_name,
            telephone: this.telephone,
            username: this.username,
            password: this.password
          }
        })
          .then(() => {
            this.$swal("Great!", "Branch edit successfully!", "success");
            this.$router.push({ name: "Branch" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not edit the Branch!", "error");
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
