$(document).ready(function() {
    $('body').append('<link href="fedmenu.css" rel="stylesheet">');
    $('body').append('<div id="fedmenu-button">button</div>');
    $('body').append('<div id="fedmenu-wrapper" class="fedmenu-hidden fedmenu-radial-shadow"></div>');
    $("#fedmenu-button").click(function() {
        $('#fedmenu-wrapper').removeClass('fedmenu-hidden');
    })
    console.log('hi');
});
