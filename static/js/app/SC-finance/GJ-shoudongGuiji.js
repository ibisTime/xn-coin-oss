$(function() {
    var walletCount = '';
    
    reqApi({
        code: '802902',
        sync: true
    }).then(function(data) {
    	hideLoading()
        walletCount = moneyFormatSC(data.walletCount);
        
        var fields = [{
		        field: 'walletCount',
		        title: '当前钱包余额',
		        value: walletCount,
		        readonly: true
		    }, {
		        title: "需要归集的SC数量",
		        field: 'balanceStart',
				required: true,
				number: true,
				min: '0'
		    }];
		
		    var options = {
		        fields: fields,
		         buttons: [{
	                title: '手动归集',
	                handler: function() {
	                	if($('#jsForm').valid()){
	                        var data = $('#jsForm').serializeObject();
	                        confirm('您确定要归集'+data.balanceStart+'个SC至您的私有钱包吗？').then(function () {
	                            reqApi({
	                                code: '802160',
	                                json: data
	                            }).done(function(data) {
								    toastr.success('操作成功');
	                                location.reload(true);
	                            });
	                        },function () {})
	                    }
	                }
	            }]
		    };
		
		    buildDetail(options);
        
    }, hideLoading);

})