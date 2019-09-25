window.onload = function(){
    var mass = ['http://new.lsk-russia.ru/css/button.css'];
    for(var i=0;i<mass.length;i++){
        var a=document.createElement("link");
        a.rel="stylesheet";
        a.href=mass[i];
        document.getElementsByTagName("head")[0].appendChild(a)
    }}

Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + location;
        Share.popup(url);
    },
    odnoklassniki: function(purl, text) {
        url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url += '&st._surl='    + location;
        Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[url]='       + location;
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url  = 'http://twitter.com/share?';
        url += '&url='      + location;
        Share.popup(url);
    },
    mailru: function(purl, ptitle, pimg, text) {
        url  = 'http://connect.mail.ru/share?';
        url += 'url='          + location;
        Share.popup(url)
    },
    googleplus: function(purl) {
        url  = 'https://plus.google.com/share?';
        url += 'url='          + location;
        Share.popup(url)
    },
    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
};
