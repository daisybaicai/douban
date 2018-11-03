import axios from 'axios'

const bookTags = [
  { tagName: '文学', subTags: ['小说', '随笔', '散文', '诗歌', '童话', '名著', '港台', '外国文学', '中国文学', '日本文学', '古典文学'] },
  { tagName: '流行', subTags: ['漫画', '推理', '绘本', '青春', '科幻', '言情', '武侠', '奇幻', '悬疑', '穿越', '魔幻', '校园'] },
  { tagName: '文化', subTags: ['历史', '哲学', '传记', '设计', '建筑', '电影', '回忆录', '音乐', '心理学', '社会学', '国学', '艺术史'] },
  { tagName: '生活', subTags: ['旅行', '励志', '职场', '美食', '教育', '灵修', '健康', '家居', '爱情', '女性', '摄影', '家居'] },
  { tagName: '经管', subTags: ['经济学', '管理', '商业', '金融', '营销', '理财', '股票', '企业史', '创业', '投资', '广告', '策划'] },
  { tagName: '科技', subTags: ['科普', '互联网', '编程', '交互设计', '算法', '通信', '神经网络', '用户体验', '程序', '科技', 'web'] }
]

const state = {
  bookTags,
  currentBookTags: bookTags[0],
  currentBookTag: bookTags[0].subTags[0],
  currentTagBooks: []
}

const getters = {

}

const mutations = {
  SET_CURRENT_BOOK_TAGS (state, book) {
    state.currentBookTags = book
  },
  SET_CURRENT_BOOK_TAG (state, subtags) {
    state.currentBookTag = subtags
  },
  SET_CURRENT_TAG_BOOKS (state, {books}) {
    state.currentTagBooks = books
  }
}

const actions = {
  getTypeBooks ({state, commit}) {
    axios.get('./api/book/search', {
      params: {
        tag: state.currentBookTag,
        start: 0,
        count: 40
      }
    }).then(response => {
      commit('SET_CURRENT_TAG_BOOKS', {books: response.data.books})
      console.log(response.data.books)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
