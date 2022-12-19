import { defineStore } from 'pinia'
import axios from "axios";
import {computed, ref} from 'vue'
import type { Ref, ComputedRef } from 'vue';
import {useRouter} from "vue-router";

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
  bearerToken: ComputedRef<string>,
  login: (email: string, password: string) => Promise<void>,
  logout: () => void
}

const emptyUser = {
  id: 0, email: '', firstName: '', lastName: '', organization: '', userType: ''
}

export const useUserStore = defineStore('user', (): State => {
  const user = ref<User>(emptyUser)
  const token = ref<string>('')
  const isAuthenticated = computed(() => !!token.value)
  const bearerToken = computed(() => `Bearer ${ token.value }`)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const res = await axios.post('https://vrefsolutions-api.azurewebsites.net/api/user/login', {
      email: email,
      password: password
    })

    user.value = res.data.user
    token.value = res.data.accessToken
  }

  const logout = () => {
    user.value = emptyUser
    token.value = ''
    router.push({ path: '/auth' })
   }

  return {
    user,
    token,
    isAuthenticated,
    bearerToken,
    login,
    logout
  }
})
