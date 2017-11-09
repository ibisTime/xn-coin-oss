$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: '',
        title: '户名',
        search: true
    }, {
        title: "账号",
        field: ""
    }, {
        title: "类型",
        field: ""
    }, {
        title: '余额',
        field: '',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: '',
        formatter: Dict.getNameForList(''),
        search: true
    }, {
        field: '',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '',
        searchParams: {
            companyCode: OSS.company
        },
    });

    $('#diviLedgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });

});