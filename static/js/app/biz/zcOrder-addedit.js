$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    
    var fields = [{
        field: 'code1',
        title: '编号',
        readonly: true,
        formatter: function(v, data) {
            return data.code
        },
        readonly: true
    }, {
        title: "被告",
        field: "beigao",
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
        },
        readonly: true
    }, {
        title: "原告",
        field: "yuangao",
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
        },
        readonly: true
    }, {
        title: "针对订单编号",
        field: "tradeOrderCode",
        readonly: true
    }, {
        title: "币种",
        field: "tradeCoin",
        formatter: function(v, data) {
            if (data.tradeOrder) {
                return Dict.getNameForList1("coin","",data.tradeOrder.tradeCoin)
            }

        },
    } ,{
        title: "申请原因",
        field: "reason",
        readonly: true
    }, {
        field: 'createDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
//      title: "附件说明",
//      field: "attach",
//      type: "img",
//      readonly: true
//  }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "arbitrate_status",
        readonly: true
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
        readonly: true
    }, {
        title: '处理说明',
        field: 'remark',
        readonly: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '625266',
        view: view
    };

    buildDetail(options);
});