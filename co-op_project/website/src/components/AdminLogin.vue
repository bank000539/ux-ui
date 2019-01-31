<template>
  <v-container fluid>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field label="Username" v-model="username" required color="red darken-3"></v-text-field>
      <v-text-field label="Password" v-model="password" required color="red darken-3"></v-text-field>
      <v-btn @click="submit" :disabled="!valid" color="#EF3124" class="text-white">LOGIN</v-btn>
      <v-btn @click="clear" color="#FFFFFF" class="text-red">clear</v-btn>
    </v-form>
  <v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: "",
    password: ""
  }),
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "Branch" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style type="text/css">
.theme--light.v-label{
  color: #EF3124;
}

.theme--light.v-text-field>.v-input__control>.v-input__slot:before{
  border-color: #EF3124;
}

.theme--light.v-text-field:not(.v-input--has-state)>.v-input__control>.v-input__slot:hover:before{
  border-color: #EF3124;
}
</style>