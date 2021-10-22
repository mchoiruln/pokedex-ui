<template>
  <div class="flex flex-col min-h-screen p-10 bg-gray-100 text-gray-800">
    <div class="flex justify-between mb-6">
      <h1 class="text-3xl">Pokedex</h1>
      <button
        class="px-2 py-1 rounded bg-pink-500 text-white hover:bg-pink-600"
        @click="signout"
      >
        Sign out
      </button>
    </div>
    <div class="flex border flex-col">
      <div class="flex self-start border-red-400">
        <FormulateInput
          v-model="identityPokemon"
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
            @click="catchPokemon"
          >
            Catch
          </button>
        </div>
      </div>
      <div class="flex">
        <button
          class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          @click="randomCatch"
        >
          Random Catch
        </button>
        <button
          class="
            ml-2
            px-4
            py-2
            rounded
            bg-orange-500
            text-white
            hover:bg-orange-600
          "
          @click="resetList"
        >
          Reset List
        </button>
      </div>
    </div>
    <p class="font-semibold mt-6">List Pokemon</p>
    <span v-if="isFetching" class="flex"
      >Catching your pokemon
      <svg
        class="ml-2 animate-spin h-5 w-5 mr-3 bg-red-500 text-red-400"
        viewBox="0 0 24 24"
      ></svg>
    </span>
    <div
      v-if="!selected"
      class="flex flex-wrap mt-4 items-center justify-center"
    >
      <div
        v-for="(item, index) in pokemon.list"
        :key="index"
        class="flexa-0-5 p-2 transform hover:-translate-y-6 transition-all"
        style="min-width: 215px"
      >
        <div class="m-2">
          <a
            v-if="item"
            class="
              flex
              self-start
              border
              rounded-lg
              shadow-lg
              bg-gray-500
              cursor-pointer
            "
            @click="selected = item"
          >
            <img width="215" height="215" :src="item.imageDetail" />
          </a>
          <div class="flex items-center justify-between mt-3">
            <div v-if="item.detail">
              <a v-if="item" href="#" class="font-medium">{{ item.name }}</a>
              <span class="flex items-center">
                <span
                  v-for="type in item.detail.types"
                  :key="type"
                  class="
                    text-xs
                    inline-flex
                    items-center
                    font-bold
                    leading-sm
                    uppercase
                    px-3
                    py-1
                    bg-green-200
                    text-green-700
                    rounded-2xl
                  "
                  >{{ type }}</span
                >
              </span>
            </div>
            <span
              v-if="item && item.detail"
              class="
                flex
                items-center
                h-8
                bg-indigo-200
                text-indigo-600 text-sm
                px-2
                rounded
              "
              >{{ item.detail.id }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-wrap mt-4 items-center justify-center">
        <div class="flexa-0-5 p-2" style="min-width: 215px">
          <div class="m-2">
            <a
              v-if="selected"
              class="
                flex
                self-start
                border
                rounded-lg
                shadow-lg
                bg-gray-500
                cursor-pointer
              "
            >
              <img width="215" height="215" :src="selected.imageDetail" />
            </a>
            <div class="flex items-center mt-3 border p-5 bg-white">
              <div v-if="selected.detail">
                <div v-if="selected" class="font-bold text-4xl capitalize">
                  {{ selected.name }}
                </div>
                <span class="flex items-center">
                  <span
                    v-if="selected && selected.detail"
                    class="
                      flex
                      items-center
                      h-8
                      bg-indigo-200
                      text-indigo-600 text-sm
                      px-2
                      rounded
                      text-2xl
                    "
                    >#
                    {{ selected.detail.id.toString().padStart(3, '0') }}</span
                  >
                  <span
                    v-for="type in selected.detail.types"
                    :key="type"
                    class="
                      ml-4
                      text-xs
                      inline-flex
                      items-center
                      font-bold
                      leading-sm
                      uppercase
                      px-3
                      py-1
                      bg-green-200
                      text-green-700
                      rounded-2xl
                    "
                    >{{ type }}</span
                  >
                </span>
                <div class="flex">
                  <div>Sprites</div>
                  <img :src="selected.detail.sprites.front_default" />
                  <img :src="selected.detail.sprites.back_default" />
                </div>
                <div class="flex">
                  <div>Stats</div>
                  <radar-chart
                    :chartdata="{
                      labels: [
                        ...selected.detail.stats.map((s) => s.stat_name),
                      ],
                      datasets: [
                        {
                          label: 'Stats',
                          data: [
                            ...selected.detail.stats.map((s) => s.stat_base),
                          ],
                          backgroundColor: 'rgb(30,144,255,0.3)',
                        },
                      ],
                    }"
                    :options="{
                      responsive: true,
                      tooltips: {
                        callbacks: {
                          title: (tooltipItem, data) =>
                            data.labels[tooltipItem[0].index],
                        },
                      },
                    }"
                  ></radar-chart>
                </div>
                <div class="flex flex-col mt-4">
                  <button
                    class="
                      ml-2
                      px-4
                      py-2
                      rounded
                      bg-orange-500
                      text-white
                      hover:bg-orange-600
                      align-middle
                    "
                    @click="selected = null"
                  >
                    Back to list
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <pre>{{ selected }}</pre> -->
        </div>
      </div>
    </div>
    <div v-if="!selected" class="flex justify-center mt-10 space-x-1">
      <button
        v-if="!isInfiniteScroll && !isFetching && pokemon.next"
        class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        :disabled="isFetching"
        @click="pushRandom"
      >
        Load more Pokemon
      </button>
      <span v-if="isInfiniteScroll && isFetching" class="flex"
        >Catching your pokemon
        <svg
          class="ml-2 animate-spin h-5 w-5 mr-3 bg-red-500 text-red-400"
          viewBox="0 0 24 24"
        ></svg>
      </span>
    </div>
    <!-- This for infinite scroll detector -->
    <Observer @intersect="intersected" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      generated: [],
      isInfiniteScroll: false,
      pokemon: {
        list: [],
        next: null,
      },
      isFetching: false,
      identityPokemon: null,
      selected: null,
    }
  },
  computed: {
    randomRanges() {
      return [...Array(15), ...this.generated]
    },
  },
  async mounted() {
    await this.fetchPokemon()
  },
  methods: {
    random() {
      return Math.floor(Math.random() * (807 - 1 + 1) + 1)
    },
    async pushRandom() {
      // this.generated.push(...Array(15))\
      try {
        this.isInfiniteScroll = true
        this.isFetching = true
        const res = await this.$axios('/api/pokemon' + this.pokemon.next)
        this.pokemon.list.push(...res.data.results)
        this.pokemon.next = new URL(res.data.next).search
      } catch (error) {
        console.error(error)
      } finally {
        this.isFetching = false
      }
    },
    async intersected() {
      if (this.isFetching) return
      if (!this.pokemon.next) return
      if (this.selected) return
      if (this.isInfiniteScroll) {
        await this.pushRandom()
      }
    },
    async signout() {
      try {
        await this.$fire.signOut(this.$fire.auth)
        await this.$router.push('/login')
      } catch (error) {
        alert(error.message)
      } finally {
        localStorage.removeItem('token', null)
      }
    },
    async catchPokemon() {
      this.selected = null
      try {
        if (this.identityPokemon === null || this.identityPokemon === '') return

        this.isFetching = true
        this.pokemon.next = null
        const res = await this.$axios('/api/pokemon/' + this.identityPokemon)
        this.pokemon.list = res.data.results
      } catch (error) {
        console.error(error)
      } finally {
        this.isFetching = false
      }
    },
    randomCatch() {
      this.selected = null
      const random = Math.floor(Math.random() * 899) + 1
      this.identityPokemon = random
      this.catchPokemon()
    },
    async resetList() {
      this.identityPokemon = null
      this.selected = null
      await this.fetchPokemon()
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    async fetchPokemon() {
      try {
        this.isFetching = true
        const res = await this.$axios('/api/pokemon?limit=15&offset=0')

        this.pokemon.list = res.data.results
        this.pokemon.next = new URL(res.data.next).search
      } catch (error) {
        console.error(error)
      } finally {
        this.isFetching = false
      }
    },
  },
}
</script>
