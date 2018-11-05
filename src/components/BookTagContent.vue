<template>
  <div class="left-content">
    <h3>{{currentBookTag}}</h3>

  <div class="book-tag-content">
    <ul class="book-tag-content-list" ref="bookList" >
      <li v-for="(book,index) in nowbooks" :key="index" >
        <a :title="book.title">
          <img :src="book.images.large"
            @mouseover="mouseover(book,index)"
            @mouseout="mouseout()"
            ref="bookimg"/>
          <h6 class="link-title">
            <a :title="book.title">{{book.title}}</a>
            <p class="book-tag-content-author">{{book.author.join()}}</p>
          </h6>
        </a>
      </li>
    </ul>

  <div class="book-tag-content-prompt" :style="bookrightstyle" v-show="showPrompt">
      <h5 class="prompt-title">{{currentBookdec.title}}</h5>
      <p class="prompt-introduce">
        {{currentBookdec.author}}  /  {{currentBookdec.pubdate}}  /  {{currentBookdec.publisher}}
      </p>
      <p class="prompt-summary">
        {{currentBookdec.summary|summaryfilter}}
      </p>
  </div>

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
      // overflow: hidden
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
        width: 330px
        max-height:220px
        position: absolute
        background: #F9F9F7
        border: 1px solid #acacac
        border-radius: 5px
        box-sizing: border-box
        padding: 10px
        box-shadow: 0 1px 1px #fdfdfd inset, 0 1px 1px #dcdbd4
        z-index: 100
        .prompt-title
          font-size: 14px
          margin-bottom: 6px
          color: #666
        .prompt-introduce
          font-size: 12px
          margin-bottom: 6px
        .prompt-summary
          max-height: 130px
          font-size: 12px
          line-height: 1.6
</style>

<script>
import {mapActions} from 'vuex'
// import axios from 'axios'
// import sliceArray from '@/util/myutil'
export default {
  computed: {
    // ...mapState({
    //   currentBookTag: state => state.books.currentBookTag,
    //   currentTagBooks: state => state.books.currentTagBooks.slice(0, 40)
    // }),
    currentBookTag () {
      return this.$store.state.books.currentBookTag
    },
    currentTagBooks () {
      return this.$store.state.books.currentTagBooks.slice(0, 40)
    },
    getpageBooks () {
      return this.sliceArray2(this.currentTagBooks, 10)
    },
    nowbooks () {
      return this.getpageBooks[this.currentPage]
    }
  },
  data () {
    return {
      bookrightstyle: null,
      currentBookdec: [],
      currentPage: 0,
      showPrompt: false
    }
  },
  created () {
    // console.log(this.sliceArray(this.currentTagBooks, 10))
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
    sliceArray2 (array, size) {
      var result = []
      for (let x = 0; x < Math.ceil(array.length / size); x++) {
        let start = x * size
        let end = start + size
        result.push(array.slice(start, end))
      }
      return result
    },
    mouseover (book, index) {
      // console.log(this.$refs.bookimg.target.getBoundingClientRect().top)
      // console.log(this.$refs.bookList.getBoundingClientRect().top)
      this.currentBookdec = book
      let {top, left, width, height} = this.getthisposition()
      width = width * 0.2
      height = height * 0.5
      left = index % 5 * width + width
      top = index < 5 ? 0 : height
      console.log(top)
      this.bookrightstyle = {
        top: `${top}px`,
        'marginLeft': `${left}px`
      }
      this.showPrompt = !this.showPrompt
    },
    mouseout () {
      this.showPrompt = !this.showPrompt
    }
  },
  filters: {
    summaryfilter (value) {
      if (value) {
        return value.length > 160 ? value.substring(0, 160) + '...' : value
      }
    }
  },
  mounted () {
    // this.$store.dispatch('getTypeBooks')
    this.getTypeBooks()
    console.log(this.getpageBooks)
  }
}
</script>
