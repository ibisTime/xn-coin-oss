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
        title: "CNY",
        field: ""
    }, {
        title: "类型",
        field: ""
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