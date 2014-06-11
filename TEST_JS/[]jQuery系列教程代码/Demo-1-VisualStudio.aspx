<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo-1-VisualStudio.aspx.cs"
    Inherits="jquery_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>jQuery脚本引用示例</title>
    <asp:PlaceHolder Visible="false" runat="server">
        <script type="text/javascript" src="scripts/jquery-1.3.2-vsdoc2.js"></script>
    </asp:PlaceHolder>
    <% =jQueryScriptBlock %>
</head>
<body>
    <script type="text/javascript">
        //输入"$"试试!              
    </script>
</body>
</html>
