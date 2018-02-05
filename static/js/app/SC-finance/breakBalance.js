$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    
    showLoading();
    $('#tableList').bootstrapTable({
        columns: [{
	        field: 'name',
	        title: '名称',
	    }, {
	        title: "数量",
	        field: "amount",
	        formatter: moneyFormatSC,
	    }],
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id'
    });
    
    
    reqApi({
        code: '802500',
        json: {
            "start": 1,
            "limit": 10,
            "type": "P"
        },
        sync: true
    }).then(function(data) {
    	hideLoading()
    	var lists = data.list;
        lists.forEach(function(d){
        	//平台ETH冷钱包
        	if(d.accountNumber=="SYS_ACOUNT_SC_COLD"){
        		$("#amount-TG").text(moneyFormatSC(d.amountString));
        		accountNumberTG = d.accountNumber;
        	}
        	//平台ETH盈亏账户
        	if(d.accountNumber=="SYS_ACOUNT_SC"){
        		$("#amount-CNY").text(moneyFormatSC(d.amountString));
        		accountNumberCNY = d.accountNumber;
        	}
        })
        
    }, hideLoading);
    
    reqApi({
        code: '802902',
        sync: true
    }).then(function(data) {
    	hideLoading()
        var tableData = [{
	        	name: '冷钱包余额',
	        	amount: data.coldCount
	        },{
	        	name: '盈亏余额',
	        	amount: data.platCount
	        },{
	        	name: '平台所有币',
	        	amount: data.totalCount
	        },{
	        	name: '历史归集总额',
	        	amount: data.totolCollectCount
	        },{
	        	name: '历史散取总额',
	        	amount: data.totolWithdrawCount
	        },{
	        	name: '当前钱包余额',
	        	amount: data.walletCount
	        }]
        
        $('#tableList').bootstrapTable('prepend', tableData)
    }, hideLoading);
    
    $("#CNYls-Btn").click(function() {
        location.href = "./ledger.html?accountNumber=" + accountNumberCNY;
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "./ledger.html?accountNumber=" + accountNumberTG + "&kind=TG";
    });

});