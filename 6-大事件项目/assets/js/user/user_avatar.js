$(function () {
    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 为上传文件框绑定  change  事件
    $('#file').on('change', function (e) {
        // 获取用户选择的图片
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择图片！')
        }
        // 1.拿到用户选择的文件
        let file = e.target.files[0]
        // 2.创建一个URL
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#btnUpLoad').on('click', function () {
        // 1.获取用户上传的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2.调用接口发起请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.masg('更新头像失败！')
                }

                layer.msg('更新头像成功！')
                window.parent.getUserInfo()
            }
        })



    })




})