var app = getApp()
Page({
    data: {
        goodslist: [{
                id: "001",
                imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
                name: "女装T恤中长款大码摆裙春夏新款",
                price: "65.00"
            },
            {
                id: "002",
                imgUrl: "http://img4.imgtn.bdimg.com/it/u=1004404590,1607956492&fm=23&gp=0.jpg",
                name: "火亮春秋季 男青年修身款圆领男士T恤",
                price: "68.00"
            },
            {
                id: "003",
                imgUrl: "http://img1.imgtn.bdimg.com/it/u=2305064940,3470659889&fm=23&gp=0.jpg",
                name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
                price: "86.00"
            },
            {
                id: "004",
                imgUrl: "http://img4.imgtn.bdimg.com/it/u=3986819380,1610061022&fm=23&gp=0.jpg",
                name: "男运动上衣春季上新品 上衣流行装青年",
                price: "119.00"
            },
            {
                id: "005",
                imgUrl: "http://img1.imgtn.bdimg.com/it/u=3583238552,3525141111&fm=23&gp=0.jpg",
                name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
                price: "69.00"
            },
            {
                id: "006",
                imgUrl: "http://img2.imgtn.bdimg.com/it/u=1167272381,3361826143&fm=23&gp=0.jpg",
                name: "新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
                price: "86.00"
            },
            {
                id: "007",
                imgUrl: "http://img0.imgtn.bdimg.com/it/u=789486313,2033571593&fm=23&gp=0.jpg",
                name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
                price: "119.00"
            },
            {
                id: "008",
                imgUrl: "http://img2.imgtn.bdimg.com/it/u=3314044863,3966877419&fm=23&gp=0.jpg",
                name: "男运动上衣春季上新品 上衣流行装青年",
                price: "69.00"
            },
        ]
    },
    onLoad: function (options) {

    },
    addcart: function (e) {
        console.log(e.target.id)
        for (let i = 0; i < this.data.goodslist.length; i++) {
            if (this.data.goodslist[i].id == e.target.id) {
                this.data.goodslist[i].count = 1;
                let arr = wx.getStorageSync('cart') || [];

                if (arr.length > 0) {
                    for (let j in arr) {
                        if (arr[j].id == e.target.id) {
                            arr[j].count = arr[j].count + 1;
                            // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
                            try {
                                wx.setStorageSync('cart', arr);
                                console.log("aaa")
                                wx.showToast({
                                    title: '加购成功！',
                                    icon: 'success',
                                    duration: 2000
                                })
                            } catch (err) {
                                console.log(err)
                            }
                            // 返回（在if内使用return，跳出循环节约运算，节约性能）  
                            return;
                        }
                    }
                    //遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
                    arr.push(this.data.goodslist[i])
                } else {
                    arr.push(this.data.goodslist[i])
                }

                //最后，把购物车数据，存放入缓存  
                try {
                    wx.setStorageSync('cart', arr);
                    console.log("ccc")
                    wx.showToast({
                        title: '加购成功！',
                        icon: 'success',
                        duration: 2000
                    })
                    // 返回（在if内使用return，跳出循环节约运算，节约性能）  
                    return;
                } catch (err) {
                    console.log(err)
                }
            }
        }
    },
    linkDetail: function (e) {
        console.log(e.currentTarget.id)
        wx.navigateTo({
            url: '../taobaomenu/taobaomenu'
        })
    }

});