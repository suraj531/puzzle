@@ -1,6 +1,18 @@
stages = [];

stage1 = function() {
    copyStage('s1');

    var text = "";
    for (var i = 0; i < 20; i++) {
        text += "??????????????";
    }
    var output = "";
    for (i = 0; i < 60; i++) {
        output += text + "\n";
    }

    $('#s1-b5').text(output);
    actions = [];
    actions.push(() => $('#s1-b1').text('?'));
    actions.push(() => $('#s1-b2').text('?'));
@@ -67,6 +79,95 @@ function stage3() {

function stage4() {
    $('#target').html($('#s4').html());
    var target = $('#s4-b1');
    var actions = [];
    actions.push(()=>$('#s4-b1').text("?????? ??"));
    actions.push(()=>$('#s4-b1').text("?? ??????"));
    actions.push(stage5);

    actionHandler(actions, target);
}

function stage5() {
    copyStage('s5');

    var index = 1;

    function assignClick() {
        var $element = $('#s5-b' + index);
        $element.off().on('click', function() {
            index++;
            $element.css('color', 'red');
            $element.off();
            if (index == 9) {
                stage6();
            } else {
                assignClick();
            }
        });
    }

    assignClick();
}

function stage6() {
    copyStage('s6');
    $('#s6-b1').off().on('click', function() {
        stage7();
    });
}

function stage7() {
    copyStage('s7');
    var e = $('#s7-b1');
    e.off().on('click', function(event) {
        event.preventDefault();
        if ($('#s7-b4').val() == '?') {
            stage8();
        } else {
            $('#s7').css('color', 'red');
            setTimeout(()=>$('#s7').css('color', 'black'), 500);
        }
    });
}

function stage8() {
    copyStage('s8');
    stage8.angle = 0;
    $('#s8-b1').off().on('click', function(event) {
        event.preventDefault();
        var element = $('#s8-b4');
        var value = element.val();
        if (value == '?') {
            stage9();
        } else {
            stage8.angle += 10;
            $('#s8-b5').css('transform', 'rotate(' + stage8.angle + 'deg)');
            if (stage8.angle > 360) {
                $('#s8').css('transform', 'rotate(' + Math.log(stage8.angle) + 'deg)');
            }
        }
    });
}

function stage9() {
    copyStage('s9');
    var text = $('#s1-b5').text();
    text = text.substring(0, 690) + "<a id='s9-b2' href='#'>?</a>" + text.substring(690);
    $('#s9-b1').html(text);
    $('#s9-b2').off().on('click', function() {
        stage10();
    });
}

function stage10() {
    copyStage('s10');
}

function copyStage(stage) {
    var element = $('#' + stage).clone();
    element.removeClass('hide');
    $('#target').html(element[0].outerHTML);
}

function actionHandler(actions, $element) {
@@ -84,19 +185,5 @@ function actionHandler(actions, $element) {

// setup
$(document).ready(function() {
    $('#s1-b1').click(function(event) {
        event.preventDefault();
        stage1();
    });

    var text = "";
    for (var i = 0; i < 20; i++) {
        text += "??????????????";
    }
    var output = "";
    for (i = 0; i < 60; i++) {
        output += text + "\n";
    }

    $('#s1-b5').text(output);
    stage1();
});