"use strict";

$(function (){
    tools();
});

const api_uri = 'https://petermcd.azurewebsites.net/api/site-up';

function tools(){
    $("#is-it-up").on("click",function(){
        check_if_up();
    });
}

function check_if_up(){
    const url = $("#url").val();
    const text = $("#text").val();
    let params = {'url': encodeURIComponent(url)};
    if (text.length > 0) {
        params['search'] = encodeURIComponent(text);
    }
    $.get(api_uri, params)
        .done(function(data){
            const res = JSON.parse(data);
            display_output(res);
            $("#url").val('');
            $("#text").val('');
        })
        .fail(function(data){
            const res = JSON.parse(data);
            display_error(res);
        });
}

function display_error(result) {
    alert('error');
    let a = {"success": false, "message": "url must start with http or https"}
}

function display_output(result) {
    alert('called');
}
