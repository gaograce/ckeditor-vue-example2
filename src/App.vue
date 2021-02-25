<template>
  <div id="app">
    <ck-editor/>
  </div>
</template>

<script>
import CkEditor from './components/CkEditor.vue'

export default {
  name: 'App',
  components: {
    CkEditor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
