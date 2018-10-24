$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'amountString',
        title: '交易数量',
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
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "等待归集",
            "1": "获取矿工费广播中",
            "2": "归集广播中",
            "3": "归集成功",
            "4": "归集失败"
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
        	currency:'SC',
            companyCode: OSS.company
        }
    });


});