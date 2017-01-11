$(function() {
    var loadList = function($element, contentCreator, itemCreator) {
        var deferred = new $.Deferred();
        $.ajax({
            url: $element.attr('data-url'),
            dataType: 'jsonp',
        }).done(function(json) {
            if (json.length == 0) return;

            var start = parseInt($element.attr('data-start'));
            if (!start) start = 1;
            var count = parseInt($element.attr('data-count'));
            if (!count) count = json.length;

            var first = Math.max(0, start - 1);
            var last = Math.min(json.length, first + count)
            var $container = contentCreator($element.find('.gw4e-content').html(''));
            for(var i=first; i<last; i++) {
                $item = itemCreator($container, json[i], i + 1);
            }
            $element.find('.gw4e-content').removeClass('hidden');
            deferred.resolve();
        });
        return deferred;
    };

    var loadCarousel = function($element, contentCreator, itemCreator) {
        loadList($element, contentCreator, itemCreator).then(function() {
            // Evita la configuració de genweb4 border-radius: 0px
            $element.find('a.carousel-control').attr('style', 'border-radius: 25px !important');
            var interval = $element.attr('data-interval');
            $element.find('.carousel').carousel({ interval: interval ? interval * 1000 : interval = false });
        });
    };

    var ratioToHeightPercent = function(ratio) {
        var x = 16, y = 9;
        var values = ratio.split(':');
        if (values.length == 2 && values[0] > 0 && values[1] > 0) {
            x = values[0];
            y = values[1];
        }
        return (100.0 * y) / x;
    };

    // Atributs HTML
    //   - data-selector: Selector CSS dels elements a ocultar.
    jQuery.fn.gw4eRemoveElement = function() {
        var $this = $(this);
        var selector = $this.attr('data-selector');
        $(selector).addClass('hidden');
        return this;
    };

    // Atributs HTML
    //   - data-url: Adreça URL de l'iframe
    jQuery.fn.gw4eIframe = function() {
        var $this = $(this);
        var $container = $this.find('.gw4e-content').html('');
        var $iframe = $('<iframe frameborder="0" scrolling="no" width="100%" height="1000">Hola</iframe>')
            .attr('src', $this.attr('data-url'));
        $container.append($iframe);
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.5/iframeResizer.min.js').done(function() {
            $iframe.iFrameResize([{}]);
            $container.removeClass('hidden');
        });
        return this;
    };

    // Atributs HTML
    //   - data-url: Vídeo url
    //   - data-ratio: Ratio del vídeo (default=16:9)
    jQuery.fn.gw4eYoutube = function() {
        var $this = $(this);
        var id = $this.attr('data-id');
        var ratio = $this.attr('data-ratio');
        ratio = ratio ? ratio : '16:9';

        var options = 'autoplay=1&autohide=1&rel=0&controls=1&iv_load_policy=3&modestbranding=1&showinfo=0';
        var wrapperCss = 'position:relative;padding-bottom:' + ratioToHeightPercent(ratio) + '%;height:0;';
        var videoCss  = 'position:absolute;top:0;left:0;width:100%;height:100%;';
        var url = '//www.youtube.com/embed/' + id + '?' + options;
        var $container = $this.find('.gw4e-content').html('');
        var $video = $('<div style="' + wrapperCss + '"><iframe style="' + videoCss + '" src="' + url + '" allowfullscreen></iframe></div>');
        $container.append($video);
        $container.removeClass('hidden');
        return this;
    };

    // Atributs HTML
    //   - data-url: Vídeo url
    //   - data-ratio: Ratio del vídeo (default=16:9)
    jQuery.fn.gw4eVideo = function() {
        var $this = $(this);
        var url = $this.attr('data-url');
        var ratio = $this.attr('data-ratio');
        ratio = ratio ? ratio : '16:9';

        var $video = $('<video style="width:100%;height:' + ratioToHeightPercent(ratio) + '%" src="' + url + '" controls autoplay></video>');
        var $container = $this.find('.gw4e-content').html('');
        $container.append($video);
        $container.removeClass('hidden');
        return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    //   - data-interval: Segons entre imatges.
    jQuery.fn.gw4eCarousel = function() {
        var $this = $(this);
        var contentCreator = function ($container) {
            var id = $('<div></div>').uniqueId().attr('id');
            var $content = $(
                '<div class="carousel slide" id="' + id + '">' +
                    '<div class="carousel-inner"></div>' +
                    '<a class="carousel-control left" href="#' + id + '" data-slide="prev">‹</a>' +
                    '<a class="carousel-control right" href="#' + id + '" data-slide="next">›</a>' +
                '</div>'
            );
            $container.append($content);
            return $content;
        };
        var itemCreator = function ($container, json, position) {
           var $content = $(
               '<div class="item" style="height:20em">' +
                   '<a href=""><img src="" style="width:100%;height:100%;object-fit:cover"/>' +
                   '<div class="carousel-caption"><h3></h3><h4></h4></div></a>' +
               '</div>'
           );
           if (position == 1) {
               $content.addClass('active');
           }
           $content.find('a').attr('href', json.urlResum);
           $content.find('a').attr('title', json.titol);
           $content.find('img').attr('src', json.urlFoto);
           $content.find('img').attr('alt', json.titol);
           $content.find('img').attr('title', json.titol);
           $content.find('h3').html(json.titol);
           $content.find('h4').html(json.autor);
           $container.find('.carousel-inner').append($content);
           return $content;
       };
       loadCarousel($this, contentCreator, itemCreator);
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    jQuery.fn.gw4eActualitat = function() {
        var $this = $(this);

        var contentCreator = function ($element) {
            $content = $('<ul class="list-portlet"></ul>');
            $element.append($content);
            return $content;
        };
        var itemCreator = function ($element, json, position) {
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
        };

        loadList($this, contentCreator, itemCreator);
        return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    jQuery.fn.gw4eActualitatLarge = function() {
        var $this = $(this);

        var contentCreator = function ($element) {
            $content = $('<div class="container-fluid">');
            $element.append($content);
            return $content;
        };
        var itemCreator = function ($element, json, position) {
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
        };

        loadList($this, contentCreator, itemCreator);
        return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    //   - data-attribute: Nom del camp que cal mostrar
    jQuery.fn.gw4eList = function() {
        var $this = $(this);

        var contentCreator = function ($element) {
            var $container = $this.find('.gw4e-content').html('');
            return $container;
        };
        var itemCreator = function ($element, json, position) {
            var attribute = $this.attr('data-attribute');
            $content = $('<li>' + json[attribute] + '</li>');
            $element.append($content);
            return $content;
        };

        loadList($this, contentCreator, itemCreator);
        return this;
    };

    $('div.gw4e-iframe').each(function(index, element) {
        $(element).gw4eIframe();
    });

    $('div.gw4e-remove-element').each(function(index, element) {
        $(element).gw4eRemoveElement();
    });

    $('div.gw4e-carousel').each(function(index, element) {
        $(element).gw4eCarousel();
    });

    $('div.gw4e-youtube').each(function(index, element) {
        $(element).gw4eYoutube();
    });

    $('div.gw4e-video').each(function(index, element) {
        $(element).gw4eVideo();
    });

    $('div.gw4e-list').each(function(index, element) {
        $(element).gw4eList();
    });

    $('div.gw4e-actualitat').each(function(index, element) {
        $(element).gw4eActualitat();
    });

    $('div.gw4e-actualitat-large').each(function(index, element) {
        $(element).gw4eActualitatLarge();
    });
});
