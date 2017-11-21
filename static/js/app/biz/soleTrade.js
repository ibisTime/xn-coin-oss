$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "发布人",
        field: 'userId',
        type: "select",
        pageCode: "805120",
        params: {
            updater: "",
            kind: "C"
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.mobile + '(' + data.user.nickname + ')';
            }
        },
        search: true
    }, {
        title: "交易总额",
        field: "totalAmountString",
        formatter: moneyFormat
    }, {
        field: "leftAmountString",
        title: "剩余可交易",
        formatter: moneyFormat
    }, {
        title: "行情价格",
        field: "marketPrice",
    }, {
        title: "溢价率",
        field: "premiumRate"
    }, {
        title: "保护价",
        field: "protectPrice",
    }, {
        title: "单笔最大交易额",
        field: "maxTrade"
    }, {
        title: "单笔最小交易额",
        field: "minTrade"
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
        title: "状态",
        field: "status",
        type: "select",
        key: "ads_status",
        formatter: Dict.getNameForList("ads_status"),
        search: true
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