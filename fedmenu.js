var fedmenu = function(options) { $(document).ready(function() {
    var defaults = {
        'position': 'bottom-left',
        //'user': null,
        //'package': null,
    }
    // Our options object is called 'o' for shorthand
    var o = $.extend({}, defaults, options || {});

    console.log(o);

    $('body').append('<link href="fedmenu.css" rel="stylesheet">');
    $('body').append('<div id="fedmenu-button" class="fedmenu-' + o.position + '"></div>');
    $('body').append('<div id="fedmenu-wrapper"></div>');
    console.log('oh hay');

    $('body').append('<div id="fedmenu-content"></div>');
    $('#fedmenu-content').append("<h1>Fedora Infrastructure</h1>");
    $.ajax({
        url: 'https://apps.fedoraproject.org/js/data.js',
        dataType: 'script',
        success: function(script) {
            $.each(json.children, function(i, child) {
                var html =
                    "<div class='fedmenu-panel'><div class='fedmenu-header'>" +
                    child.name + "</div><ul>";

                $.each(child.children, function(j, grandchild) {
                    html = html +
                        "<li><a href='" + grandchild.data.url + "'>" +
                        $("<p>" + grandchild.name + "</p>").text() +
                        "</a></li>";
                });
                html = html + "</ul></div>";
                $("#fedmenu-content").append(html);
            });
        },
    });

    var main = '#fedmenu-wrapper,#fedmenu-button,#fedmenu-content';
    var activate = function() { $(main).addClass('fedmenu-active'); };
    var deactivate = function() { $(main).removeClass('fedmenu-active'); };

    $("#fedmenu-button").click(function() {
        if ($(this).hasClass('fedmenu-active'))
            deactivate();
        else
            activate();
    });
    $("#fedmenu-wrapper").click(deactivate);
}); };
