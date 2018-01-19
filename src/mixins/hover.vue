<script>
    export default {
        watch:{
            isHover(){
                if(this.isHover == true){
                    this.$emit('hoverin')
                }
                else {
                    this.$emit('hoverout')
                }
            }
        },
        data() {
            return {
                isHover: false
            }
        },
        methods: {
            setHover(hover) {
                this.isHover = hover
                // console.log((this.isHover ? "在！" : "不在！") , this)
            }
        }
    }
</script>