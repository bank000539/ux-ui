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
         @click="update"
         :disabled="!valid"
         color="#EF3124"
         class="text-white"
       >
         submit
       </v-btn>
       <v-btn @click="clear"
       color="#FFFFFF"
        class="text-red"
        >clear</v-btn>
</v-container>
 </v-form>
</template>
   
<script>
import axios from "axios";
export default {
  name: "Staff",
  data() {
    return {
      branch: "",
      staffname: "",
      telephone: "",
      nameRules: [v => !!v || "This input is required"],
      select: null
    };
  },
  mounted() {
    this.fetchStaff();
  },
  methods: {
    async fetchStaff() {
      return axios({
        method: "get",
        url: `http://localhost:8081/Staff/${this.$route.params.id}`
      })
        .then(response => {
          this.branch = response.data.branch;
          this.staffname = response.data.staffname;
          this.telephone = response.data.telephone;
        })
        .catch(() => {});
    },
    update() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "put",
          url: `http://localhost:8081/Staffs/${this.$route.params.id}`,
          data: {
            branch: this.branch,
            staffname: this.staffname,
            telephone: this.telephone,
          }
        })
          .then(() => {
            this.$swal("Great!", "Staff edit successfully!", "success");
            this.$router.push({ name: "Staff" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not edit the Staff!", "error");
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