$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var fields = [{
        field: 'code1',
        title: '编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        title: '周几',
        field: "week",
        formatter: function(v, data) {
            if (data.displayTime) {
                return data.displayTime.week
            }
        }
    }, {
        title: "开始时间",
        field: "startTime",
        formatter: function(v, data) {
            if (data.displayTime) {
                return data.displayTime.startTime
            }
        }
    }, {
        title: "结束时间",
        field: "endtime",
        formatter: function(v, data) {
            if (data.displayTime) {
                return data.displayTime.endtime
            }
        }
    }, {
        title: "广告留言",
        field: "leaveMessage"
    }, {
        title: "单笔最大交易额",
        field: "maxTrade",
        formatter: moneyFormat
    }, {
        title: "单笔最大交易额",
        field: "minTrade",
        formatter: moneyFormat
    }, {
        title: "溢价率",
        field: "premiumRate",
        readonly: view
    }, {
        title: "保护价",
        field: "protectPrice",
        readonly: view
    }, {
        title: "可交易的对象",
        field: "onlyTrust",
        type: "select",
        data: {
            "0": "任何人都可以交易",
            "1": "只有受信任的人可以交易"
        }
    }, {
        field: 'payType',
        title: '支付方式',
        type: 'select',
        data: {
            "0": "支付宝",
            "1": "微信",
            "2": "银行卡转账"
        }
    }, {
        field: 'tradeCurrency',
        title: '交易币种'
    }, {
        title: "交易人",
        field: 'userId'
    }];
    var options = {
        fields: fields,
        code: {
            tradeType: "0",
            adsCode: code
        },
        view: true,
        detailCode: '625226',
    };
    buildDetail(options);

});