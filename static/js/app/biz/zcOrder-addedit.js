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
        search: true
    }, {
        title: "卖家",
        field: "sellUser",
        search: true
    }, {
        title: "交易广告名称",
        field: "adsCode"
    }, {
        title: "交易价格",
        field: "tradePrice"
    }, {
        title: "交易数量",
        field: "count"
    }, {
        title: "交易金额",
        field: "tradeAmount",
        formatter: moneyFormat
    }, {
        title: "手续费",
        field: "fee",
        formatter: moneyFormat
    }, {
        title: "交易虚拟币币种",
        field: "tradeCoin",
        type: "select",
        key: "coin",
        formatter: Dict.getNameForList("tradeCoin"),
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
        field: "bsComment"
    }, {
        title: '备注',
        field: 'remark'
    }];
    var options = {
        fields: fields,
        code: code,
        view: true,
        detailCode: '625266',
    };
    buildDetail(options);

});