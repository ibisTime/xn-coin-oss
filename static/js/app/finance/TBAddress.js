$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "启用",
            "2": "弃用"
        },
        search: true
    }, {
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: "使用次数",
        field: "useCount"
    }, {
//      field: 'initialBalanceString',
//      title: '初始金额',
//      formatter: moneyFormat
//  }, {
        field: 'useAmountString',
        title: '提币金额',
        formatter: moneyFormat
    }, {
        title: "余额",
        field: "balanceString",
        formatter: moneyFormat
    }];
    buildList({
        columns: columns,
        pageCode: '625205',
        searchParams: {
            type: 'M',
            companyCode: OSS.company
        }
    });
$('#addBtn').off('click').click(function () {
    reqApi({ code: '625200', sync: true }, true).then(function () {
        sucList();
    })
})
});