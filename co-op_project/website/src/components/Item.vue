<template>
     <v-container class="table-full">
<v-toolbar flat color="white">
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="#EF3124" dark class="text-white" v-bind:to="`/admin/items/add`">New Menu</v-btn>
               </v-dialog>
    </v-toolbar>
      <div id="app">
  <v-app id="inspire">
       <v-data-table
       :headers="headers"
       :items="indexedItems"
       item-key="id">
         <template slot="items" slot-scope="props">
           <td><img class="img" :src="props.item.picture"></td>
          <td align="left">{{ props.item.name }}</td>
          <td align="left">{{ props.item.size }}</td>
          <td align="left">{{ props.item.price }}</td>
          <td align="right">
          <v-btn
                    v-bind:to="`/admin/items/${props.item._id}`"
                    color="#EF3124"
        class="text-white"
       >
         EDIT
       </v-btn>
                    <v-btn
                    v-bind:to="`/admin/items/${props.item._id}`"
             @click="deleteItem"
             color="#FFFFFF"
          class="text-red"
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
import axios from "axios";

export default {
  name: "Items",
  data() {
    return {
      headers: [
        {
          text: "",
          align: "left",
          value: "picture",
          sortable: false 
        },
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        {
          text: "Size",
          align: "left",
          value: "size",
        },
        {
          text: "Price",
          align: "left",
          value: "price",
        },
        { text: "Action", align: "right", sortable: false }
      ],
      items: [],
    }
  },
  computed: {
    indexedItems() {
      return this.items.map((item, index) => ({
        id: index,
        ...item
      }));
    }
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      return axios({
        method: "get",
        url: "http://localhost:8081/items"
      })
        .then(response => {
          this.items = response.data.items;
        })
        .catch(() => {});
    },
    async deleteItem(id) {
      return axios({
        method: "delete",
        url: `http://localhost:8081/items/${this.$route.params.id}`
      })
        .then(() => {
          this.$swal("Great!", "Item delete successfully!", "success");
          this.$router.push({ name: "Item" });
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not delete the Item!", "error");
        });
    }
  }
};
</script>

<style type="text/css">
.img{
  height: 166px;
  padding: 16px;
}
</style>
