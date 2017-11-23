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
        field: 'accountName',
        title: '账号',
    }, {
        field: 'amountString',
        title: '提现金额',
        formatter: moneyFormat
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        title: "区块链类型",
        field: "payCardInfo"
    }, {
        title: "提现地址",
        field: "payCardNo"
    }, {
        field: 'mobile',
        title: '申请人',
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile;
            } else {
                return data.approveUser
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true,
        formatter: dateTimeFormat
    }, {
        title: "申请说明",
        field: "applyNote"
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status'),
        search: true
    }, {
        field: 'approveNote',
        title: '审核意见',
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat,
        field1: 'approveDateStart',
        title1: '审核时间',
        type: 'date',
        field2: 'approveDateEnd',
        twoDate: true,
        search: true
    }, ];
    buildList({
        columns: columns,
        pageCode: '802755',
        singleSelect: false,
        searchParams: {
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "./TBunderline_detail.html?v=1&code=" + data.code;
        }
    });

    $('#spBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var dataCode = []

        for (var i = 0; i < selRecords.length; i++) {
            dataCode.push(selRecords[i].code)

            if (selRecords[i].status != 3) {
                toastr.info(selRecords[i].code + "状态不能广播，只有审批通过才可以广播!");
                return;
            }

        }
        confirm("确定进行广播？").then(function() {
            reqApi({
                code: '802754',
                json: {
                    codeList: dataCode,
                    approveUser: getUserName()
                }
            }).then(function() {
                sucList();
            });

        }, function() {});
    });
    //审核
    $('#multiCheckBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
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
                field: 'approveNote',
                title: '审核意见',
                required: true,
                maxlength: 250
            }],
            buttons: [{
                title: '通过',
                handler: function() {

                    if ($('#approveNote').val() == "") {
                        toastr.error("审核意见不能为空");
                    } else {
                        var data = $('#popForm').serializeObject();
                        data.codeList = dataCode;
                        data.approveResult = "1";
                        data.approveUser = getUserName();
                        reqApi({
                            code: '802752',
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
                    if ($('#approveNote').val() == "") {
                        toastr.error("审核意见不能为空");
                    } else {
                        var data = $('#popForm').serializeObject();
                        data.codeList = dataCode;
                        data.approveResult = "0";
                        data.approveUser = getUserName();
                        reqApi({
                            code: '802752',
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
    });

});