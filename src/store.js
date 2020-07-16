import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idContact: null
    },

    mutations: {
        setIdContact(state, value) {
            state.idContact = value
            // localStorage.setItem('tes', value)
        },
    }
})