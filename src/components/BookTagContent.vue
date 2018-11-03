<template>
  <div class="left-content">
    <h3>{{currentBookTag}}</h3>

  <div class="book-tag-content">
    <ul class="book-tag-content-list" ref="bookList">
      <li v-for="(book,index) in currentTagBooks" :key="index" >
        <a :title="book.title">
          <img :src="book.images.large"
            @mouseover="mouseover()"
            @mouseout="mouseout()"
            ref="bookimg"/>
          <h6 class="link-title">
            <a :title="book.title">{{book.title}}</a>
            <p class="book-tag-content-author">{{book.author.join()}}</p>
          </h6>
        </a>
      </li>
    </ul>

  <div class="book-tag-content-prompt" :style="bookrightstyle">
    class="book-tag-content-prompt"ff</div>
  </div>

  </div>
</template>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .left-content
    width: 753px
    float: left
    margin-bottom: 60px
    padding-right: 40px
    .book-tag-content
      width: 100%
      height: 489px
      position: relative
      overflow: hidden
      font-size: 13px
      margin-top: 16px
      .book-tag-content-list
        width: 100%
        height: 100%
        position: absolute
        li
          display: inline-block
          width: 20%
          height: 50%
          text-align: center
          img
            width: 85%
            height: 70%
          .link-title
            font-weight: normal
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size: 14px
            margin-bottom: 6px
            margin-top: 6px
            a
              color: #37a
            p
              color: #2c3e50
              overflow hidden
              text-overflow: ellipsis
              padding-top: 6px
      .book-tag-content-prompt
        position: absolute
        background: #F9F9F7
        border: 1px solid #acacac
        width: 330px
        max-height: 220px
        box-sizing: border-box
</style>

<script>
import {mapState, mapActions} from 'vuex'
// import axios from 'axios'
export default {
  computed: {
    ...mapState({
      currentBookTag: state => state.books.currentBookTag,
      currentTagBooks: state => state.books.currentTagBooks
    })
  },
  data () {
    return {
      bookrightstyle: null
    }
  },
  created () {
    // axios.get('./api/book/search', {
    //   params: {
    //     tag: this.$store.state.books.currentBookTag,
    //     start: 0,
    //     count: 40
    //   }
    // }).then(response => {
    //   console.log(response.data.books)
    // })
  },
  methods: {
    ...mapActions({
      getTypeBooks: 'getTypeBooks'
    }),
    getthisposition () {
      let obj = this.$refs.bookList.getBoundingClientRect()
      return {
        top: obj.top,
        left: obj.left,
        width: obj.width,
        height: obj.height
      }
    },
    mouseover () {
      // console.log(this.$refs.bookimg.target.getBoundingClientRect().top)
      console.log(this.$refs.bookList.getBoundingClientRect().top)
      console.log(this.getthisposition())
      let width
    },
    mouseout () {
      console.log('out')
    }
  },
  mounted () {
    // this.$store.dispatch('getTypeBooks')
    this.getTypeBooks()
  }
}
</script>
