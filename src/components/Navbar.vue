<template>
    <nav v-click-outside="onClickOutside">
        <v-app-bar app flat id="app-bar">
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-bold">村镇社区宜居单元</span>
                <span class="font-weight-light">空间优化与设计</span>
                
                <span class="font-weight-light"> Spatial optimization and design</span>
            </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="grey">
            <span>Sign Out</span>
            <v-icon right>mdi-account-arrow-right-outline</v-icon>
        </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <v-subheader >Applications</v-subheader>
                <v-list-item-group>
                    <v-list-item v-for='link in links' :key='link.text' router :to='link.route'>
                        <v-list-item-icon>
                            <v-icon >{{link.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >{{link.text}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            drawer: false,
            links:[
                // {icon:'mdi-home',text:'Home',route:'/home'},
                // {icon:'mdi-view-dashboard-variant',text:'Dashboard',route:'/dashboard'},
                {icon:'mdi-folder-multiple',text:'Projects',route:'/myprojects'},
                // {icon:'mdi-account-multiple',text:'Team',route:'/team'},
                {icon:'mdi-information',text:'About',route:'/about'}
            ]
        }
    },
    methods:{
        onClickOutside(){
            if(this.drawer == true) this.drawer = !this.drawer
        }
    }
}
</script>