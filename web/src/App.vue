<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 44px;
}
.card {
  margin: 16px;
  padding: 16px;
  display: inline-grid;
  align-self: start;
  grid-gap: 2px;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
}
.card:hover {
  box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent, 0 2px 15px rgba(0,0,0,0.30)
}
input, button, textarea {
  border: none;
  padding: 8px;
  border-radius: 4px;
}
input,
textarea,
[contenteditable] {
  caret-color: #2c3e50;
}
.embed-img {
  display: block;
  max-width: 100%;
}
</style>
