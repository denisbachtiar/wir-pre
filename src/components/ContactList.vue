<template>
    <v-container>
        <h3 class="mb-3 text-uppercase text-center">Contact List</h3>
        <div class="d-flex align-top">
        <v-btn class="mr-3" fab dark color="indigo" @click="openContact(0)">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-text-field
            outlined
            label="Search Contact"
            prepend-inner-icon="mdi-account-search"
            v-model="search"
            v-on:keyup="fetch"
          ></v-text-field>
        </div>
          <v-card class="d-flex align-center pl-4 mb-3" v-for="(item, index) in userData.result" :key="index">
            <h4 class="mr-3">{{item.first_name}}</h4>
            <h4 class="grey--text">{{item.phone}}</h4>
            <v-btn class="ml-auto" @click="openContact(item.id)" small color="primary">Edit</v-btn>
          </v-card>
          <div class="d-flex align-center">
            <h5 style="width: -webkit-fill-available;">Showing {{userData._meta.totalCount}} entries</h5>
            <paginate
            :page-count="userData._meta.pageCount"
            :click-handler="fetch"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'v-pagination theme--light'">
        </paginate>
          </div>
        <Snackbar/>
    </v-container>
</template>

<script>
import Paginate from 'vuejs-paginate'
import Snackbar from './Snackbar'
import axios from 'axios'
export default {
    components : {
        Paginate,
        Snackbar
    },
    data() {
        return {
            userData: [],
            search: '',
            snackbar: true
        }
    },
    async created() {
        this.$root.$refs.ContactList = this
        await this.fetch()
    },
    methods: {
        fetch (pageNum) {
            if (pageNum === 'undefined') {
                pageNum = 1
            }
            axios
            .get(`https://gorest.co.in/public-api/users?page=${pageNum}&first_name=${this.search}`, {headers:{Authorization:'Bearer EHLyafTXgIAm4TuNdxNRc9yUAZCSnGi1QHOA'}})
            .then(response => {
                // console.log(response)
                this.userData = response.data
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        openContact (id) {
            this.$store.commit('setIdContact', id)
            this.$root.$refs.FormContact.openDialog()
        }
    },
}
</script>

<style lang="scss">
    .v-btn:not(.v-btn--round).v-size--small {
        height: 38px !important;
    }
</style>