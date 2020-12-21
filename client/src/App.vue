<template>
  <v-app v-cloak>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
  },

  computed: mapState({
    isAuthenticatedUser: state => state.user.isAuthenticatedUser,
  }),

  created() {
    this.$store.watch(
      state => state.user.isAuthenticatedUser,
      (isAuthenticatedUserNew, isAuthenticatedUserOld) => {
        if (!isAuthenticatedUserOld && isAuthenticatedUserNew) {
          this.$router.push({ name: 'Home' })
          return
        }
        this.$router.push({ name: 'Auth' })
      }
    )
  },
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
