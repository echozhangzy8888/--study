Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
        curIndex: 0
    },
    onLoad: function (options) {
        this.setData({
            title: options.title
        });
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList',
            method: 'GET',
            header: {
                'Accept': 'application/json'
            },
            success: (res) => {

                this.setData({
                    navLeftItems: res.data,
                    navRightItems: res.data
                })
                this.isResEmpty()
            }
        })
    },
    switchRightTab: function (e) {
        let id = e.target.dataset.id,
            index = parseInt(e.target.dataset.index);
        this.setData({
            curNav: id,
            curIndex: index
        })
         this.isResEmpty()
    },
    isResEmpty: function () {
        let totalItemInfo = this.data.navRightItems[this.data.curIndex].tree.nodes;
        let totalItem = []
        console.log(this.data.navRightItems[this.data.curIndex].tree)
        console.log(this.data.navRightItems[this.data.curIndex].tree.nodes)
        for (let item of totalItemInfo) {
            totalItem.push(...item.tree.nodes)
        }
         console.log(totalItem)

       totalItem.length == 0 && (this.data.navRightItems[this.data.curIndex].tree.isEmptyNodes = true)
     
    }
});