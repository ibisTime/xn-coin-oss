$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址'
    }, {
        title: "拥有者",
        field: "userId",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile;
            }
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "启用",
            "1": "弃用"
        },
        search: true
    }, {
        field: '',
        title: '本地使用次数'
    }, {
        field: '',
        title: '网络使用次数'
    }, {
        field: 'balance',
        title: '当前余额',
        formatter: moneyFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '625205',
        searchParams: {
            type: 'X',
            companyCode: OSS.company
        },
    });

    $('#diviLedgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "partner_ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });
    // $('#ledgerBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //     window.location.href = "../finance/partner_ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    // });
});