function cnblogs$(id) { return document.getElementById(id); }

function questioin_enter(event) {
    if (event.keyCode == 13) {
        doQuestion();
        return false;
    }
}

 function movepic(img_name,img_src) {
document[img_name].src=img_src;
 }


function doQuestion() {
    var question = document.getElementById("question").value;
    window.location = "http://space.cnblogs.com/question/publish.aspx?kw=" + encodeURI(question);
}
function zzk_go(id) {
    
    var keystr = encodeURIComponent(document.getElementById(id).value);
    
    window.open( "http://zzk.cnblogs.com/s?w="+keystr);
}
function zzk_go_enter(event,id) {
    if (event.keyCode == 13) {
        zzk_go(id);
        return false;
    }
}

function setTab(name, cursel, n) {
    var executionTimer;
    if (executionTimer) {
        clearTimeout(executionTimer);
    }
    executionTimer = window.setTimeout("Switch('" + name + "','" + cursel + "','" + n + "')", 180);
}

function Switch(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "current" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

/* slide show */
function addBtn() {
    if (!cnblogs$('ibanner') || !cnblogs$('ibanner_pic')) return;
    var picList = cnblogs$('ibanner_pic').getElementsByTagName('a');
    if (picList.length == 0) return;
    var btnBox = document.createElement('div');
    btnBox.setAttribute('id', 'ibanner_btn');
    var SpanBox = '';
    for (var i = 1; i <= picList.length; i++) {
        var spanList = '<span class="normal">' + i + '</span>';
        SpanBox += spanList;
    }
    btnBox.innerHTML = SpanBox;
    cnblogs$('ibanner').appendChild(btnBox);
    cnblogs$('ibanner_btn').getElementsByTagName('span')[0].className = 'current';
    for (var m = 0; m < picList.length; m++) {
        var attributeValue = 'picLi_' + m
        picList[m].setAttribute('id', attributeValue);
    }
}
function classNormal() {
    var btnList = cnblogs$('ibanner_btn').getElementsByTagName('span');
    for (var i = 0; i < btnList.length; i++) {
        btnList[i].className = 'normal';
    }
}
function picZ() {
    var picList = cnblogs$('ibanner_pic').getElementsByTagName('a');
    for (var i = 0; i < picList.length; i++) {
        picList[i].style.zIndex = '1';
    }
}
var autoKey = false;
function iBanner() {
    if (!cnblogs$('ibanner') || !cnblogs$('ibanner_pic') || !cnblogs$('ibanner_btn')) return;
    cnblogs$('ibanner').onclick = function() { autoKey = true };
    cnblogs$('ibanner').onclick = function() { autoKey = false };
    var btnList = cnblogs$('ibanner_btn').getElementsByTagName('span');
    var picList = cnblogs$('ibanner_pic').getElementsByTagName('a');
    if (picList.length == 1) return;
    picList[0].style.zIndex = '2';
    for (var m = 0; m < btnList.length; m++) {
        btnList[m].onclick = function() {
            for (var n = 0; n < btnList.length; n++) {
                if (btnList[n].className == 'current') {
                    var currentNum = n;
                }
            }
            classNormal();
            picZ();
            this.className = 'current';
            picList[currentNum].style.zIndex = '2';
            var z = this.childNodes[0].nodeValue - 1;
            picList[z].style.zIndex = '3';
            if (currentNum != z) {
                picList[z].style.top = '0';
            }
        }
    }
}
setInterval('autoBanner()', 9000);
function autoBanner() {
    if (!cnblogs$('ibanner') || !cnblogs$('ibanner_pic') || !cnblogs$('ibanner_btn') || autoKey) return;
    var btnList = cnblogs$('ibanner_btn').getElementsByTagName('span');
    var picList = cnblogs$('ibanner_pic').getElementsByTagName('a');
    if (picList.length == 1) return;
    for (var i = 0; i < btnList.length; i++) {
        if (btnList[i].className == 'current') {
            var currentNum = i;
        }
    }
    if (currentNum == (picList.length - 1)) {
        classNormal();
        picZ();
        btnList[0].className = 'current';
        picList[currentNum].style.zIndex = '2';
        picList[0].style.zIndex = '3';
        picList[0].style.top = '0';
    } else {
        classNormal();
        picZ();
        var nextNum = currentNum + 1;
        btnList[nextNum].className = 'current';
        picList[currentNum].style.zIndex = '2';
        picList[nextNum].style.zIndex = '3';
        picList[nextNum].style.top = '0';
    }
}