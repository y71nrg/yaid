// url - How can I get query string values in JavaScript? - Stack Overflow https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
/**
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//  /url - How can I get query string values in JavaScript? - Stack Overflow https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

var bid = getParam('bid');
var bid = getParam('buyer_auc_user_id');

//取引ナビ
if(document.URL.match("/contact.auctions.yahoo.co.jp/seller/")) {
    $('.ptsPartner dt p').append('<br>ID：<a href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + bid + '" target="_blank">' + bid + '</a>');
    // $('.decBuyerID p').append('<br>落札者ID：<a href="https://auctions.yahoo.co.jp/jp/show/rating?userID=' + bid + '" target="_blank">' + bid + '</a>');//250702
    $('.decBuyerID p').append('<br>落札者ID：<a href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + bid + '" target="_blank">' + bid + '</a>');
    $('.acMdPayShipInfo .libTableCnfTop table tr:nth-child(4) .decInTblCel table').prepend('<th><div class="decThWrp">落札者ID</div></th><td><a href="https://auctions.yahoo.co.jp/jp/show/rating?userID=' + bid + '" target="_blank">' + bid + '</a></td>');
}
// /取引ナビ

//評価一覧
if(document.URL.match("/auctions.yahoo.co.jp/jp/show/rating")) {
    var userID = getParam('auc_user_id');
    $('.Seller__name').append('<br>ID : ' + userID + '');

    $('tr:contains("評価者：") a:nth-child(2)').each(function(i){
        var userID = $(this).prop("href").split('/seller/')[1];
        $(this).after(' ID：<a href="https://auctions.yahoo.co.jp/seller/' + userID + '" target="_blank">' + userID + '</a> 評価：');
    });
}
// /評価一覧

//出品リスト
if(document.URL.match("/auctions.yahoo.co.jp/seller")) {
    // var userID = $('.Seller__linkList li:nth-child(2) .Seller__link').prop("href").split('https://auctions.yahoo.co.jp/jp/show/rating?userID='); //250702
    var userID = $('.Seller__linkList li:nth-child(2) .Seller__link').prop("href").split('https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=');
    $('.Seller__nameText').append('<br><span class="Seller__nameText1">ID : ' + userID + '</span>');
    userID = $('.Seller__nameText1').text().replace(/,/g, '');
    $('.Seller__nameText1').text(userID);
}
// /出品リスト

// 入札履歴
if(document.URL.match("/auctions.yahoo.co.jp/jp/show/bid_hist")) {
    $('#modCtgSearchResult .decBg01:nth-child(1) a:nth-child(1)').each(function(i){
        var userID = $(this).prop("href").split('/seller/')[1];
        $(this).after('<a class="Blacklist__userID" href="https://auctions.yahoo.co.jp/sellinglist/' + userID + '">' + userID + '</a>');
        $(this).hide();
    });
}
// /入札履歴

//出品中 //TODO: 20151119-
if(document.URL.match("/auctions.yahoo.co.jp/my")) {
	setTimeout(function(){
        $('#itm ul li.kmbOlL:nth-child(1) a').each(function(){
            // setTimeout(function(k,v){
                var aIDurl = $(this).prop("href");
                $.ajax({
                    url: aIDurl, // 別ページにあるhtmlページURL
                    // cache: false,
                    async: true,
                    cache: true,
                    context : this,
                    datatype: "html",
                    success: function (html) {
                        var html = $(html).find("#modCtgSearchResult .decBg01 a:contains(評価の詳細)"); //  別ページにあるhtml内の一部の要素を指定
                        var userID = $(html).prop("href").split('?auc_user_id=')[1];
                        $(this).after(' <a class="userid" href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + userID + '" target="_blank">' + userID + '</a>');
                    },
                });
            // },1000*k);
        });
    },1000);
}
// /出品中 20151119-

// ブラックリスト
if(document.URL.match("/auctions.yahoo.co.jp/jp/show/prefs_blacklist")) {
    $('.Blacklist tbody tr td .Blacklist__user .Blacklist__userName').each(function(i){
        var userID = $(this).prop("href").split('?auc_user_id=')[1];
        $(this).after('&nbsp;(ID : ' + userID + ')');
    });
}
// /ブラックリスト

// 質問一覧
if(document.URL.match("/auctions.yahoo.co.jp/jp/show/qanda")) {
    $('.pts01 .decTx01 a:contains("評価")').each(function(i){
        var userID = $(this).prop("href").split('?auc_user_id=')[1];
        $(this).before(' ID：<a href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + userID + '" target="_blank">' + userID + '</a>&nbsp;');
    });
}
// /質問一覧

//出品終了分
if(document.URL.match("closed&hasWinner=1")) {
    $('.ItemTable__userName a').each(function(i){
        var userID = $(this).prop("href").split('?auc_user_id=')[1];
        $(this).before('<a href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + userID + '" target="_blank">' + userID + '</a>');
    });
    $(".ItemTable__userName a:contains('落札者情報')").hide();
}
// /出品終了分

//出品終了分 20251119-
if(document.URL.match("hasWinner=1")) {
    setTimeout(function(){
        $("#itm .yhDYa li a").each(function(i){
            var userID = $(this).prop("href").split('?auc_user_id=')[1];
            $(this).after('<a class="userid gv-u-fontSize12--s5WnvVgDScOXPWU7Mgqd" href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + userID + '" target="_blank">' + userID + '</a>');
        });
        $("#itm .yhDYa li a:contains('落札者情報')").hide();
    },1000);
}
// /出品終了分 20251119-

//ウォッチリスト 20251119-
if(document.URL.match("watchlist")) {
    setTimeout(function(){
        $("#itm .yhDYa li a").each(function(i){
            var userID = $(this).prop("href").split('/seller/')[1];
            $(this).after('<a class="userid gv-u-fontSize12--s5WnvVgDScOXPWU7Mgqd" href="https://auctions.yahoo.co.jp/jp/show/rating?auc_user_id=' + userID + '" target="_blank">' + userID + '</a>');
        });
        $("#itm .kmbOlL a:contains('出品中の商品')").hide();
        $("#itm .userid").css('width','100px');
        $("#itm .userid").css('overflow','hidden');
    },1000);
}
// /ウォッチリスト 20251119-
