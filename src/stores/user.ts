import { defineStore } from 'pinia'
import axios from "axios";
import {computed, ref} from 'vue'
import type { Ref, ComputedRef } from 'vue';

interface User {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  organization: any,
  userType: string
}

interface State {
  user: Ref<User>,
  token: Ref<string>,
  isAuthenticated: ComputedRef<boolean>,
  login: (email: string, password: string) => Promise<void>
}

export const useUserStore = defineStore('user', (): State => {
  const user = ref<User>({
    id: 0, email: '', firstName: '', lastName: '', organization: '', userType: ''
  })
  const token = ref<string>('')
  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    const res = await axios.post('https://vrefsolutions-api.azurewebsites.net/api/user/login', {
      email: email,
      password: password
    })

    user.value = res.data.user
    token.value = res.data.accessToken
  }

  return {
    user,
    token,
    isAuthenticated,
    login
  }
})
