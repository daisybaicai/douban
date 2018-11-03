<template>
<div class="outer-content">
  <div class="inner-content">
    <div class="logo-box">
      <a href="http://img3.doubanio.com/dae/accounts/resources/19507ad/book/assets/lg_book_a11_1.png?s=1" />
    </div>
    <div class="search-box">
      <form>
        <input
          type="text"
          placeholder="搜索书籍相关"
          v-model="searchKey"
          class="search-input"
          @keyup.up.prevent="changeup()"
          @keyup.down="changedown()">
        <button>搜索</button>
      </form>
      <ul
        ref="search-suggest"
        class="search-suggest"
        v-show="isFocusOnList"
        @click="onListBlur($event)"
        >
        <li
          v-for ="(item,index) in list"
          :key="index"
          class="search-item"
          :class="index === now ? 'search-item-hot' : ''">
          <a class="search-item-link">
            <img
              :src="item.image || item.images.small"
               class="search-item-image"/>
            <h3 class="search-item-title">
              {{item.title}}
            </h3>
            <span class="search-item-outdetail">{{item.pubdate}}</span>
            <span class="search-item-outdetail">{{item.year}}</span>
            <p class="search-item-author search-item-outdetail" >{{item.author.join()}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .outer-content
    width: 100%
    margin-bottom: 40px
    background: rgb(246, 246, 241)
    .inner-content
      width: 936px
      margin: 0 auto
      padding: 10px 0 5px
      .logo-box
        float: left
        height: 56px
        width: 145px
        margin: 0 13px 0 0
        background: url(//img3.doubanio.com/dae/accounts/resources/19507ad/book/assets/lg_book_a11_1.png?s=1) no-repeat 0 12px
        background-image: -webkit-image-set(url(//img3.doubanio.com/dae/accounts/resources/19507ad/book/assets/lg_book_a11_1.png?s=1) 1x, url(//img3.doubanio.com/dae/accounts/resources/19507ad/book/assets/lg_book@2x.png?s=1) 2x)
        // .logo
        // width: 145px
        // height: 56px
        // display: inline-block
        // margin: 0 13px 0 0
        // color: transparent
        // background-position: 0 12px
        // background-repeat: no-repeat
      .search-box
        margin-left: 145px
        position: relative
        zoom: 1
        padding: 10px 0 15px 0
        .search-input
          width: 350px
          height: 30px
          border: none
          padding-left: 10px
          background: #fff
          outline: none
          -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.16)
          box-shadow: 1px 1px 1px rgba(0,0,0,0.16)
        .search-suggest
          position: absolute
          width: 360px
          z-index: 99
          margin-top: 6px
          background: #fff
          border: 1px solid #ddd
          .search-item:hover,.search-item-hot
            background: #F9F9F9
          .search-item
            border-bottom: 1px solid #eee
            overflow: hidden
            padding: 0
            .search-item-link
              display: block
              padding: 6px
              color: #999
              overflow: hidden
              zoom: 1
              .search-item-image
                float: left
                width: 40px
                height: 56px
              .search-item-title
                display: inline-block
                font-weight: normal
                color: #369
                font-size: 13px
              .search-item-author
                margin-top: 10px
              .search-item-outdetail
                color:#999
  ul
    list-style: none
  li
    text-align: -webkit-match-parent
    display: list-item
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      searchKey: '',
      list: [],
      now: -1,
      isFocusOnList: true
    }
  },
  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
    document.addEventListener('touchstart', this.handleDocumentClick)
  },
  methods: {
    // start () {
    //   axios.post('./api/book/search', {
    //     params: {
    //       count: 10,
    //       q: '追风筝的人'
    //     }
    //   }).then(response => {
    //     console.log(response.data)
    //   })
    // }
    changeup () {
      this.now--
      if (this.now === -2) {
        this.now = (this.list.length) - 1
      }
    },
    changedown () {
      this.now++
      if (this.now === this.list.length) {
        this.now = 0
      }
    }
    // onListBlur (ev) {
    //   if (!this.$refs.searchSuggest.contains(ev.target)) {
    //     this.isFocusOnList = false
    //   }
    // },
    // handleDocumentClick (e) {
    //   if (!this.$refs.searchSuggest.contains(e.target)) {
    //     this.isFocusOnList = false
    //   }
    // }
  },
  filters: {
    filterAuthor (newValue) {
      if (newValue) {
        return String.prototype.substring.call(newValue, 2, newValue.length)
      }
    }
  },
  computed: {
    // getImages (_url) {
    //   if (_url !== undefined) {
    //     let _u = _url.substring(7)
    //     return 'https://images.weserv.nl/?url=' + _u
    //   }
    // }
    filterAuthors (newValue) {
      if (newValue) {
        return String.prototype.substring.call(newValue, 2, newValue.length - 1)
      }
    }
  },
  created: function () {
    // let tags = '李开复'
    // axios.get('/api/book/search', {
    //   params: {
    //     tag: tags,
    //     count: 20
    //   }
    // }).then(response => {
    //   console.log(response.data)
    // })
  },
  watch: {
    searchKey (newValue) {
      axios.get('./api/book/search', {
        params: {
          q: newValue,
          count: 5,
          start: 0
        }
      }).then((response) => {
        this.list = response.data.books
      })
    }
  }
}
</script>
