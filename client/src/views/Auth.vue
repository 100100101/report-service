<template>
  <v-container fluid>
    <v-row align="center" align-content="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card elevation="2">
          <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="login"
                :counter="20"
                :rules="loginRules"
                label="Логин"
                required
              />

              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                label="Пароль"
                counter
                @click:append="showPassword = !showPassword"
                required
              />

              <v-alert
                v-if="isIncorrectLoginOrPassword"
                dense
                outlined
                type="error"
              >
                Неверный логин или пароль
              </v-alert>

              <v-card-actions>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="signIn"
                >
                  Войти
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" align-content="center" justify="center">
      <v-btn class="mr-2" @click="testUser2">
        User Coleman_Мельников
      </v-btn>
      <v-btn class="mr-2" @click="testUser3">
        User Willard.Наумова
      </v-btn>
      <v-btn class="mr-2" @click="testUser4">
        User Johnnie24
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      showPassword: false,
      valid: true,
      login: 'Liza.Новикова',
      loginRules: [
        v => !!v || 'Login is required',
        v => (v && v.length <= 20) || 'Имя должно быть меньше 20 символов.',
      ],
      password: 'Liza.Новикова123456',
      passwordRules: [v => !!v || 'Обязательное поле'],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Минимально 8 символов',
      },
      isIncorrectLoginOrPassword: false,
    }
  },

  methods: {
    signIn() {
      this.isIncorrectLoginOrPassword = false
      this.$refs.form.validate()
      this.$store
        .dispatch('signIn', {
          login: this.login,
          password: this.password,
        })
        .catch(error => {
          const responseStatusCode = error?.response?.status
          if (responseStatusCode === 401) {
            this.isIncorrectLoginOrPassword = true
          }
        })
    },
    testUser2() {
      this.login = 'Coleman_Мельников'
      this.password = 'Coleman_Мельников123456'
    },
    testUser3() {
      this.login = 'Willard.Наумова'
      this.password = 'Willard.Наумова123456'
    },
    testUser4() {
      this.login = 'Johnnie24'
      this.password = 'Johnnie24123456'
    },
  },
}
</script>
