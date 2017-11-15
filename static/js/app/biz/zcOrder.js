$(function() {

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
        search: true
    }, {
        title: "卖家",
        field: "sellUser",
        search: true
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
        title: "状态",
        field: "status",
        type: "select",
        key: "trade_order_status",
        formatter: Dict.getNameForList("trade_order_status"),
        search: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '625265',
        searchParams: {
            status: '5',
            companyCode: OSS.company
        },
    });

});