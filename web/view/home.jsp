<%@ taglib prefix="c" uri="http://www.springframework.org/tags" %>
<%--
  Created by IntelliJ IDEA.
  Date: 2019/3/18
  Time: 0:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>零食购物系统</title>
    <link rel="stylesheet" href="../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--蒙板--%>
<div class="HomeOverlay" style="display: none;" id="home_over"></div>
<%--首页全屏展示--%>
<div id="home_banner" class="HomeBannerView">
    <%--轮播--%>
    <div id="topBanner" class="carousel slide" data-ride="carousel">
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
            <div class="item active">
                <img src="../../image/banner4.jpg" class="HomeTopImg">
            </div>
            <div class="item">
                <img src="../../image/banner1.jpg" class="HomeTopImg">
            </div>
            <div class="item">
                <img src="../../image/banner2.jpg" class="HomeTopImg">
            </div>
            <div class="item">
                <img src="../../image/banner3.jpg" class="HomeTopImg">
            </div>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <a class="left carousel-control" href="#topBanner" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#topBanner" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <%--顶部导航栏--%>
    <div class="HomeBannerViewTopNav">
        <ul>
            <li class="fl"><img src="../image/零食.png"></li>
            <li class="fl"><a href="/home/view">零食购物系统</a></li>
            <li class="fr"><a href="/login/view"><span class="glyphicon glyphicon-cog"></span>&nbsp;管理中心</a></li>
            <li class="fr" id="home_banner_top_home"><a href="#"><span class="glyphicon glyphicon-home"></span>&nbsp;首页</a></li>
        </ul>
    </div>
</div>
<div class="cf"></div>
<%--首页主体基本布局--%>
<div id="home_base" class="HomeBase">
    <%--顶部导航栏--%>
    <div class="HomeBaseNav" id="home_base_nav">
        <ul>
            <li class="fl"><img src="../image/零食.png"></li>
            <li class="fl"><a>零食购物系统</a></li>
            <li class="fl">
                <input id="home_base_nav_key" type="text" placeholder="请输入零食关键词">
            </li>
            <li class="fl">
                <button id="home_base_nav_search">搜索</button>
            </li>
            <li class="fr" id="home_base_nav_logout"><a href="/home/view?menu=home"><span class="glyphicon glyphicon-user"></span>&nbsp;退出登录</a></li>
            <li class="fr"><a href="/login/view"><span class="glyphicon glyphicon-cog"></span>&nbsp;管理中心</a></li>
            <li class="fr" id="home_base_nav_user"><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;个人中心</a></li>
            <li class="fr" id="home_base_nav_car"><a href="#"><span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;购物车</a></li>
            <li class="fr" id="home_base_nav_login"><a href="#home_base_nav"><span class="glyphicon glyphicon-log-in"></span>&nbsp;登录</a></li>
            <li class="fr" id="home_base_nav_sign_up"><a href="#home_base_nav"><span class="glyphicon glyphicon-user"></span>&nbsp;注册</a></li>
            <li class="fr" id="home_base_nav_home"><a href="#"><span class="glyphicon glyphicon-home"></span>&nbsp;首页</a></li>
        </ul>
    </div>
    <div class="cf"></div>
    <%--首页--%>
    <div id="home_base_home" class="HomeBaseMain">
        <%--轮播中心--%>
        <div id="home_base_home_topBanner" class="carousel slide" data-ride="carousel">
            <!-- 轮播（Carousel）指标 -->
            <ol class="carousel-indicators">
                <li data-target="#home_base_home_topBanner" data-slide-to="0" class="active"></li>
                <li data-target="#home_base_home_topBanner" data-slide-to="1"></li>
                <li data-target="#home_base_home_topBanner" data-slide-to="2"></li>
                <li data-target="#home_base_home_topBanner" data-slide-to="3"></li>
            </ol>
            <!-- 轮播（Carousel）项目 -->
            <div class="carousel-inner">
                <div class="item active">
                    <img src="../../image/banner4.jpg">
                </div>
                <div class="item">
                    <img src="../../image/banner1.jpg">
                </div>
                <div class="item">
                    <img src="../../image/banner2.jpg">
                </div>
                <div class="item">
                    <img src="../../image/banner3.jpg">
                </div>
            </div>
            <!-- 轮播（Carousel）导航 -->
            <a class="left carousel-control" href="#home_base_home_topBanner" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#home_base_home_topBanner" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <%--推荐的商品--%>
        <div id="home_base_home_hot"></div>
        <div class="cf"></div>
    </div>
    <%--登录框架--%>
    <div class="HomeLoginBg" id="home_login">
        <div>
            <div style="float: left">
                <h3 style="margin-bottom: 10px;font-weight: bold;">
                    登录零食购物系统
                </h3>
                <h4>还没有账号？&nbsp;<a id="home_login_to_sign_up">注册</a></h4>
            </div>
            <span id="home_login_close" class="close glyphicon glyphicon-remove"></span>
        </div>
        <div class="cf" style="margin-bottom: 50px;"></div>
        <input type="text" id="home_login_phone" placeholder="手机" class="form-control">
        <input type="password" id="home_login_pwd" placeholder="密码" class="form-control">
        <button id="home_login_btn_login">立即登录</button>
        <div class="sigma-content">
            <div class="sigma-middle-line">
                <span class="sigma-line-text">密码忘记请联系管理员重置</span>
            </div>
        </div>
    </div>
    <%--注册框架--%>
    <div class="HomeLoginBg" id="home_sign_up">
        <div>
            <div style="float: left">
                <h3 style="margin-bottom: 10px;font-weight: bold;">
                    注册零食购物系统
                </h3>
                <h4>已有账号？&nbsp;<a id="home_sign_up_to_login">立即登录</a></h4>
            </div>
            <span id="home_sign_up_close" class="close glyphicon glyphicon-remove"></span>
        </div>
        <div class="cf" style="margin-bottom: 50px;"></div>
        <input type="text" id="home_sign_up_name" placeholder="姓名" class="form-control">
        <input type="text" id="home_sign_up_phone" placeholder="手机" class="form-control">
        <input type="password" id="home_sign_up_pwd" placeholder="密码" class="form-control">
        <button id="home_sign_up_btn_do">立即注册</button>
        <div class="sigma-content">
            <div class="sigma-middle-line">
                <span class="sigma-line-text">温馨提示：请不要将密码泄露给他人</span>
            </div>
        </div>
    </div>
    <%--商品詳情頁--%>
    <div id="home_base_detail" class="HomeBaseMain">
        <%--商品展示--%>
        <div class="HomeBaseDetail">
            <input type="hidden" id="home_base_detail_id">
            <div class="HomeBaseDetailTop">
                <div class="HomeBaseDetailTopImg">
                    <img id="home_base_detail_img">
                </div>
                <div class="HomeBaseDetailTopInfo">
                    <h1 id="home_base_detail_title"></h1>
                    <h2 id="home_base_detail_price">￥</h2>
                    <div class="HomeBaseDetailTopInfoNum">
                        <h3>数量：</h3>
                        <input type="number" value="1" id="home_base_detail_num">
                    </div>
                    <div class="cf" style="margin-bottom: 20px;"></div>
                    <button id="home_base_detail_btn_car" class="btn btn-info">加入购物车</button>
                </div>
            </div>
            <div class="cf"></div>
            <div class="HomeBaseDetailMain">
                <p id="home_base_detail_main"></p>
            </div>
        </div>
        <div class="cf"></div>
    </div>
    <%--个人中心--%>
    <div id="home_base_user" class="HomeBaseMain">
        <div class="HomeBaseUser">
            <div class="HomeBaseUserTop">
                <h3 class="fl">我的收货地址</h3>
                <h3 class="fr"><span id="home_base_user_addr_btn" class="glyphicon glyphicon-chevron-down"></span></h3>
            </div>
            <div id="home_base_user_addr_main" class="HomeBaseUserMain">
                <div id="home_base_user_addr_toolbar">
                    <button onclick="addAddr()" class="btn btn-info" data-toggle="modal" data-target="#home_base_user_addr_dialog"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加收货地址</button>
                </div>
                <table id="home_base_user_addr_table" class="table"></table>
            </div>
        </div>
        <div class="cf"></div>
        <div class="HomeBaseUser">
            <div class="HomeBaseUserTop">
                <h3 class="fl">我的订单</h3>
                <h3 class="fr"><span id="home_base_user_order_btn" class="glyphicon glyphicon-chevron-down"></span></h3>
            </div>
            <div id="home_base_user_order_main" class="HomeBaseUserMain">
                <table id="home_base_user_order_table" class="table"></table>
            </div>
        </div>
        <div class="cf"></div>
    </div>
    <%--购物车--%>
    <div id="home_base_car" class="HomeBaseMain">
        <div id="home_base_car_list"></div>
        <div id="home_base_car_tool" class="HomeBaseCarBottom">
            <button id='home_base_car_btn'>去结算</button>
            <h3>合计：<span id='home_base_car_all'>0</span></h3>
        </div>
        <div class="cf"></div>
    </div>
    <%--搜索--%>
    <div id="home_base_search" class="HomeBaseMain">
    </div>
    <%--底部--%>
    <div class="HomeBaseBottom">
        © 2019 零食购物系统. All rights reserved.
    </div>
</div>
<%--确认订单对话框--%>
<div id='home_base_car_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_base_car_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_base_car_dialog_label' class='modal-title'>订单确认</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">收货地址</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="home_base_car_dialog_addr">
                                <option>请选择收货地址</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">购物清单</label>
                        <div class="col-sm-10" id="home_base_car_dialog_list"></div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">价格合计</label>
                        <div class="col-sm-10">
                            <h3 class="modal-title" style="vertical-align: middle;color: red;" id="home_base_car_dialog_all"></h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_base_car_dialog_add" type="button" class="btn btn-info">提交订单</button>
            </div>
        </div>
    </div>
</div>
<%--收货地址操作对话框--%>
<div id='home_base_user_addr_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_base_user_addr_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_base_user_addr_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='home_base_user_addr_dialog_id'/>
                <div class='form-horizontal' id='home_base_user_addr_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="home_base_user_addr_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机</label>
                        <div class="col-sm-10">
                            <input id="home_base_user_addr_dialog_phone" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <textarea id="home_base_user_addr_dialog_addr" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div id='home_base_user_addr_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_base_user_addr_dialog_add" type="button" class="btn btn-info">添加</button>
                <button id="home_base_user_addr_dialog_edit" type="button" class="btn btn-info">编辑</button>
                <button id="home_base_user_addr_dialog_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--取消订单--%>
<div id='home_close_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_close_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_close_dialog_label' class='modal-title'>取消订单</h4>
            </div>
            <div class='modal-body'>
                <input type="hidden" id="home_close_dialog_id">
                <h4>确认要取消吗？不可恢复哦？</h4>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_close_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/home.js"></script>
</body>
</html>
