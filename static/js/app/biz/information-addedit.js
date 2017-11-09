$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var fields = [{
        field: '',
        title: '标题',
    }, {
        title: "封面",
        field: ""
    }, {
        title: "作者",
        field: ""
    }, {
        title: "状态",
        field: ""
    }, {
        title: "备注",
        field: ""
    }];
    var options = {
        fields: fields,
        code: code,
        view: view,
        addCode: "",
        detailCode: ' ',
        editCode: ""
    };
    buildDetail(options);

});