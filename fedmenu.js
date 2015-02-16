$(document).ready(function() {
    $('body').append('<link href="fedmenu.css" rel="stylesheet">');
    $('body').append('<div id="fedmenu-button"></div>');
    $('body').append('<div id="fedmenu-wrapper" class="fedmenu-hidden fedmenu-radial-shadow"></div>')


    $('body').append('<div id="fedmenu-content"></div>');
    $('#fedmenu-content').append("<h1>Fedora Infrastructure</h1>");
    $.ajax({
        url: 'https://apps.fedoraproject.org/js/data.js',
        dataType: 'script',
        success: function(script) {
            $.each(json.children, function(i, child) {
                $("#fedmenu-content").append(
                    "<div class='fedmenu-header'>" + child.name + "</div><ul>");
                $.each(child.children, function(j, grandchild) {
                    $("#fedmenu-content").append(
                        "<li><a href='" + grandchild.data.url + "'>" + grandchild.name + "</a></li>");
                });
                $("#fedmenu-content").append("</ul>");
            });
        },
    });

    var activate = function() {
        $('#fedmenu-wrapper').removeClass('fedmenu-hidden');
        $('#fedmenu-button').addClass('fedmenu-active');
        $('#fedmenu-content').addClass('fedmenu-active');
    };

    var deactivate = function() {
        $('#fedmenu-wrapper').addClass('fedmenu-hidden');
        $('#fedmenu-button').removeClass('fedmenu-active');
        $('#fedmenu-content').removeClass('fedmenu-active');
    };
    $("#fedmenu-button").click(function() {
        if ($(this).hasClass('fedmenu-active'))
            deactivate();
        else
            activate();
    });
    $("#fedmenu-wrapper").click(deactivate);
});
