<template>
    <div class="notice-container">
        <transition-group tag="p" name="notice" mode="out-in">
            <notice class="notice-sub" :autoHide="notice.autoHide" @removeNotice="removeNotice" :index="index" :key="notice" v-for="(notice,index) in noticeList" :text="notice.text"></notice>
        </transition-group>
    </div>    
</template>
<script>
    import notice from './Notice.vue'
    export default {
        components:{
            "notice": notice
        },
        props:{
            noticeList:{
                default:()=>[],
                type:Array
            }
        },
        methods:{
            removeNotice(event,index){
                this.noticeList.splice(index,1)
            }
        }
    }
</script>

<style>    
.notice-sub{
    margin-bottom: 0.5em;
}
.notice-container > p{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
}
.notice-enter-active{
    animation: shownotice 1s;
}

.notice-leave-active{
    transition: all 0.5s;
    position: absolute;
    bottom: 0;
    z-index: -1
}

.notice-leave-to{
    opacity: 0;
    transform: scale(0.95);
}
.notice-move{
    transition: all 0.5s;
}

@keyframes shownotice {
    0% {
        border-radius: 1em;
        overflow: hidden;
        opacity: 0;
        color: transparent;
        width: 0;
        height: 0;
        max-width: 0;
    }
    15%{
        opacity: 1;
        width: 2em;
        height: 2em;
        max-width: 2em;
        border-radius: 1em;
    }
    15%{
        width: auto;
    }
    55%{
        color: transparent;
    }
    85%{
        max-width: 80vw;
    }
    100% {
        color:black
    }
}

</style>
