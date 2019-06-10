<%--
  Created by IntelliJ IDEA.
  Date: 2019/4/8
  Time: 10:25
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
<body class="AdminBase">
<%--顶部导航栏--%>
<div class="HomeBaseNav">
    <ul>
        <li class="fl"><img src="../image/零食.png"></li>
        <li class="fl"><a>零食购物系统</a></li>
        <li class="fl" id="admin_nav_goods_add">
            <button data-toggle="modal" data-target="#admin_goods_dialog" onclick="addGoods()">添加商品</button>
        </li>
        <li class="fr"><a href="/"><span class="glyphicon glyphicon-log-out"></span>&nbsp;回到首页</a></li>
        <li class="fr" id="admin_nav_user"><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;用户管理</a></li>
        <li class="fr" id="admin_nav_order"><a href="#"><span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;订单中心</a></li>
        <li class="fr" id="admin_nav_goods"><a href="#"><span class="glyphicon glyphicon-home"></span>&nbsp;商品管理</a></li>
    </ul>
</div>
<div class="cf"></div>
<%--商品管理--%>
<div id="admin_goods" class="AdminMain">
    <table id="admin_goods_table" class="table"></table>
</div>
<%--商品操作对话框--%>
<div id='admin_goods_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_goods_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_goods_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_goods_dialog_id'/>
                <div class='form-horizontal' id='admin_goods_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">商品名称</label>
                        <div class="col-sm-10">
                            <input id="admin_goods_dialog_title" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">商品介绍</label>
                        <div class="col-sm-10">
                            <textarea id="admin_goods_dialog_detail" class="form-control" rows="11"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">商品图片</label>
                        <div class="col-sm-10">
                            <img id="admin_goods_dialog_img" src="../image/图片.png" style="max-width:100%;max-height:200px;border-radius: 6px;">
                            <form id="admin_goods_dialog_form" enctype="multipart/form-data" style="display: none;">
                                <input id="admin_goods_dialog_file" name="file" type="file" accept="image/gif, image/png, image/jpg, image/jpeg">
                            </form>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">商品价格</label>
                        <div class="col-sm-10">
                            <input id="admin_goods_dialog_price" class="form-control" type="number">
                        </div>
                    </div>
                </div>
                <div id='admin_goods_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_goods_dialog_add" type="button" class="btn btn-info">添加</button>
                <button id="admin_goods_dialog_edit" type="button" class="btn btn-info">编辑</button>
                <button id="admin_goods_dialog_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--订单管理--%>
<div id="admin_order" class="AdminMain">
    <table id="admin_order_table" class="table"></table>
</div>
<%--用户管理--%>
<div id="admin_user" class="AdminMain">
    <table id="admin_user_table" class="table"></table>
</div>
<%--用户管理对话框--%>
<div id='admin_user_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_user_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_user_dialog_label' class='modal-title'>修改用户信息</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_user_dialog_id'/>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_phone" type="text" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_pwd" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_user_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/admin.js"></script>
</body>
</html>
