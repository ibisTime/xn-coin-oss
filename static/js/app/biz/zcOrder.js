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
        title: "被告",
        field: "beigao",
        formatter: function(v, data) {
            if (data.beigaoInfo) {
                return data.beigaoInfo.mobile;
            }
        }
    }, {
        title: "原告",
        field: "yuangao",
        formatter: function(v, data) {
            if (data.yuangaoInfo) {
                return data.yuangaoInfo.mobile;
            }
        }
    }, {
        title: "针对订单编号",
        field: "tradeOrderCode"
    }, {
        title: "申请原因",
        field: "reason"
    }, {
        title: "处理结果",
        field: "result",
        type: "select",
        data: {
            "1": "通过",
            "0": "不通过"
        },
        search: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "arbitrate_status",
        formatter: Dict.getNameForList("arbitrate_status"),
        search: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    buildList({
        columns: columns,
        pageCode: '625265',
        searchParams: {
            companyCode: OSS.company
        }
    });
    $('#resolveBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        };
        if (selRecords[0].status != 0) {
            toastr.error("只有待处理的订单才可以进行处理");
            return;
        }
        window.location.href = "zcOrder_addedit.html?code=" + selRecords[0].code;
    });
});