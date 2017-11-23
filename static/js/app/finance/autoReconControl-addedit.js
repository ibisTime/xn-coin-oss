$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var collectionData;
    reqApi({
        code: "802707",
        json: {
            code: code
        },
        sync: true
    }).then(function(data) {
        collectionData = [data.ethCollection]
    });
    var fields = [{
            title: '户名',
            field: 'accountName',
            formatter: function(v, data) {
                return data.charge.accountName;
            },
            readonly: true
        }, {
            title: '账号',
            field: 'accountNumber',
            readonly: true,
            formatter: function(v, data) {
                return data.charge.accountNumber;
            },

        }, {
            field: 'currency',
            title: '币种',
            type: 'select',
            formatter: function(v, data) {
                if (data.charge.currency == "ETH") {
                    return "以太币"
                } else if (data.charge.currency == "BTC") {
                    return "比特币"
                }
            },
            readonly: true,
        }, {
            field: 'channelType',
            title: '渠道类型',
            formatter: function(v, data) {
                if (data.charge) {
                    if (data.charge.channelType == "ETH") {
                        return "以太坊"
                    } else if (data.charge.channelType == "0") {
                        return "内部账"
                    } else if (data.charge.channelType == "9") {
                        return "调账"
                    } else if (data.charge.channelType == "10") {
                        return "轧账"
                    } else if (data.charge.channelType == "90") {
                        return "人工线下"
                    }
                }

            },
            readonly: true
        }, {
            field: 'bizType',
            title: '业务类型',
            formatter: function(v, data) {
                if (data.charge) {
                    if (data.charge.bizType == "charge") {
                        return "充值"
                    } else if (data.charge.bizType == "collection") {
                        return "归集"
                    } else if (data.charge.bizType == "withdraw") {
                        return "取现"
                    } else if (data.charge.bizType == "mfee") {
                        return "提现矿工费"
                    } else if (data.charge.bizType == "wfee") {
                        return "归集矿工费"
                    } else if (data.charge.bizType == "19") {
                        return "蓝补"
                    } else if (data.charge.bizType == "-19") {
                        return "红冲"
                    }
                }

            },
            readonly: true,
        }, {
            field: 'bizNote',
            title: '业务说明',
            formatter: function(v, data) {
                return data.charge.bizNote
            },
            readonly: true
        },
        {
            field: 'amountString',
            title: '交易金额',
            formatter: function(v, data) {
                return moneyFormat(data.charge.amountString)
            },
            readonly: true
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            formatter: function(v, data) {
                return dateTimeFormat(data.charge.applyDatetime)
            },
            readonly: true
        }, {
            field: 'status',
            title: '状态',
            formatter: function(v, data) {
                if (data.charge.status == "1") {
                    return "待支付"
                } else if (data.charge.status == "2") {
                    return "支付失败"
                } else if (data.charge.status == "3") {
                    return "支付成功"
                }
            },
            readonly: true
        }, {
            field: 'refNo',
            title: '交易Hash',
            formatter: function(v, data) {
                return data.charge.refNo;
            },
            readonly: true
        }, {
            field: 'collectionData',
            title: '归集订单:',
            readonly: true,
            type: 'o2m',
            useData: collectionData,
            columns: [{
                field: 'amountString',
                title: '归集数量',
                formatter: moneyFormat
            }, {
                field: 'txFeeString',
                title: '矿工费',
                formatter: moneyFormat
            }, {
                field: 'refNo',
                title: '关联充值订单号'
            }, {
                field: 'fromAddress',
                title: 'from'
            }, {
                field: 'toAddress',
                title: 'to'
            }, {
                field: 'txHash',
                title: '交易Hash'
            }, {
                field: 'status',
                title: '状态',
                type: 'select',
                key: 'collection_status',
                formatter: Dict.getNameForList('collection_status'),
                search: true
            }, {
                field: 'createDatetime',
                title: '归集发起时间',
                formatter: dateTimeFormat
            }, {
                field: 'ethDatetime',
                title: '网络记账时间',
                formatter: dateTimeFormat
            }]
        }, {
            field: 'jourList',
            title: '本地流水:',
            readonly: true,
            type: 'o2m',
            columns: [{
                field: 'code1',
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
                key: 'coin',
                formatter: Dict.getNameForList('coin'),
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
                key: 'jour_biz_type',
                formatter: Dict.getNameForList('jour_biz_type'),
            }, {
                field: 'transAmountString',
                title: '变动金额',
                formatter: moneyFormat
            }, {
                field: 'preAmountString',
                title: '变动前金额',
                formatter: moneyFormat
            }, {
                field: 'postAmountString',
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
            field: 'transList',
            title: '区块链流水',
            readonly: true,
            type: 'o2m',
            columns: [{
                field: 'blockNumber',
                title: 'blockNumber',
            }, {
                field: 'from',
                title: 'from'
            }, {
                field: 'to',
                title: 'to'
            }, {
                field: 'gas',
                title: 'gasLimit',
            }, {
                field: 'gasPrice',
                title: 'gasPrice',
                formatter: moneyFormat,
            }, {
                field: 'gasUsed',
                title: 'gasUsed'
            }, {
                field: 'nonce',
                title: 'nonce'
            }, {
                field: 'refNo',
                title: 'refNo'
            }, {
                title: "交易Hash",
                field: "hash"
            }, {
                field: 'transactionIndex',
                title: 'transactionIndex'
            }, {
                title: "value",
                field: "value"
            }]
        }, {
            title: '对账说明',
            field: 'checkNote',
            // type: "textarea",
            // normalArea: true,
            required: true,
            readonly: view,
            maxlength: 250
        }, {
            field: 'checkUser',
            type: 'hidden',
            value: getUserName()
        }
    ];
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
            // data.result="1";
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
            // data.result="0";
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
        detailCode: '802707',
        view: view,
        beforeSubmit: function(data) {
            data.order = data.code;
            return true;
        },
        buttons: view ? buttonsView : buttons2
    };
    buildDetail(options);
});