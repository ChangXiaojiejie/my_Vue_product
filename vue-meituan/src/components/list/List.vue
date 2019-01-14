<template>
<div class="list">
  <MEHeader></MEHeader>
    <div class="list-content">
      <div class="list-aside">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <ul>
              <li :class="{active: index === selectedIndex }" v-for="(cate,index) in categories" :key="cate.id" @click="selectMenu(index,cate.id)">
                <span>{{cate.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-main">
        <div class="top_nav">
          <ul>
            <li>
              全部分类
            </li>
            <li>综合排序</li>
          </ul>
        </div>
        <div class="list-nav-content">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul>
                <li v-for="proc in currentProducts" :key="proc.id">
                  <div class="left">
                    <div class="left-img">
                      <img :src="proc.img" :key="proc.id" alt="">
                    </div>
                    <div class="left-con">
                      <h4>{{proc.name}}</h4>
                      <p>{{proc.specifics}}</p>
                      <div><span class="new_pric">¥{{proc.partner_price}}</span><del class="old_pric">¥{{proc.price}}</del></div>
                    </div>
                  </div>
                  <!-- <div class="con-add">
                    <p>
                      <span class="list-pro-del" v-if="false">-</span>
                    </p>
                    <p>
                      <span class="pro_num" v-if="false">1</span>
                    </p>
                    <p>
                      <span class="list-pro-add">+</span>
                    </p>
                  </div> -->
                  <ProdOperate v-model="proc.count" @selectGoods="selectGoods(proc.id)"></ProdOperate>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  <MEFooter></MEFooter>
</div>
</template>

<script>
import MEHeader from '../common/Header'
import MEFooter from '../common/Footer'
import ProdOperate from '../product-operate/ProdOperate'
// import MUI from 'mui'
import mui from '../../assets/js/mui.js'
import axios from 'axios'
export default {
  components: {
    MEHeader,
    MEFooter,
    ProdOperate
  },
  data () {
    return {
      // 所有的分类和商品列表
      categories: [],
      // 当前菜单的索引
      selectedIndex: 0,
      // 全部的商品信息
      products: [],
      // 当前的商品信息列表
      currentProducts: []
    }
  },
  created () {
    // 获取所有信息
    this.getList()
    // 获取右侧商品信息
    // this.selectGoods()
    this.$nextTick(() => {
    // 区域滚动初始化
      mui('.mui-scroll-wrapper').scroll({
        // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        deceleration: 0.0005,
        indicators: false
      })
    })
  },
  methods: {
    // 获取数据
    getList () {
      // 发送jsonp跨域请求
      axios
        .jsonp('http://localhost:3008/list', {
          page: 1,
          count: 3
        })
        .then(res => {
          console.log('getList中的res：', res)
          // 将分类数据列表和商品信息列表解构出来
          const {categories, products} = res.data
          // 将分类信息列表保存
          this.categories = categories
          // 将商品信息列表保存
          this.products = products
          // 作用：用来显示已选择商品的数量
          // id2Data 是一个对象，每个商品的id作为键key，值vule是一个对象，值value的属性有count、isSelected
          const id2Data = this.$store.getters.id2Data
          // currentProducts 表示：当前菜单对应的商品数据
          // map 用来显示已选择商品的数量
          this.currentProducts = products[categories[0].id].map(item => {
            return {
              ...item,
              // 当前商品已选择的数量
              //  首先通过id在id2Data中查找，数据存在且有count属性，则取出id2Data[item.id].count的值，否则取默认值为0
              count: (id2Data[item.id] && id2Data[item.id].count) || 0
            }
          })
        })
    },
    /**
     * 切换左侧菜单
     * 1.index 指的是当前分类对应的下标
     * 2.id指的是当前分类对应的分类id
     */
    selectMenu (index, id) {
      // 调用store中的计算属性
      const id2Data = this.$store.getters.id2Data
      // console.log('id2Data', id2Data)
      // 获取到当前点击索引
      this.selectedIndex = index
      /**
       * 1.根据传来的分类id，找到对应的数组数据，映射一个新的数组
       * 2.将这个数组解构，每一项都是一个对象
       * 3.给每个对象中添加属性count
       * 4.根据id2Data的方法，如果有count值，则使用，没有则设置为0
       * 5.返回值是修改后映射数组
       * 6.所以currentProducts中是带有count属性的新数组
       */
      this.currentProducts = this.products[id].map(item => {
        return {
          ...item,
          count: (id2Data[item.id] && id2Data[item.id].count) || 0
        }
      })
    },
    /**
     * selectGoods 指的是当前当前自定义事件，触发时调用的事件
     * id 指的是当前商品的id
     */
    selectGoods (id) {
      // 查看当前id商品的的数量
      const count = this.currentProducts.find(item => item.id === id).count
      // 调用store中的addCart，把 count和 id作为参数传递过去
      this.$store.commit('addCart', {
        // count 表示当前已经选择的数量
        count,
        // 当前选中的商品的id
        id
      })
    }
  }
}
</script>

<style src="./style.css"></style>
