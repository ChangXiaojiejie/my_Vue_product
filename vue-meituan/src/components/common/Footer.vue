<template>
  <footer>
    <ul>
      <li><a href="javascript:;" class="footer-home ">首页</a></li>
      <li><router-link to="/list" class="footer-menu" :class="{active: $route.path === '/list'}">闪送超市</router-link></li>
      <li><router-link to="/cart" class="footer-cart " :class="{active: $route.path === '/cart'}">购物车
        <span class="footer-cart-num">
          {{$store.getters.total}}
        </span>
      </router-link>
      </li>
      <li><a href="javascript:;" class="footer-mime ">我的</a></li>
    </ul>
  </footer>
</template>

<script>
export default {
  created () {
    // this.getList()
  },
  methods: {
    getList () {
      // console.log('this：', this.$route.path)
    }
  }
}
</script>

<style>
footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4.5rem;
  z-index: 998;
}
footer ul{
  height: 4.5rem;
}
footer ul li{
  float: left;
  width: 25%;
  height: 4.5rem;
  padding: 5px 0px;
  box-sizing: border-box;
}
footer ul li a{
  display: block;
  color: #777;
  text-decoration: none;
  padding-top: 30px;
  background-size: auto 24px;
  background-position: center 0;
  text-align: center;
  font-size: 1.4rem;
  background-repeat: no-repeat;
}
  footer ul li a.footer-home{
    background-image: url('../../assets/images/menu-icon/navs-item-home.png');
  }
  footer ul li a.footer-home.active{
    background-image: url('../../assets/images/menu-icon/navs-item-home-active.png');
  }
  footer ul li a.footer-menu{
    background-image: url('../../assets/images/menu-icon/navs-item-menu.png');
  }
  footer ul li a.footer-menu.active{
    background-image: url('../../assets/images/menu-icon/navs-item-menu-active.png');
  }
  footer ul li a.footer-cart{
    position: relative;
    background-image: url('../../assets/images/menu-icon/navs-item-cart.png');
  }
  footer .footer-cart-num {
    position: absolute;
    width: 1.8rem;
    height: 1.8rem;
    background-color: #ff4400;
    top: -7px;
    left: 57%;
    border-radius: 50%;
    color: #fff;
  }
  footer ul li a.footer-cart.active{
    background-image: url('../../assets/images/menu-icon/navs-item-cart-active.png');
  }
  footer ul li a.footer-mime{
    background-image: url('../../assets/images/menu-icon/navs-item-mine.png');
  }
  footer ul li a.footer-mime.active{
    background-image: url('../../assets/images/menu-icon/navs-item-mine-active.png');
  }

</style>
