<template>
    <div class="wrapper">
        <div class="login">
            <i class="iconfont icon-icon69"></i>
            <div>
                <input type="text" placeholder="请输入你的账号" v-model="name"/>
                <i class="iconfont icon-zhanghu"></i>
            </div>
            <div>
                <input type="password" placeholder="请输入你的密码" v-model="password" @keydown.enter="confirm(name, password)"/>
                <i class="iconfont icon-yuechi"></i>
            </div>
            <p>{{info}}</p>

            <button @click="confirm(name, password)"><span>注册</span></button>
            <button><router-link :to="{name: 'login'}"><span>登录</span></router-link></button>

        </div>
    </div>
</template>
<script>
    import {_debounce}                  from '../../lib/utils.js'
    import {mapActions, mapMutations}       from 'vuex'
    export default {
        data () {
            return {
                info: '',
                name: '',
                password: ''

            }
        },
        methods: {
            checkName () {
                if (this.name.length > 5) {
                    this.info = '请输入合适长度的用户名'
                }
            },
            ...mapActions(['resgin']),
            ...mapMutations(['add_user']),
            confirm (name, password) {
                this.resgin({name: name, password: password}).then((res) => {
                    this.info = '正在注册中...'
                    this.$router.push({name: 'posts'})
                }).catch((err) => {
                    console.log(err)
                    this.info = '注册失败， 请重新注册'
                })
            }

        },
        watch: {
            name: _debounce(function () {
                if (this.name.length > 5) {
                    this.info = '请输入合适长度的用户名'
                } else {
                    this.info = ''
                }
            }, 500),
            password: _debounce(function () {
                if (this.password.length < 6) {
                    this.info = '请输入长度大于6位的密码'
                } else {
                    this.info = ''
                }
            }, 500)

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrapper {
    .login {
        width: 16.125rem;
        height: 20rem;
        margin: 7rem auto 0;
        text-align: center;
        position: relative;
    .icon-icon69 {
        font-size: 3.75rem;
        color: red;
    }
    div {
        width: 100%;
        margin: 0 auto;
        position: relative;
    i {
        color: darkturquoise;
        font-size: 1.875rem;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        transition:  0.5s;
    }
    }
    input {
        width: 12.5rem;
        height: 1.875rem;
        display: block;
        margin-top: 2.5rem;
        margin-bottom: 1.25rem;
        margin-left: 3rem;
        outline: none;
        border: none;
        border-bottom: 0.1875rem solid darkturquoise;
        background: transparent;
        color: #fff;
        font-size: 1rem;
        padding-left: 0.625rem;
    &:focus + i {
         color: #ffc520;
     }
    }
    button {
        width: 12.5rem;
        padding-left: 0;
        margin-top: 1.25rem;
        position: relative;
        left: 1.25rem;
        text-align: center;
        background: darkturquoise;
    }
    }
    }

    p {
        color: #ffffff;
        width: 100%;
        height: 1.25rem;
    }
    span{
        color:black;
    }
    @media screen and (max-width: 440px) {
        .login {
            margin-top: 2rem !important;
        }
    }
</style>
