package com.main.controller;

import com.main.bean.AdminBean;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static com.main.utils.ConstUtil.ACTION_ADMIN_LOGIN;

/**
 * @author
 * @date 2019/04/08
 * @describe 管理员登录页控制器
 */
@Controller
@RequestMapping("/login")
public class LoginController {
    /**
     * 获取Login页面
     * @return
     */
    @RequestMapping("/view")
    public String login() {
        return "/view/login";
    }

    /**
     * 处理浏览器POST请求
     * @param req
     * @param res
     */
    @RequestMapping(value="/action",method= RequestMethod.POST)
    public void action(HttpServletRequest req, HttpServletResponse res) throws IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        res.setCharacterEncoding("utf-8");
        //获取动作
        String action = req.getParameter("action");
        //获取回写对象
        PrintWriter printWriter = res.getWriter();
        //动作分发
        switch (action) {
            case ACTION_ADMIN_LOGIN:
                printWriter.print(doAdminLogin(req));
                break;
        }
    }

    /**
     * 管理员登录动作
     * @param req
     * @return
     */
    private String doAdminLogin(HttpServletRequest req) {
        String sql = "select * from admin where name=? and pwd=?";
        String[] p = {req.getParameter("name"), Base64Util.encode(req.getParameter("pwd"))};
        AdminBean adminBean = SqlHelper.doObjQuery(sql,p,AdminBean.class);
        if (adminBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(adminBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }
}
