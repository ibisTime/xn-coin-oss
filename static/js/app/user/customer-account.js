$(function() {
    var userId = getQueryString('userId') || '';
    var kind = getQueryString('kind') || '';


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名'
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'coin',
        formatter: Dict.getNameForList('coin')
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amountString',
        title: '余额',
        formatter: function(v, data){
        	if(data.currency=="SC"){
        		return moneyFormatSC(v)+ "云储币";
        	}else if(data.currency=="BTC"){
        		return moneyFormatBTC(v)+ "比特币";
        	}else if(data.currency=="ETH"){
        		return moneyFormat(v)+ "以太币";
        	}
        }
    }, {
        field: 'frozenAmountString',
        title: '冻结金额',
        formatter: function(v, data){
        	if(data.currency=="SC"){
        		return moneyFormatSC(v)+ "云储币";
        	}else if(data.currency=="BTC"){
        		return moneyFormatBTC(v)+ "比特币";
        	}else if(data.currency=="ETH"){
        		return moneyFormat(v)+ "以太币";
        	}
        }
    }, {
        field: 'amount',
        title: '可用余额',
        formatter: function(v, data) {

            var amount = new BigDecimal(data.amountString);
            var frozenAmount = new BigDecimal(data.frozenAmountString);
        	if(data.currency=="SC"){
        		return moneyFormatSC(amount.subtract(frozenAmount).toString())+ "云储币";
        	}else if(data.currency=="BTC"){
        		return moneyFormatBTC(amount.subtract(frozenAmount).toString())+ "比特币";
        	}else if(data.currency=="ETH"){
        		return moneyFormat(amount.subtract(frozenAmount).toString())+ "以太币";
        	}
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'currency_type',
        formatter: Dict.getNameForList('account_status'),
        // search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'account',
        columns: columns,
        pageCode: '802500',
        searchParams: {
            kind:'0',
            companyCode: OSS.company,
            userId: userId
        }
    });


    $('.tools .toolbar').html('<li style="display:block;" id="ledgerBtn"><span><img src="/static/images/t01.png"></span>查看明细</li>'+
    							'<li style="display:block;" id="ledgerFrozenBtn"><span><img src="/static/images/t01.png"></span>查看冻结金额明细</li>'+
    							'<li style="display:block;" id="goBackBtn"><span><img src="/static/images/t01.png"></span>返回</li>');

    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].currency=="SC"){
    		window.location.href = "../SC-finance/partner_ledger.html?&a=1&accountNumber=" + selRecords[0].accountNumber + "&kind=0";
    	}else if(selRecords[0].currency=="BTC"){
    		window.location.href = "../BTC-finance/partner_ledger.html?&a=1&accountNumber=" + selRecords[0].accountNumber + "&kind=0";
    	}else if(selRecords[0].currency=="ETH"){
    		window.location.href = "../finance/partner_ledger.html?&a=1&accountNumber=" + selRecords[0].accountNumber + "&kind=0";
    	}
    });
    
    $('#ledgerFrozenBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].currency=="SC"){
    		window.location.href = "../SC-finance/partner_ledger.html?&a=1&accountNumber=" + selRecords[0].accountNumber + "&kind=1";
    	}else if(selRecords[0].currency=="BTC"){
    		window.location.href = "../BTC-finance/partner_ledger.html?&a=1&accountNumber=" + selRecords[0].accountNumber + "&kind=1";
    	}else if(selRecords[0].currency=="ETH"){
    		window.location.href = "../finance/partner_ledger.html?&a=1&accountNumber=" + selRecords[0].accountNumber + "&kind=1";
    	}
    });
    
    $('#goBackBtn').click(function() {
        window.location.href = "./customer.html"
    });
});