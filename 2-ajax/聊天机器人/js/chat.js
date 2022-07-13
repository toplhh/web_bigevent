$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定点击事件
    $('#btnSend').on('click', function () {
        // 获取文本框的值
        let text = $('#ipt').val().trim()
        // 判断其长度是否为0
        if (text.length <= 0) return alert('发送内容不能为空')

        // 若不为0，则追加到聊天框里
        $('#talk_list').append(`
            <li class="right_word">
                <img src="img/person02.png" /> <span>${text}</span>
            </li>
        `)
        // 将输入框的val设置为空字符串
        $('#ipt').val('')
        // 每追加一次内容，就要重置滚动条的位置
        resetui()
        // 获取聊天机器人的消息
        getMsg(text)


    })

    // 获取聊天机器人的消息
    function getMsg(text) {
        // 发起请求
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // 判断是否成功收到机器人返回的消息
                if (res.message === 'success') {
                    let msg = res.data.info.text
                    // console.log(res)
                    // 渲染到页面中
                    $('#talk_list').append(`
                        <li class="left_word">
                            <img src="img/person01.png" /> <span>${msg}</span>
                        </li>
                    `)
                    // 重置滚动条的位置
                    resetui()
                    // 将文字转换为语音
                    getVoice(msg)
                }
            }
        })
    }

    // 把文字转换为语音进行自动播放
    function getVoice(text) {
        // 发送get请求
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // 判断是否成功
                // console.log(res.voiceUrl)
                if (res.status === 200) {
                    // 给audio添加属性值，播放语音
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }

    // 为文本框绑定回车键触发点击事件
    $('#ipt').on('keyup', function(e) {
        // console.log(e.keyCode)
        if (e.keyCode === 13) {
            $('#btnSend').click()
        }
    })
})