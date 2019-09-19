import Vue from 'vue'
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
const store = new Vuex.Store({
    state: {
        LOADING: false
    },
    mutations: {
        showLoading(state){
          this.state.LOADING = true    
        },
        hideLoading (state) {
          this.state.LOADING = false
        }
    }
})
export default store