<template>
  <div id="app">
    <m-header></m-header>
    <div class="main-content">
      <book-tag-content></book-tag-content>
      <book-tage></book-tage>
    </div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader'
import BookTage from '@/components/BookTag'
import BookTagContent from '@/components/BookTagContent'
export default {
  name: 'App',
  components: {
    MHeader, BookTage, BookTagContent
  }
}
</script>

<style>
  .main-content{
    width: 969px;
    margin: auto
  }
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 13px;
  }
</style>
