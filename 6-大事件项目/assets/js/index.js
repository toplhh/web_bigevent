$(function () {
    // 调用 getUserInfo() 函数获取用户基本信息
    getUserInfo()

    // 为退出按钮绑定点击事件
    $('#btnLogOut').on('click', function () {
        // 1.弹出框询问
        layer.confirm('确认取消?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 点击确认后，清空localStorage的token
            localStorage.removeItem('token')
            console.log('ok')
            // 跳转到登录页面
            location.href = './login.html'
            // 关闭confirm询问框
            layer.close(index);
        });


    })

})

// 获取用户基本信息的函数
function getUserInfo() {
    // 发起ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar（）函数渲染用户头像
            renderAvatar(res.data)
        },

        // complete: function(res) {
        //     console.log(res)
        //     // 在complete回调函数中。可以通过判断res.responseJSON中的status和message来知道是否获取数据成功
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.跳转登录
        //         location.href = './login.html'
        //     }

        // }
    })
}

// 渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户的名字
    let name = user.nickname || user.username
    // 2.将获取到的名字渲染到页面
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染头像
    if (user.user_pic !== null) {
        // 使用图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 使用文字头像
        $('.layui-nav-img').hide()
        // 获取到用户名称的首字母,并转换成大写
        let first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }

}