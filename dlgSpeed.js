
var selRow;     // 選択中Pitchデータ行

$(function () {

    // スピード初期値設定
    $('#valueSpeed').html($('#rangeSpeed').val());

    // クリックイベント名を取得
    var evntTouchStart = 'mousedown';
    var evntTouchEnd = 'mouseup';
    if ('ontouchstart' in window) {
        // "ontouchstart"をサポートしているならmousedown/mouseupの代わりにtouchstart/touchendを使用
        evntTouchStart = 'touchstart';
        evntTouchEnd = 'touchend';
    }

    // -------------------------------------------------------------
    //  スピードRange変更処理（決定時）
    // -------------------------------------------------------------
    $('#rangeSpeed').change(function () {
        // スピード値の表示を更新
        $('#valueSpeed').html($(this).val());
    });

    // -------------------------------------------------------------
    //  スピードRange変更処理（ドラッグ中）
    // -------------------------------------------------------------
    $( '#rangeSpeed' ).on( 'input', function () {
        $('#valueSpeed').html($(this).val());
    } );

    // -------------------------------------------------------------
    // 「Speed ＆ Pitch setting」画面
    // -------------------------------------------------------------
    $("#dlgSpeed").dialog({
        autoOpen: false,
        modal: true,
        width: 665,
        open: function() {
            // Editボタンを無効にする
            $(".ui-dialog-buttonpane button:contains('Edit')").button("disable");
        },
        buttons: {
            "Edit": function () {
                $("#dlgTenKey").dialog("open");
            },
            Ok: function () {
                updateMenu();
                $(this).dialog('close');
            },
            Cancel: function () {
                $(this).dialog('close');
            }
        }
    });

    // -------------------------------------------------------------
    // 「Edit」ボタン押下時処理
    // -------------------------------------------------------------
    $("#dlgTenKey").dialog({
        autoOpen: false,
        modal: true,
        position: { of:'.boxSpeed', at:'left top', my:'left top' },
        resizable: false,
        open: function() {
            setCaret(true);
        },
        close: function() {
            setCaret(false);
        }
    });

    // -------------------------------------------------------------
    // 「Pitch」データクリック時処理
    // -------------------------------------------------------------
    $("#tblPitch tr").on('click touchstart', function() {

        if (selRow != undefined) {
            selRow.style.backgroundColor = this.style.backgroundColor;
        }

        this.style.backgroundColor = '#cccccc';
        selRow = this;

        // Editボタンを有効化
        $(".ui-dialog-buttonpane button:contains('Edit')").button("enable");
    });

    // -------------------------------------------------------------
    // Speed 「▲/▼」ボタン押下時処理
    // -------------------------------------------------------------
    $(".btnRange").on(evntTouchStart, function() {
        v = $(this).attr('id') == 'btnRangeUp' ? 1 : -1;
        countUpSpeed(v);
    });

    // -------------------------------------------------------------
    // Speed 「▲/▼」ボタン開放時処理
    // -------------------------------------------------------------
    $(".btnRange").on(evntTouchEnd, function() {
        stopCountUpSpeed();
    });
});

// -------------------------------------------------------------
// Pitchデータキャレット設定処理
// -------------------------------------------------------------
function setCaret(disp)
{
/*
    if (selRow != undefined) {
        ta = selRow.getElementsByTagName('textarea')[0];
        len = ta.innerHTML.length;

        if (disp) {
            ta.readOnly = false;
            ta.focus();
            ta.setSelectionRange(len, len);
        } else {
            ta.readOnly = true;
        }
    }
*/
}

// -------------------------------------------------------------
// スピード調整ボタン押下時処理
// -------------------------------------------------------------
function countUpSpeed(n) {
    $intervalID = setInterval(
        function(){
            var speed = parseInt($('#rangeSpeed').val()) + n;
            $('#rangeSpeed').val(speed);
            $('#valueSpeed').html(speed);
        },
        80
    );
}

// -------------------------------------------------------------
// スピード調整ボタン開放時処理
// -------------------------------------------------------------
function stopCountUpSpeed() {
    clearInterval( $intervalID );
}

// -------------------------------------------------------------
// テンキー押下時処理
// -------------------------------------------------------------
function keyin(n) {
    if (selRow != undefined) {

        ta = selRow.getElementsByTagName('textarea')[0];
        len = ta.innerHTML.length;

        switch(n) {
            case 'bs':
                if (len > 2) {
                    ta.innerHTML = (ta.innerHTML.substring(0, len - 1));
                } else {
                    ta.innerHTML = "0";
                }
                break;
            case 'ret':
                ta = selRow.getElementsByTagName('textarea');
                /*
                ta[0].readOnly = false;
                ta[0].focus();
                ta[0].setSelectionRange(1,1);
                */
                $("#dlgTenKey").dialog('close');
                break;
            case 'prev':
                break;
            case 'next':
                break;
            case '.':
                if (0 > ta.innerHTML.indexOf(".")) {
                    ta.innerHTML += n;
                }
                break;
            case '-':
                if (0 == ta.innerHTML.indexOf("-")) {
                    ta.innerHTML = ta.innerHTML.replace("-", "");
                }
                else {
                    ta.innerHTML = "-".concat(ta.innerHTML);
                }
                break;
            default:
                if (ta.innerHTML == "0") {
                    ta.innerHTML = n;
                } else {
                    ta.innerHTML += n;
                }
                break;
        }

        setCaret(true);
    }
}

// -------------------------------------------------------------
//  「Speed]ボタンの2行目(値)更新
// -------------------------------------------------------------
function updateMenu()
{
    // Speed設定値を「Speed」メニュー文字列の２行目に反映する。
    $('.menuTop:contains("Speed")').find('span#selspn').text($('#rangeSpeed').val() + '%');
}