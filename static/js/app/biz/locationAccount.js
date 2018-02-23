$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
        search: true
    }, {
        title: "账号",
        field: "accountNumber"
    }, {
        field: "currency",
        title: "币种",
        type: 'select',
        key: 'coin',
        formatter: Dict.getNameForList("coin"),
        search: true
    }, {
        title: '余额',
        field: 'amountString',
        formatter: function(v, data){
        	if(data.currency=="SC"){
        		return moneyFormatSC(v);
        	}else{
        		return moneyFormat(v);
        	}
        }
    }, {
        title: '冻结金额',
        field: 'frozenAmountString',
        formatter: moneyFormat
    }, {
        title: '可用余额',
        field: 'amount',
        formatter: function(v,data){
        	var amount = new BigDecimal(data.amountString);
        	var frozenAmount = new BigDecimal(data.frozenAmountString);
        	amount =  amount.subtract(frozenAmount).toString();
        	return moneyFormat(amount);
        	
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'account_status',
        formatter: Dict.getNameForList('account_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '802500',
        searchParams: {
            companyCode: OSS.company,
            type: "C"
        },
    });

    $('#ledgerBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../finance/partner_ledger.html?accountCode=" + selRecords[0].accountNumber + "&yk=1";
    });

});