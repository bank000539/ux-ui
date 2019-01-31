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

       <v-flex sm6>
        <v-text-field
         label='Password'
         v-model='password'
         :rules='nameRules'
         required
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>

       <v-btn
         @click='submit'
         :disabled='!valid'
         color="#EF3124"
         class="text-white"
       >
         submit
       </v-btn>
       <v-btn @click='clear'
       color="#FFFFFF"
        class="text-red">clear</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    branch_name: "",
    telephone: "",
    username: "",
    password: "",
    nameRules: [v => !!v || "This input is required"],
    select: null
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            branch_name: this.branch_name,
            telephone: this.telephone,
            username: this.username,
            password: this.password,
          },
          url: '/branchs/register',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal('Great!', 'Branch added successfully!', 'success');
            this.$router.push({ name: 'Branch' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal('Oh oo!', 'Could not add the Branch!', 'error');
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
