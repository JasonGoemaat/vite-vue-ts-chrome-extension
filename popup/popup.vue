<script setup lang="ts">
const openOptionsPage = () =>
{
  chrome.runtime.openOptionsPage();
}

const openMainPage = () =>
{
  chrome.tabs.create({ url: "index.html" });
}
</script>

<template>
  <div class="top">
    <img alt="Vue logo" src="./assets/logo.png" />
    <span>Popup</span>
  </div>
  <p>
    <a @click="openOptionsPage">Options Page</a> | 
    <a @click="openMainPage">Main Page</a>
  </p>
</template>

<style lang="scss">
body {
  font-size: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto','Arial','sans-serif';

  &>* {
    margin-bottom: 0.5em;
  }
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    margin-right: 1em;
    height: 4em;
  }
  
  span {
    font-size: 3em;
  }
}
a {
  color: blue;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>