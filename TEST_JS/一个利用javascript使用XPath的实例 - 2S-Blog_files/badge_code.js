
var fl_host = (fl_host == undefined) ? 'www.flickr.com' : fl_host;


if (_ok_for_swf()) {
	var zg_version = (zg_version == undefined || zg_version == '') ? new Date().getTime() : zg_version;
	var zg_swapInterv = (zg_swapInterv == undefined) ? 3 : zg_swapInterv;
	var zg_loadInterv = (zg_loadInterv == undefined) ? 120 : zg_loadInterv;
	var zg_transition = (zg_transition == undefined) ? 'bigThenSmall' : zg_transition;

	
	var zg_cols = (zg_cols == undefined) ? 3 : zg_cols;
	var zg_rows = (zg_rows == undefined) ? 4 : zg_rows;
	var zg_wh = (zg_wh == undefined) ? 37 : zg_wh;
	
	var zg_nsids = (zg_nsids == undefined || zg_nsids == '') ? undefined : zg_nsids;
	var zg_scope_nsid = (zg_scope_nsid == undefined || zg_scope_nsid == '') ? undefined : zg_scope_nsid;
	var zg_person_scope = (zg_person_scope == undefined || zg_person_scope < 0 || zg_person_scope > 3) ? 0 : zg_person_scope;
	var zg_tag = (zg_tag == undefined || zg_tag == '') ? undefined : zg_tag;


	//var zg_fw = zg_cols*zg_wh; // no border
	//var zg_fh = zg_rows*zg_wh; // no border
	var zg_fw = zg_cols*zg_wh+((zg_cols-1)*1); // border of one
	var zg_fh = zg_rows*zg_wh+((zg_rows-1)*1); // border of one
	
	zg_fw+= 22; // for grey frame;
	zg_fh+= 22+16; // for grey frame;
	zg_fw+= 16; // for bg frame;
	zg_fh+= 8; // bg for frame;
	
	var zg_bg_color =  (zg_bg_color == undefined) ? 'ffffff' : zg_bg_color;

	var zg_url = 'http://'+fl_host+'/fun/zeitgeist/badge.swf?host=http://'+fl_host+'&bg_color='+zg_bg_color+'&cols='+zg_cols+'&rows='+zg_rows+'&wh='+zg_wh+'&swapInterv='+zg_swapInterv+'&loadInterv='+zg_loadInterv+'&transition='+zg_transition;
	if (zg_nsids != undefined) zg_url+= '&nsids='+zg_nsids;
	if (zg_tag != undefined) zg_url+= '&tag='+zg_tag;
	if (zg_person_scope != undefined) zg_url+= '&scope='+zg_person_scope;
	if (zg_scope_nsid != undefined) zg_url+= '&scope_nsid='+zg_scope_nsid;
	if (zg_version != undefined) zg_url+= '&v='+zg_version;
	zg_url+= '&magisterLudi='+zg_magisterLudi;
	zg_url+= '&flickr_secret='+zg_flickr_secret;
	zg_url+= '&auth_token='+zg_auth_token;
	zg_url+= '&auth_hash='+zg_auth_hash;
	zg_html = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="'+zg_fw+'" HEIGHT="'+zg_fh+'" id="zg" ALIGN=""><PARAM NAME=movie VALUE="'+zg_url+'"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+zg_bg_color+'><EMBED src="'+zg_url+'" quality=high bgcolor=#'+zg_bg_color+'  WIDTH="'+zg_fw+'" HEIGHT="'+zg_fh+'" NAME="photo" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
	document.write(zg_html);
}

// this here file expects to be document.writen from badge.js.gne
