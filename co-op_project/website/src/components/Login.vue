<template>
  <v-container fluid>
     <v-form v-model='valid' ref='form' lazy-validation>
       <v-text-field
         label='Username'
         v-model='username'
         color="red darken-3"
         required
       ></v-text-field>
       <v-text-field
         label='Password'
         v-model='password'
         color="red darken-3"
         required
       ></v-text-field>
       <v-btn
         @click='submit'
         :disabled='!valid'
         color="#EF3124"
         class="text-white"
       >
         LOGIN
       </v-btn>
       <v-btn @click='clear'
        color="#FFFFFF"
        class="text-red">CLEAR</v-btn>
     </v-form>
  <v-container>
</template>

<script>
import axios from 'axios';
import '../assets/stylesheets/main.css';
import bus from './../bus';

export default {
  data: () => ({
    valid: true,
    username: '',
    password: '',
  }),
  methods: {
    async submit() {
      return axios({
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
        },
        url: 'http://localhost:8081/branchs/login',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          this.$swal('Great!', 'You are ready to start!', 'success');
          bus.$emit('refreshUser');
          this.$router.push({ name: 'Order' });
        })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal('Oh oo!', `${message}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
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
