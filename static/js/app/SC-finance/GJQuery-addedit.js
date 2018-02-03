$(function() {
    var code = getQueryString('code');


    var fields = [{
        field: 'amountString',
        title: '交易数量',
        formatter: moneyFormatSC
    }, {
        title: "矿工费",
        field: 'txFeeString',
        formatter: moneyFormatSC
    }, {
        field: 'fromAddress',
        title: '来方归集',
    }, {
        title: "去方归集地址",
        field: "toAddress"
    }, {
        title: "交易HASH",
        field: 'txHash'
    }, {
        title: "关联订单号",
        field: 'refNo'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "广播中",
            "1": "广播成功",
            "2": "广播失败"
        }
    }, {
        field: 'ethDatetime',
        title: '网络记账时间',
        formatter: dateTimeFormat
    }, {
        field: 'createDatetime',
        title: '归集时间',
        formatter: dateTimeFormat
    }];

    var options = {
        fields: fields,
        detailCode: '625106',
        code: code,
        view: true
    };

    buildDetail(options);

})