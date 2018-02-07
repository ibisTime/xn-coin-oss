$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "交易编号",
        field: 'txHash'
    }, {
        title: "归集订单编号",
        field: 'code'
    }, {
        field: 'amountString',
        title: '归集数量',
        formatter: moneyFormatSC
    }, {
        field: 'fromAddress',
        title: '来方归集地址',
    }, {
        title: "去方归集地址",
        field: "toAddress"
    }, {
        field: 'txFeeString',
        title: '矿工费',
        formatter: moneyFormatSC
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "广播中",
            "1": "广播成功",
            "2": "广播失败"
        },
        search: true
    }, {
        title: "区块生成时间",
        field: "scDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'createDatetime',
        title: '归集发起时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802165',
        searchParams: {
            companyCode: OSS.company
        }
    });


});