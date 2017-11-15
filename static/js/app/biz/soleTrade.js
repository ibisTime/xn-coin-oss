$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
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
        field: "premiumRate"
    }, {
        title: "保护价",
        field: "protectPrice",
    }, {
        title: "可交易的对象",
        field: "onlyTrust",
        type: "select",
        data: {
            "0": "任何人都可以交易",
            "1": "只有受信任的人可以交易"
        },
        search: true
    }, {
        field: 'payType',
        title: '支付方式',
        type: 'select',
        data: {
            "0": "支付宝",
            "1": "微信",
            "2": "银行卡转账"
        },
        search: true
    }, {
        field: 'tradeCurrency',
        title: '交易币种'
    }, {
        title: "交易人",
        field: 'userId'
    }];
    buildList({
        columns: columns,
        pageCode: '625227',
        searchParams: {
            coin: "ETH",
            tradeType: '1',
            companyCode: OSS.company
        }
    });
    //收买
    $('#buyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });

});