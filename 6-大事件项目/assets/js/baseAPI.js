// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，乐意拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {{
    // 在发起真正的Ajax请求之前，同一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    
    // console.log(11111);
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        // console.log(22222);
        // console.log(localStorage.getItem('token'));
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log(res)
        // 在complete回调函数中。可以通过判断res.responseJSON中的status和message来知道是否获取数据成功
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.跳转登录
            location.href = './login.html'
        }

    }




}})