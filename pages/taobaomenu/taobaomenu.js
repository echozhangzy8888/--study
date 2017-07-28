Page({
    data: {
        menu: {
            imgUrls: [
                '/images/TB19BluIVXXXXX6XpXXN4ls0XXX-183-129.png',
                '/images/TB1FDOHLVXXXXcZXFXXXXXXXXXX-183-129.png',
                '/images/TB1PlmNLVXXXXXEXFXXXXXXXXXX-183-129.png',
                '/images/TB1RN0HMFXXXXXNXpXXXXXXXXXX-183-129.png',
                '/images/TB1exaOLVXXXXXeXFXXXXXXXXXX-183-129.png',
                '/images/TB1GzMJLXXXXXXoXXXXXXXXXXXX-183-129.png',
                '/images/TB1Ewu2KVXXXXXkapXXN4ls0XXX-183-129.png',
                '/images/TB1cniBJpXXXXataXXXXXXXXXXX-183-129.png',
                '/images/TB1caopLVXXXXaDaXXXXXXXXXXX-183-129.png',
                '/images/TB1c1FMIpXXXXawXpXXN4ls0XXX-183-129.png'
            ],
            descs: [
                '聚划算',
                '天猫',
                '天猫国际',
                '外卖',
                '天猫超市',
                '充值中心',
                '阿里旅行',
                '领金币',
                '到家',
                '分类'
            ]
        },
        // input默认是1  
        num: 1,
        // 设置样式名  
        minusStatus: 'disabled',

        //商品属性值联动选择,数据结构：以一组一组来进行设定 
        firstIndex: -1,
        commodityAttr: [{
                priceId: 1,
                price: 35.0,
                "stock": 8,
                "attrValueList": [{
                        "attrKey": "型号",
                        "attrValue": "2"
                    },
                    {
                        "attrKey": "颜色",
                        "attrValue": "白色"
                    },
                    {
                        "attrKey": "大小",
                        "attrValue": "小"
                    },
                    {
                        "attrKey": "尺寸",
                        "attrValue": "S"
                    }
                ]
            },
            {
                priceId: 2,
                price: 35.1,
                "stock": 9,
                "attrValueList": [{
                        "attrKey": "型号",
                        "attrValue": "1"
                    },
                    {
                        "attrKey": "颜色",
                        "attrValue": "黑色"
                    },
                    {
                        "attrKey": "大小",
                        "attrValue": "小"
                    },
                    {
                        "attrKey": "尺寸",
                        "attrValue": "M"
                    }
                ]
            },
            {
                priceId: 3,
                price: 35.2,
                "stock": 10,
                "attrValueList": [{
                        "attrKey": "型号",
                        "attrValue": "1"
                    },
                    {
                        "attrKey": "颜色",
                        "attrValue": "绿色"
                    },
                    {
                        "attrKey": "大小",
                        "attrValue": "大"
                    },
                    {
                        "attrKey": "尺寸",
                        "attrValue": "L"
                    }
                ]
            },
            {
                priceId: 4,
                price: 35.2,
                "stock": 10,
                "attrValueList": [{
                        "attrKey": "型号",
                        "attrValue": "1"
                    },
                    {
                        "attrKey": "颜色",
                        "attrValue": "绿色"
                    },
                    {
                        "attrKey": "大小",
                        "attrValue": "大"
                    },
                    {
                        "attrKey": "尺寸",
                        "attrValue": "L"
                    }
                ]
            }
        ],
        attrValueList: []
    },

    bindMinus: function () {
        let num = this.data.num;
        num > 1 && (num--);
        let minusStatus = num <= 1 ? 'disabled' : 'normal';
        this.setData({
            num: num,
            minusStatus: minusStatus
        })
    },
    bindPlus: function () {
        let num = this.data.num;
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        let minusStatus = num < 1 ? 'disabled' : 'normal';
        this.setData({
            num: num,
            minusStatus: minusStatus
        })
    },
    bindManual: function (e) {
        let num = e.detail.value;
        this.setData({
            num: num
        });
    },
    onShow: function () {
        this.setData({
            includeGroup: this.data.commodityAttr
        });

        this.distachAttrValue(this.data.commodityAttr);


    },
    /* 获取数据 */
    distachAttrValue: function (commodityAttr) {
        /** 
      将后台返回的数据组合成类似 
      { 
        attrKey:'型号', 
        attrValueList:['1','2','3'] 
      } 
      */
        // 把数据对象的数据（视图使用），写到局部内  
        let attrValueList = this.data.attrValueList;
        let tempKey = [];
        let tempObj = {};
// http://www.wxapp-union.com/article-1991-1.html
        for (let i = 0; i < commodityAttr.length; i++) {
            for (let j = 0; j < commodityAttr[i].attrValueList.length; j++) {
                tempKey.push(commodityAttr[i].attrValueList[j].attrKey);
                if (!tempObj[commodityAttr[i].attrValueList[j].attrKey]) {
                    tempObj[commodityAttr[i].attrValueList[j].attrKey] = [];
                    tempObj[commodityAttr[i].attrValueList[j].attrKey].push(commodityAttr[i].attrValueList[j].attrValue);
                } else {
                    tempObj[commodityAttr[i].attrValueList[j].attrKey].push(commodityAttr[i].attrValueList[j].attrValue);
                }

            }
        }
        let keyname = new Set(tempKey);
        for (let i of keyname) {
            attrValueList.push({
                attrKey: i,
                attrValues: [...new Set(tempObj[i])]
            })
        }
        console.log(attrValueList);
        this.setData({
            attrValueList: attrValueList
        });

    }

});