using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Data_AjaxGetMethod : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        string param = string.Empty;

        var url = Request.Url.ToString();

        //获取传入的resultType参数
        if (!String.IsNullOrEmpty(HttpContext.Current.Request["Param"]))
        {
            param = HttpContext.Current.Request["Param"];
        }

        Response.Clear();
        Response.Write("Http Method: " + HttpContext.Current.Request.HttpMethod.ToUpper() + ", Param:" + param);
        Response.End();
        
    }
}
