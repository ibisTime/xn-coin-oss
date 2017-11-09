$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var fields = [{
        field: 'code',
        title: '编号',
        readonly: view
    }, {
        title: "买家",
        field: "userId",
        readonly: view
    }, {
        title: "溢价",
        field: "",
        readonly: view
    }, {
        title: "最低价",
        field: "",
        readonly: view
    }, {
        title: "最小量",
        field: "",
        readonly: view
    }, {
        title: "最大量",
        field: "",
        readonly: view
    }, {
        field: '',
        title: '收款方式',
        type: 'select',
        key: '',
        formatter: Dict.getNameForList(''),
        search: true,
        readonly: view
    }, {
        field: '',
        title: '高级设置',
        readonly: view
    }, {
        field: '',
        title: '广告留言',
        readonly: view
    }];
    var options = {
        fields: fields,
        code: code,
        detailCode: '802522',
    };
    buildDetail(options);

});