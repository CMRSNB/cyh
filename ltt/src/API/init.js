import store from "../store/index";
export default function(){
return new Promise((res,rej)=>{
let token=localStorage.getItem('token')
let tokenExpired=localStorage.getItem('tokenExpired')
if(token){
    let now=Date.now()
if(now>=tokenExpired){
localStorage.clear()
res()
}else{
    store.dispatch('getuser',token).then((abc)=>{
    res()
   })//有token未过期
}//有token已过期


}
else{
    res()
}//没有token
})
}
