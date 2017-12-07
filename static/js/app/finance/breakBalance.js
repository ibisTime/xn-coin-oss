$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    
    $('#tableList').bootstrapTable({
        columns: [{
	        field: 'name',
	        title: '名称',
	    }, {
	        title: "数量",
	        field: "amount",
	        formatter: moneyFormat,
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
    }).done(function(data) {
        var data = data.list;
        $("#amount-CNY").text(moneyFormat(data[1].amountString));
        accountNumberCNY = data[1].accountNumber;
        $("#amount-TG").text(moneyFormat(data[0].amountString));
        accountNumberTG = data[0].accountNumber;
    });
    
    reqApi({
        code: '802900',
        sync: true
    }).done(function(data) {
    	
        var tableData = [{
	        	name: '平台所有币',
	        	amount: data.totalCount
	        },{
	        	name: '客户未归集总额',
	        	amount: data.toCollectCount
	        },{
	        	name: '当前散取地址余额',
	        	amount: data.toWithdrawCount
	        },{
	        	name: '历史归集总额',
	        	amount: data.totolCollectCount
	        },{
	        	name: '历史散取总额',
	        	amount: data.totolWithdrawCount
	        }]
        
        $('#tableList').bootstrapTable('prepend', tableData)
    });
    
    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY;
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG + "&kind=TG";
    });

});