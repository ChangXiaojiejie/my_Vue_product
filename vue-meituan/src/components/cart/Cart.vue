<template>
  <div class="cart">
    <MEHeader></MEHeader>
    <div class="scroll">
      <div class="block">
        <table class="addr-table">
          <tbody>
            <tr>
              <th width="28%">
                收
                <span class="ui-hidden">a</span>货
                <span class="ui-hidden">a</span>人
              </th>
              <td>刘玺&nbsp;先生</td>
              <td width="17%" rowspan="3" class="more">修改</td>
            </tr>
            <tr>
              <th>
                电
                <span class="ui-hidden">中中</span>话
              </th>
              <td>153********</td>
            </tr>
            <tr>
              <th>收货地址</th>
              <td style="font-weight: 700;">上海市浦东新区航头镇航都路18号-黑马程序员</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="main-container">
        <div class="fast_cart">
          <span class="fast-super">闪送超市</span>
          <span class="addBtn">凑单专区</span>
        </div>
        <p class="group-proptext theme-border">￥0起送，22点后满￥69运费5元起，不满￥69运10元起</p>
        <p class="group-receive theme-border">
          收货时间&nbsp;&nbsp;
          <span class="ugroup-receive-ext">&nbsp;可预定</span>
          <span class="theme-redfont">08:00-09:00</span>
        </p>
        <div class="group-comment theme-border">收货备注&nbsp;&nbsp;
          <div class="comment-wrapper">
            <input type="text" maxlength="100" value placeholder="可输入100字以内特殊要求内容">
          </div>
        </div>
        <table

          width="100%"
          class="group-list theme-border"
          style="table-layout: fixed;"
        >
          <tbody>
            <tr class="bor" v-for="cate in cateList" :key="cate.id">
              <td class="group-item-checkbox " :class="{ active: cate.isSelected }"  @click="toggle(cate.id)" style="width: 5rem;"></td>
              <td style="width: 5rem;">
                <div class="group-item-img-wrap">
                  <div class="group-item-img">
                    <img
                      :src="cate.img"
                      alt
                      width="100%"
                    >
                  </div>
                  <div class="maskText"></div>
                </div>
              </td>
              <td>
                <div class="group-item-name ui-ellipsis">{{cate.name}}</div>
                <div width="50px" class="group-item-price">￥{{cate.price}}</div>
                <ProdOperate v-model="cate.count"></ProdOperate>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="settlement">
          <span class="selectAll selectAll-false " :class="{ 'selectAll-true': $store.getters.isSelectAll }" @click="getCheckAll">全选</span>
          共:
          <span class="theme-redfont">￥{{totalPrice}}</span>
          <div class="chooseOk">选好了</div>
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
export default {
  created () {
    this.getCateList()
  },
  // 组件绑定
  components: {
    MEHeader,
    MEFooter,
    ProdOperate
  },
  data () {
    return {
      cateList: []
    }
  },
  /**
 * 实现的思路
 * 1.首先获取vues中的$store中的计算属性，里面有两个方法，分别是 ids 和 id2Data
 * 2.发送跨域请求，this.$http
      .get(
        `/api/home?_r=${Math.random()}&cart_pids=${encodeURIComponent(
          ids
        )}&location=121.5721941391567%2C31.21168025925351`
      )
 * 3.在then中获取请求成功的结果，将结果保存到this.cateList中
 *
 */
  methods: {
    getCateList () {
      const {ids, id2Data} = this.$store.getters
      console.log('ids', ids)
      console.log('idsData', id2Data)
      // 发送跨域请求
      // console.log('this.$http：', this.$http)
      this.$http.get(`/api/home?_r=${Math.random()}&cart_pids=${encodeURIComponent(
        ids
      )}&location=121.5721941391567%2C31.21168025925351`)
        .then(res => {
          // 接收到返回的数据后，将数据解构，给id2Data中的对应的id添加count属性和isSelected属性
          console.log('getCateList中的res：', res)
          this.cateList = res.data.data.cart_ids.map(item => {
            return {
              ...item,
              count: id2Data[item.id].count,
              isSelected: id2Data[item.id].isSelected
            }
          })
        })
    },
    toggle (id) {
      const curGoods = this.cateList.find(item => item.id === id)
      curGoods.isSelected = !curGoods.isSelected
    },
    /**
     * 作用： 全选
     * 1.当全选按钮被点击，会调用这个函数，然后获取$store.getters.isSelectAll的值
     * 2.遍历cateList中的每一项，然后将$store.getters.isSelectAll的值取反，将所有的item的isSelected值改变，要么true，要么false
     * 3.当 item.isSelected值全变成true，则store中的isSelectAll的值变成false
     * 4.当getCheckAll再次触发，会把item.isSelected值全变成false，则store中的isSelectAll的值变成false
     * 5.这样就实现了全选的功能
     */
    getCheckAll () {
      console.log('this.$store.getters.isSelectAll：', this.$store.getters.isSelectAll)
      this.cateList.forEach(item => {
        item.isSelected = !this.$store.getters.isSelectAll
      })
    }
  },
  watch: {
    /**
     * 监视cateList的变化
     * handler 作用 判断当前的数组，使用some判断，如果item.count的值小于0，通过下标使用数组中的splice方式，移除这一项，然后留下count值大于0的
     *
     */
    cateList: {
      // curList 指的是当前更新的最新的数组
      handler (curList) {
        curList.some((item, index) => {
          // 判断当前的数组中每一项 item如果有 count<=0,则移除掉该数据
          if (item.count <= 0) {
            curList.splice(index, 1)
            // return 返回一个true
            return true
          }
        })
        // 重新获取当前的有效的商品信息列表
        const cartList = curList.map(item => {
          return {
            id: item.id,
            count: item.count,
            isSelected: item.isSelected
          }
        })
        // 调用store中的 updataCart 方法
        this.$store.commit('updataCart', cartList)
      },
      // 开启深度监听
      deep: true
    }
  },
  computed: {
    // 计算所有已添加的商品的价格
    /**
     * 实现的思路
     * 1.通过reduce，取出数组中每一项item，
     * 2.判断当前的item.isSelected的属性，即判断当前的商品是否被选中
     * 3. 计算选中商品的价格，price累加
     * 4.将price的值返回
     */
    totalPrice () {
      return this.cateList.reduce((price, item) => {
        if (item.isSelected) {
          price += item.count * item.price
        }
        return price
      }, 0)
    }
  }

}
</script>
<style lang="less" src="./style.less"></style>
<style>
.selectAll {
  display: inline-block;
  min-width: 5rem;
  padding-left: 2.5rem;
  background-size: 1.8rem 1.8rem;
  background-repeat: no-repeat;
  background-position: left center;
}
.selectAll-false {
  background-image: url(../../assets/images/check.png);
}
.selectAll-true {
  background-image: url(../../assets/images/checked.png);
}
</style>
