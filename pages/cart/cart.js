Page({
    data: {
        iscart: false,
        cart: [], //数据  
        count: 1,
        total: 0, //总金额  
        goodsCount: 0 //数量  
    },
    onShow: function () {
        var arr = wx.getStorageSync('cart') || [];
        if (arr.length > 0) {

            for (let i = 0; i < arr.length; i++) {
                this.data.total += (Number(arr[i].price) * Number(arr[i].count));
                this.data.goodsCount += Number(arr[i].count);
            }
            this.setData({
                iscart: true,
                cart: arr,
                total: this.data.total,
                goodsCount: this.data.goodsCount
            });
        }
    },


});