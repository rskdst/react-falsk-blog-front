/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    message:""
 * }
 */
import axios from 'axios'
// 创建一个独立的axios实例
const service = axios.create({
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: 'http://localhost:8080/api',
    // 定义统一的请求头部
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    // 配置请求超时时间
    timeout: 10000,
    // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
    // withCredentials: true
    // Access-Control-Expose-Headers : 'Key'
});
// 请求拦截
service.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    config.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
    return config;
});
// 返回拦截
service.interceptors.response.use((response)=>{
    // 获取接口返回结果
    const res = response.data;

    if (response.headers.get("token")){
        window.localStorage.setItem("token",response.headers.get("token"))
    }

    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if(res.code === 200){
        return res;
    }else{
        // 错误显示可在service中控制，因为某些场景我们不想要展示错误
        // Message.error(res.message);
        return res;
    }
},(error)=>{
    //token验证失败
    if(error.response.status===422||error.response.status===401){
        //请求要求身份验证 跳转到登录页
        window.location = "/login"
    }
    // Message.error('网络请求异常，请稍后重试!');
});
export default service;