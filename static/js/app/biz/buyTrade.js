$(function() {
	getCoinReq().then(function(data){
		var currencyData = {};
		var currencyList = []
		for(var i = 0; i < data.length ; i ++){
			currencyData[data[i].symbol] = data[i].cname;
			currencyList.push(data[i].symbol)
		}
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "发布人",
        field: 'userId',
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile + '(' + data.user.nickname + ')';
            }
        },
        search: true
    },{
        field: "tradeCoin",
        title: "币种",
        type: 'select',
        data: currencyData
    } ,{
        field: "coin",
        title: "币种",
        type: 'select',
        data: currencyData,
        search: true,
        visible: false
    } ,{
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
        field: "premiumRate"
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
        title: '最后更新时间',
        field: "updateDatetime",
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '625227',
        searchParams: {
            tradeType: '0',
            currencyList: currencyList,
            companyCode: OSS.company
        },
    });

    },hideLoading);
});