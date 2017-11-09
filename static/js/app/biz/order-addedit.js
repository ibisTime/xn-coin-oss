$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var fields = [{
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
    var options = {
        fields: fields,
        code: code,
        detailCode: '802522',
    };
    buildDetail(options);

});