<!-- 
var flash_js_included=true;
if( typeof(Hjplayer_Nums)=="undefined" ){
	Hjplayer_Nums=-1;
}
var Hjplayer_Nums=-1;
function GetFileType(afilename){
	afilename=afilename.toLowerCase();
	if( afilename.lastIndexOf(".mp3")!=-1){
		return "wmp";
	}else if( afilename.lastIndexOf(".wmv")!=-1){
		return "wmp";
	}else if( afilename.lastIndexOf(".wma")!=-1){
		return "wmp";
	}else if( afilename.lastIndexOf(".asf")!=-1){
		return "wmp";
	}else if( afilename.lastIndexOf(".avi")!=-1){
		return "wmp";
	}else if( afilename.lastIndexOf(".rm")!=-1){
		return "real";
	}else if( afilename.lastIndexOf(".rmvb")!=-1){
		return "real";
	}else if( afilename.lastIndexOf(".flv")!=-1){
		return "flash";
	}else if( afilename.lastIndexOf(".gif")!=-1){
		return "wmp";
	}else if( afilename.lastIndexOf(".xml")!=-1){
		return "flash";
	}
	return "wmp";
}
function GetFlash(id, playerfile, flashvers ,width, height, NotTransparent){
	if(playerfile.toLowerCase().indexOf("HjPlayer.swf")!=-1){
		NotTransparent=true;
	}
	if(NotTransparent==true){
		NotTransparent="window";
	}else{
		NotTransparent="transparent";
	}
	var str="<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0'";
	str+="width='"+ width+ "' height='"+ height+ "' id='"+ id +"' align='middle' >";
	str+="<param name='allowScriptAccess' value='always' />";
	str+="<param name='movie' value='"+playerfile+"' />";
	str+="<param name='quality' value='high' />";
	str+="<param name='scale' value='noScale' />";
	str+="<param name='align' value='tl' />";
	str+="<param name='allowFullScreen' value='true' />";
	str+="<param name='wmode' value='"+NotTransparent+"' />"; 
	str+="<param name='allowFullScreen' value='true' />";
	str+="<param name='flashvars' value='"+flashvers+"' />";
	str+="<embed src='"+playerfile+"' quality='high' wmode='"+NotTransparent+"' scale='noScale' bgcolor='#ffffff' width='"+ width+ "' height='"+ height+ "' flashvars='"+flashvers+"' name='"+ id +"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'/>";
	str+="</object>";
	document.write(str);
}
function GetFlashCode(id, playerfile, flashvers ,width, height, transparent){
	if(playerfile.toLowerCase().indexOf("HjPlayer.swf")!=-1){
		NotTransparent=true;
	}
	if(transparent!=true){
		transparent="window";
	}else{
		transparent="transparent";
	}
	var str="<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0'";
	str+="width='"+ width+ "' height='"+ height+ "' id='"+ id +"' align='middle' >";
	str+="<param name='allowScriptAccess' value='always' />";
	str+="<param name='movie' value='"+playerfile+"' />";
	str+="<param name='quality' value='high' />";
	str+="<param name='scale' value='noScale' />";
	str+="<param name='allowFullScreen' value='true' />";
	str+="<param name='wmode' value='"+transparent+"' />"; 
	str+="<param name='flashvars' value='"+flashvers+"' />";
	str+="<param name='allowFullScreen' value='true' />";
	str+="<embed src='"+playerfile+"' quality='high' scale='noScale'  wmode='"+transparent+"' allowFullScreen='true' bgcolor='#ffffff' width='"+ width+ "' height='"+ height+ "' flashvars='"+flashvers+"' name='"+ id +"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />";
	str+="</object>";
	return str;
}
function GetWord(aWord){
	var ID= 9999999*Math.random(); 
	GetFlash("hjw_"+ ID, "http://dict.hjenglish.com/speaker_wv.swf", "w="+ aWord.split(" ").join("#"), 16, 16, false ); 
}
function GetHjPlayer(id, playerfile, flashvers ,width, height){ 
	var hjpid=Math.floor(Math.random()*1000); 
	Hjplayer_Nums++;
	if(Hjplayer_Nums>0){
		id=id+"_"+Hjplayer_Nums;
	}
	var str="<div id='HjPlayer_div' name='HjPlayer_div' style='width:"+ width +"px;height:"+ height + "px;' valign='top'>";  
	str+="<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0'";
	str+="width='"+ width+ "' height='"+ height+ "' id='"+ id +"' align='middle' valign='top' >";
	str+="<param name='allowScriptAccess' value='always' />";
	str+="<param name='movie' value='"+playerfile+"' />";
	str+="<param name='quality' value='high' />";
	str+="<param name='scale' value='noScale' />";
	str+="<param name='wmode' value='window' />";
	str+="<param name='bgcolor' value='#ffffff' />";
	str+="<param name='allowFullScreen' value='true' />";
	str+="<param name='flashvars' value='"+flashvers+"&hjpid="+hjpid+"' />";
	str+="<embed src='"+playerfile+"' quality='high' scale='noScale' allowFullScreen='true' bgcolor='#ffffff' width='"+ width+ "' height='"+ height+ "' flashvars='"+flashvers+"' name='"+ id +"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'/>";
	str+="</object>";
	str+="</div>";
	str+="<TABLE id='hjpcp_table"+ hjpid +"' style='display:none;padding:0px,margin:0px' border='0' width='"+ width +"' valign='top' cellspacing='0' cellpadding='0'>";
	str+="<TR>";
	str+="<TD>";
	str+="<div style='padding:0px;margin:0px;position:absolute;width:"+ width +"px;border:0px;align=left' id='hjpcp_div"+ hjpid +"' >"; 
	str+="</div>";
	str+="</TD>";
	str+="</TR>";
	str+="</TABLE>";
	document.write(str);
}
function ShiftMedia(targetmedia){
	var oPlayer = document.getElementById("hjplayer");  
	oPlayer.SetVariable("ShiftMedia", targetmedia);
	return false;
}
function GetWmp(ReturnHtmlStringP, id_name, mediafile, width, height){
	var str="<object  classid='clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6'  id='"+id_name+"'  width='"+ width+ "' height='"+ height+ "' >";
	str+="	<param name='uiMode' value='none'/>";
	str+="	<param name='URL' value='"+ mediafile +"'/>";
	str+="	<param name='autoStart' value='true'/>";
	str+="	<param name='enableContextMenu' value='false'/>";
	str+="	<embed type='video/x-ms-wmv' align='middle' width='"+ width+ "'  height='"+ height+ "' loop='false' name='"+id_name+"' />";
	str+="</object>";
	if(ReturnHtmlStringP){
		return str;
	}else{
		document.write(str);
	} 
}
function GetReal(ReturnHtmlStringP, id_name, mediafile, width, height){
	var str="<object  classid='CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA'  id='"+id_name+"' width='"+ width+ "' height='"+ height+ "' >";
	str+="	<param name='controls' value='ImageWindow'/>";
	str+="	<param name='src' value='"+ mediafile +"'/>";
	str+="	<param name='AUToSTART' value='true'/>";
	str+="	<embed type='audio/x-pn-realaudio-plugin' align='middle' width='"+ width+ "'  height='"+ height+ "' loop='false' name='"+id_name+"' />";
	str+="</object>";
	if(ReturnHtmlStringP){
		return str;
	}else{
		document.write(str);
	} 
}
function GetPodcastPlayer(){
	//
} 
//-------------------- mp3player的分类窗口 --------------------------------------------
function ShowList( ){   
	var oNewItem = document.getElementById("mp3player_list"); 
	oNewItem.innerHTML = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0' width='300' height='200' id='HjControl' align='middle'><param name='allowScriptAccess' value='always' /><param name='movie' value='http://www.hjenglish.com/images/hjplayer/sublist.swf' /><param name='wmode' value='transparent' /><embed src='http://www.hjenglish.com/images/hjplayer/sublist.swf' quality='middle' wmode='transparent' bgcolor='#ffffff' width='320' height='260' name='HjPlayer' align='middle' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /></object>";
	//document.body.appendChild(oNewItem);
}
function Close_sublist_div(){
	var oNewItem = document.getElementById("mp3player_list"); 
	oNewItem.innerHTML = ""; 
}
//--------------------- 沪江播放器滚动字幕窗口 -------------------------------------------
function OpenHjpCpList(ahjpid, aCptionLC_ID, awidth, aheight){	
	alert("test");
	var hjpcp_tb = document.getElementById("hjpcp_table"+ahjpid); 
	hjpcp_tb.style.display="block"; 
	hjpcp_tb.cellspacing=0;
	hjpcp_tb.cellpadding=0;
	var hjpcaption = document.getElementById("hjpcp_div"+ahjpid); 
	if(hjpcaption.innerHTML==""){
		if(document.domain.indexOf("hjbbs.com")!=-1){
			hjpcaption.innerHTML=GetFlashCode("hjpcp_swf"+ahjpid, "http://www.hjbbs.com/images/hjplayer/HjCaption.swf", "hjpid="+ahjpid+"&_bindid="+ aCptionLC_ID  ,awidth, aheight, true);
		}else{
			hjpcaption.innerHTML=GetFlashCode("hjpcp_swf"+ahjpid, "http://www.hjenglish.com/images/hjplayer/HjCaption.swf", "hjpid="+ahjpid+"&_bindid="+ aCptionLC_ID  ,awidth, aheight, true);
		}
	}
}
function CloseHjpCpList(ahjpid){ 
	var hjpcp_tb = document.getElementById("hjpcp_table"+ahjpid); 
	hjpcp_tb.style.display="none";
	var hjpcaption = document.getElementById("hjpcp_div"+ahjpid);   
	hjpcaption.innerHTML="";
}
function hjpCp_shiftloc(option, ahjpid, height){   
}
function MoveHjpCpDiv( )
{   
}
function StartMove(){  
}
function EndMove(){ 
}  

//采集的一个mimiflash播放器，但是js功能被屏蔽了
var ap_instances = new Array();
function ap_stopAll(playerID) {
	return;
	for(var i = 0;i<ap_instances.length;i++) {
		try {
			if(ap_instances[i] != playerID) document.getElementById("audioplayer" + ap_instances[i].toString()).SetVariable("closePlayer", 1);
			else document.getElementById("audioplayer" + ap_instances[i].toString()).SetVariable("closePlayer", 0);
		} catch( errorObject ) {
			// stop any errors
		}
	}
}
function ap_registerPlayers() {
	return;
	var objectID;
	var objectTags = document.getElementsByTagName("object");
	for(var i=0;i<objectTags.length;i++) {
		objectID = objectTags[i].id;
		if(objectID.indexOf("audioplayer") == 0) {
			ap_instances[i] = objectID.substring(11, objectID.length);
		}
	}
}
var ap_clearID = setInterval( ap_registerPlayers, 100 );
-->

