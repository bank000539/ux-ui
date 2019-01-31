<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container fluid>
      
      <p class="bullet-info">Edit Menu</p>

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
         @click="edit"
         :disabled="!valid"
         color="#EF3124"
         class="text-white"
       >
         EDIT MENU
       </v-btn>
       <v-btn @click="clear"
       color="#FFFFFF"
        class="text-red">clear</v-btn>
    </v-container>
  </v-form>
</template>
   
<script>
import axios from "axios";
export default {
  name: "BranchItem",
  data() {
    return {
      name: "",
      sizes: ["s","m","l"],
      size: "",
      price: "",
      picture: "",
      nameRules: [v => !!v || "This input is required"],
      select: null
    };
  },
  mounted() {
    this.fetchBranchItem();
  },
  methods: {
    async fetchBranchItem() {
      return axios({
        method: "get",
        url: `http://localhost:8081/branchitem/${this.$route.params.id}`
      })
        .then(response => {
          this.branch = response.data.branch;
          this.name = response.data.name;
          this.size = response.data.size;
          this.price = response.data.price;
          this.picture = response.data.picture;
        })
        .catch(() => {});
    },
    edit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "put",
          url: `http://localhost:8081/branchitems/${this.$route.params.id}`,
          data: {
            branch: this.branch,
            name: this.name,
            size: this.size,
            price: this.price,
            picture: this.picture
          }
        })
          .then(() => {
            this.$swal("Great!", "Item edit successfully!", "success");
            this.$router.push({ name: "ManageItem" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not edit the Item!", "error");
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