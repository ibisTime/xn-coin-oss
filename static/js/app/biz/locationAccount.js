$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
        search: true
    }, {
        title: "账号",
        field: "accountNumber"
    }, {
        field: "currency",
        title: "币种"
    }, {
        title: '余额',
        field: 'amountString',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'account_status',
        formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802500',
        searchParams: {
            companyCode: OSS.company,
            type: "C"
        },
    });

    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../finance/partner_ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });

});