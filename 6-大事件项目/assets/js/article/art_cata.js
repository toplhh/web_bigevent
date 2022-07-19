$(function () {
    let layer = layui.layer
    let form = layui.form
    initArtCateList()

    // 获取文章类别
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 为添加按钮绑定点击事件
    let indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })


    // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        // 发起请求提交数据
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                // if (res.status !== 0) {
                //     return layer.msg('新增文章分类失败！')
                // }
                // initArtCateList()
                // layer.msg('新增文章分类成功！')

                // layer.close(indexAdd)
            }

        })
    })

    // 通过代理的形式，为编辑按钮绑定点击事件
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        let id = $(this).attr('data-id')
        // 发起请求
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })

    })

    // 通过代理的方式，为编辑表单绑定提交事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        // 发起请求，获取表单的最新数据
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败！')
                }
                layer.msg('更新成功！')
                // 关闭弹出层
                layer.close(indexEdit)
                initArtCateList()

            }
        })
    })


    // 通过代理的方式，为删除按钮绑定点击事件
    $('body').on('click', '.btn-delete', function () {
        // 获取到id
        let id = $(this).attr('data-id')
        // 弹出层询问
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 发起删除请求
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index)
                    initArtCateList()

                }
            })
        });
    })


})