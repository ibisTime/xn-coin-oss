$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var fields = [{
        field: 'code1',
        title: '编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        title: "买家",
        field: "buyUser",
        formatter: function(v, data) {
            if (data.buyUserInfo) {
                return data.buyUserInfo.mobile + '(' + data.buyUserInfo.nickname + ')'
            }
        },
        search: true
    }, {
        title: "卖家",
        field: "sellUser",
        formatter: function(v, data) {
            if (data.sellUserInfo) {
                return data.sellUserInfo.mobile + '(' + data.sellUserInfo.nickname + ')'
            }
        },
        search: true
    }, {
        title: "广告编号",
        field: "adsCode"
    }, {
        title: "交易价格",
        field: "tradePrice"
    }, {
        title: "交易数量",
        field: "countString",
        formatter: function(v, data){
        	if(data.tradeCoin=="SC"){
        		return moneyFormatSC(v)+ "云储币";
        	}else if(data.tradeCoin=="BTC"){
        		return moneyFormatBTC(v)+ "比特币";
        	}else if(data.tradeCoin=="ETH"){
        		return moneyFormat(v)+ "以太币";
        	}
        }
    }, {
        title: "交易金额",
        field: "tradeAmount"
    }, {
        title: "手续费",
        field: "feeString",
        formatter: function(v, data){
        	if(data.tradeCoin=="SC"){
        		return moneyFormatSC(v);
        	}else if(data.tradeCoin=="BTC"){
        		return moneyFormatBTC(v);
        	}else if(data.tradeCoin=="ETH"){
        		return moneyFormat(v);
        	}
        }
    }, {
        title: "交易虚拟币币种",
        field: "tradeCoin",
        type: "select",
        key: "coin",
        formatter: Dict.getNameForList("coin"),
        search: true
    }, {
        title: "交易法币币种",
        field: "tradeCurrency",
        type: "select",
        key: "currency",
        formatter: Dict.getNameForList("currency"),
        search: true
    }, {
        title: "支付方式",
        field: 'payType',
        type: 'select',
        type: "select",
        key: "pay_type",
        formatter: Dict.getNameForList("pay_type"),
        search: true
    }, {
        title: "下单时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "支付失效时间",
        field: "invalidDatetime",
        formatter: dateTimeFormat
    }, {
        title: "买家标记时间",
        field: "markDatetime",
        formatter: dateTimeFormat
    }, {
        title: "卖家释放时间",
        field: "releaseDatetime",
        formatter: dateTimeFormat
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "trade_order_status",
        formatter: Dict.getNameForList("trade_order_status"),
        search: true
    }, {
        title: "买家对卖家的评价",
        field: "bsComment",
        type: "select",
        key: "comment_result",
        formatter: Dict.getNameForList("comment_result"),
    }, {
        title: "卖家对买家的评价",
        field: "sbComment",
        type: "select",
        key: "comment_result",
        formatter: Dict.getNameForList("comment_result"),
    }, {
        title: '备注',
        field: 'remark'
    }];
    var options = {
        fields: fields,
        code: code,
        view: true,
        detailCode: '625251',
    };
    buildDetail(options);

});