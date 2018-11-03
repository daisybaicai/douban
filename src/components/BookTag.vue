<template>
  <div class="aside-content">
    <div class="content-header">
      <h2>标签列表</h2>
    </div>
    <ul class="book-tag-list">
      <li
          class="book-tag-item"
          v-for="(book,index) in bookTags"
          :key="index"
          @click="changeCurrentBookTags(book)"
          :class="book === currentBookTags? 'book-active-tag-item' : '' ">
          {{book.tagName}}</li>
    </ul>
    <ul>
      <li class="aside-item"
        v-for="(bookTag,index) in currentBookTags.subTags"
        :key="index"
        @click="changeCurrentBookTag(bookTag)"
        :class="bookTag === currentBookTag?'book-active-subtag-item':'' "
        >{{bookTag}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState({
      bookTags: state => state.books.bookTags,
      currentBookTags: state => state.books.currentBookTags,
      currentBookTag: state => state.books.currentBookTag
    })
  },
  created () {
    console.log(this.$store.state.books.a)
  },
  data () {
    return {
      bookname: '文学'
    }
  },
  methods: {
    ...mapActions({
      getTypeBooks: 'getTypeBooks'
    }),
    changeCurrentBookTags (book) {
      this.$store.commit('SET_CURRENT_BOOK_TAGS', book)
      this.$store.commit('SET_CURRENT_BOOK_TAG', book.subTags[0])
      this.getTypeBooks()
    },
    changeCurrentBookTag (bookTag) {
      this.$store.commit('SET_CURRENT_BOOK_TAG', bookTag)
      this.getTypeBooks()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  html,body,ul,ol,h1,h2,h3,h4,p
    margin: 0
    padding: 0
  h2
    display: block
    font-size: 1.5em
    margin-block-start: 0.83em
    margin-block-end: 0.83em
    margin-inline-start: 0px
    margin-inline-end: 0px
    font-weight: bold
  ul
    list-style: none
  .aside-content
    float: right
    width: 192px
    margin-bottom: 40px
    .content-header
      border-bottom: 1px solid #ddd
      padding-bottom: 5px
      color: #333
      h2
        display: inline-block
    .book-tag-list
      padding: 10px 0
      border-bottom: 1px solid #ddd
      .book-tag-item
        display: inline-block
        margin: 5px 30px 3px 0
        padding: 3px 5px
        font-size: 12px
        color: #37a
      .book-active-tag-item
        background: #111
        color: white
    ul
      .aside-item
        border-bottom: 1px solid #ddd
        font-size: 12px
        padding: 10px 0 10px 3px
        margin: 1.5px 0
        color: #37a
      .book-active-subtag-item
        background: #f6f6f1
</style>
