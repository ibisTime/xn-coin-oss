$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "币种",
        field: "currency",
        type: "select",
        key: "currency",
        formatter: Dict.getNameForList("currency")
    }, {
        title: "汇率",
        field: "rate"
    }];
    buildList({
        columns: columns,
        pageCode: '625282',
        searchParams: {
            currency: 'HKD',
            companyCode: OSS.company
        },
    });
});