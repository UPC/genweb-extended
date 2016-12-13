$(function() {
    function removeElement($element) {
        selector = $element.attr('data-selector');
        $(selector).addClass('hidden');
    }

    function setIframe($element) {
        var $container = $element.find('.gw4e-content').html('');
        var $iframe = $('<iframe frameborder="0" scrolling="no" width="100%" height="1000"></iframe>')
            .attr('src', $element.attr('data-url'));
        $container.append($iframe);
        $iframe.iFrameResize([{}]);
        $container.removeClass('hidden');
    }

    function setPortletList($element, portletListCreator, portletListItemCreator) {
        $.ajax({
            url: $element.attr('data-url'),
            dataType: 'jsonp',
        }).done(function(json) {
            var first = 0
            var last = 0;
            var start = parseInt($element.attr('data-start'));
            var count = parseInt($element.attr('data-count'));
            if (start) first = Math.max(0, start - 1);
            if (count) last = Math.min(json.length, first + count)
            var $container = portletListCreator($element.find('.gw4e-content').html(''));
            for(var i=first; i<last; i++) {
                $item = portletListItemCreator($container, json[i]);
            }
            $element.find('.gw4e-content').removeClass('hidden');
        });
    }

    function setCarouselList($element, carouselListCreator, carouselListItemCreator) {
        $.ajax({
            url: $element.attr('data-url'),
            dataType: 'jsonp',
        }).done(function(json) {
            if (json.length == 0) return;

            var active = $element.attr('data-item-active');
            if (!active) Math.floor((Math.random() * json.length) + 1);
            active = Math.max(1, active);
            active = Math.min(active, json.length);

            var $container = carouselListCreator($element.find('.gw4e-content').html(''));
            for(var i=0; i<json.length; i++) {
                $item = carouselListItemCreator($container, json[i]);
                if (i + 1 == active) $item.addClass('active');
            }
            // Evita la configuració de genweb4 border-radius: 0px
            $element.find('a.carousel-control').attr('style', 'border-radius: 25px !important');

            var interval = $element.attr('data-interval');
            $element.find('.carousel').carousel({ interval: interval ? interval * 1000 : interval = false });
            $element.find('.gw4e-content').removeClass('hidden');
        });
    }

    function actualitat($element) {
        setPortletList($element,
            function ($element) {
                $content = $('<ul class="list-portlet"></ul>');
                $element.append($content);
                return $content;
            }, function ($element, json) {
                $content = $('<li><a href="" target="_blank" title=""><img style="margin-left:5px;" class="link_blank" alt="(open in new window)" src="++genweb++static/images/icon_blank.gif"></a></li>');
                $content.find('a')
                    .attr('href', json.url)
                    .attr('title', json.titol)
                    .prepend(json.titol + ' ')
                    .click(function(event) {
                        event.preventDefault();
                        window.open($(this).attr('href'), '_blank', 'width=800,height=600,scrollbars=yes');
                    });
                $element.append($content);
                return $content;
            }
        );
    }

    function actualitatLarge($element) {
        setPortletList($element,
            function ($element) {
                $content = $('<div class="container-fluid">');
                $element.append($content);
                return $content;
            }, function ($element, json) {
                $content = $('<div class="row"><div><a><img src="" /></a></div><div><h3><a href=""></a></h3></div></div>');
                $first = $content.children().first();
                $second = $content.children().last();
                if (json.imatge) {
                    $first.addClass('span3');
                    $first.find('a')
                        .attr('href', json.url)
                        .attr('title', json.titol);
                    $first.find('img')
                        .attr('src', json.imatge.src)
                        .attr('alt', json.imatge.alt);
                    $second.addClass('span9');
                }
                else {
                    $first.remove();
                    $second.addClass('span12');
                }
                $second.find('h3 a')
                    .attr('href', json.url)
                    .attr('title', json.titol)
                    .html(json.titol);
                $second.find('h3').after(json.resum);
                $element.append($content);
                return $content;
            }
        );
    }

    function carousel($element) {
        setCarouselList($element,
            function ($container) {
                var id = $('<div></div>').uniqueId().attr('id');
                $content = $(
                    '<div class="carousel slide" id="' + id + '">' +
                        '<div class="carousel-inner"></div>' +
                        '<a class="carousel-control left" href="#' + id + '" data-slide="prev">‹</a>' +
                        '<a class="carousel-control right" href="#' + id + '" data-slide="next">›</a>' +
                    '</div>'
                );
                $container.append($content);
                return $content;
            }, function ($container, json) {
                $content = $(
                    '<div class="item" style="height:20em">' +
                        '<a href=""><img src="" style="width:100%;height:100%;object-fit:cover"/>' +
                        '<div class="carousel-caption"><h3></h3><h4></h4></div></a>' +
                    '</div>'
                );
                $content.find('a').attr('href', json.urlResum);
                $content.find('a').attr('title', json.titol);
                $content.find('img').attr('src', json.urlFoto);
                $content.find('img').attr('alt', json.titol);
                $content.find('img').attr('title', json.titol);
                $content.find('h3').html(json.titol);
                $content.find('h4').html(json.autor);
                $container.find('.carousel-inner').append($content);
                return $content;
            }
        );
    }

    if ($('div.gw4e-iframe').length) {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.5/iframeResizer.min.js', function() {
            $('div.gw4e-iframe').each(function(index, element) {
                setIframe($(element));
            });
        });
    }

    $('div.gw4e-remove-element').each(function(index, element) {
        removeElement($(element));
    });

    $('div.gw4e-actualitat').each(function(index, element) {
        actualitat($(element));
    });

    $('div.gw4e-actualitat-large').each(function(index, element) {
        actualitatLarge($(element));
    });

    $('div.gw4e-carousel').each(function(index, element) {
        carousel($(element));
    });
});
