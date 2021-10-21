<template>
  <div class="observer" />
</template>

<script>
export default {
  // this source/coding is coming from Firefox MDN about IntersectionObserver
  // scenario for infinite scroll
  props: ['options'],
  data: () => ({
    observer: null,
  }),
  mounted() {
    const options = this.options || {}
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        // tell the parent if it already meet the conditions
        this.$emit('intersect')
      }
    }, options)

    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer.disconnect()
  },
}
</script>
