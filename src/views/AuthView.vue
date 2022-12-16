<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import FormItem from '@/components/FormItem.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email = ref<string>('')
const password = ref<string>('')

const userStore = useUserStore()
const router = useRouter()

const login = () => {
  userStore.login(email.value, password.value).then(() => {
    router.push({ path: '/' })
  })
}
</script>

<template>
  <div class="flex h-screen flex-col justify-center pb-24 px-6 lg:px-8 text-text">
    <img src="@/assets/img/vref-white.png" alt="VRef Solutions" class="mx-auto h-16 w-auto" />
    <div class="mt-8 mx-auto w-full max-w-md">
      <div class="bg-foreground bg- py-8 px-4 shadow rounded-lg px-10">
        <form @submit.prevent="login" class="space-y-6">
          <FormItem v-model:value="email"
                    label="Email address" name="email"
                    type="email" autocomplete="email"
          />
          <FormItem v-model:value="password"
                    label="Password" name="password"
                    type="password" autocomplete="current-password"
          />
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                     class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <Button text="Sign in" type="submit" full-width />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
