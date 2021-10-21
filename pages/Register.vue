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
        v-model="formData"
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
        <h2 class="font-semibold text-2xl pt-4 pb-4 text-center">
          Create new Account
        </h2>
        <FormulateInput
          name="fullName"
          label="Full Name"
          validation="required|email"
        />
        <FormulateInput
          name="email"
          label="Email"
          validation="required|email"
        />
        <FormulateInput
          name="password"
          label="Password"
          type="password"
          validation="required"
        />
        <FormulateInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          validation="required"
        />
        <FormulateErrors />
        <FormulateInput type="submit" label="Register" />
        <div class="border-t-2 border-gray-200 bg-gray-50">
          <p class="m-4">
            Have An Account?
            <nuxt-link to="Login" class="underline">Log in</nuxt-link>
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
  data() {
    return {
      formData: {
        fullName: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
    }
  },
  methods: {
    submitHandler(data) {
      // TODO: push new account to backend
    },
  },
}
</script>
