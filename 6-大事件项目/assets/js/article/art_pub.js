$(function () {
    let layer = layui.layer
    let form = layui.form

    initCate()
    // 初始化富文本编辑器
    initEditor()

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }
                // 使用模板引擎渲染分类
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        // 获取用户选择的文件
        let file = e.target.files
        // 判断用户是否选择了文件
        if (file.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 定义文章 的状态
    let art_status = '已发布'
    // 监听用户是否点击了 存为草稿  按钮
    $('#btnSave2').on('click', function () {
        art_status = '草稿'
        // console.log('ok')
    })

    // 监听表单的提交事件
    $('#form-pub').on('submit', function (e) {
        // 1.阻止表单的默认提交行为
        e.preventDefault()


        // 2.基于form表单，快速创建一个FormData对象
        let fd = new FormData($(this)[0])
        // 3.将文章的发布状态，存储到fd中
        fd.append('state', art_status)

        // 4.将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5.将文件对象，存储到fd中
                fd.append('cover_img', blob)

                // 6.发起ajax请求
                publishArticle(fd)
            })

    })

    // 定义发布文章 的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = './art_list.html'
            }
        })
    }



})