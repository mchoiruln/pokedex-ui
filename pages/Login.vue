<template>
  <article
    class="
      flex flex-col
      items-center
      justify-center
      overflow-y-auto
      min-h-screen
      bg-gray-200
      text-gray-700
    "
  >
    <h1 class="font-bold text-4xl py-4">Pokedex</h1>

    <div class="flex flex-col flex-grow w-full">
      <FormulateForm
        name="login"
        class="
          flex flex-col
          bg-white
          rounded
          shadow-lg
          w-full
          sm:w-1/3
          p-4
          self-center
        "
        @submit="submitHandler"
      >
        <h2 class="font-semibold text-2xl pt-4 pb-4 text-center">Log in</h2>

        <FormulateInput
          name="email"
          label="Email"
          avalidation="required|email"
        />
        <FormulateInput
          name="password"
          label="Password"
          type="password"
          aalidation="required"
        />
        <FormulateErrors class="text-red-700 text-xs mb-1" />
        <FormulateInput
          type="submit"
          :disabled="isLoading"
          :label="isLoading ? 'Loading...' : 'Login'"
          input-class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        />
        <div class="border-t-2 border-gray-200 bg-gray-50">
          <p class="m-4">
            Don’t Have An Account?
            <nuxt-link to="Register" class="underline">Sign Up</nuxt-link>
          </p>
        </div>
      </FormulateForm>
    </div>
    <div class="flex flex-col py-4">
      <p class="pt-4 text-sm items-end">©2021 All Rights Reserved.</p>
    </div>
  </article>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async submitHandler(data) {
      try {
        this.isLoading = true
        const res = await this.$fire.signInWithEmailAndPassword(
          this.$fire.auth,
          data.email,
          data.password
        )
        localStorage.setItem('token', res.user.accessToken)
        await this.$router.push({
          name: 'index',
        })
      } catch (err) {
        this.$formulate.handle({ formErrors: err.message }, 'login')
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
