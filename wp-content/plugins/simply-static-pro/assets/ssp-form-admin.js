'use strict';

jQuery(document).ready(function ($) {
    // Ajax for JSON file creation.
    $('#create-form-config').on('click', function (e) {

        $.ajax({
            type: 'post',
            dataType: 'json',
            url: form_config.ajax_url,
            data: { 'action': 'create_form_config', 'nonce': form_config.nonce },
            beforeSend: function () {
                $('.form-config .spinner').addClass('is-active');
            },
            complete: function () {
                $('.form-config .spinner').removeClass('is-active');
            },
            success: function (response) {
                $('#form .form-config').append('<div class="ssp-success">' + response.message + '</div>');
                $('.ssp-success').fadeOut(3000);
            }
        });
    });
});