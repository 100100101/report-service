<template>
  <v-app-bar app color="primary" dark>
    {{ fullname }}
    <v-spacer></v-spacer>

    <div class="text-center">
      <v-btn v-if="isAuthenticatedUser" class="ma-2" outlined @click="logout">
        <span class="mr-2">Выйти</span>
      </v-btn>
      <v-btn
        v-else-if="$route.name !== 'Auth'"
        class="ma-2"
        outlined
        :to="{ name: 'Auth' }"
      >
        <span class="mr-2">Войти</span>
      </v-btn>

      <v-btn
        v-if="$route.name === 'Home'"
        class="ma-2"
        :to="{ name: 'Report' }"
        outlined
      >
        <span class="mr-2">Получить отчет</span>
      </v-btn>
      <template v-else-if="$route.name === 'Report'">
        <v-btn class="ma-2" :to="{ name: 'Home' }" outlined>
          <v-icon>mdi-tune</v-icon><span class="mr-2">Настройки фильтра</span>
        </v-btn>
        <v-btn class="ma-2" outlined @click="downloadReportXls">
          <v-icon>mdi-file-excel-outline</v-icon
          ><span class="mr-2">Скачать xls</span>
        </v-btn>
      </template>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppHeader',

  computed: {
    ...mapGetters(['filterOptions']),
    ...mapState({
      fullname: state => state.user.fullname,
      isAuthenticatedUser: state => state.user.isAuthenticatedUser,
    }),
  },
  methods: {
    downloadReportXls() {
      this.axios({
        url: 'downloadReportXls',
        method: 'POST',
        responseType: 'blob',
        data: this.filterOptions,
      }).then(response => {
        console.log('response:', response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.xlsx')
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
    },
    logout() {
      this.$store.commit('logout')
    },
  },
}
</script>
