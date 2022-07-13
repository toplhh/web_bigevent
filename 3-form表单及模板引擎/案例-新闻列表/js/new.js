$(function () {
    // 给时间补0的函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else{
            return n
        }
    }



    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr)

        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    // 获取新闻列表数据的函数
    function getNewList() {
        $.get(
            'http://www.liulongbin.top:3006/api/news',
            function (res) {
                // 通过status的数值判断是否获取成功
                if (res.status !== 200) {
                    return alert('获取新闻列表失败！')
                }
                for (let i = 0; i < res.data.length; i++) {
                    // 把每一项tags属性，从字符串改造成字符串的数组
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                // console.log(res)
                // 将数据传给模板
                let htmlStr = template('tpl-news', res)
                console.log(res.data)
                // 将模板的返回值渲染到页面上
                $('#news-list').html(htmlStr)
            }
        )
    }

    getNewList()
})