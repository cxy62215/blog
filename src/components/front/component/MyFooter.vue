<template>
    <div>
      <p> <span>友情链接：</span>
        <a href="https://baidu.com">百度</a>
        <a href="http://www.sina.com.cn/">新浪</a>
        <a href="http://www.ifeng.com/">凤凰网</a>
      </p>
        <p>&copy; 2017 Powered by Vue. Designed by salted    <router-link :to="{name: 'login'}" tag="span" class="login">fish</router-link></p>
    </div>
</template>

<script>
export default {}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .iconfont {
       font-size: 1.875rem;
       color: #fff;
       margin-right: 0.625rem;
    }
    .icon-github:hover {
             color: royalblue;
    }
    .icon-cion15 {
        font-size: 1.625rem;
    }
    .icon-cion15:hover {
        color: deepskyblue;
    }
    .icon-iconsf:hover {
        color: green;
    }
    div {
        text-align: center;
        padding-top: 0.625rem;
        line-height: 2.5rem;
        width: 100%;
        background: rgba(55, 57, 65, 0.5);
    }
    p {
        text-align: center;
        color: #ffffff;
        font-size: 1rem;
    }
    span.login {
        cursor: pointer;
        color: #ffffff;
    }
  span{
    color: green;
  }
</style>
