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

export default {
  data: () => ({
    valid: true,
    name: "",
    sizes: ["s","m","l"],
    size: "",
    price: "",
    picture: "",
    nameRules: [v => !!v || "This input is required"],
    select: null
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "post",
          data: {
            name: this.name,
            size: this.size,
            price: this.price,
            picture: this.picture
          },
          url: "http://localhost:8081/items",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$swal("Great!", "Item added successfully!", "success");
            this.$router.push({ name: "Item" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not add the Item!", "error");
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
