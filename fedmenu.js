$(document).ready(function() {
    $('body').append('<link href="fedmenu.css" rel="stylesheet">');
    $('body').append('<div id="fedmenu-button"></div>');
    $('body').append('<div id="fedmenu-wrapper" class="fedmenu-hidden fedmenu-radial-shadow"></div>');
    $("#fedmenu-wrapper").click(function() {
        $('#fedmenu-button').removeClass('fedmenu-active');
        $('#fedmenu-wrapper').addClass('fedmenu-hidden');
    });
    $("#fedmenu-button").click(function() {
        $('#fedmenu-button').addClass('fedmenu-active');
        $('#fedmenu-wrapper').removeClass('fedmenu-hidden');
    })
    console.log('hi');
});
