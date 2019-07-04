<template lang="pug">
  #app
    v-app(dark)
      v-content
        router-view
</template>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap&subset=japanese');

#app {
  font-family: 'Noto Sans JP', sans-serif, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
