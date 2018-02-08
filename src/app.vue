<template>
    <div class="app">
        <transition name="apppage" mode="out-in">
            <router-view ref="router"></router-view>
        </transition>
        <notice-box class="notice-box" :noticeList="noticeList"></notice-box>
        <sidebar class="app-sidebar"></sidebar>
    </div>
</template>

<script>
    import noticeBox from './components/NoticeBox.vue'
    import sideBar from './components/Sidebar.vue'
    export default{
        data(){
            return {
                noticeList:[]
            }
        },
        components:{
            "notice-box": noticeBox,
            "sidebar": sideBar
        },
        methods:{
            pushNotice(notice){
                this.noticeList.push(notice)
            }
        }
    }
</script>

<style>    
    .app-sidebar{
        position: absolute;
        right: 0;
        top: 0;
    }
    .apppage-enter-active, .apppage-leave-active {
        transition: all 0.5s;
        opacity: 1;
    }
    .apppage-enter{
        opacity: 0;
        transform:translateX(50%);
    }
    .apppage-leave-to{
        opacity: 0;
        transform:translateX(50%);
    }
    html,body,#app{
        border: 0;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        -webkit-app-region: no-drag;
    }
/* 
    html{
        padding: 5px;
        user-select: none;
        pointer-events: none;
    }

    body{        
        box-shadow: 0px 2px 3px 1px rgba(30, 50, 30,0.4);
    } */

    *{
        font-family: Arial, Helvetica, sans-serif;
    }
    #app{
        padding: 1px;
    }
    .app{
        background-color: hsla(60, 21.7%, 95.5%, 1);
        position: relative;
        padding: 1px;
        border: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        -webkit-app-region: drag;
    }

    .notice-box{
        position: fixed;
        top: 5em;
        width: 100vw;
        height: auto;
        pointer-events: none;
    }
</style>