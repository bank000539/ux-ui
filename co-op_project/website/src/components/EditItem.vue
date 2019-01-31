<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container fluid>
       <p class="bullet-info">Menu Info</p>
       <v-layout row wrap>
        <v-flex sm4>
       <v-text-field
         label="Item Name"
         v-model="name"
         :rules="nameRules"
         color="red darken-3"
       ></v-text-field>
       </v-flex>

      <v-flex sm4>
      <v-select
         label="Size"
         v-model="size"
         :items="sizes"
         :rules="nameRules"
         color="red darken-3"
       ></v-select>
       </v-flex>

      <v-flex sm4>
      <v-text-field
         label="Price"
         v-model="price"
         :rules="nameRules"
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>
       
       <v-layout row wrap>
          <v-flex sm12>
       <v-text-field
         label="Picture URL"
         v-model="picture"
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
        class="text-red">clear</v-btn>
    </v-container>
  </v-form>
</template>
   
<script>
import axios from "axios";
export default {
  name: "Item",
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
    this.fetchItem();
  },
  methods: {
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
    update() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "put",
          url: `http://localhost:8081/Items/${this.$route.params.id}`,
          data: {
            name: this.name,
            size: this.size,
            price: this.price,
            picture: this.picture
          }
        })
          .then(() => {
            this.$swal("Great!", "Item edit successfully!", "success");
            this.$router.push({ name: "Item" });
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