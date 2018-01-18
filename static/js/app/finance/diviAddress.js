$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'address',
        title: '地址',
        search: true
    }, {
        title: "拥有者",
        field: "userId",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile + '(' + data.user.nickname + ')';
            }
        },
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true
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
//      field: '',
//      title: '本地使用次数'
//  }, {
//      field: '',
//      title: '网络使用次数'
//  }, {
        field: 'balanceString',
        title: '当前余额',
        amount: true,
        formatter: moneyFormat
//  }, {
//      field: 'remark',
//      title: '备注'
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
        window.location.href = "./diviAddress_ledger.html?address=" + selRecords[0].address;
    });
    $('#shoudongGuijiBtn').click(function () {
        confirm('<input type="number" name="number1" id="number1" placeholder="请输入阈值" style="border:1px solid blue;width: 150px;height: 30px;">' ).then(function () {
            if($('#number1').val()>=0) {
                var data = {
                    balanceStart: $('#number1').val()
                }
                reqApi({ code: '625100', json: data, sync: true }, true).then(function () {
                    sucList();
                })
            }else {
                toastr.error('阈值不能小于0');
            }

        })
    })
});