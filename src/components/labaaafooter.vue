<template>
    <div>
        <v-footer  class="ma-0 pa-0" id="labaaafooter" :style="{position:'absolute',bottom:0,width:screenWidth+'px'}">
            <v-col class="text-center" cols="12">
            <strong>lab</strong>aaa · {{ new Date().getFullYear() }} · Bran
            </v-col>
        </v-footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            screenWidth:null,
        }
    },
    mounted(){
        this.screenWidth = document.querySelector('#app-bar').clientWidth //mounted之后，首先就计算一次，这样就好了
        let that = this
        window.onresize = () => {
            return (() => {
                that.screenWidth = document.querySelector('#app-bar').clientWidth
            })()
        }
    }
}
</script>

<style scoped>
</style>