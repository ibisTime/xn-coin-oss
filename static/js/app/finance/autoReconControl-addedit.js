$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: '流水编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true
    }, {
        title: '户名',
        field: 'realName',
        readonly: true
    }, {
        title: '账号',
        field: 'accountNumber',
        readonly: true
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'currency',

        formatter: Dict.getNameForList("currency"),
        readonly: true,
    }, {
        field: 'channelType',
        title: '渠道类型',
        type: 'select',
        key: 'channel_type',

        formatter: Dict.getNameForList('channel_type'),
        readonly: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',

        formatter: Dict.getNameForList('biz_type'),
        readonly: true,
    }, {
        field: 'bizNote',
        title: '业务说明',
        readonly: true
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'createDatetime',
        title: '金额変动时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',

        formatter: Dict.getNameForList('jour_status'),
        readonly: true
    }, {
        field: 'workDate',
        title: '拟对账时间',
        readonly: true
    }, {
        field: 'remark',
        title: '备注',
        readonly: true
    }, {
        field: 'jourList',
        title: '本地流水:',
        readonly: true,
        type: 'o2m',
        pageCode: "802520",
        o2mvalue: {
            order: code
        },
        columns: [{
            field: 'code',
            title: '流水号',
            formatter: function(v, data) {
                return data.code
            }
        }, {
            field: 'realName',
            title: '户名',
            formatter: function(v, data) {
                return data.realName
            }
        }, {
            field: 'currency',
            title: '币种',
            key: 'currency',
            formatter: Dict.getNameForList('currency'),
        }, {
            field: 'channelType',
            title: '渠道',
            type: 'select',
            key: 'channel_type',
            formatter: Dict.getNameForList('channel_type'),
            search: true
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: 'biz_type',
            formatter: Dict.getNameForList('biz_type'),
            search: true
        }, {
            field: 'transAmount',
            title: '变动金额',
            formatter: moneyFormat
        }, {
            field: 'preAmount',
            title: '变动前金额',
            formatter: moneyFormat
        }, {
            field: 'postAmount',
            title: '变动后金额',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'jour_status',
            formatter: Dict.getNameForList('jour_status'),
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }]
    }, {
        field: 'jourList2',
        title: '区块链流水:',
        readonly: true,
        type: 'o2m',
        pageCode: "802520",
        o2mvalue: {
            order: code
        },
        columns: [{
            field: 'code',
            title: '流水号',
            formatter: function(v, data) {
                return data.code
            }
        }, {
            field: 'realName',
            title: '户名',
            formatter: function(v, data) {
                return data.realName
            }
        }, {
            field: 'currency',
            title: '币种',
            key: 'currency',
            formatter: Dict.getNameForList('currency'),
        }, {
            field: 'channelType',
            title: '渠道',
            type: 'select',
            key: 'channel_type',
            formatter: Dict.getNameForList('channel_type')
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: 'biz_type',
            formatter: Dict.getNameForList('biz_type'),
        }, {
            field: 'transAmount',
            title: '变动金额',
            formatter: moneyFormat
        }, {
            field: 'preAmount',
            title: '变动前金额',
            formatter: moneyFormat
        }, {
            field: 'postAmount',
            title: '变动后金额',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'jour_status',
            formatter: Dict.getNameForList('jour_status'),
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }]
    }, {
        title: '对账说明',
        field: 'checkNote',
        type: "textarea",
        normalArea: true,
        required: true,
        readonly: view,
        maxlength: 250
    }, {
        field: 'checkUser',
        type: 'hidden',
        value: getUserName()
    }];
    var buttonsView = [{
        title: "返回",
        handler: function() {
            goBack();
        }
    }];

    var buttons2 = [{
        title: "正确",
        handler: function() {
            var data = $('#jsForm').serializeObject();
            reqApi({
                code: '802800',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    }, {
        title: "不平账",
        handler: function() {
            var data = $('#jsForm').serializeObject();
            reqApi({
                code: '802800',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    }, {
        title: "返回",
        handler: function() {
            goBack();
        }
    }];
    var options = {
        fields: fields,
        code: code,
        detailCode: '802522',
        // editCode: '802800',
        view: view,
        beforeSubmit: function(data) {
            data.order = data.code;
            return true;
        },
        buttons: view ? buttonsView : buttons2
    };

    buildDetail(options);


});