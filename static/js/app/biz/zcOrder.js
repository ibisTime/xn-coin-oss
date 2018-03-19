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
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true,
        formatter: function(v, data) {
        	var html ='';
            if (data.beigaoInfo) {
                html = data.beigaoInfo.mobile + '(' + data.beigaoInfo.nickname + ')';
            }
            if(v==data.tradeOrder.buyUser){
            	html+= '-买家'
            }else{
            	html+= '-卖家'
            }
            return html;
        }
    }, {
        title: "原告",
        field: "yuangao",
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true,
        formatter: function(v, data) {
        	var html ='';
            if (data.yuangaoInfo) {
                html =  data.yuangaoInfo.mobile + '(' + data.yuangaoInfo.nickname + ')';
            }
            if(v==data.tradeOrder.buyUser){
            	html+= '-买家'
            }else{
            	html+= '-卖家'
            }
            
            return html;
        }
    }, {
        title: "针对订单编号",
        field: "tradeOrderCode",
        search: true,
    }, {
        field: "coin",
        title: "币种",
        type: 'select',
        key: 'coin',
        formatter: function(v, data) {
            if (data.tradeOrder) {
                return getCoinName(data.tradeOrder.tradeCoin)
            }
        },
    } ,{
        title: "状态",
        field: "status",
        type: "select",
        key: "arbitrate_status",
        formatter: Dict.getNameForList("arbitrate_status"),
        search: true
    }, {
        title: "申请原因",
        field: "reason"
    }, {
        field: 'createDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
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
        field: 'updateDatetime',
        title: '处理时间',
        formatter: dateTimeFormat,
    }, {
        title: '处理说明',
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
        window.location.href = "zcOrder_resolve.html?code=" + selRecords[0].code;
    });
});