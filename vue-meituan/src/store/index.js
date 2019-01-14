import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态即是数据
  state: {
    // 通过读取本地存储，如果本地存储有，则将JSON字符串转成对应的数组，如果没有，则设置为一个空数组
    // beeCart 代表的是一个数组
    beeCart: JSON.parse(localStorage.getItem('beeCart')) || []
  },
  // 用于同步state中的数据的方法
  mutations: {
    /**
     * addCart 是添加商品的方法，用于同步state中的beeCart
     * state：指的是Store中state
     * goods 本身代表的是一个对象，当前指的是 指的是传入的商品的对象
     */
    addCart (state, goods) {
      /**
       * 获取当前商品对象在state中是否能找到对应的数据
       * 1.如果有，则curGoods代表当前的添加的商品对象
       * 2.这个商品对象的值从localStrong中取出的，而不是goods中的值
       */
      const curGoods = state.beeCart.find(item => item.id === goods.id)
      // curGoods 如果不存在，那么就是第一次添加商品
      if (!curGoods) {
        /**
         * 第一次添加商品
         * 1.将goods对象解构，然后添加一个新的属性 isSelected，值为：true
         * 2.将这个对象添加追加到state.beeCart数组中
         * 3.此时state.beeCart不是空数组了，而是有一条数据
         */
        state.beeCart.push({
          ...goods,
          isSelected: true
        })
      } else {
        /**
         * 不是第一次添加
         * 1.将当前的商品的数量，同步到curGoods.count中
         * 2.然后当前的商品的数量改变
         */
        curGoods.count = goods.count
      }
      /**
       * 将修改后的数据，重新保存到localStrong中
       * 1.如果之前没有添加过商品，那么会创建一个本地存储，然后将数据存储到本地存储中
       * 2.如果之前添加过商品，那么会把修改的值重新保存到本地存储中
       * 3.保存的名称和获取的名称保持一致，同时要把当前数组转成JSON格式的数据，存储到本地
       */
      localStorage.setItem('beeCart', JSON.stringify(state.beeCart))
    },
    /**
     * 更新当前的state的数据
     * @param {*} state 当前状态数据
     * @param {*} curList 本身第二个参数代表的是一个对象 指的是传入的数据对象
     */
    updataCart (state, curList) {
      /**
       * 1.将curList中的数组通过map的方法，遍历出来
       * 2.每一个item都是一个对象，再通过解构将所有的属性解构出来
       * 3.将map映射的数组同步到state.beeCart中
       * 4.将最新的beeCart的值保存到本地存储中
       */
      state.beeCart = curList.map(item => ({...item}))
      localStorage.setItem('beeCart', JSON.stringify(state.beeCart))
    }
  },
  // 相当于Vue实例中的计算属性
  getters: {
    /**
     * 作用：监听state，当state的数据发生改变，重新获取当前state.beeCart中所有的id，并且放在数组中，然后将这些id以逗号拼接成字符串
     * @param {*} state vuex中的数据
     */
    // 查找所有的id
    ids (state) {
      return state.beeCart.map(item => item.id).join(',')
    },
    /**
     * 统计所有的添加商品的数量
     * 应用于：底部导航栏中购物车中商品的数量
     * @param {*} state 指的是当前store中的数据
     */
    total (state) {
      // function fn (count, item) {
      //   count += item.count
      //   return count
      // }
      // return state.beeCart.reduce(fn, 0)
      // 等价于上面
      /**
       * 实现的步骤：
       * 1.首先将state.beeCart中的数据取出，每一项都是一个对象
       * 2.将将每一个对象的值（item.count）取出，并且累加到count上
       * 3.执行完成将count的值返回
       */
      return state.beeCart.reduce((count, item) => {
        count += item.count
        return count
      }, 0)
    },
    /**
     * 作用：
     * 应用于：
     * @param {*} state
     * 实现的思路
      0.遍历state.beeCart数组，每一项是item
      1.取出item中的count和isSelected的属性
      2.当前的data代表的是一个对象,初始值是一个空的对象，然后按照item.id作为键，值为一个对象，这个对象有两个属性，分别是：count、isSelected，属性值分别是：item.count、item.isSelected
      3.data这个对象会把每一个item中的count、isSelected添加到自身上，然后将data这个对象返回
     */
    id2Data (state) {
      /**
       *
        state.beeCart 是一个数组
        data：初始值的返回项（是一个对象，原因是，reduce的第二个参数是{}）
        item ：指的是state.beeCart这个数组中的每一项（对象）
       */
      return state.beeCart.reduce((data, item) => {
        data[item.id] = {
          count: item.count,
          isSelected: item.isSelected
        }
        // console.log('data1111', data)
        // 返回的是最终的对象
        return data
      }, {})
    },
    /**
     * 作用：判断当前的所有的item.isSelected是否为true，决定全选按钮的显示和隐藏
     * @param {*} state 当前Vuex中状态数据
     */
    isSelectAll (state) {
      return state.beeCart.every(item => item.isSelected)
    }
  }
})
