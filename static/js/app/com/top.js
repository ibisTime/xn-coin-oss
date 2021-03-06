$('title', window.parent.document).html(OSS.systemName);
$(function() {
	
	var timestamp = new Date().getTime()
	
    if (!sessionStorage.getItem('token')) {
		//判断域名是 hhr开头 合伙人域名 kind为PA
		var kind = document.domain.substr(0, 1)=='h'?'PA':(sessionStorage.getItem('loginKind') || 'P')
        location.href = 'signin.html?kind=' + kind+'&timestamp=' + timestamp;
        return;
    }

    // 获取用户
    reqApi({
        code: '805121',
        cache: true,
        sync: true,
        json: {
            'userId': sessionStorage.getItem('userId')
        }
    }).then(function(data) {
        window.ossKind = data ? data.kind : '';
        $('#topUserName').html(data.loginName);
        $('#userName').html(data.loginName);
        sessionStorage.setItem('roleCode', data.roleCode);
        sessionStorage.setItem('userName', data.loginName);
    });

    reqApi({
        code: '805022',
        cache: true,
        sync: true,
        json: {
            'code': sessionStorage.getItem('roleCode')
        }
    }).then(function(data) {
        sessionStorage.setItem('roleLevel', data.level);
    });
    // 设置根目录
    window.parentCode = OSS.menuRoot;

    var data = { "parentCode": window.parentCode, "type": "1", 'roleCode': sessionStorage.getItem('roleCode') };
    reqApi({
        code: '805026',
        json: data,
        sync: true
    }, true).done(function(data) {
        var firstMenuCode = null;
        $.each(data, function(i, item) {
            if (i == 0) {
                firstMenuCode = item.code;
            }
            $(".nav").append("<li><a id=\"menu" + i + "\" data-code='" + item.code +
                "' href=\"javascript:void(0)\" onclick=\"initLefMenu('" + item.code +
                "');return false;\" target=\"leftFrame\"><img src=\"" + __uri('../images/icon01.png') +
                "\" title=\"" + item.name + "\" /><h2>" + item.name + "</h2></a></li>");
        });
        $(".nav").find('a:first').addClass('selected');

        //顶部导航切换
        $(".nav li a").click(function() {
            $(".nav li a.selected").removeClass("selected");
            $(this).addClass("selected");
            // 获取币种
            reqApi({
                code: '802267',
                json: {
                    updater:''
                },
                sync: true
            }).then(function(data) {
        		var coinList = {};
				for(var i in data){
					coinList[data[i].symbol]={
						'coin':data[i].symbol,
						'unit':'1e'+data[i].unit,
						'name':data[i].cname,
						'type':data[i].type
					}
				}
				window.sessionStorage.setItem("coinList",JSON.stringify(coinList))
            });
        });

        if (window.parent.noRenderLeftMenu) {
            initLefMenu(firstMenuCode);
        }
    });

    $("#logout").click(function() {
        ajaxGet(OSS.mainUrl + '/logOut', {
            token: window.sessionStorage.getItem('token')
        }).then(function(res) {
            if (res.errorCode == '0') {
                window.sessionStorage.setItem('token', '');
                window.sessionStorage.setItem('userId', '');
                window.sessionStorage.setItem('userName', '');
                window.sessionStorage.setItem('roleCode', '');
                window.sessionStorage.setItem('qiniuUrl', '');
                location.href = 'signin.html?kind=' + (sessionStorage.getItem('loginKind') || 'P')+'&timestamp=' + timestamp;
            }
        });
    });

    $('#change-pwd').on('click', function() {
        parent.frames["rightFrame"].window.location.href = 'system/user_pwd_change.html';
    });
});


//重新加载左侧页面
function initLefMenu(parentCode) {
    parent.frames["leftFrame"].window.initMenu && parent.frames["leftFrame"].window.initMenu(parentCode);
}

function mainReload() {
    window.parent.location.reload(true);
}