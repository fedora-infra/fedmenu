var fedmenu = function(options) { $(document).ready(function() {
    var defaults = {
        'url': 'https://apps.fedoraproject.org/js/data.js',
        'mimeType': undefined,  // Only needed for local development

        'position': 'bottom-left',

        'user': null,
        'package': null,
    }
    // Our options object is called 'o' for shorthand
    var o = $.extend({}, defaults, options || {});

    var buttons = "";
    if (o['user'] != null) buttons += '<div id="fedmenu-user-button" class="fedmenu-button"></div>';
    if (o['package'] != null) buttons += '<div id="fedmenu-package-button" class="fedmenu-button"></div>';
    buttons += '<div id="fedmenu-main-button" class="fedmenu-button"></div>';

    $('body').append('<link href="fedmenu.css" rel="stylesheet">');
    $('body').append(
        '<div id="fedmenu-tray" class="fedmenu-' + o.position + '">' +
        buttons + '</div>');

    $('body').append('<div id="fedmenu-wrapper"></div>');

    $('body').append('<div id="fedmenu-main-content" class="fedmenu-content"></div>');
    $('#fedmenu-main-content').append("<h1>Fedora Infrastructure</h1>");

    if (o['user'] != null) {
        var imgurl = libravatar.url(o['user']);
        $('#fedmenu-user-button').css('background-image', 'url("' + imgurl + '")');
        $('body').append('<div id="fedmenu-user-content" class="fedmenu-content"></div>');
        $('#fedmenu-user-content').append("<h1>View " + o['user'] + " in other apps</h1>");
    }
    if (o['package'] != null) {
        /* This icon is not always going to exist, so we should put in an
         * apache rule that redirects to a default icon if this file
         * isn't there. */
        var imgurl = 'https://apps.fedoraproject.org/packages/images/icons/' + o['package'] + '.png';
        $('#fedmenu-package-button').css('background-image', 'url("' + imgurl + '")');
        $('body').append('<div id="fedmenu-package-content" class="fedmenu-content"></div>');
        $('#fedmenu-package-content').append("<h1>View the " + o['package'] + " package in other apps</h1>");
    }

    // Define three functions used to generate the content of the menu panes
    var make_main_content_html = function(i, node) {
        var html = "<div class='fedmenu-panel'><div class='fedmenu-header'>" +
            node.name + "</div><ul>";

        $.each(node.children, function(j, leaf) {
            html = html +
                "<li><a target='_blank' href='" + leaf.data.url + "'>" +
                $("<p>" + leaf.name + "</p>").text() +
                "</a></li>";
        });
        html = html + "</ul></div>";
        $("#fedmenu-main-content").append(html);
    };

    var make_user_content_html = function(i, node) {
        var html = "<div class='fedmenu-panel'><div class='fedmenu-header'>" +
            node.name + "</div><ul>";

        var found = false;
        $.each(node.children, function(j, leaf) {
            if (leaf.data.user_url != undefined) {
                found = true;
                var url = leaf.data.user_url.replace('{user}', o['user'])
                html = html +
                    "<li><a target='_blank' href='" + url + "'>" +
                    $("<p>" + leaf.name + "</p>").text() +
                    "</a></li>";
            }
        });
        if (found) {
            html = html + "</ul></div>";
            $("#fedmenu-user-content").append(html);
        }
    };

    var make_package_content_html = function(i, node) {
        var html = "<div class='fedmenu-panel'><div class='fedmenu-header'>" +
            node.name + "</div><ul>";

        var found = false;
        $.each(node.children, function(j, leaf) {
            if (leaf.data.package_url != undefined) {
                found = true;
                var url = leaf.data.package_url.replace('{package}', o['package'])
                html = html +
                    "<li><a target='_blank' href='" + url + "'>" +
                    $("<p>" + leaf.name + "</p>").text() +
                    "</a></li>";
            }
        });
        if (found) {
            html = html + "</ul></div>";
            $("#fedmenu-package-content").append(html);
        }
    };

    $.ajax({
        url: o.url,
        mimeType: o.mimeType,
        dataType: 'script',
        error: function(err) {
            console.log('Error getting ' + o.url);
            console.log(err);
        },
        success: function(script) {
            $.each(json.children, make_main_content_html);
            if (o['user'] != null)
                $.each(json.children, make_user_content_html);
            if (o['package'] != null)
                $.each(json.children, make_package_content_html);
        },
    });

    var selector = function(t) {
        return "#fedmenu-wrapper," +
            "#fedmenu-" + t + "-button," +
            "#fedmenu-" + t + "-content";
    };
    var activate = function(t) { $(selector(t)).addClass('fedmenu-active'); };
    var deactivate = function(t) { $(selector(t)).removeClass('fedmenu-active'); };

    var click_factory = function(t) { return function() {
        if ($(this).hasClass('fedmenu-active'))
            deactivate(t);
        else
            activate(t);
    };};
    $("#fedmenu-main-button").click(click_factory('main'));
    $("#fedmenu-user-button").click(click_factory('user'));
    $("#fedmenu-package-button").click(click_factory('package'));
    $("#fedmenu-wrapper").click(function() {
        deactivate('main');
        deactivate('user');
        deactivate('package');
    });
}); };
