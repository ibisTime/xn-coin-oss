$(function() {
    var code = getQueryString('code');
    // var tradeType = getQueryString('tradeType');
    var weekDict = {
        "1": "周一",
        "2": "周二",
        "3": "周三",
        "4": "周四",
        "5": "周五",
        "6": "周六",
        "7": "周日"
    };

    var view = !!getQueryString('v');
    var fields = [{
        field: 'code1',
        title: '编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        title: "发布人",
        field: 'userId',
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile + '(' + data.user.nickname + ')';
            }
        }
    }, {
        title: "币种",
        field: "tradeCoin",
        formatter: getCoinName
    } , {
        title: "购买总量",
        field: "totalCountString",
        formatter: function(v, data){
    		return moneyFormat(v,'',data.tradeCoin);
        }
    }, {
        field: "leftCountString",
        title: "剩余可购买",
        formatter: function(v, data){
    		return moneyFormat(v,'',data.tradeCoin);
        }
    }, {
        title: "行情价格",
        field: "marketPrice",
    }, {
        title: "溢价率",
        field: "premiumRate",
        readonly: true
    }, {
        title: "保护价",
        field: "protectPrice",
    }, {
        title: "单笔最大量",
        field: "maxTrade"
    }, {
        title: "单笔最小量",
        field: "minTrade"
    }, {
        title: "可交易的对象",
        field: "onlyTrust",
        type: "select",
        data: {
            "0": "任何人都可以交易",
            "1": "只有受信任的人可以交易"
        },
        search: true
    }, {
        field: 'payType',
        title: '支付方式',
        type: 'select',
        data: {
            "0": "支付宝",
            "1": "微信",
            "2": "银行卡转账"
        },
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "ads_status",
        formatter: Dict.getNameForList("ads_status"),
        search: true
    }, {
        field: 'displayTime',
        title: '广告展示时间:',
        type: 'o2m',
        columns: [{
            field: 'week',
            title: '周几',
            formatter: function(v, data) {
                return weekDict[v]
            }
        }, {
            field: 'startTime',
            title: '开始时间',
            formatter: function(v, data) {
            	if(v<10){
            		return "0" + v + ":00";
            	}else if(v==24&&data.endTime=='24'){
            		return "关闭";
            	}else {
            		return v + ":00";
            	}
            }
        }, {
            field: 'endTime',
            title: '结束时间',
            formatter: function(v, data) {
            	if(v<10){
            		return "0" + v + ":00";
            	}else if(v==24&&data.startTime!='24'){
            		return "23:59";
            	}else if(v==24&&data.startTime=='24'){
            		return "关闭";
            	}else{
            		return v + ":00";
            	}
            }
        }]
    }, {
        title: "广告留言",
        field: "leaveMessage"
    }, {
        title: '支付超时时间（分）',
        field: "payLimit"
    }, {
        title: '创建时间',
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: '最后更新时间',
        field: "updateDatetime",
        formatter: dateTimeFormat
    }];
    var options = {
        fields: fields,
        code: {
            tradeType: "0",
            adsCode: code
        },
        view: true,
        detailCode: '625226',
    };
    buildDetail(options);

});