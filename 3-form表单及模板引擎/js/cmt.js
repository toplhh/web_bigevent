$(function () {
    // 获取评论列表
    function getCommentList() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            success: function (res) {
                // 判断是否获取评论列表chenggong
                if (res.status !== 200) return alert('获取评论列表失败！')
                let rows = []
                $.each(res.data, function (index, item) {
                    rows.push(`
                        <li class="list-group-item">
                            <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
                            <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
                            ${item.content}
                        </li>
                    `)
                })
                $('#list-group').empty().append(rows)
            }
        })
    }
    getCommentList()

     // 监听按钮提交事件，并阻止默认行为
     $('#formAddCmt').submit(function (e) {
        e.preventDefault()
        // 快速获取表单的所有值
        let data = $(this).serialize()
        // 请求发送评论的接口
        $.post(
            'http://www.liulongbin.top:3006/api/addcmt',
            data,
            function (res) {
                // 判断是否发表成功 201
                if (res.status !== 201) {
                    return alert('发表评论失败！')
                }
                // 重新获取评论列表
                getCommentList()
                // 清空表单值  一次清空所有值  dom对象.reset（）
                // [0]可以将jQuery对象转换为dom对象
                $('#formAddCmt')[0].reset()
            }
        )

    })

})





