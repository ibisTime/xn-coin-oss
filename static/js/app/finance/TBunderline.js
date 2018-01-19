$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search: true
    }, {
        field: 'accountName',
        title: '账号',
        type: 'select',
        pageCode: '802500',
        params: {
            type:'C'
        },
        keyName: 'realName',
        valueName: '{{realName.DATA}}',
        searchName: 'realName',
        search: true
    }, {
        field: 'amountString',
        title: '提现金额',
        formatter: moneyFormat
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        title: "区块链类型",
        field: "payCardInfo"
    }, {
        title: "提现地址",
        field: "payCardNo"
    }, {
        field: 'mobile',
        title: '申请人',
        formatter: function(v, data) {
        	
            if (data.user) {
            	if(data.user.kind="P"){
            		return data.user.loginName;
            	}else{
                	return data.user.mobile;
            	}
            } else {
                return data.approveUser
            }
        }
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true,
        formatter: dateTimeFormat
    }, {
        title: "申请说明",
        field: "applyNote"
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status'),
        search: true
    }, {
        field: 'approveNote',
        title: '审核意见',
    }, {
        field: 'approveUser',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat,
        field1: 'approveDateStart',
        title1: '审核时间',
        type: 'date',
        field2: 'approveDateEnd',
        twoDate: true,
        search: true
    }, ];
    buildList({
        columns: columns,
        pageCode: '802755',
        singleSelect: false,
        searchParams: {
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "./TBunderline_detail.html?v=1&code=" + data.code;
        }
    });
    
    //提币广播
    $('#spBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords.length > 1) {
            toastr.info("请选择一条记录");
            return;
        }
		
		if (selRecords[0].status !="3") {
            toastr.info("只有审批通过的记录才可以广播");
            return;
        }
		
        var dw = dialog({
            content: '<form class="pop-form pop-form-uRef " id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">提币广播</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
		        field: 'mAddressCode',
		        title: '地址',
				required: true,
				type: "select",
		        pageCode: "625205",
		        params: {
		            type: 'M',
	                statusList: ['0'],
	                companyCode: OSS.company,
	                balanceStart: selRecords[0].amountString
	                // balanceStart: '0'
		        },
		        keyName: "code",
		        valueName: "{{address.DATA}}--{{balanceString.DATA}}",
		        searchName: "address",
                valueFormatter: {
                    balanceString: moneyFormat
                }
		    }],
            buttons: [{
                title: '确定',
                handler: function() {
                	if($('#popForm').valid()){
                        var data = $('#popForm').serializeObject();
                        data.approveUser = getUserName();
                        data.code = selRecords[0].code;
                        reqApi({
                            code: '802754',
                            json: data
                        }).done(function(data) {
                        	sucList();
                            dw.close().remove();
                        });
                    }

                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();
    });
	
//  $('#spBtn').click(function() {
//      var selRecords = $('#tableList').bootstrapTable('getSelections');
//      if (selRecords.length <= 0) {
//          toastr.info("请选择记录");
//          return;
//      }
//      var dataCode = []
//
//      var dw = dialog({
//          content: '<table id="tableList1"></table>',
//          ok: function() {
//              var that = this;
//              var selRecords1 = $('#tableList').bootstrapTable('getSelections');
//              if (selRecords1.length <= 0) {
//                  toastr.info("请选择记录");
//                  return;
//              }
//              var data = {
//                  approveUser: getUserName(),
//                  code: selRecords[0].code,
//                  mAddressCode: selRecords1[0].mAddressCode
//              }
//              reqApi({ code: '802754', json: data, sync: true }, true).then(function () {
//                  setTimeout(function () {
//                      that.close().remove();
//                  }, 0);
//              })
//              return false;
//              // return true;
//          },
//          cancel: function() {
//              return true;
//          },
//          cancelValue: '取消',
//          okValue: '确定'
//      });
//
//      dw.showModal();
//
//      var display = [{
//          field: '',
//          title: '',
//          checkbox: true
//      }, {
//          field: 'address',
//          title: '地址'
//      }, {
//          field: 'status',
//          title: '状态',
//          type: 'select',
//          data: {
//              "0": "启用",
//              "2": "弃用"
//          },
//          search: true
//      }, {
//          title: "创建日期",
//          field: "createDatetime",
//          formatter: dateTimeFormat
//      }, {
//          title: "使用次数",
//          field: "useCount"
//      }, {
//          field: 'useAmountString',
//          title: '提币金额',
//          formatter: moneyFormat
//      }, {
//          title: "余额",
//          field: "balanceString",
//          formatter: moneyFormat
//      }];
//      var options = {
//          columns: display,
//          pageCode: '625205',
//          searchParams: {
//              type: 'M',
//              statusList: ['0'],
//              companyCode: OSS.company,
//              balanceStart:selRecords[0].amountString
//          }
//      }
//      buildTable($('#tableList1'), options, '', '', true, false, function() {});
//      $('.ui-popup.ui-popup-modal.ui-popup-show.ui-popup-focus').css('position','absolute').css('left','150px').css('top','150px');
//      // confirm(buildList({
//      //
//      //
//      // })).then(function() {
//          // reqApi({
//          //     code: '802754',
//          //     json: {
//          //         codeList: dataCode,
//          //         approveUser: getUserName()
//          //     }
//          // }).then(function() {
//          //     sucList();
//          // });
//
//      // }, function() {});
//  });
    //审核
    $('#multiCheckBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length == 1 && selRecords[0].status == 1) {

            window.location.href = "TBunderline_check.html?Code=" + selRecords[0].code;
        } else {
	        var dataCode = []
	        for (var i = 0; i < selRecords.length; i++) {
	            dataCode.push(selRecords[i].code)
	
	            if (selRecords[i].status != 1) {
	                toastr.info(selRecords[i].code + "状态不能审核!");
	                return;
	            }
	        }
	
	        var dw = dialog({
	            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
	                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">审核</li></ul>' +
	                '</form>'
	        });
	        dw.showModal();
	
	        buildDetail({
	            fields: [{
	                field: 'approveNote',
	                title: '审核意见',
	                required: true,
	                maxlength: 250
	            }],
	            buttons: [{
	                title: '通过',
	                handler: function() {
	
	                    if ($('#approveNote').val() == "") {
	                        toastr.error("审核意见不能为空");
	                    } else {
	                        var data = $('#popForm').serializeObject();
	                        data.codeList = dataCode;
	                        data.approveResult = "1";
	                        data.approveUser = getUserName();
	                        reqApi({
	                            code: '802752',
	                            json: data
	                        }).done(function(data) {
	                            toastr.info("操作成功");
	                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
	                            dw.close().remove();
	                        });
	                    }
	
	                }
	            }, {
	                title: '不通过',
	                handler: function() {
	                    if ($('#approveNote').val() == "") {
	                        toastr.error("审核意见不能为空");
	                    } else {
	                        var data = $('#popForm').serializeObject();
	                        data.codeList = dataCode;
	                        data.approveResult = "0";
	                        data.approveUser = getUserName();
	                        reqApi({
	                            code: '802752',
	                            json: data
	                        }).done(function(data) {
	                            toastr.info("操作成功");
	                            $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
	                            dw.close().remove();
	                        });
	                    }
	                }
	            }, {
	                title: '取消',
	                handler: function() {
	                    dw.close().remove();
	                }
	            }]
	        });
	        dw.__center();
	    }
    });

});