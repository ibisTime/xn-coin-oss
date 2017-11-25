$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');;
    var remarkField;
    var remarkOnly = {
        title: '审核说明',
        field: 'remark',
        readonly: true,
    };
    var remark = {
        title: '审核说明',
        field: 'remark',
        maxlength: 255,
        required: true
    };
    if (view) {
        remarkField = remarkOnly;
    } else {
        remarkField = remark;
    }
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
            if (data.beigaoInfo) {
                return data.beigaoInfo.mobile;
            }
        },
        readonly: true
    }, {
        title: "原告",
        field: "yuangao",
        formatter: function(v, data) {
            if (data.yuangaoInfo) {
                return data.yuangaoInfo.mobile;
            }
        },
        readonly: true
    }, {
        title: "针对订单编号",
        field: "tradeOrderCode",
        readonly: true
    }, {
        title: "申请原因",
        field: "reason",
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
    }, remarkField];

    var options = {
        fields: fields,
        code: code,
        detailCode: '625266'
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.result = '1';
                reqApi({
                    code: '625260',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.result = '0';
                reqApi({
                    code: '625260',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    if (view) {
        options.buttons = [{
            title: '返回',
            handler: function() {
                goBack();
            }
        }];
    };
    buildDetail(options);
});