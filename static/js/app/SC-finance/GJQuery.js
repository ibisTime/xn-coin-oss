$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "交易ID",
        field: 'transactionid'
    }, {
        field: 'value',
        title: '交易数量',
        formatter: moneyFormatSC
    }, {
        field: 'from',
        title: '来方归集地址',
    }, {
        title: "去方归集地址",
        field: "to"
    }, {
        title: "确认高度",
        field: "confirmationheight"
    }, {
        title: "确认时间",
        field: "confirmationtimestamp",
        formatter: dateTimeFormat
    }, {
        field: 'createDatetime',
        title: '归集时间',
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