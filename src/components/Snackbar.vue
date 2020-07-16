<template>
    <v-snackbar v-model="snackbar" top="top">
        {{text}}
        <template v-slot:action="{ attrs }">
            <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            snackbar: false,
            text: ''
        }
    },
    created() {
        this.$root.$refs.Snackbar = this
    },
}
</script>