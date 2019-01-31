<template>
<v-form v-model="valid" ref="form" lazy-validation>
<v-container fluid>
      <v-text-field
         label="Branch"
         v-model="branch"
         :items="branchs"
         item-text="branch_name" 
         item-value="id"
         color="red darken-3"
         readonly
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
        >
      <v-text-field
          slot="activator"
          v-model="dateFormatted"
          label="Date"
          hint="DD/MM/YYYY format"
          persistent-hint
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
          color="red darken-3"
      ></v-text-field>
      <v-date-picker v-model="date" no-title @input="indate = false"></v-date-picker>
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
        ></v-time-picker>
      </v-menu>
      </v-flex>
      </v-layout>

      <p class="bullet-info">Menu Info</p>

      <v-layout row wrap>
      <v-flex sm6>
       <v-select
         label="Menu Name"
         v-model="menu"
         :items="filteredMenu"
         item-text="name" 
         item-value="id"
         required
         color="red darken-3"
       ></v-select>
       </v-flex>
      
      <v-flex sm3>
      <v-select
         label="Size"
         v-model="size"
         :items="filteredSize"
         item-text="size" 
         item-value="id"
         required
         color="red darken-3"
       >
       </v-select>
       </v-flex>

       <v-flex sm3>
      <v-select
         label="Price"
         v-model="price"
         :items="filteredPrice"
         item-text="price" 
         item-value="id"
         required
         color="red darken-3"
       ></v-select>
      </v-flex>
      </v-layout>

      <p class="bullet-info">Customer Info</p>

      <v-layout row wrap>
        <v-flex sm6>
      <v-text-field
         label="Customer Name"
         v-model="namecustomer"
         :rules="nameRules"
         required
         color="red darken-3"
       ></v-text-field>
        </v-flex>
       <v-flex sm6>
      <v-text-field
         label="Customer Telephone"
         v-model="phonecustomer"
         :rules="numberRules"
         required
         color="red darken-3"
       ></v-text-field>
       </v-flex>
        </v-layout>

      <p label="Shipping Place" class="bullet-info">Staff Info</p>

      <v-layout row wrap>
        <v-flex sm6>
      <v-select
         label="Staff Name"
         v-model="staffname"
         :items="filteredStaff"
         item-text="staffname" 
         item-value="id"
         required
         color="red darken-3"
       ></v-select>
       </v-flex>

       <v-flex sm6>
             <v-text-field
         label="Shipping Place"
         v-model="shippingplace"
         :rules="nameRules"
         required
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
          readonly
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
         :rules="nameRules"
         required
         color="red darken-3"
       ></v-select>
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
        class="text-red"
        >clear</v-btn>

</v-container>
</v-form>
</template>

<script>
import '../assets/stylesheets/main.css';
import axios from "axios";
import bus from "../bus";

export default {
  data: vm => ({
    valid: true,
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
    process: ["Get Order", "In Progress", "Out for Delivery", "Success"],
    branchs: [{ id: "", branch_name: "" }],
    branchitems: [],
    staffs: [{id:"", staffname: ""}],
    nameRules: [v => !!v || "This input is required"],
    numberRules: [v => !![0 - 9] || "This input is required"],
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    intime: false,
    ontime: false,
    indate: false,
    current_user: null
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    filteredMenu() {
      let options = this.branchitems;
      return options.filter(o => o.branch == this.branch);
    },
    filteredStaff() {
      let options = this.staffs;
      return options.filter(o => o.branch == this.branch);
    },
    filteredSize() {
      let options = this.branchitems;
      return options.filter(o => o.name == this.menu);
    },
    filteredPrice() {
      let options = this.branchitems;
      return options.filter(
        o => o.size == this.size && o.name == this.menu
      );
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
    this.fetchBranchs();
    this.fetchBranchItems();
    this.fetchStaffs();
  },
  methods: {
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
          this.branch = response.data.current_user.branch_name;
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
        })
        .catch(() => {});
    },
    async fetchBranchItems() {
      return axios({
        method: "get",
        url: "http://localhost:8081/branchitems"
      })
        .then(response => {
          this.branchitems = response.data.branchitems;
        })
        .catch(() => {});
    },
    async fetchStaffs() {
      return axios({
        method: "get",
        url: "http://localhost:8081/staffs"
      })
        .then(response => {
          this.staffs = response.data.staffs;
        })
        .catch(() => {});
    },
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "post",
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
          },
          url: "http://localhost:8081/orders",
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then(() => {
            this.$swal("Great!", "Order added successfully!", "success");
            this.$router.push({ name: "Order" });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal("Oh oo!", "Could not add the Order!", "error");
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

