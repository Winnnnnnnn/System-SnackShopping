/**
 * 页面启动入口
 */
$(function () {
    initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    //路由分配
    var menu = getUrlParam("menu");
    if (null == menu) {
        initGoods();
    } else {
        switch (menu) {
            case "order":
                initOrder();
                break;
            case "user":
                initUser();
                break;
        }
    }
}

/**
 * 绑定商品管理
 */
$('#admin_nav_goods').click(function () {
    window.location = "/view/admin.jsp?name=" + getUrlParam("name");
});

/**
 * 绑定订单管理
 */
$('#admin_nav_order').click(function () {
    window.location = "/view/admin.jsp?name=" + getUrlParam("name") + "&menu=order";
});

/**
 * 绑定用户管理
 */
$('#admin_nav_user').click(function () {
    window.location = "/view/admin.jsp?name=" + getUrlParam("name") + "&menu=user";
});

/**
 * 初始化订单信息表
 * @param pageNumber
 */
function initOrderTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin/action',
        data:{action:'ACTION_ADMIN_GET_ORDER'},
        id:'#admin_order_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'id',
            title: '订单号',
            align: 'center'
        }, {
            field: 'list',
            title: '清单',
            align: 'center',
            width: '200px',
            formatter: function (value, row, index) {
                var list = JSON.parse(value);
                var res = '';
                $.each(list,function (i,obj) {
                    res += obj.title + "×" + obj.count + "&nbsp;&nbsp;￥" + parseFloat(obj.price) *  parseFloat(obj.count) + "<br/>"
                });
                return res;
            }
        }, {
            field: 'addr',
            title: '地址',
            align: 'center',
            formatter: function (value, row, index) {
                return row.name + "-" + row.phone + "-" + row.addr;
            }
        }, {
            field: 'total',
            title: '总价',
            align: 'center'
        }, {
            field: 'time',
            title: '时间',
            align: 'center'
        }, {
            field: 'state',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 0:
                        return "待发货";
                    case 1:
                        return "已取消";
                    case 2:
                        return "已发货";
                }
            }
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                if (row.state == 0) {
                    return "<button class='btn btn-danger' onclick='okOrder(\"" + value + "\")'><span class='glyphicon glyphicon-ok'></span>&nbsp;发货</button>";
                } else {
                    return "不可操作";
                }
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化用户信息表
 * @param pageNumber
 */
function initUserTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin/action',
        data:{action:'ACTION_ADMIN_GET_USER'},
        id:'#admin_user_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'phone',
            title: '手机号',
            align: 'center'
        }, {
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var user = escape(JSON.stringify(row));
                return "<button onclick='editUser(\"" + user + "\")' data-toggle=\"modal\" data-target=\"#admin_user_dialog\" class='btn btn-info'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 修改用户信息
 * @param data
 */
function editUser(data) {
    var user = JSON.parse(unescape(data));
    $('#admin_user_dialog_id').val(user.id);
    $('#admin_user_dialog_phone').val(user.phone);
    $('#admin_user_dialog_name').val(user.name);
    $('#admin_user_dialog_pwd').val(new Base64().decode(user.pwd));
}

/**
 * 绑定修改用户信息按钮
 */
$('#admin_user_dialog_ok').click(function () {
    var id = $('#admin_user_dialog_id').val();
    var name = $('#admin_user_dialog_name').val();
    var pwd = $('#admin_user_dialog_pwd').val();
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        var data = {
            action:'ACTION_ADMIN_EDIT_USER',
            id:id,
            name:name,
            pwd:pwd
        };
        $.ajax({
            type: 'post',
            url: '/admin/action',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#admin_user_dialog').modal('hide');
                    initUserTable($('#admin_user_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error:function() {
                alert('修改失败!');
            }
        });
    }
});

/**
 * 发货处理
 * @param id
 */
function okOrder(id) {
    var data = {
        action:'ACTION_ADMIN_DEL_ORDER',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/admin/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('发货成功!');
                initOrderTable($('#admin_order_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发货失败!');
            }
        },
        error:function() {
            alert('发货失败!');
        }
    });
}

/**
 * 初始化商品管理
 */
function initGoods() {
    $('#admin_goods').show();
    initGoodsTable(1);
}

/**
 * 初始化訂單管理
 */
function initOrder() {
    $('#admin_order').fadeIn(500);
    initOrderTable(1);
}

/**
 * 初始化用户管理
 */
function initUser() {
    $('#admin_user').fadeIn(500);
    initUserTable(1);
}

/**
 * 初始化商品信息表
 */
function initGoodsTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin/action',
        data:{action:'ACTION_ADMIN_GET_GOODS'},
        id:'#admin_goods_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'title',
            title: '商品名称',
            align: 'center'
        }, {
            field: 'detail',
            title: '商品详情',
            align: 'center',
            width: '500px'
        }, {
            field: 'img',
            title: '商品图片',
            align: 'center',
            formatter: function (value, row, index) {
                return "<img src='/files/" + value + "' style='height: 100px;'>"
            }
        }, {
            field: 'price',
            title: '商品价格',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var goods = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_goods_dialog\" onclick='editGoods(\"" + goods + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_goods_dialog\" onclick='delGoods(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 绑定图片选择
 */
$('#admin_goods_dialog_img').click(function () {
    $('#admin_goods_dialog_file').click();
});

/**
 * 绑定图片文件选择结果
 */
$('#admin_goods_dialog_file').on('change',function () {
    if (this.files[0]) {
        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#admin_goods_dialog_img").attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
    }
});

/**
 * 初始化商品管理对话框
 */
function initGoodsDialog() {
    $('#admin_goods_dialog_body').hide();
    $('#admin_goods_dialog_warn').hide();
    $('#admin_goods_dialog_add').hide();
    $('#admin_goods_dialog_edit').hide();
    $('#admin_goods_dialog_del').hide();
}

/**
 * 添加商品
 */
function addGoods() {
    initGoodsDialog();
    $('#admin_goods_dialog_body').show();
    $('#admin_goods_dialog_add').show();
    $('#admin_goods_dialog_label').html('添加商品');
    $('#admin_goods_dialog_title').val('');
    $('#admin_goods_dialog_detail').val('');
    $('#admin_goods_dialog_price').val('');
    $('#admin_goods_dialog_file').val('');
    $('#admin_goods_dialog_img').attr('src','../image/图片.png');
}

/**
 * 绑定添加商品按钮
 */
$('#admin_goods_dialog_add').click(function () {
    //获取数据
    var title = $('#admin_goods_dialog_title').val();
    var detail = $('#admin_goods_dialog_detail').val();
    var file = $('#admin_goods_dialog_file').val();
    var price = $('#admin_goods_dialog_price').val();
    if ('' == title || '' == detail || '' == file || '' == price) {
        alert('数据无效!');
    } else {
        //图片上传
        $.ajax({
            url: '/file',
            type: 'post',
            cache: false,
            data: new FormData($('#admin_goods_dialog_form')[0]),
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (res) {
                var filename = res.responseText;
                //数据封装
                var data = {
                    action:'ACTION_ADMIN_ADD_GOODS',
                    title:title,
                    detail:getFormatCode(detail),
                    img:filename,
                    price:price
                };
                $.ajax({
                    type: 'post',
                    url: '/admin/action',
                    dataType: "json",
                    data: data,
                    success: function (res) {
                        if (res) {
                            alert('添加成功!');
                            //更新列表
                            initGoodsTable(1);
                            $('#admin_goods_dialog').modal('hide');
                        } else {
                            alert('添加失败!');
                        }
                    },
                    error: function () {
                        alert('服务器异常，添加失败!');
                    }
                });
            }
        });
    }
});

/**
 * 编辑商品
 * @param data
 */
function editGoods(data) {
    initGoodsDialog();
    $('#admin_goods_dialog_body').show();
    $('#admin_goods_dialog_edit').show();
    $('#admin_goods_dialog_label').html('修改商品');
    var goods = JSON.parse(unescape(data));
    $('#admin_goods_dialog_title').val(goods.title);
    $('#admin_goods_dialog_detail').val(setFormatCode(goods.detail));
    $('#admin_goods_dialog_price').val(goods.price);
    $('#admin_goods_dialog_file').val('');
    $('#admin_goods_dialog_img').attr('src','/files/' + goods.img);
    $('#admin_goods_dialog_id').val(goods.id);
}

/**
 * 绑定编辑商品按钮
 */
$('#admin_goods_dialog_edit').click(function () {
//获取数据
    var title = $('#admin_goods_dialog_title').val();
    var detail = $('#admin_goods_dialog_detail').val();
    var file = $('#admin_goods_dialog_file').val();
    var price = $('#admin_goods_dialog_price').val();
    var id = $('#admin_goods_dialog_id').val();
    if ('' == title || '' == detail || '' == price) {
        alert('数据无效!');
    } else {
        if ('' == file) {
            //不需要上传图片
            var data = {
                action:'ACTION_ADMIN_EDIT_GOODS',
                title:title,
                detail:getFormatCode(detail),
                price:price,
                id:id
            };
            $.ajax({
                type: 'post',
                url: '/admin/action',
                dataType: "json",
                data: data,
                success: function (res) {
                    if (res) {
                        alert('修改成功!');
                        //更新列表
                        initGoodsTable($('#admin_goods_table').bootstrapTable('getOptions').pageNumber);
                        $('#admin_goods_dialog').modal('hide');
                    } else {
                        alert('修改失败!');
                    }
                },
                error: function () {
                    alert('服务器异常，修改失败!');
                }
            });
        } else {
            //需要上传图片
            $.ajax({
                url: '/file',
                type: 'post',
                cache: false,
                data: new FormData($('#admin_goods_dialog_form')[0]),
                processData: false,
                contentType: false,
                dataType: "json",
                complete: function (res) {
                    var filename = res.responseText;
                    //数据封装
                    var data = {
                        action:'ACTION_ADMIN_EDIT_GOODS',
                        title:title,
                        detail:getFormatCode(detail),
                        img:filename,
                        price:price,
                        id:id
                    };
                    $.ajax({
                        type: 'post',
                        url: '/admin/action',
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            if (res) {
                                alert('修改成功!');
                                //更新列表
                                initGoodsTable($('#admin_goods_table').bootstrapTable('getOptions').pageNumber);
                                $('#admin_goods_dialog').modal('hide');
                            } else {
                                alert('修改失败!');
                            }
                        },
                        error: function () {
                            alert('服务器异常，修改失败!');
                        }
                    });
                }
            });
        }
    }
});

/**
 * 删除商品
 * @param id
 */
function delGoods(id) {
    initGoodsDialog();
    $('#admin_goods_dialog_warn').show();
    $('#admin_goods_dialog_del').show();
    $('#admin_goods_dialog_label').html('删除商品');
    $('#admin_goods_dialog_id').val(id);
}

/**
 * 绑定删除商品按钮
 */
$('#admin_goods_dialog_del').click(function () {
    var id = $('#admin_goods_dialog_id').val();
    //数据封装
    var data = {
        action:'ACTION_ADMIN_DEL_GOODS',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/admin/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //更新列表
                initGoodsTable($('#admin_goods_table').bootstrapTable('getOptions').pageNumber);
                $('#admin_goods_dialog').modal('hide');
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

/**
 * 获取图片的url
 * @param file
 * @returns {*}
 */
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/**
 * 文本转html
 * @param strValue
 * @returns {string}
 */
function getFormatCode(strValue) {
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
}

/**
 * html转文本
 * @param strValue
 * @returns {string}
 */
function setFormatCode(strValue) {
    return strValue.replace(/<br\/>/g, '\r\n').replace(/<br\/>/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
}