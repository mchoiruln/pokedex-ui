<template>
  <div class="flex flex-col min-h-screen p-10 bg-gray-100 text-gray-800">
    <h1 class="text-3xl">Pokedex</h1>
    <div class="flex border flex-col">
      <div class="flex self-start border-red-400">
        <FormulateInput
          type="text"
          label="Search for a name pokemon or by number pokedex"
        />
        <div class="align-middle self-center">
          <button
            class="
              px-4
              py-2
              rounded
              bg-indigo-500
              text-white
              hover:bg-indigo-600
            "
          >
            Catch
          </button>
        </div>
      </div>
      <div>
        <button
          class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          Random Catch
        </button>
      </div>
    </div>
    <p class="font-semibold mt-6">List Pokemon</p>
    <div class="flex flex-wrap mt-4 items-center justify-center">
      <div
        v-for="(item, index) in randomRanges"
        :key="index"
        class="flexa-0-5 p-2 transform hover:-translate-y-6 transition-all"
      >
        <div class="m-2" v-once>
          <a
            href="#"
            class="flex self-start border rounded-lg shadow-lg bg-gray-500"
          >
            <img
              width="215"
              height="215"
              :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
                random() + ''
              ).padStart(3, '0')}.png`"
            />
          </a>
          <div class="flex items-center justify-between mt-3">
            <div>
              <a href="#" class="font-medium">Pokemon Name</a>
              <a class="flex items-center" href="#">
                <span class="text-xs font-medium ml-1 text-indigo-500"
                  >[tag-species]</span
                >
              </a>
            </div>
            <span
              class="
                flex
                items-center
                h-8
                bg-indigo-200
                text-indigo-600 text-sm
                px-2
                rounded
              "
              >{{ random() }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-10 space-x-1">
      <button
        v-if="!isInfiniteScroll"
        class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        @click="pushRandom"
      >
        Load more Pokemon
      </button>
    </div>
    <!-- This for infinite scroll detector -->
    <Observer @intersect="intersected" />
  </div>
</template>

<script>
export default {
  data() {
    return { generated: [], isInfiniteScroll: false }
  },
  computed: {
    randomRanges() {
      return [...Array(15), ...this.generated]
    },
  },
  methods: {
    random() {
      return Math.floor(Math.random() * (807 - 1 + 1) + 1)
    },
    pushRandom() {
      this.generated.push(...Array(15))
      this.isInfiniteScroll = true
    },
    intersected() {
      if (this.isInfiniteScroll) {
        this.pushRandom()
      }
      console.log('intersected')
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>
