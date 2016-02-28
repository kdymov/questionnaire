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
    $('#socialpg').text('');
    if ($('#fb').is(':checked') && $('#fb').next().val().length == 0){
        $('#fb').next().addClass('input-error');
        social = false;
    }
    if ($('#tw').is(':checked') && $('#tw').next().val().length == 0){
        $('#tw').next().addClass('input-error');
        social = false;
    }
    if ($('#vk').is(':checked') && $('#vk').next().val().length == 0){
        $('#vk').next().addClass('input-error');
        social = false;
    }
    if ($('#ok').is(':checked') && $('#ok').next().val().length == 0){
        $('#ok').next().addClass('input-error');
        social = false;
    }
    if (!social) {
        return false;
    }
    // mail validate
    var mail = document.getElementById('inp-mail').value;
    var parts = mail.split('@');
    if (parts.length != 2) {
        return 0;
    } else {
        var dot = parts[1].split('.');
        return dot.length == 2;
    }
}

var validPicture = false;

$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'json/countries.json',
        success: function(response) {
            for (var record in response) {
                $('#country').append('<option value="' + record + '">' + response[record] + '</option>')
            }
        }
    });
    $.ajax({
        type: 'POST',
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
        type: 'POST',
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
        $('#next').css('visibility', 'visible');
        $('#end').css('visibility', 'hidden');
        if ($prev.length != 0) {
            $curr.removeClass('sel');
            $prev.addClass('sel');
            $currpt.removeClass('curr');
            $prevpt.addClass('curr');
        }
        if ($('.sel').prev().length == 0) {
            $('#prev').css('color', '#aaaaaa');
        }
    } else {
        if ($('#inp-name').val().length == 0) {
            $('#inp-name').addClass('input-error');
            $('#firstpg').text('Введите ваше имя');
        }  else {
            $('#inp-mail').addClass('input-error');
            $('#firstpg').text('Формат адреса электронной почты неправильный');
        }
    }
});

$('#next').click(function () {
    var btn = this;
    $('#inp-name, #inp-mail').removeClass('input-error');
    $('#prev').css('color', 'orangered');
    if (validate()) {
        var $curr = $('.content.sel');
        var $next = $curr.next();
        $curr.removeClass('sel');
        $next.addClass('sel');

        var $currpt = $('.curr');
        var $nextpt = $currpt.next();
        $currpt.removeClass('curr');
        $nextpt.addClass('curr');

        if ($('.sel+.content').length == 0) {
            $(btn).css('visibility', 'hidden');
            $('#end').css('visibility', 'visible');
        }
    } else {
        if ($('#inp-name').val().length == 0) {
            $('#inp-name').addClass('input-error');
            $('#firstpg').text('Введите ваше имя');
        } else if (!social) {
            $('#socialpg').text('Введите ссылку');
        } else {
            $('#inp-mail').addClass('input-error');
            $('#firstpg').text('Формат адреса электронной почты неправильный');
        }
    }
});

$('#end').click(function() {
    if (validPicture) {
        var $currpt = $('.curr');
        $currpt.removeClass('curr');
        var social = ['Facebook: ', 'Twitter: ', 'VK: ', 'Odnoklassniki: '];
        var i = 0;

        $('.questionnaire').css('visibility', 'hidden').height(0);
        $(this).css('visibility', 'hidden');
        $('.results').css('visibility', 'visible');
        $('#res-name').text('Name: ' + $('#inp-name').val());
        $('#res-mail').text('E-mail: ' + $('#inp-mail').val());
        $('#res-country').text('Country: ' + $('#country').find('option:selected').text());
        $('#res-city').text('City: ' + $('#city').find('option:selected').text());
        $('.check-social').each(function() {
            var $inp = $(this).next();
            if ($inp.val().length != 0) {
                $('.res-social').append('<p>' + social[i] + $inp.val() + '</p>');
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
        $('.results').append('<div class="clear"><input type="button" value="Пройти заново" id="start"></div>');
        $('#start').click(function() {
            $('.results').css('visibility', 'hidden');
            $('.questionnaire').css('visibility', 'visible');
            $('#next').css('visibility', 'visible');
            var $first = $('.content').first();
            $('.sel').removeClass('sel');
            $first.addClass('sel');
            $('.curr').removeClass('curr');
            $('.pages > input').first().addClass('curr');
            $('input:text').val('');
            $('input:checkbox').removeAttr("checked");
            $('.active').removeClass('active');
            $('.right, .clear').remove();
            $('.res-social').empty();
            $('.check-social + input:text:not(.link-input)').toggleClass('link-input');
            $('#prev').css('color', '#aaaaaa');
        });
    }
});

$('.check-social').click(function() {
    $(this).next().toggleClass('link-input');
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
