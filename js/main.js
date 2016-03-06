var social = true;

function validate() {
    // name validate
    var name = document.getElementById('inp-name').value;
    if (name.length == 0) {
        return 0;
    }
    // social validate

    $('.fb, .tw, .vk, .ok').removeClass('input-error');
    social = true;
    $('#firstpg-name').text('');
    $('#firstpg-mail').text('');
    $('#socialpg').text('');
    if ($('#fb').is(':checked') && $('#fb').next().next().val().length == 0){
        $('#fb').next().next().addClass('input-error');
        social = false;
    }
    if ($('#tw').is(':checked') && $('#tw').next().next().val().length == 0){
        $('#tw').next().next().addClass('input-error');
        social = false;
    }
    if ($('#vk').is(':checked') && $('#vk').next().next().val().length == 0){
        $('#vk').next().next().addClass('input-error');
        social = false;
    }
    if ($('#ok').is(':checked') && $('#ok').next().next().val().length == 0){
        $('#ok').next().next().addClass('input-error');
        social = false;
    }
    if (!social) {
        return false;
    }
    // mail validate
    var mail = document.getElementById('inp-mail').value;
    var parts = mail.split('@');
    if (parts.length != 2 || parts[0].length == 0) {
        return 0;
    } else {
        var dot = parts[1].split('.');
        return (dot.length == 2 && dot[0].length > 0 && dot[1].length > 0);
    }
}

var validPicture = false;

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'json/countries.json',
        success: function(response) {
            for (var record in response) {
                $('#country').append('<option value="' + record + '">' + response[record] + '</option>')
            }
        }
    });
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'json/cities.json',
        success: function(response) {
            var sel = $('#country').val();
            for (var record in response) {
                if (sel == response[record]['country']) {
                    $('#city').append('<option value="' + record + '">' + response[record]['name'] + '</option>');
                }
            }
        }
    });
});

$('#country').change(function() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'json/cities.json',
        success: function(response) {
            $('#city').empty();
            var sel = $('#country').val();
            for (var record in response) {
                if (sel == response[record]['country']) {
                    $('#city').append('<option value="' + record + '">' + response[record]['name'] + '</option>');
                }
            }
        }
    });
});

$('#prev').click(function () {
    $('#inp-name, #inp-mail').removeClass('input-error');
    if (validate()) {
        var $curr = $('.content.sel');
        var $prev = $curr.prev();
        var $currpt = $('.curr');
        var $prevpt = $currpt.prev();
        var $currtx = $('.curr-title');
        var $nexttx = $currtx.prev();
        $('#next').css('visibility', 'visible');
        $('#end').css('visibility', 'hidden');
        if ($prev.length != 0) {
            $curr.removeClass('sel');
            $prev.addClass('sel');
            $currpt.removeClass('curr');
            $prevpt.addClass('curr');
            $currtx.removeClass('curr-title');
            $nexttx.addClass('curr-title');
        }
        if ($('.sel').prev().length == 0) {
            $('#prev').css('color', '#aaaaaa');
        }
    } else {
        if ($('#inp-name').val().length == 0) {
            $('#inp-name').addClass('input-error');
            $('#firstpg-name').text(' — введите ваше имя');
        } else if (!social) {
            $('#socialpg').text('Введите ссылку');
        } else {
            $('#inp-mail').addClass('input-error');
            $('#firstpg-mail').text(' — формат адреса электронной почты неправильный');
        }
    }
});

$('#next').click(function () {
    var btn = this;
    $('#inp-name, #inp-mail').removeClass('input-error');
    if (validate()) {
        $('#prev').css('color', '#ff9800');
        var $curr = $('.content.sel');
        var $next = $curr.next();
        $curr.removeClass('sel');
        $next.addClass('sel');

        var $currpt = $('.curr');
        var $nextpt = $currpt.next();
        $currpt.removeClass('curr');
        $nextpt.addClass('activated');
        $nextpt.addClass('curr');

        var $currtx = $('.curr-title');
        var $nexttx = $currtx.next();
        $currtx.removeClass('curr-title');
        $nexttx.addClass('curr-title');

        if ($('.sel+.content').length == 0) {
            $(btn).css('visibility', 'hidden');
            $('#end').css('visibility', 'visible');
        }
    } else {
        if ($('#inp-name').val().length == 0) {
            $('#inp-name').addClass('input-error');
            $('#firstpg-name').text(' — введите ваше имя');
        } else if (!social) {
            $('#socialpg').text('Введите ссылку');
        } else {
            $('#inp-mail').addClass('input-error');
            $('#firstpg-mail').text(' — формат адреса электронной почты неправильный');
        }
    }
});

$('#end').click(function() {
    if (validPicture) {
        var $currpt = $('.curr');
        $currpt.removeClass('curr');
        var $currtx = $('.curr-title');
        $currtx.removeClass('curr-title');
        var social = ['Facebook: ', 'Twitter: ', 'VK: ', 'Odnoklassniki: '];
        var i = 0;

        $('.questionnaire').css('visibility', 'hidden').height(0);
        $(this).css('visibility', 'hidden');
        $('.results').css('visibility', 'visible');
        $('.results').css('background-color', '#ffffff');
        $('.results').css('box-shadow', '0 1px 2px rgba(0, 0, 0, 0.2)');
        $('.results').css('padding', '10px');
        $('#res-name').text($('#inp-name').val());
        $('#res-mail').text($('#inp-mail').val());
        $('#res-country').text($('#city').find('option:selected').text() + ", " + $('#country').find('option:selected').text());
        $('.check-social').each(function() {
            var $inp = $(this).next().next();
            if ($inp.val().length != 0) {
                $('.res-social').append('<p><span class="soc-info">' + social[i] + '</span>' +  $inp.val() + '</p>');
            }
            i++;
        });
        if ($('#pic1').hasClass('active')) {
            $('.results').append('<div class="right"><img src="img/cat1.jpg" alt="cat"></div>');
        } else if ($('#pic2').hasClass('active')) {
            $('.results').append('<div class="right"><img src="img/cat2.jpg" alt="cat"></div>');
        } else if ($('#pic3').hasClass('active')) {
            $('.results').append('<div class="right"><img src="img/cat3.jpg" alt="cat"></div>');
        }
        $('.results').append('<div class="clear"></div>');
        $('.results').parent().append('<div class="start-btn"><input type="button" value="Пройти заново" id="start"></div>');
        $('#start').click(function() {
            $('.results').css('visibility', 'hidden');
            $('.questionnaire').css('visibility', 'visible');
            $('#next').css('visibility', 'visible');
            var $first = $('.content').first();
            var $firsttx = $('.page-title').first();
            $('.sel').removeClass('sel');
            $('.curr-title').removeClass('curr-title');
            $first.addClass('sel');
            $firsttx.addClass('curr-title');
            $('.curr').removeClass('curr');
            $('.page').first().addClass('curr');
            $('.activated').removeClass('activated');
            $('.page').first().addClass('activated');
            $('input:text').val('');
            $('input:checkbox').removeAttr("checked");
            $('.active').removeClass('active');
            $('.right').remove();
            $('.results .clear').remove();
            $('.start-btn').remove();
            $('.res-social').empty();
            $('label + input:text:not(.link-input)').toggleClass('link-input');
            $('#prev').css('color', '#aaaaaa');
            validPicture = false;
        });
    }
});

$('.check-social').click(function() {
    $(this).next().next().toggleClass('link-input');
});

$('.cat').click(function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#pic').text('');
    validPicture = true;
});

$('.dog').click(function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#pic').text('Вы выбрали собачку. А надо котика');
    validPicture = false;
});

$('.page').click(function() {
    if ($(this).hasClass('activated')) {
        $('#inp-name, #inp-mail').removeClass('input-error');
        $('#firstpg-name').text('');
        $('#firstpg-mail').text('');
        if (validate()) {
            var number = $(this).val();
            $('.sel').removeClass('sel');
            $('.curr').removeClass('curr');
            $('.curr-title').removeClass('curr-title');
            $(this).addClass('curr');
            $('#prev').css('color', '#ff9800');
            $('#next').css('visibility', 'visible');
            $('#end').css('visibility', 'hidden');
            switch (number) {
                case '1':
                    $('#pg1').addClass('sel');
                    $('#title1').addClass('curr-title');
                    $('#prev').css('color', '#aaaaaa');
                    break;
                case '2':
                    $('#pg2').addClass('sel');
                    $('#title2').addClass('curr-title');
                    break;
                case '3':
                    $('#pg3').addClass('sel');
                    $('#title3').addClass('curr-title');
                    break;
                case '4':
                    $('#pg4').addClass('sel');
                    $('#title4').addClass('curr-title');
                    $('#next').css('visibility', 'hidden');
                    $('#end').css('visibility', 'visible');
                    break;
            }
        } else {
            if ($('#inp-name').val().length == 0) {
                $('#inp-name').addClass('input-error');
                $('#firstpg-name').text(' — введите ваше имя');
            } else if (!social) {
                $('#socialpg').text('Введите ссылку');
            } else {
                $('#inp-mail').addClass('input-error');
                $('#firstpg-mail').text(' — формат адреса электронной почты неправильный');
            }
        }
    }
});
