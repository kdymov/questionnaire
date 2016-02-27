function validate() {
    // name validate
    var name = document.getElementById('inp-name').value;
    if (name.length == 0) {
        return 0;
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

    } else {
        if ($('#inp-name').val().length == 0) {
            $('#inp-name').addClass('input-error');
        } else {
            $('#inp-mail').addClass('input-error');
        }
    }
});

$('#next').click(function () {
    $('#inp-name, #inp-mail').removeClass('input-error');
    if (validate()) {
        $curr = $('.content.sel');
        $next = $curr.next();
        $curr.removeClass('sel');
        $next.addClass('sel');
    } else {
        if ($('#inp-name').val().length == 0) {
            $('#inp-name').addClass('input-error');
            $('#firstpg').text('Input your name');
        } else {
            $('#inp-mail').addClass('input-error');
            $('#firstpg').text('Your mail is incorrect');
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