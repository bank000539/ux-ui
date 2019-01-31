<template>
     <v-container class="table-full">
<v-toolbar flat color="white">
      <v-toolbar-title>Branch</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="#EF3124" dark class="text-white" v-bind:to="{ name: 'AddBranch' }">New Branch</v-btn>
               </v-dialog>
    </v-toolbar>
      <div id="app">
  <v-app id="inspire">
       <v-data-table
       :headers="headers"
       :items="indexedBranchs"
       item-key="id">
         <template slot="items" slot-scope="props">
          <td align="left">{{ props.item.branch_name }}</td>
          <td align="left">{{ props.item.telephone }}</td>
          <td align="right">
          <v-btn
        v-bind:to="`/admin/branchs/${props.item._id}`"
        color="#EF3124"
        class="text-white"
       >
         EDIT
       </v-btn>
                    <v-btn
                    v-bind:to="`/admin/branchs/${props.item._id}`"
                    color="#FFFFFF"
          class="text-red"
             @click="deleteBranchs"
       >
         DELETE
       </v-btn>
       </td>
         </template>
       </v-data-table>
  </v-app>
</div>
     </v-container>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Branchs',
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "left",
          value: "branch_name"
        },
        { text: "Telephone", value: "telephone", sortable: false },
        { text: "Action", align: "right", sortable: false }
      ],
      branchs: [],
    };
  },
  computed: {
    indexedBranchs() {
      return this.branchs.map((branch, index) => ({
        id: index,
        ...branch
      }));
    }
  },
  mounted() {
    this.fetchBranchs();
  },
  methods: {
    async fetchBranchs() {
      return axios({
        method: 'get',
        url: '/branchs',
      })
        .then((response) => {
          this.branchs = response.data.branchs;
        })
        .catch(() => {});
    },
    async deleteBranchs(id) {
      return axios({
        method: "delete",
        url: `/api/branchs/${this.$route.params.id}`
      })
        .then(() => {
          this.$swal("Great!", "Branch delete successfully!", "success");
          this.$router.push({ name: "Branch" });
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not delete  the Branch!", "error");
        });
    }
  },
};
</script>
