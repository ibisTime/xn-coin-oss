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
        field: 'code',
        title: '编号',
        search: true
    }, {
        title: "买家",
        field: "buyUser",
        formatter: function(v, data) {
            if (data.buyUserInfo) {
                return data.buyUserInfo.mobile + '(' + data.buyUserInfo.nickname + ')'
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
    }, {
        title: "卖家",
        field: "sellUser",
        formatter: function(v, data) {
            if (data.sellUserInfo) {
                return data.sellUserInfo.mobile + '(' + data.sellUserInfo.nickname + ')'
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
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
        title: "交易价格",
        field: "tradePrice"
    }, {
        title: "交易数量",
        field: "countString",
        formatter: function(v, data){
    		return moneyFormat(v,'',data.tradeCoin)+getCoinName(data.tradeCoin);
        }
    }, {
        title: "交易金额",
        field: "tradeAmount"
    }, {
        title: "手续费",
        field: "feeString",
        formatter: function(v, data){
    		return moneyFormat(v,'',data.tradeCoin)+getCoinName(data.tradeCoin);
        }
    }, {
        title: "状态",
        field: "status",
        type: "select",
        data: {
            "0": "待支付",
            "1": "已支付",
            "2": "已释放待评价",
            "5": "仲裁中",
        },
    }, {
        title: "状态",
        field: "statusList",
        type: "select",
        data: {
            "0": "待支付",
            "1": "已支付",
            "5": "仲裁中",
        },
        visible: false,
        search: true
    }, {
        title: "交易来源",
        field: "orgin",
        type: "select",
        data: {
            "0": "应用下单",
            "1": "机器人下单",
        }
    }, {
        field: 'markConfirmDatetime',
        title: '最迟打款确认时间',
        formatter: dateTimeFormat,
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '625250',
        searchParams: {
            statusList: ["0", "1", "5"],
            currencyList: currencyList,
            companyCode: OSS.company
        },
        beforeSearch:function(data){
        	if(!Array.isArray(data.statusList)){
        		var statusList = []
	        	statusList.push(data.statusList)
	        	data.statusList = statusList;
        	}
        	return data;
        }
    });
    
    },hideLoading);

});