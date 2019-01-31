<template>
<v-form v-model="valid" ref="form" lazy-validation>
<v-container fluid>
       <v-text-field
         label="Branch"
         v-model="branch"
         readonly
         color="red darken-3"
       ></v-text-field>

      <v-layout row wrap>
        <v-flex sm6>
      <v-menu
          ref="indate"
          :close-on-content-click="false"
          v-model="indate"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
          readonly
        >
      <v-text-field
          slot="activator"
          v-model="dateFormatted"
          label="Date"
          hint="DD/MM/YYYY format"
          persistent-hint
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
          readonly
          color="red darken-3"
      ></v-text-field>
      <v-date-picker v-model="date" no-title @input="indate = false" readonly></v-date-picker>
        </v-menu>
        </v-flex>

        <v-flex sm6>
        <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="intime"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
        readonly
      >
        <v-text-field
          slot="activator"
          v-model="time"
          label="Order Time"
          prepend-icon="access_time"
          readonly
          color="red darken-3"
        ></v-text-field>
        <v-time-picker
          v-if="intime"
          v-model="time"
          full-width
          @change="$refs.menu.save(time)"
          readonly
        ></v-time-picker>
      </v-menu>
      </v-flex>
      </v-layout>
      
      <p class="bullet-info">Menu Info</p>

      <v-layout row wrap>
      <v-flex sm8 md6>
      <v-text-field
         label="Menu Name"
         v-model="menu"
         readonly
         color="red darken-3"
       ></v-text-field>
        </v-flex>

      <v-flex sm2 md3>
      <v-text-field
         label="Size"
         v-model="size"
         readonly
         color="red darken-3"
       >
       </v-text-field>
      </v-flex>

       <v-flex sm2 md3>
      <v-text-field
         label="Price"
         v-model="price"
         readonly
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>

       <p class="bullet-info">Customer Info</p>

      <v-layout row wrap>
        <v-flex sm6>
      <v-text-field
         label="Customer Name"
         v-model="namecustomer"
         readonly
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       <v-flex sm6>
      <v-text-field
         label="Customer Telephone"
         v-model="phonecustomer"
         readonly
         color="red darken-3"
       ></v-text-field>
      </v-flex>
        </v-layout>

      <p class="bullet-info">Staff Info</p>

      <v-layout row wrap>
        <v-flex sm6>
      <v-text-field
         label="Staff Name"
         v-model="staffname"
         readonly
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       <v-flex sm6>
             <v-text-field
         label="Shipping Place"
         v-model="shippingplace"
         readonly
         color="red darken-3"
       ></v-text-field>
       </v-flex>
       </v-layout>
        
         <v-layout row wrap>
        <v-flex sm6>
        <v-menu
        ref="delivery"
        :close-on-content-click="false"
        v-model="ontime"
        :nudge-right="40"
        :return-value.sync="deliverytime"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="deliverytime"
          label="Delivery Time"
          prepend-icon="access_time"
          color="red darken-3"
        ></v-text-field>
        <v-time-picker
          v-if="ontime"
          v-model="deliverytime"
          full-width
          @change="$refs.delivery.save(deliverytime)"
        ></v-time-picker>
      </v-menu>
      </v-flex>
        
        <v-flex sm6>
        <v-select
         label="Status"
         v-model="status"
         :items="process"
         color="red darken-3"
       ></v-select>
       </v-flex>
      </v-layout>

       <v-btn
         @click="update"
         :disabled="!valid"
         color="#EF3124"
         class="text-white"
       >
         Update
       </v-btn>

</v-container>
</v-form>
</template>
   
<script>
import axios from "axios";
import bus from "../bus";

export default {
  name: "Order",
  data: vm => {
    return {
      branch: "",
      date: "",
      time: "",
      menu: "",
      size: "",
      price: "",
      namecustomer: "",
      phonecustomer: "",
      staffname: "",
      shippingplace: "",
      deliverytime: "",
      status: "",
      process: ["In Progress", "Out for Delivery", "Success","Cancle"],
      branchitems: [],
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      intime: false,
      ontime: false,
      indate: false,
      current_user: null
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted() {
    this.fetchOrder();
    this.fetchBranchs();
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    async fetchBranchs() {
      return axios({
        method: "get",
        url: "/branchs"
      })
        .then(response => {
          this.branchs = response.data.branchs;
          this.branch = response.data.current_user.branch_name;
        })
        .catch(() => {});
    },
    async fetchOrder() {
      return axios({
        method: "get",
        url: `http://localhost:8081/Order/${this.$route.params.id}`
      })
        .then(response => {
          this.branch = response.data.branch;
          this.date = response.data.date;
          this.time = response.data.time;
          this.menu = response.data.menu;
          this.size = response.data.size;
          this.price = response.data.price;
          this.namecustomer = response.data.namecustomer;
          this.phonecustomer = response.data.phonecustomer;
          this.staffname = response.data.staffname;
          this.shippingplace = response.data.shippingplace;
          this.deliverytime = response.data.deliverytime;
          this.status = response.data.status;
        })
        .catch(() => {});
    },
    update() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "put",
          url: `http://localhost:8081/Orders/${this.$route.params.id}`,
          data: {
            branch: this.branch,
            date: this.date,
            time: this.time,
            menu: this.menu,
            size: this.size,
            price: this.price,
            namecustomer: this.namecustomer,
            phonecustomer: this.phonecustomer,
            staffname: this.staffname,
            shippingplace: this.shippingplace,
            deliverytime: this.deliverytime,
            status: this.status
          }
        })
          .then(() => {
            this.$swal("Great!", "Order edit successfully!", "success");
            this.$router.push({ name: "Order" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not edit the Order!", "error");
          });
      }
      return true;
    },
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
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>