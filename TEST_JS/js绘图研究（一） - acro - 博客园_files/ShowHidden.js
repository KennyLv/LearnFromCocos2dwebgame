﻿if (navigator.userAgent.indexOf('Chrome/5.0.375.70') > 0 && $("pre").length == 1) {
    $("pre").first().append("<pre></pre>");
}

try {
    $("#cnblogs_post_body span").each(function () {
        if ($(this).css('font-size') == 'x-small') {
            $(this).removeAttr('style');
        }
    });
}
catch (e) { }


if (document.getElementById('leftcontent') != null) {
    if (document.getElementById('leftcontent').style.display == 'none') {
        document.getElementById('leftcontent').style.display = 'inline';
    }
}
if (document.getElementById('Blogleftcontent') != null) {
    if (document.getElementById('cnblogsleftcontent').style.display == 'none') {
        document.getElementById('cnblogsleftcontent').style.display = 'inline';
    }
}

if (document.getElementById('cnblogsleftcontent') != null) {
    if (document.getElementById('cnblogsleftcontent').style.display == 'none') {
        document.getElementById('cnblogsleftcontent').style.display = 'inline';
    }
}

if (document.getElementById('rightmenu') != null) {
    if (document.getElementById('rightmenu').style.display == 'none') {
        document.getElementById('rightmenu').style.display = 'inline';
    }
}
if (document.getElementById('leftmenu') != null) {
    if (document.getElementById('leftmenu').style.display == 'none') {
        document.getElementById('leftmenu').style.display = 'inline';
    }
    if (document.getElementById('lefttemp') != null) {
        document.getElementById('leftmenu').innerHTML = document.getElementById('lefttemp').innerHTML;
        //document.getElementById('lefttemp').innerHTML = '';
    }
}

if (document.getElementById('left') != null) {
    if (document.getElementById('left').style.display == 'none') {
        document.getElementById('left').style.display = 'inline';
    }
}

if (document.getElementById('cnblogsleftmenu') != null) {
    if (document.getElementById('cnblogsleftmenu').style.display == 'none') {
        document.getElementById('cnblogsleftmenu').style.display = 'inline';
    }
}

if (document.getElementById('menu') != null) {
    if (document.getElementById('menu').style.display == 'none') {
        document.getElementById('menu').style.display = 'inline';
    }
}

if (document.getElementById('cnblogsmenu') != null) {
    if (document.getElementById('cnblogsmenu').style.display == 'none') {
        document.getElementById('cnblogsmenu').style.display = 'inline';
    }
}