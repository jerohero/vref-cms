import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useCounterStore = defineStore('counter', () => {
  const user = ref(null)
  const token = ref('')

  const login = async (email: string, password: string) => {
    const res = await axios.post('https://vrefsolutions-api.azurewebsites.net/api/user/login', {
      email: email,
      password: password
    })

    user.value = res.data.user
    token.value = res.data.accessToken
  }

  return { user, token, login }
})
