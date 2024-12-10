//Pinia 用户使用方法
import { defineStore } from "pinia"
export const userStore = defineStore({
    id:'user',
    //data
    state:()=>{
        return {
            token:localStorage.getItem('token')|| '',
            userInfo:localStorage.getItem('userInfo')||{}
        }
    },
    //function
    actions:{
        setUserInfo(data:any){
            this.token = data.token
            this.userInfo = data.user_info
            localStorage.setItem('token',this.token)
            localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
        }
    }
})