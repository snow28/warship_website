$(document).ready(function() {


    //start game button

    var name_1,name_2;

    $('.js-start-game').on('click',function(){
        name_1 = $('.js-player-1').val();
        name_2 = $('.js-player-2').val();
        var trigger = false;
        var b_name_1 = false;
        var b_name_2 = false;
        var length = localStorage.getItem("index");
        if(name_1.length > 0){
            for(var x = 1; x < length; x++){
                var tmp_name = localStorage.getItem("username"+x);
                if(tmp_name == name_1 || tmp_name == name_2 ){
                    b_name_1 = true;
                }
            }
        }
        if(name_2.length > 0){
            for(var x = 1; x < length; x++){
                var trigger = false;
                var tmp_name = localStorage.getItem("username"+x);
                if(tmp_name == name_1 || tmp_name == name_2 ){
                    var b_name_2 = true;
                    trigger = true;
                }
            }
        }

        if(b_name_1 == false || b_name_2 == false){
            $('.js-name-error').html('Error, one(or both) of the users you entered wrong.');
        }else if(b_name_1 == true || b_name_2 == true){
            $('.names').addClass('hide');
            $('.select').removeClass('hide');
            sessionStorage.clear();
            sessionStorage.setItem("username1", name_1);
            sessionStorage.setItem("username2", name_2);
            $('.js-player-1').text(name_1);
            $('.js-player-2').text(name_2);
        }
    });


    //logging and registering


    $('.js-logreg').on('click',function(){
        $('.js-logreg').removeClass('current');
        $(this).addClass('current');
        if($(this).hasClass('log')){
            $('.js-log-block').removeClass('hide');
            $('.js-reg-block').addClass('hide');
        }else if($(this).hasClass('reg')){
            $('.js-log-block').addClass('hide');
            $('.js-reg-block').removeClass('hide');
        }
    });

    var i;

    console.log("local storage");
    for (i = 0; i < localStorage.length; i++)   {
        console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }

    console.log("session storage");
    for (i = 0; i < sessionStorage.length; i++) {
        console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
    }

    if(localStorage.getItem("index") == null){
        localStorage.setItem("index", 1);
    }else{
        console.log('We have index : ' + localStorage.getItem("index"));
    }

    var index = localStorage.getItem("index");


    $('.js-register').on('click',function(){
        var name = $('.js-name').val();
        var email = $('.js-email').val();
        var username = $('.js-username').val();
        var password = $('.js-password').val();
        if(name.length > 0 && email.length > 0 && username.length > 0 && password.length > 0){
            localStorage.setItem("username" + index, username);
            localStorage.setItem("password" + index, password);
            index++;
            localStorage.setItem("index", index);
            location.reload();
        }else{
            console.log("U have to fill all fields");
            $('.js-errors').text('U have to fill all fields');
        }
    });



    $(".js-log-in").on('click',function(){
        var log_name = $('.js-log-name').val();
        var log_pass = $('.js-log-pass').val();
        var length = localStorage.getItem("index");
        var trigger = false;
        for(var x = 0; x < length; x++){
            var tmp_name = localStorage.getItem("username"+x);
            var tmp_pass = localStorage.getItem("password"+x);
            if(log_name == tmp_name && log_pass == tmp_pass){
                trigger = true;
                document.location.href = './main.html';
            }
        }
        if(trigger == false){
            $('.js-errors').text("We didn't find this account in our database");
        }
    });




    var state = 1;
    var ships = 10;

    //1 - player_1 choose
    //2 - player_2 choose
    //3 - game


    var player_1 = {
        "ships" : {
          '1' : 4,
          '2' : 3,
          '3' : 2,
          '4' : 1
        },
        "cell_1" : [
            ['X',0],
            ['X',0],
            ['X',0],
            ['X',0]
        ],
        "cell_2" : [
             [['X',0],['X',0]],
             [['X',0],['X',0]],
             [['X',0],['X',0]]
        ],
        "cell_3" : [
            [['X',0],['X',0],['X',0]],
            [['X',0],['X',0],['X',0]]
        ],
        "cell_4" : [
            [['X',0],['X',0],['X',0],['X',0]]
        ]
    };

    var player_2 = {
        "ships" : {
            '1' : 4,
            '2' : 3,
            '3' : 2,
            '4' : 1
        },
        "cell_1" : [
            ['X',0],
            ['X',0],
            ['X',0],
            ['X',0]
        ],
        "cell_2" : [
            [['X',0],['X',0]],
            [['X',0],['X',0]],
            [['X',0],['X',0]]
        ],
        "cell_3" : [
            [['X',0],['X',0],['X',0]],
            [['X',0],['X',0],['X',0]]
        ],
        "cell_4" : [
            [['X',0],['X',0],['X',0],['X',0]]
        ]
    };

    if(state == 1 || state == 2){
        $('.cell-js').on('click',function(){
            $(this).addClass('choosed');
        });
    }


    var position_1 = 0;
    var clickNumber = 0;
    var clickNumber_2 = 0;
    var clickNumber_3 = 0;
    var cell_1 = 4;
    var cell_2 = 3;
    var cell_3 = 2;
    var cell_4 = 1;
    var cells_right;
    var cells_left;

    $('.cell-js').on('click',function(){
        if(state == 1){
                console.log('state - 1');
                if(ships > 6){
                    player_1.cell_1[position_1][0] = $(this).data('x');
                    player_1.cell_1[position_1][1] = $(this).data('y');
                    console.log(player_1.cell_1);
                    position_1++;
                    ships--;
                    cell_1--;
                    $('.js-one-cell-count').text(cell_1);
                    console.log(ships);
                    if(ships == 6){
                        $('.js-one-cell').removeClass('current');
                        $('.js-two-cell').addClass('current');
                    }
                }else if(ships > 3 && ships <= 6){
                    if( clickNumber == 0){
                        player_1.cell_2[0][0][0] = $(this).data('x');
                        player_1.cell_2[0][0][1] = $(this).data('y');
                        clickNumber++;
                    }else if(clickNumber == 1){
                        player_1.cell_2[0][1][0] = $(this).data('x');
                        player_1.cell_2[0][1][1] = $(this).data('y');
                        clickNumber++;
                        cell_2--;
                        $('.js-two-cell-count').text(cell_2);
                    }else if(clickNumber == 2){
                        player_1.cell_2[1][0][0] = $(this).data('x');
                        player_1.cell_2[1][0][1] = $(this).data('y');
                        clickNumber++;
                    }else if(clickNumber == 3){
                        player_1.cell_2[1][1][0] = $(this).data('x');
                        player_1.cell_2[1][1][1] = $(this).data('y');
                        clickNumber++;
                        cell_2--;
                        $('.js-two-cell-count').text(cell_2);
                    }else if(clickNumber == 4){
                        player_1.cell_2[2][0][0] = $(this).data('x');
                        player_1.cell_2[2][0][1] = $(this).data('y');
                        clickNumber++;
                    }else if(clickNumber == 5){
                        player_1.cell_2[2][1][0] = $(this).data('x');
                        player_1.cell_2[2][1][1] = $(this).data('y');
                        clickNumber++;
                        cell_2--;
                        $('.js-two-cell-count').text(cell_2);
                        $('.js-three-cell').addClass('current');
                        $('.js-two-cell').removeClass('current');
                    }
                    if(clickNumber == 6){
                        ships = 3;
                    }
                    console.log(player_1.cell_2);
                }else if(ships > 1){
                    console.log('start 3 cells');
                    if(clickNumber_2 == 0){
                        player_1.cell_3[0][0][0] = $(this).data('x');
                        player_1.cell_3[0][0][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 1){
                        player_1.cell_3[0][1][0] = $(this).data('x');
                        player_1.cell_3[0][1][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 2){
                        player_1.cell_3[0][2][0] = $(this).data('x');
                        player_1.cell_3[0][2][1] = $(this).data('y');
                        clickNumber_2++;
                        cell_3--;
                        $('.js-three-cell-count').text(cell_3);
                    }else if(clickNumber_2 == 3){
                        player_1.cell_3[1][0][0] = $(this).data('x');
                        player_1.cell_3[1][0][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 4){
                        player_1.cell_3[1][1][0] = $(this).data('x');
                        player_1.cell_3[1][1][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 5){
                        player_1.cell_3[1][2][0] = $(this).data('x');
                        player_1.cell_3[1][2][1] = $(this).data('y');
                        clickNumber_2++;
                        cell_3--;
                        $('.js-three-cell-count').text(cell_3);
                        $('.js-four-cell').addClass('current');
                        $('.js-three-cell').removeClass('current');
                    }
                    console.log(player_1.cell_3);
                    if(clickNumber_2 == 6){
                        ships =0;
                    }
                }else if(ships == 0){
                    if(clickNumber_3 == 0){
                        player_1.cell_4[0][0][0] = $(this).data('x');
                        player_1.cell_4[0][0][1] = $(this).data('y');
                        clickNumber_3++;
                    }else if(clickNumber_3 == 1){
                        player_1.cell_4[0][1][0] = $(this).data('x');
                        player_1.cell_4[0][1][1] = $(this).data('y');
                        clickNumber_3++;
                    }else if(clickNumber_3 == 2){
                        player_1.cell_4[0][2][0] = $(this).data('x');
                        player_1.cell_4[0][2][1] = $(this).data('y');
                        clickNumber_3++;
                    }else if(clickNumber_3 == 3){
                        player_1.cell_4[0][3][0] = $(this).data('x');
                        player_1.cell_4[0][3][1] = $(this).data('y');
                        clickNumber_3++;
                    }
                    if(clickNumber_3 >= 4){
                        ships = 10;
                        state = 2;
                        console.log('end first player' + state);
                        $('.cell-js').removeClass('choosed');
                        position_1 = 0;
                        clickNumber = 0;
                        clickNumber_2 = 0;
                        clickNumber_3 = 0;
                        cell_1 = 4;
                        cell_2 = 3;
                        cell_3 = 2;
                        cell_4 = 1;
                        $('.js-one-cell-count').text('4');
                        $('.js-two-cell-count').text('3');
                        $('.js-three-cell-count').text('2');
                        $('.js-four-cell').removeClass('current');
                        $('.js-one-cell').addClass('current');
                        var name_2 = sessionStorage.getItem("username2", name_2);
                        $('.js-player').val(name_2);
                    }
                }

        }else if(state == 2){
                console.log('state - 2');
                if(ships > 6){
                    player_2.cell_1[position_1][0] = $(this).data('x');
                    player_2.cell_1[position_1][1] = $(this).data('y');
                    console.log(player_1.cell_1);
                    position_1++;
                    ships--;
                    cell_1--;
                    $('.js-one-cell-count').text(cell_1);
                    console.log(ships);
                    if(ships == 6){
                        $('.js-one-cell').removeClass('current');
                        $('.js-two-cell').addClass('current');
                    }
                }else if(ships > 3 && ships <= 6){
                    if( clickNumber == 0){
                        player_2.cell_2[0][0][0] = $(this).data('x');
                        player_2.cell_2[0][0][1] = $(this).data('y');
                        clickNumber++;
                    }else if(clickNumber == 1){
                        player_2.cell_2[0][1][0] = $(this).data('x');
                        player_2.cell_2[0][1][1] = $(this).data('y');
                        clickNumber++;
                        cell_2--;
                        $('.js-two-cell-count').text(cell_2);
                    }else if(clickNumber == 2){
                        player_2.cell_2[1][0][0] = $(this).data('x');
                        player_2.cell_2[1][0][1] = $(this).data('y');
                        clickNumber++;
                    }else if(clickNumber == 3){
                        player_2.cell_2[1][1][0] = $(this).data('x');
                        player_2.cell_2[1][1][1] = $(this).data('y');
                        clickNumber++;
                        cell_2--;
                        $('.js-two-cell-count').text(cell_2);
                    }else if(clickNumber == 4){
                        player_2.cell_2[2][0][0] = $(this).data('x');
                        player_2.cell_2[2][0][1] = $(this).data('y');
                        clickNumber++;
                    }else if(clickNumber == 5){
                        player_2.cell_2[2][1][0] = $(this).data('x');
                        player_2.cell_2[2][1][1] = $(this).data('y');
                        clickNumber++;
                        cell_2--;
                        $('.js-two-cell-count').text(cell_2);
                        $('.js-three-cell').addClass('current');
                        $('.js-two-cell').removeClass('current');
                    }
                    if(clickNumber == 6){
                        ships = 3;
                    }
                    console.log(player_1.cell_2);
                }else if(ships > 1){
                    console.log('start 3 cells');
                    if(clickNumber_2 == 0){
                        player_2.cell_3[0][0][0] = $(this).data('x');
                        player_2.cell_3[0][0][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 1){
                        player_2.cell_3[0][1][0] = $(this).data('x');
                        player_2.cell_3[0][1][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 2){
                        player_2.cell_3[0][2][0] = $(this).data('x');
                        player_2.cell_3[0][2][1] = $(this).data('y');
                        clickNumber_2++;
                        cell_3--;
                        $('.js-three-cell-count').text(cell_3);
                    }else if(clickNumber_2 == 3){
                        player_2.cell_3[1][0][0] = $(this).data('x');
                        player_2.cell_3[1][0][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 4){
                        player_2.cell_3[1][1][0] = $(this).data('x');
                        player_2.cell_3[1][1][1] = $(this).data('y');
                        clickNumber_2++;
                    }else if(clickNumber_2 == 5){
                        player_2.cell_3[1][2][0] = $(this).data('x');
                        player_2.cell_3[1][2][1] = $(this).data('y');
                        clickNumber_2++;
                        cell_3--;
                        $('.js-three-cell-count').text(cell_3);
                        $('.js-four-cell').addClass('current');
                        $('.js-three-cell').removeClass('current');
                    }
                    console.log(player_2.cell_3);
                    if(clickNumber_2 == 6){
                        ships =0;
                    }
                }else if(ships == 0){
                    if(clickNumber_3 == 0){
                        player_2.cell_4[0][0][0] = $(this).data('x');
                        player_2.cell_4[0][0][1] = $(this).data('y');
                        clickNumber_3++;
                    }else if(clickNumber_3 == 1){
                        player_2.cell_4[0][1][0] = $(this).data('x');
                        player_2.cell_4[0][1][1] = $(this).data('y');
                        clickNumber_3++;
                    }else if(clickNumber_3 == 2){
                        player_2.cell_4[0][2][0] = $(this).data('x');
                        player_2.cell_4[0][2][1] = $(this).data('y');
                        clickNumber_3++;
                    }else if(clickNumber_3 == 3){
                        player_2.cell_4[0][3][0] = $(this).data('x');
                        player_2.cell_4[0][3][1] = $(this).data('y');
                        clickNumber_3++;
                    }
                    if(clickNumber_3 >=4){
                        ships = -50;
                        state = 3;
                        $('.select').addClass('hide');
                        $('.game').removeClass('hide');
                        $('.js-player-1').val(player_1);
                        $('.js-player-2').val(player_2);
                        cells_left = [
                            player_1.cell_1[0],player_1.cell_1[1],player_1.cell_1[2],player_1.cell_1[3],
                            player_1.cell_2[0][0],player_1.cell_2[0][1],player_1.cell_2[1][0],player_1.cell_2[1][1],player_1.cell_2[2][0],player_1.cell_2[2][1],
                            player_1.cell_3[0][0],player_1.cell_3[0][1],player_1.cell_3[0][2],player_1.cell_3[1][0],player_1.cell_3[1][1],player_1.cell_3[1][2],
                            player_1.cell_4[0][0],player_1.cell_4[0][1],player_1.cell_4[0][2],player_1.cell_4[0][3]
                        ];
                        cells_right = [
                            player_2.cell_1[0],player_2.cell_1[1],player_2.cell_1[2],player_2.cell_1[3],
                            player_2.cell_2[0][0],player_2.cell_2[0][1],player_2.cell_2[1][0],player_2.cell_2[1][1],player_2.cell_2[2][0],player_2.cell_2[2][1],
                            player_2.cell_3[0][0],player_2.cell_3[0][1],player_2.cell_3[0][2],player_2.cell_3[1][0],player_2.cell_3[1][1],player_2.cell_3[1][2],
                            player_2.cell_4[0][0],player_2.cell_4[0][1],player_2.cell_4[0][2],player_2.cell_4[0][3]
                        ];
                    }
                }
        }
    });



    var move = 'left';

    var lifes_left = 2;
    var lifes_right = 20;




    $('.move-js').on('click' , function(){
        var x = $(this).data('x');
        var y = $(this).data('y');
        var damaged = false;

        for(var z = 0; z < 20; z++){
            if(move =='left'){
                if( x == cells_left[z][0] && y == cells_left[z][1]){
                    damaged = true;
                    $(this).children('img').removeClass('hide');
                    lifes_left--;
                }
            }else if(move == 'right'){
                if( x == cells_right[z][0] && y == cells_right[z][1]){
                    damaged = true;
                    $(this).children('img').removeClass('hide');
                    lifes_right--;
                }
            }
        }

        if(damaged == false){
            $(this).children('.fa-bomb').removeClass('hide');
            $('.game-right').toggleClass('disable');
            $('.game-left').toggleClass('disable');

            if( move == "left"){
                move = 'right';
            }else{
                move = "left";
            }
        }
        $(this).addClass('disable');
        if( lifes_left <= 0 || lifes_right <= 0 ){
            var gameIndex = localStorage.getItem('gameIndex');
            if(gameIndex == null){
                localStorage.setItem('gameIndex' , 1);
                gameIndex = 1;
            }
            var p = "<p>";
            var p2 = "</p>";
            var span = "<span>";
            var span2 = "</span>"
            if(lifes_left <= 0){
                var gameInfo = p + "Player : " + name_1 + " vs " + name_2 + " . Player " + span + name_1 + span2  +  " won. \n" + p2;
                localStorage.setItem('game' + gameIndex , gameInfo);
                gameIndex++;
                localStorage.setItem('gameIndex' , gameIndex);
            }else if(lifes_right <= 0){
                var gameInfo = p + "Player : " + name_1 + " vs " + name_2 + " . Player " + span  +  name_2 + span2  +  " won.\n" + p2;
                localStorage.setItem('game' + gameIndex , gameInfo);
                gameIndex++;
                localStorage.setItem('gameIndex' , gameIndex);
            }
            $('.game').addClass('hide');

        }
        console.log('Lifes left : ' + lifes_left);
        console.log('Lifes right : ' + lifes_right);
    });


    $('.js-statistic').on('click',function(){
        $('.links').removeClass('active');
        $(this).addClass('active');
        $('.game').addClass('hide');
        $('.select').addClass('hide');
        $('.names').addClass('hide');
        $('.statistic').removeClass('hide');
    });

    $('.js-gameLink').on('click',function(){
        $('.links').removeClass('active');
        $(this).addClass('active');
        $('.statistic').addClass('hide');
        $('.names').removeClass('hide');
    });

    var numberOfGames = localStorage.getItem('gameIndex');

    for(var x = 1; x < numberOfGames; x++){
        var game = localStorage.getItem('game' + x);
        console.log(game);
        $('.js-statstic-field').append(game);
    }


});