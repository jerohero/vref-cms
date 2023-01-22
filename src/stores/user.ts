import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import axios from "@/shared/axios";

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
  isSuperAdmin: ComputedRef<boolean>,
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
  const isSuperAdmin = computed(() => user.value.userType === 'SuperAdmin')
  const bearerToken = computed(() => `Bearer ${ token.value }`)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const res = await axios()
      .post('user/login', {
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
    isSuperAdmin,
    bearerToken,
    login,
    logout
  }
})
