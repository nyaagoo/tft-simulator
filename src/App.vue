<template lang="pug">
  #app
    v-app
      v-content
        router-link(to="/") Home
        span  | 
        router-link(to="/item") About
        router-view
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
