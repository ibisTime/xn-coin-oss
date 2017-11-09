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
        title: "状态",
        field: "status",
        type: "select",
        key: "",
        formatter: Dict.getNameForList(""),
        search: true
    }, {
        title: "交易金额",
        field: "",
        formatter: moneyFormat
    }, {
        title: "交易数量",
        field: ""
    }, {
        title: "交易价格",
        field: ""
    }, {
        title: "买家",
        field: ""
    }, {
        title: "卖家",
        field: ""
    }];
    buildList({
        columns: columns,
        pageCode: '',
        searchParams: {
            // type: 'X',
            companyCode: OSS.company
        },
    });

});