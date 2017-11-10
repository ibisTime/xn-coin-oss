$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search: true
    }, {
        field: 'amount',
        title: '交易数量',
        formatter: moneyFormat
    }, {
        field: 'fromAddress',
        title: '来方归集',
    }, {
        title: "去方归集地址",
        field: "toAddress"
    }, {
        title: "交易HASH",
        field: 'txHash'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            "0": "广播中",
            "1": "广播成功",
            "2": "广播失败"
        },
        // key: 'account_status',
        // formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '归集时间',
        formatter: dateTimeFormat
    }, ];
    buildList({
        columns: columns,
        pageCode: '625105',
        searchParams: {
            // type: 'P',
            companyCode: OSS.company
        }
    });

    $('#spBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });
    //审核
    $('#multiCheckBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length == 1 && selRecords[0].status == 1) {

            window.location.href = "offlineRecharge_check.html?Code=" + selRecords[0].code;
        } else {

            var dataCode = []

            for (var i = 0; i < selRecords.length; i++) {
                dataCode.push(selRecords[i].code)

                if (selRecords[i].status != 1) {
                    toastr.info(selRecords[i].code + "状态不能审核!");
                    return;
                }

            }

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量支付</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                fields: [{
                    field: 'payNote',
                    title: '审核意见',
                    required: true,
                    maxlength: 250
                }],
                buttons: [{
                    title: '通过',
                    handler: function() {

                        if ($('#payNote').val() == "") {
                            toastr.error("审核意见不能为空");
                        } else {
                            var data = $('#popForm').serializeObject();
                            data.codeList = dataCode;
                            data.payResult = "1";
                            data.payUser = getUserName();
                            reqApi({
                                code: '802701',
                                json: data
                            }).done(function(data) {
                                toastr.info("操作成功");

                                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                                dw.close().remove();
                            });
                        }

                    }
                }, {
                    title: '不通过',
                    handler: function() {
                        if ($('#payNote').val() == "") {
                            toastr.error("审核意见不能为空");
                        } else {
                            var data = [];
                            data.codeList = dataCode;
                            data.payResult = "1";
                            data.payUser = getUserName();
                            reqApi({
                                code: '802701',
                                json: data
                            }).done(function(data) {
                                toastr.info("操作成功");
                                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                                dw.close().remove();
                            });
                        }
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });

            dw.__center();
        }

    });

});