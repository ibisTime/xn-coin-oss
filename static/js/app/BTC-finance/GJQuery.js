$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'amountString',
        title: '交易数量',
        formatter: moneyFormatBTC
    }, {
        title: "归集去方地址",
        field: "toAddress"
    }, {
        title: "交易HASH",
        field: 'txHash'
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
        field: 'createDatetime',
        title: '归集时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802115',
        searchParams: {
        	currency:'BTC',
            companyCode: OSS.company
        }
    });


});