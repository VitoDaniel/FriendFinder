$(function () {

    $('.submit').on('click', function () {
        event.preventDefault();


        // check if all inputs are filled up
        var validateForms = function () {
            var checkValidation = true;
            $('.validate').each(function () {
                if (!$(this).val()) checkValidation = false;
            });

            $('.browser-default').each(function () {
                if (!$(this).val()) checkValidation = false;
            });

            return checkValidation;
        }

        if (validateForms()) {
            // if validation passed - creating new potential friend
            var newUser = {
                name: $('#name').val().trim(),
                photo: $('#photo').val().trim(),
            };

            // creating empty array of scores, where we gonna store users  scores.
            var scoreArr = [];
            // loop through the questions to get the score of each fo them
            $('.browser-default').each(function () {
                // push answers to scroeArr
                scoreArr.push($(this).val());
            }).promise().done(() => {
                newUser.scores = scoreArr;
                console.log(newUser.scores);
            })

            // grab the URL of the website.
            var currentURL = window.location.origin;



            $.post(currentURL + '/api/friends', newUser, function (data) {
                if (data) {
                    console.log("this is the data: " + JSON.stringify(data));
                    $('.modal-content').empty();
                    $('#name').val('');
                    $('#photo').val('');
                    $('.browser-default').each(function () {
                        $(this).val('');
                    });





                 
                        let $div = $(`<div class="friends">`);
                        let $div2 = $(`<div class="friendImages">`);
                        let name = data.name;
                        let url = data.photo;
                        let header = $(`<h4>`).text(name);
                        let photo = $(`<img class="circle" width="250px">`).attr('src', url);
                        $div.append(header);
                        $div2.append(photo);
                        // console.log($div, $div2, 'IS IT WORKING');
                        $('.modal-content').append($div2, $div);
                  

                    var $title = $('<h3 class="title">');
                    if (data.length > 1) {
                        $title.text('Here are your best matches');
                        $('.modal-content').prepend($title);
                    } else {
                        $title.text('Here is your best match');
                        $('.modal-content').prepend($title);
                    };
                }

            });


        } else {
            $('.modal-content').empty();
            var $err = $('<h4>Please fill out the form! </h4>');
            var $errDiv = $('<div class="modal-error">').append($err);
            $('.modal-content').append($errDiv);
            var error = $('<h3 class="error red-text>ERROR!</h3>');
            $('.modal-content').prepend(error);
        }
    });

    $('.modal').modal();
    $('select').formSelect();

});