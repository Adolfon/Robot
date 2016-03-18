
$(function () {

    //*******************************************************
    // メニュークリック処理
    //*******************************************************
    $('.menuTop').click(function () {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected').next('ul').slideUp('fast');
        } else {
            $('.menuTop').removeClass('selected').next('ul').slideUp('fast');
            $(this).addClass('selected').next('ul').slideDown('fast');
        }
    });

    //*******************************************************
    // 
    //*******************************************************
    $('.menuTop,ul').hover(function () {
        overFlg = true;
    }, function () {
        overFlg = false;
    });


    //*******************************************************
    // bodyクリック処理
    //*******************************************************
    $('body').click(function () {
        if (overFlg == false) {
            $('.menuTop').removeClass('selected').next('ul').slideUp('fast');
        }
    });


    //*******************************************************
    // サブメニュークリック処理
    //*******************************************************
    $("#menuItem li").click(function (e) {
        // 開いているメニューを閉じる
        $('.menuTop').removeClass('selected').next('ul').slideUp('fast');

        // 選択されたアイテムを、親メニューの文字列の２行目に反映する
        $(this).parents('li').find('span#selspn').text(e.target.innerText);

        // 「Current Position」、「THome」領域下の情報を更新する。
        var txt = $(this).parents('li').children('.menuTop').text();
        if (0 == txt.indexOf("Coord")) {
            $('.spnCoord').text(e.target.innerText);
        }
        else if (0 == txt.indexOf("Hand")) {
            $('.spnHand').text(e.target.innerText);
        }
    });
});


//*******************************************************
// 「Speed」メニュークリック処理
//*******************************************************
function clickSpeed() {
    $("#dlgSpeed").dialog("open");
}
