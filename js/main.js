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
        $('#next').css('visibility', 'visible');
        $('#end').css('visibility', 'hidden');
        if ($prev.length != 0) {
            $curr.removeClass('sel');
            $prev.addClass('sel');
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
    if (validate()) {
        var $curr = $('.content.sel');
        var $next = $curr.next();
        $curr.removeClass('sel');
        $next.addClass('sel');
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
        $('.questionnaire').css('visibility', 'hidden');
        $(this).css('visibility', 'hidden');
        $('.results').css('visibility', 'visible');
        $('#res-name').text('Name: ' + $('#inp-name').val());
        $('#res-mail').text('E-mail: ' + $('#inp-mail').val());
        $('#res-country').text('Country: ' + $('#country').find('option:selected').text());
        $('#res-city').text('City: ' + $('#city').find('option:selected').text());
        $('.check-social').each(function() {
            var $inp = $(this).next();
            $('.res-social').append('<p>' + $inp.val() + '</p>');
        });
        if ($('#pic1').hasClass('active')) {
            $('.results').append('<img src="img/cat1.jpg" alt="cat">');
        } else if ($('#pic2').hasClass('active')) {
            $('.results').append('<img src="img/cat2.jpg" alt="cat">');
        } else if ($('#pic3').hasClass('active')) {
            $('.results').append('<img src="img/cat3.jpg" alt="cat">');
        }
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

for (var i = 1; i <= 4; i++) {
    $('#page' + i).click(function() {
        alert(this.id);
    });
}