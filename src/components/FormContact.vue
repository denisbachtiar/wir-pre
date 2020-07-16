<template>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Contact Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name*" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phone*" v-model="phone" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Address*" v-model="address" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateData()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
        id: null,
        name: null,
        phone: null,
        address: null,
        dialog: false
    }),
    created() {
        this.$root.$refs.FormContact = this
    },
    methods: {
        openDialog () {
            if (this.$store.state.idContact == 0) {
                this.id = 0
                this.name = ''
                this.phone = ''
                this.address = ''
                this.dialog = true
            }
            else {
                axios
                .get(`https://gorest.co.in/public-api/users/${this.$store.state.idContact}`, {headers:{Authorization:'Bearer EHLyafTXgIAm4TuNdxNRc9yUAZCSnGi1QHOA'}})
                .then(response => {
                    // console.log(response)
                    this.id = response.data.result.id
                    this.name = response.data.result.first_name
                    this.phone = response.data.result.phone
                    this.address = response.data.result.address
                    this.dialog = true
                })
                .catch(error => {
                    console.log(error.response.data.error.errors[0])
                })
            }
        },
        updateData () {
            var d = new Date()
            if (this.$store.state.idContact == 0) {
                axios
                .post(`https://gorest.co.in/public-api/users`,
                {
                    first_name: this.name,
                    last_name: 'dummyname',
                    gender: 'male',
                    phone: this.phone,
                    address: this.address,
                    email: `test${d.getTime()}@email.com`
                },
                {headers:{Authorization:'Bearer EHLyafTXgIAm4TuNdxNRc9yUAZCSnGi1QHOA'}})
                .then(() => {
                    // console.log(response)
                    this.$root.$refs.ContactList.fetch()
                    this.dialog = false
                    this.$root.$refs.Snackbar.text = 'Contact added'
                    this.$root.$refs.Snackbar.snackbar = true
                })
                .catch(error => {
                    console.log(error.response.data.error.errors[0])
                })
            }
            else {
                axios
                .put(`https://gorest.co.in/public-api/users/${this.$store.state.idContact}`,
                {
                    first_name: this.name,
                    phone: this.phone,
                    address: this.address
                },
                {headers:{Authorization:'Bearer EHLyafTXgIAm4TuNdxNRc9yUAZCSnGi1QHOA'}})
                .then(response => {
                    console.log(response)
                    this.$root.$refs.ContactList.fetch()
                    this.dialog = false
                    this.$root.$refs.Snackbar.text = 'Contact edited'
                    this.$root.$refs.Snackbar.snackbar = true
                })
                .catch(error => {
                    console.log(error.response.data.error.errors[0])
                })
            }
        }
    },
  }
</script>