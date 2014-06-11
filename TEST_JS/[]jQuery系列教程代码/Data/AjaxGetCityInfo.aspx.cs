using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Data_AjaxGetCityInfo : System.Web.UI.Page
{
    private string resultType = "json";

    protected void Page_Load(object sender, EventArgs e)
    {
        string html = string.Empty;

        //获取结果类型
        if (!String.IsNullOrEmpty( HttpContext.Current.Request["resultType"] ))
        {
            resultType = HttpContext.Current.Request["resultType"].ToLower() == "html" ? "html" : "json";
        }

        //获取数据
        if (HttpContext.Current.Request.HttpMethod.ToUpper() == "POST")
        {
            html = GetResult(resultType);
        }
        else if (HttpContext.Current.Request.HttpMethod.ToUpper() == "GET")
        {
            html = GetResult(resultType);
        }

        Response.Clear();
        Response.Write(html);
        Response.End();
        
    }

    private string GetResult(string resultType)
    {
        string result = string.Empty;

        switch (resultType.ToLower())
        {
            case "html":
                result = @"<ul><li id=""1"">阿克苏</li><li id=""2"">鞍山</li><li id=""3"">安顺</li><li>安阳</li><li>白银</li><li>保定</li><li>保山</li></ul>";
                break;
            case "json":
                result = @"
[{""pkid"":""0997"",""ProvinceId"":""XJ"",""CityName"":""阿克苏"",""CityNameEn"":""Akesu"",""PostCode"":""843000"",""isHotCity"":false},
 {""pkid"":""0412"",""ProvinceId"":""LN"",""CityName"":""鞍山"",""CityNameEn"":""Anshan"",""PostCode"":""114000"",""isHotCity"":false},
 {""pkid"":""0853"",""ProvinceId"":""GZ"",""CityName"":""安顺"",""CityNameEn"":""Anshun"",""PostCode"":""561000"",""isHotCity"":false},
 {""pkid"":""0372"",""ProvinceId"":""HN1"",""CityName"":""安阳"",""CityNameEn"":""Anyang"",""PostCode"":""455000"",""isHotCity"":false},
 {""pkid"":""0943"",""ProvinceId"":""GS"",""CityName"":""白银"",""CityNameEn"":""baiyin"",""PostCode"":""730900"",""isHotCity"":false},
 {""pkid"":""0312"",""ProvinceId"":""HB1"",""CityName"":""保定"",""CityNameEn"":""Baoding"",""PostCode"":""71000"",""isHotCity"":false},
 {""pkid"":""0875"",""ProvinceId"":""YN"",""CityName"":""保山"",""CityNameEn"":""Baoshan"",""PostCode"":""678000"",""isHotCity"":false}]";
                break;
        }

        return result;
    }
}
