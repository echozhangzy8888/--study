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
        // http://www.wxapp-union.com/article-1991-1.html 
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
                        "attrValue": "M"
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
        for (let i = 0; i < attrValueList.length; i++) {
            for (let j = 0; j < attrValueList[i].attrValues.length; j++) {
                if (attrValueList[i].attrValueStatus) {
                    attrValueList[i].attrValueStatus[j] = true;
                } else {
                    attrValueList[i].attrValueStatus = [];
                    attrValueList[i].attrValueStatus[j] = true;
                }
            }
        }
        console.log(attrValueList);
        this.setData({
            attrValueList: attrValueList
        });

    },
    selectAttrValue: function (e) {
        /* 
            点选属性值，联动判断其他属性值是否可选 
            { 
            attrKey:'型号', 
            attrValueList:['1','2','3'], 
            selectedValue:'1', 
            attrValueStatus:[true,true,true] 
            } 
            console.log(e.currentTarget.dataset); 
        */
        console.log(e.currentTarget.dataset);
        let attrValueList = this.data.attrValueList;
        let index = e.currentTarget.dataset.index; //属性索引  
        let key = e.currentTarget.dataset.key;
        let value = e.currentTarget.dataset.value;
        if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
            if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
                // 取消选中  
                this.disSelectValue(attrValueList, index, key, value);
            } else {
                // 选中  
                this.selectValue(attrValueList, index, key, value);
            }
        }
    },
    /* 选中 */
    selectValue: function (attrValueList, index, key, value, unselectStatus) {
        // console.log('firstIndex', this.data.firstIndex);  
        let includeGroup = [],curSelected =[];
        if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选  
            var commodityAttr = this.data.commodityAttr;
            // 其他选中的属性值全都置空  
            // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus);  
            for (var i = 0; i < attrValueList.length; i++) {
                for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                    attrValueList[i].selectedValue = '';
                }
            }
            console.log(111)
        } else {
            console.log(222)
            var commodityAttr = this.data.includeGroup;
        }
        // console.log('选中', commodityAttr, index, key, value);  
        for (var i = 0; i < commodityAttr.length; i++) {
            for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
                if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
                    includeGroup.push(commodityAttr[i]);
                }
            }
        }
        attrValueList[index].selectedValue = value;
        // 判断属性是否可选  
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                attrValueList[i].attrValueStatus[j] = false;
            }
        }
        for (var k = 0; k < attrValueList.length; k++) {
            for (var i = 0; i < includeGroup.length; i++) {
                for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
                    if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
                        for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
                            if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                                attrValueList[k].attrValueStatus[m] = true;
                            }
                        }
                    }
                }
            }
        }
        console.log('结果', attrValueList);
        this.setData({
            attrValueList: attrValueList,
            includeGroup: includeGroup
        });
        console.log('includeGroup', includeGroup);

        let count = 0;
        for (let i = 0; i < attrValueList.length; i++) {
            for (let j = 0; j < attrValueList[i].attrValues.length; j++) {
                if (attrValueList[i].selectedValue) {
                    count++;
                    curSelected.push({
                        key:attrValueList[i].attrKey,
                        value: attrValueList[i].selectedValue
                    })
                    break;
                }
            }
        }
        if (count < 2) { // 第一次选中，同属性的值都可选  
            this.setData({
                firstIndex: index,
                curSelected:curSelected
            });
        } else {
            this.setData({
                firstIndex: -1,
                curSelected:curSelected
            });
        }
      console.log(curSelected)
    },
    /* 取消选中 */
    disSelectValue: function (attrValueList, index, key, value) {
        var commodityAttr = this.data.commodityAttr;
        attrValueList[index].selectedValue = '';
        // 判断属性是否可选  
        for (var i = 0; i < attrValueList.length; i++) {
            for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
                attrValueList[i].attrValueStatus[j] = true;
            }
        }
        this.setData({
            includeGroup: commodityAttr,
            attrValueList: attrValueList
        });
        console.log("取消结果",attrValueList)
        for (var i = 0; i < attrValueList.length; i++) {
            if (attrValueList[i].selectedValue) {
                this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
            }
        }
    },
    /* 点击确定 */
    submit: function () {
        var value = [];
        for (var i = 0; i < this.data.attrValueList.length; i++) {
            if (!this.data.attrValueList[i].selectedValue) {
                break;
            }
            value.push(this.data.attrValueList[i].selectedValue);
        }
        if (i < this.data.attrValueList.length) {
            wx.showToast({
                title: '请完善属性',
                icon: 'loading',
                duration: 1000
            })
        } else {
            wx.showToast({
                title: '选择的属性：' + value.join('-'),
                icon: 'sucess',
                duration: 1000
            })
        }


    }

});