//购物车数据
var car_data = null;
var buy_list = null;

/**
 * 页面启动入口
 */
$(function () {
    initPage();
});

/**
 * 初始化页面
 */
function initPage() {
    //路由控制
    var menu = getUrlParam("menu");
    if (null == menu || menu == 'null') {
        //默认首页展示页
        initBanner();
    } else {
        //初始化顶部导航栏，判断用户是否登录
        var id = getUrlParam("id");
        if (id == null || 'null' == id) {
            $('#home_base_nav_login').show();
            $('#home_base_nav_sign_up').show();
            $('#home_base_nav_user').hide();
            $('#home_base_nav_car').hide();
            $('#home_base_nav_logout').hide();
        } else {
            $('#home_base_nav_logout').show();
            $('#home_base_nav_user').show();
            $('#home_base_nav_car').show();
            $('#home_base_nav_login').hide();
            $('#home_base_nav_sign_up').hide();
        }
        switch (menu) {
            case 'home':
                initHome();
                break;
            case 'detail':
                initDetail();
                break;
            case 'user':
                initUser();
                break;
            case 'car':
                initCar();
                break;
            case 'search':
                initSearch();
                break;
        }
    }
}

/**
 * 绑定购物车
 */
$('#home_base_nav_car').click(function () {
    window.location = '/home/view?menu=car&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
});

/**
 * 绑定个人中心
 */
$('#home_base_nav_user').click(function () {
    window.location = '/home/view?menu=user&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
});

/**
 * 綁定首頁按鈕
 */
$('#home_base_nav_home').click(function () {
    window.location = '/home/view?menu=home&id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&key=" + getUrlParam('key') + "&detail=" + getUrlParam("detail");
});

/**
 * 绑定搜索按钮
 */
$('#home_base_nav_search').click(function () {
    var key = $('#home_base_nav_key').val();
    window.location = '/home/view?menu=search&id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&key=" + key;
});

/**
 * 绑定登录按钮
 */
$('#home_base_nav_login').click(function () {
    $('#home_over').show();
    $('#home_login').show();
    $(document.body).css('overflow','hidden');
});

/**
 * 绑定关闭登录框按钮
 */
$('#home_login_close').click(function () {
    $('#home_login').hide();
    $('#home_over').hide();
    $(document.body).css('overflow','auto');
});

/**
 * 绑定注册按钮
 */
$('#home_base_nav_sign_up').click(function () {
    $('#home_over').show();
    $('#home_sign_up').show();
    $(document.body).css('overflow','hidden');
});

/**
 * 绑定关闭注册框按钮
 */
$('#home_sign_up_close').click(function () {
    $('#home_sign_up').hide();
    $('#home_over').hide();
    $(document.body).css('overflow','auto');
});

/**
 * 进入注册
 */
$('#home_login_to_sign_up').click(function () {
    $('#home_login_close').click();
    $('#home_base_nav_sign_up').click();
});

/**
 * 进入登录
 */
$('#home_sign_up_to_login').click(function () {
    $('#home_sign_up_close').click();
    $('#home_base_nav_login').click();
});

/**
 * 绑定立即登录按钮
 */
$('#home_login_btn_login').click(function () {
    //获取数据
    var phone = $('#home_login_phone').val();
    var pwd = $('#home_login_pwd').val();
    if ('' == phone) {
        alert('请输入手机号!');
        return;
    }
    if ('' == pwd) {
        alert('请输入密码!');
        return;
    }
    if (!isPoneAvailable(phone)) {
        alert('手机号格式错误!');
        return;
    }
    //封装数据
    var data = {
        action:'ACTION_HOME_LOGIN',
        phone: phone,
        pwd: pwd
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            window.location = '/home/view?menu=' + getUrlParam('menu') + '&id=' + res.id + '&name=' + res.name + "&key=" + getUrlParam('key') + "&detail=" + getUrlParam("detail");
        },
        error: function () {
            alert('手机号/密码错误!');
        }
    });
});

/**
 * 绑定立即注册按钮
 */
$('#home_sign_up_btn_do').click(function () {
    //获取数据
    var phone = $('#home_sign_up_phone').val();
    var pwd = $('#home_sign_up_pwd').val();
    var name = $('#home_sign_up_name').val();
    if ('' == name) {
        alert('请输入姓名!');
        return;
    }
    if ('' == phone) {
        alert('请输入手机号!');
        return;
    }
    if ('' == pwd) {
        alert('请输入密码!');
        return;
    }
    if (!isPoneAvailable(phone)) {
        alert('手机号格式错误!');
        return;
    }
    //封装数据
    var data = {
        action:'ACTION_HOME_SIGN_UP',
        phone: phone,
        pwd: pwd,
        name:name
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                $('#home_login_phone').val(phone);
                $('#home_login_pwd').val(pwd);
                $('#home_login_btn_login').click();
            } else {
                alert('该手机号已被注册!');
            }
        },
        error: function () {
            alert('服务器异常，注册失败!');
        }
    });
});

/**
 * 初始化Banner页
 */
function initBanner() {
    $('#home_banner').fadeIn(500);
    //绑定导航栏按钮
    $('#home_banner_top_home').click(function () {
       window.location = "/home/view?menu=home";
    });
}

/**
 * 初始化首页
 */
function initHome() {
    $('#home_base').fadeIn(500);
    //获取推荐商品
    var data = {
        action:'ACTION_HOME_GET_HOT_GOODS'
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res != null && res.length>0) {
                $.each(res,function (i,obj) {
                    var hot = "<div onclick='openDetail(\"" + obj.id + "\")' class=\"HomeBaseMainCard\">" +
                        "                <div class=\"HomeBaseMainCardTop\">" +
                        "                    <h3><a href=\"#\">今日推荐&nbsp;&nbsp;<span class=\"glyphicon glyphicon-circle-arrow-right\"></span></a></h3>" +
                        "                </div>" +
                        "                <div class=\"HomeBaseMainCardBottom\">" +
                        "                    <img src=\"/files/" + obj.img + "\">" +
                        "                </div>" +
                        "                <div class=\"HomeBaseMainCardBottomInfo\">" +
                        "                    <h3>" + obj.title + "</h3>" +
                        "                    <h4>￥" + obj.price + "</h4>" +
                        "                </div>" +
                        "            </div>";
                    $('#home_base_home_hot').append(hot);
                });
            } else {
                var hot = "<div class=\"HomeBaseMainCardNo\">暂无推荐零食</div>";
                $('#home_base_home_hot').append(hot);
            }
        },
        error: function () {
            var hot = "<div class=\"HomeBaseMainCardNo\">暂无推荐零食</div>";
            $('#home_base_home_hot').append(hot);
        }
    });
    $('#home_base_home').show();
}

/**
 * 初始化商品詳情頁
 */
function initDetail() {
    $('#home_base').fadeIn(500);
    var detail = getUrlParam('detail');
    //获取推荐商品
    var data = {
        action:'ACTION_HOME_GET_GOODS_DETAIL',
        id:detail
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            $('#home_base_detail_img').attr('src','/files/' + res.img);
            $('#home_base_detail_title').html(res.title);
            $('#home_base_detail_price').html('￥' + res.price);
            $('#home_base_detail_main').html(res.detail);
            $('#home_base_detail_id').val(res.id);
        },
        error:function() {
            alert('获取商品数据失败!');
            $('#home_base_nav_home').click();
        }
    });
    //获取商品详细数据
    $('#home_base_detail').fadeIn(500);
}

/**
 * 绑定加入购物车按钮
 */
$('#home_base_detail_btn_car').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user) {
        //用户未登录
        $('#home_base_nav_login').click();
    } else {
        var id = $('#home_base_detail_id').val();
        var num = $('#home_base_detail_num').val();
        var data = {
            action:'ACTION_HOME_ADD_CAR',
            goodid:id,
            userid:user,
            count:num
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('加入购物车成功!');
                } else {
                    alert('加入购物车失败!');
                }
            },
            error:function() {
                alert('加入购物车失败!');
            }
        });
    }
});

/**
 * 查看商品详情
 * @param id
 */
function openDetail(id) {
    window.open('/home/view?menu=detail&id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&key=" + getUrlParam('key') + "&detail=" + id)
}

/**
 * 初始化个人中心
 */
function initUser() {
    $('#home_base').fadeIn(500);
    $('#home_base_user').fadeIn(500);
}

/**
 * 我的地址按钮绑定
 */
$('#home_base_user_addr_btn').click(function () {
    if($('#home_base_user_addr_main').is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏
        $('#home_base_user_addr_btn').removeClass('glyphicon-chevron-down');
        $('#home_base_user_addr_btn').addClass('glyphicon-chevron-up');
        initAddrTable(1);
    }else{
        $('#home_base_user_addr_btn').removeClass('glyphicon-chevron-up');
        $('#home_base_user_addr_btn').addClass('glyphicon-chevron-down');
    }
    $('#home_base_user_addr_main').slideToggle(500);
});

/**
 * 绑定我的订单按钮
 */
$('#home_base_user_order_btn').click(function () {
    if($('#home_base_user_order_main').is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏
        $('#home_base_user_order_btn').removeClass('glyphicon-chevron-down');
        $('#home_base_user_order_btn').addClass('glyphicon-chevron-up');
        initOrderTable(1);
    }else{
        $('#home_base_user_order_btn').removeClass('glyphicon-chevron-up');
        $('#home_base_user_order_btn').addClass('glyphicon-chevron-down');
    }
    $('#home_base_user_order_main').slideToggle(500);
});

/**
 * 初始化地址信息表
 */
function initAddrTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_HOME_GET_ADDR',userid:getUrlParam("id")},
        id:'#home_base_user_addr_table',
        toolbar:'#home_base_user_addr_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'phone',
            title: '手机',
            align: 'center'
        }, {
            field: 'addr',
            title: '地址',
            align: 'center',
            width: '500px'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var addr = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#home_base_user_addr_dialog\" onclick='editAddr(\"" + addr + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#home_base_user_addr_dialog\" onclick='delAddr(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化订单信息表
 * @param pageNumber
 */
function initOrderTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_HOME_GET_ORDER',userid:getUrlParam("id")},
        id:'#home_base_user_order_table',
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
                    return "<button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#home_close_dialog\" onclick='delOrder(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;取消订单</button>";
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
 * 取消订单
 * @param id
 */
function delOrder(id) {
    $('#home_close_dialog_id').val(id);
}

/**
 * 绑定取消订单
 */
$('#home_close_dialog_ok').click(function () {
    var id = $('#home_close_dialog_id').val();
    var data = {
        action:'ACTION_HOME_DEL_ORDER',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('取消成功!');
                $('#home_close_dialog').modal('hide');
                initOrderTable($('#home_base_user_order_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('取消失败!');
            }
        },
        error:function() {
            alert('取消失败!');
        }
    });
});

/**
 * 初始化地址对话框
 */
function initAddrDialog() {
    $('#home_base_user_addr_dialog_body').hide();
    $('#home_base_user_addr_dialog_warn').hide();
    $('#home_base_user_addr_dialog_add').hide();
    $('#home_base_user_addr_dialog_edit').hide();
    $('#home_base_user_addr_dialog_del').hide();
}

/**
 * 添加地址
 */
function addAddr() {
    initAddrDialog();
    $('#home_base_user_addr_dialog_body').show();
    $('#home_base_user_addr_dialog_add').show();
    $('#home_base_user_addr_dialog_label').html('添加地址');
    $('#home_base_user_addr_dialog_name').val('');
    $('#home_base_user_addr_dialog_phone').val('');
    $('#home_base_user_addr_dialog_addr').val('');
}

/**
 * 绑定添加地址按钮
 */
$('#home_base_user_addr_dialog_add').click(function () {
    var name = $('#home_base_user_addr_dialog_name').val();
    var phone = $('#home_base_user_addr_dialog_phone').val();
    var addr = $('#home_base_user_addr_dialog_addr').val();
    if ('' == name || '' == phone || '' == addr) {
        alert('数据无效!');
    } else {
        var data = {
            action:'ACTION_HOME_ADD_ADDR',
            name:name,
            phone:phone,
            addr:addr,
            userid:getUrlParam("id")
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('添加成功!');
                    $('#home_base_user_addr_dialog').modal('hide');
                    initAddrTable(1);
                } else {
                    alert('添加失败!');
                }
            },
            error:function() {
                alert('添加失败!');
            }
        });
    }
});

/**
 * 编辑地址
 * @param data
 */
function editAddr(data) {
    var addr = JSON.parse(unescape(data));
    initAddrDialog();
    $('#home_base_user_addr_dialog_body').show();
    $('#home_base_user_addr_dialog_edit').show();
    $('#home_base_user_addr_dialog_label').html('修改地址');
    $('#home_base_user_addr_dialog_name').val(addr.name);
    $('#home_base_user_addr_dialog_phone').val(addr.phone);
    $('#home_base_user_addr_dialog_addr').val(addr.addr);
    $('#home_base_user_addr_dialog_id').val(addr.id);
}

/**
 * 绑定修改地址按钮
 */
$('#home_base_user_addr_dialog_edit').click(function () {
    var name = $('#home_base_user_addr_dialog_name').val();
    var phone = $('#home_base_user_addr_dialog_phone').val();
    var addr = $('#home_base_user_addr_dialog_addr').val();
    var id = $('#home_base_user_addr_dialog_id').val();
    if ('' == name || '' == phone || '' == addr) {
        alert('数据无效!');
    } else {
        var data = {
            action:'ACTION_HOME_EDIT_ADDR',
            name:name,
            phone:phone,
            addr:addr,
            id:id
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#home_base_user_addr_dialog').modal('hide');
                    initAddrTable($('#home_base_user_addr_table').bootstrapTable('getOptions').pageNumber);
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
 * 删除地址
 * @param id
 */
function delAddr(id) {
    initAddrDialog();
    $('#home_base_user_addr_dialog_warn').show();
    $('#home_base_user_addr_dialog_del').show();
    $('#home_base_user_addr_dialog_label').html('删除地址');
    $('#home_base_user_addr_dialog_id').val(id);
}

/**
 * 绑定删除地址按钮
 */
$('#home_base_user_addr_dialog_del').click(function () {
    var id = $('#home_base_user_addr_dialog_id').val();
    var data = {
        action:'ACTION_HOME_DEL_ADDR',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#home_base_user_addr_dialog').modal('hide');
                initAddrTable($('#home_base_user_addr_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error:function() {
            alert('删除失败!');
        }
    });
});

/**
 * 初始化购物车
 */
function initCar() {
    buy_list = new Array();
    $('#home_base').fadeIn(500);
    //获取我的购物车
    var data = {
        action:'ACTION_HOME_GET_CAR',
        id:getUrlParam("id")
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res!=null && res.length>0) {
                $('#home_base_car_tool').show();
                car_data = res;
                $.each(res,function (i,obj) {
                    var car = "<div class=\"HomeBaseCarMain\">" +
                        "            <input id='checkbox_" + i + "' type=\"checkbox\">" +
                        "            <img src=\"/files/" + obj.img + "\">" +
                        "            <h3>" + obj.title + "</h3>" +
                        "            <h4>单价：</h4>" +
                        "            <h3 class=\"HomeBaseCarMainPrice\">" + obj.price + "</h3>" +
                        "            <h4>数量：</h4>\n" +
                        "            <input id='num_" + i + "' class=\"HomeBaseCarMainNum\" type=\"number\" value=\"" + obj.count + "\">" +
                        "            <h3 id='total_" + i + "' class=\"fr HomeBaseCarMainPrice HomeBaseCarMainMustRight\">" + parseFloat(obj.price) * parseFloat(obj.count) + "</h3>" +
                        "            <h4 class='fr HomeBaseCarMainMustRight'>合计：</h4>" +
                        "        </div>" +
                        "        <button onclick='delCar(\"" + obj.id + "\")' class='fr btn btn-info'>删除</button>"+
                        "        <div class=\"cf\"></div>";
                    $('#home_base_car_list').append(car);
                    $('#checkbox_' + i).change(function () {
                       if ($(this).get(0).checked) {
                           var pay = parseFloat(car_data[i].price) * parseFloat(car_data[i].count);
                           var all = parseFloat($('#home_base_car_all').html());
                           all = all+pay;
                           $('#home_base_car_all').html(all);
                           //加入购买列表
                           buy_list.push(i);
                           console.log(buy_list);
                       } else {
                           var pay = parseFloat(car_data[i].price) * parseFloat(car_data[i].count);
                           var all = parseFloat($('#home_base_car_all').html());
                           all = all-pay;
                           $('#home_base_car_all').html(all);
                           //移出购买列表
                           buy_list.splice(buy_list.indexOf(i),1);
                           console.log(buy_list);
                       }
                    });
                    //数量改变
                    $('#num_' + i).change(function () {
                        if ($('#checkbox_' + i).get(0).checked) {
                            $('#checkbox_' + i).click();
                            car_data[i].count = $(this).val();
                            $('#checkbox_' + i).click();
                        } else {
                            car_data[i].count = $(this).val();
                        }
                        $('#total_' + i).html(parseFloat(car_data[i].price) * parseFloat($(this).val()));
                    });
                });
            } else {
                $('#home_base_car_tool').hide();
                var car = "<div class=\"HomeBaseCarNo\">这里什么也没有!</div>";
                $('#home_base_car_list').append(car);
            }
        },
        error:function() {
            $('#home_base_car_tool').hide();
            var car = "<div class=\"HomeBaseCarNo\">这里什么也没有!</div>";
            $('#home_base_car_list').append(car);
        }
    });
    $('#home_base_car').fadeIn(500);
}

/**
 * 移除购物车
 * @param id
 */
function delCar(id) {
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: {action: 'ACTION_HOME_DEL_CAR', id: id},
        success: function (res) {
            if (res) {
                $('#home_base_nav_car').click();
            } else {
                alert('服务器异常!');
            }
        },
        error: function () {
            alert('服务器异常!');
        }
    });
}

/**
 * 绑定去结算按钮
 */
$('#home_base_car_btn').click(function () {
    if (buy_list != null && buy_list.length>0) {
        $('#home_base_car_dialog').modal('show');
        $('#home_base_car_dialog_list').empty();
        $('#home_base_car_dialog_addr').empty();
        $('#home_base_car_dialog_addr').append("<option>请选择收货地址</option>");
        //获取收货地址
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: {action:'ACTION_HOME_GET_ADDR',userid:getUrlParam("id")},
            success: function (res) {
                if (res != null && res.length>0) {
                    $.each(res,function (i,obj) {
                       var op = "<option value='" + obj.id + "' data-placement=\"left\" data-toggle=\"tooltip\" title='" + obj.name + "-" + obj.phone + "-" + obj.addr + "'>" + obj.name + "-" + obj.phone + "-" + obj.addr + "</option>";
                       $('#home_base_car_dialog_addr').append(op);
                        $("[data-toggle='tooltip']").tooltip();
                    });
                } else {
                    console.log('获取收货地址失败!');
                }
            },
            error: function () {
                console.log('获取收货地址失败!');
            }
        });
        //配置清单
        $.each(buy_list,function () {
            var index = this;
            var item = "<h4 style=\"margin-bottom: 10px;\">" + car_data[index].title + "×" + car_data[index].count + "&nbsp;&nbsp;<span style=\"color: red;\">￥" + parseFloat(car_data[index].price) * parseFloat(car_data[index].count) + "</span></h4>";
            $('#home_base_car_dialog_list').append(item);
        });
        //配置总价
        $('#home_base_car_dialog_all').html($('#home_base_car_all').html());
    } else {
        alert('请先勾选要结算的商品!');
    }
});

/**
 * 绑定提交订单按钮
 */
$('#home_base_car_dialog_add').click(function () {
    var list = new Array();
    var car_list = '';
    $.each(buy_list,function () {
        list.push(car_data[this]);
        car_list += car_data[this].id + ',';
    });
    car_list = car_list.substr(0,car_list.length-1);
    var addr = $('#home_base_car_dialog_addr').val();
    if (addr == '请选择收货地址') {
        alert('请选择收货地址!');
    } else {
        //数据封装
        var data = {
            action:'ACTION_HOME_ADD_ORDER',
            userid:getUrlParam("id"),
            addrid:addr,
            list:JSON.stringify(list),
            time:getNowFormatDate(),
            total:$('#home_base_car_dialog_all').html(),
            car_list:car_list
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('购买成功!');
                    $('#home_base_car_dialog').modal('hide');
                    $('#home_base_nav_car').click();
                } else {
                    alert('服务器异常，购买失败!');
                }
            },
            error: function () {
                alert('服务器异常，购买失败!');
            }
        });
    }
});

/**
 * 初始化搜索页
 */
function initSearch() {
    $('#home_base_search').fadeIn(500);
    $('#home_base').fadeIn(500);
    $('#home_base_nav_key').val(getUrlParam("key"));
    //获取搜索结果
    var data = {
        action:'ACTION_HOME_SEARCH',
        key:getUrlParam("key")
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res != null && res.length>0) {
                $.each(res,function (i,obj) {
                    var hot = "<div onclick='openDetail(\"" + obj.id + "\")' class=\"HomeBaseMainCard\">" +
                        "                <div class=\"HomeBaseMainCardBottom\">" +
                        "                    <img src=\"/files/" + obj.img + "\">" +
                        "                </div>" +
                        "                <div class=\"HomeBaseMainCardBottomInfo\">" +
                        "                    <h3>" + obj.title + "</h3>" +
                        "                    <h4>￥" + obj.price + "</h4>" +
                        "                </div>" +
                        "            </div>";
                    $('#home_base_search').append(hot);
                });
            } else {
                var hot = "<div class=\"HomeBaseMainCardNo\">暂无搜索结果!</div>";
                $('#home_base_search').append(hot);
            }
        },
        error: function () {
            var hot = "<div class=\"HomeBaseMainCardNo\">暂无搜索结果!</div>";
            $('#home_base_search').append(hot);
        }
    });
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

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
 * 手机号校验
 * @param pone
 * @returns {boolean}
 */
function isPoneAvailable(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
        return false;
    } else {
        return true;
    }
}