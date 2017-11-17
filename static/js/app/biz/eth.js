$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: '',
        title: '日期',
        formatter: dateTimeFormat
    }, {
        title: "1eth",
        field: ""
    }, {
        title: "汇率",
        field: "rate"
    }, {
        title: "类型",
        field: "currency",
        type: "select",
        key: "currency",
        formatter: Dict.getNameForList("currency"),
        search: true
    }];
    buildList({
        columns: columns,
        pageCode: '625280',
        searchParams: {
            currency: 'USD',
            companyCode: OSS.company
        },
    });
});