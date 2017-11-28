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
        key: 'account_status',
        formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        title: "创建日期",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        title: '使用时间起',
        field: 'availableDatetimeStart',
        type: "date",
        formatter: function(v, data) {
            var date = new Date(v);
            var str = date.format('yyyy-MM-dd');
            return str;
        },
        search: true
    }, {
        title: '使用时间止',
        field: 'availableDatetimeEnd',
        type: "date",
        formatter: function(v, data) {
            var date = new Date(v);
            var str = date.format('yyyy-MM-dd');
            return str;
        },
        search: true
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

});