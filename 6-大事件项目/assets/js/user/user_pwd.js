$(function () {
    let form = layui.form
    let layer = layui.layer

    // 自定义校验规则
    form.verify({
        // 长度必须在6-12位
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 新密码与原密码不能一致
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },

        // 确认新密码与新密码保持一致
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }

    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 1.阻止表单的默认重置
        e.preventDefault()
        // 2.发起ajax重置请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })



})