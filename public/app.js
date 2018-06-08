function sendContactForm() {
    var sendForm = $('#contact-form');
    var sendFormButton = $('#contact-form-button');
    var completed = $('#contact-complete');
    var failed = $('#contact-failed');

    try {
        var name = $('#name').val();
        var email =  $('#email').val();
        var message = $('#message').val();

        sendFormButton.prop('disabled', true);
        sendFormButton.val('Sending message...');

        $.ajax({
            url: '/api/contact',
            type: 'POST',
            data: JSON.stringify({
                name: name,
                email: email,
                message: message
            }),
            success: function() {
                sendForm.hide();
                failed.hide();

                completed.show();
            },
            error: function() {
                sendForm.hide();
                completed.hide();

                failed.show();
            },
            contentType: 'application/json; charset=utf-8'}
        );
    } catch (e) {
        sendForm.hide();
        completed.hide();

        failed.show();
    }

    return false;
}