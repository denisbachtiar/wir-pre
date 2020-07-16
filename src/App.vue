<template>
  <v-app>
    <ContactList/>
    <FormContact/>
  </v-app>
</template>

<script>
import ContactList from './components/ContactList'
import FormContact from './components/FormContact'
export default {
  name: 'App',
  components: {
    ContactList,
    FormContact
  }
}
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
}
.v-pagination {
  justify-content: flex-end !important;
  a {
      padding: 5px 12px;
      background-color: white;
      margin: 0 3px;
      box-shadow: 1px 1px 4px -1px rgba(0,0,0,.2), 0px 0px 3px 0 rgba(0,0,0,.14), 0 1px 4px 0 rgba(0,0,0,.12);
      color: black !important;
      border-radius: 3px;
  }
  .active {
    a {
      background-color: #1976d2;
      color: white !important;
    }
  }
  .disabled {
    a {
      color: darkgrey !important;
    }
  }
}
</style>
