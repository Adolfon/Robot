
jQuery(function ($) {

    var selFileData;   // File 選択データ行

    // ============== TEST DATA (Start) =================
    var dummyData =
        [{
            "name": "THOME",
            "data": [
                { "coord": "X:", "pos": 123.456 },
                { "coord": "Y:", "pos": 234.567 },
                { "coord": "Z:", "pos": 345.678 },
                { "coord": "S:", "pos": 456.789 },
                { "coord": "", "pos": 567.89 },
                { "coord": "", "pos": 678.901 }
            ]
        },
        {
            "name": "TP[1]",
            "data": [
                { "coord": "X:", "pos": -123.456 },
                { "coord": "Y:", "pos": -234.567 },
                { "coord": "Z:", "pos": -345.678 },
                { "coord": "S:", "pos": -456.789 },
                { "coord": "", "pos": -567.89 },
                { "coord": "", "pos": -678.901 },
                { "coord": "", "pos": -789.012 }
            ]
        },
        {
            "name": "TP[2]",
            "data": [
                { "coord": "X:", "pos": 1.234 },
                { "coord": "Y:", "pos": 2.345 },
                { "coord": "Z:", "pos": 3.456 },
                { "coord": "S:", "pos": 4.567 },
                { "coord": "", "pos": 5.678 },
                { "coord": "", "pos": 6.789 },
                { "coord": "", "pos": 7.89 },
                { "coord": "", "pos": 8.9012 }
            ]
        },
        {
            "name": "TP[3]",
            "data": [
                { "coord": "X:", "pos": -1.2345 },
                { "coord": "Y:", "pos": -2.3456 },
                { "coord": "Z:", "pos": -3.4567 },
                { "coord": "S:", "pos": -4.5678 },
                { "coord": "", "pos": -5.6789 },
                { "coord": "", "pos": -6.789 },
                { "coord": "", "pos": -7.8901 }
            ]
        },
        {
            "name": "TP[4]",
            "data": [
                { "coord": "X:", "pos": -11.2345 },
                { "coord": "Y:", "pos": -22.3456 },
                { "coord": "Z:", "pos": -33.4567 },
                { "coord": "S:", "pos": -44.5678 },
                { "coord": "", "pos": -55.6789 },
                { "coord": "", "pos": -66.789 }
            ]
        }];
    // ============== TEST DATA (End) =================

    // -------------------------------------------------------------
    // 初期値設定 
    // -------------------------------------------------------------
    //$.getJSON("dummy.json", function (dummyData) {

        // データ内容をFile欄に反映
        $.each(dummyData, function (key, value) {
            $("#tblFile").append(
                    $("<tr></tr>").append($("<th></th>").text(value.name))
            );
        });
    //});

    // 先頭データを選択状態にする
    abd = $("#tblFile tr:first");
    abd.css("backgroundColor", "#cccccc");
    selFileData = abd;

    // 先頭データの内容をTHome欄に反映
    updateTHome(0);

    // -------------------------------------------------------------
    // ダブルクリックを無効にする
    // -------------------------------------------------------------
    window.addEventListener('dblclick  dbtouchend', function (e) {
        e.preventDefault();
        return false;
    }, false);

    // -------------------------------------------------------------
    // 「Speed」ボタン押下処理
    // -------------------------------------------------------------
    click_speed = function () {
        // 「Speed & Pitch setting」ダイアログ表示
        $("#dlgSpeed").dialog("open");
    };

    // -------------------------------------------------------------
    // マウス座標のJSONを取得し、テーブルに追加
    // -------------------------------------------------------------
    /*
    $.getJSON("http://192.168.240.69/cgi-bin/getmouse.py", function (json) {

    $.each(json, function (key, value) {
    $("#tblPosition").append(
    $("<tr></tr>")
    .append($("<th></th>").text(key))
    .append($("<td></td>").text(value))
    );
    });
    });
    */

    // -------------------------------------------------------------
    // ファイルデータ選択時処理
    // -------------------------------------------------------------
    $("#tblFile tr").on('click touchstart', function () {
        // 前回選択行の背景色を元に戻す
        if (selFileData != undefined) {
            selFileData.css("backgroundColor", this.style.backgroundColor);
        }

        // 選択行の背景色を変更する
        this.style.backgroundColor = '#cccccc';
        selFileData = $(this);

        updateTHome($(this).index());
    });

    // -------------------------------------------------------------
    // 選択データ情報の表示を更新する
    // -------------------------------------------------------------
    function updateTHome(idx) {
        // テーブル内容をクリア
        $("#tblTHome").find("tr").remove();

        // 選択データの情報をテーブルに追加
        $.each(dummyData[idx].data, function (key2, value2) {
            $("#tblTHome").append(
                    $("<tr></tr>")
                    .append($("<th></th>").text(value2.coord))
                    .append($("<td></td>").text(value2.pos))
                );
        });

        $(".boxTHome [class='titlePos']").text(dummyData[idx].name)
    }

    var INTERVAL = 50;   // ms per call
    var refresh = function() {
        /*
        var json =
        {
            "AX1": 1.0,
            "AX2": 2.0,
            "AX3": 3.0,
            "AX4": 4.0,
            "AX5": 5.0,
            "AX6": 6.0,
            "system": "XY"
        };

        $("#ax1_value").html(json.AX1);
        $("#ax2_value").html(json.AX2);
        $("#ax3_value").html(json.AX3);
        $("#ax4_value").html(json.AX4);
        $("#ax5_value").html(json.AX5);
        $("#ax6_value").html(json.AX6);
        */

        $.ajax({
            url: "http://192.168.1.31/cgi-bin/get_current_position.py",
            cache: false,
            crossDomain:false,
            timeout: 1000,
            success: function(result) {
                $("#ax1_value").text(result.AX1);
                $("#ax2_value").text(result.AX2);
                $("#ax3_value").text(result.AX3);
                $("#ax4_value").text(result.AX4);
                $("#ax5_value").text(result.AX5);
                $("#ax6_value").text(result.AX6);
            },
            error: function(result) {}
        });
    };

    setInterval(refresh, INTERVAL);

});

