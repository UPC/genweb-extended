$(function() {
    $.compact = function(object) {
        var recursive = function(object, prefix) {
            result = {};
            for (key in object) {
                value = object[key];
                if (typeof value === 'object')
                    result = $.extend(result, recursive(value, prefix + key + '.'));
                else
                    result[prefix + key] = value;
            }
            return result;
        }
        return recursive(object, '');
    }

    var loadList = function($element, $container, template) {
        var deferred = new $.Deferred();
        deferred = deferred.done(function() {
            $element.find('.gw4e-content').html($container).removeClass('hidden');
        });

        var type = $element.attr('data-type');
        if (!type) type = 'json';

        $.ajax({
            url: $element.attr('data-url'),
            dataType: type,
        }).done(function(json) {
            var start = parseInt($element.attr('data-start'));
            if (!start) start = 1;
            var count = parseInt($element.attr('data-count'));
            if (!count) count = json.length;

            var first = Math.max(0, start - 1);
            var last = Math.min(json.length, first + count)
            for(var i=first; i<last; i++) {
                var tags = $.compact(json[i]);
                var $item = template(json[i], i);
                var html = $item.html();
                $.each(Object.keys(tags), function(index, value) {
                    var re = new RegExp('\\$\\{' + value + '\\}', 'g');
                    html = html.replace(re, tags[value]);
                });
                $container.append($item.html(html));
            }
            if (first >= last) $container.html($element.attr('data-no-items'));
            return deferred.resolve();
        }).fail(function() {
            return deferred.reject();
        });
        return deferred;
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
    //   - data-type: [json|jsonp] (default=json)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    //   - data-interval: Segons entre imatges.
    jQuery.fn.gw4eCarousel = function() {
        var $this = $(this);
        var id = $('<div></div>').uniqueId().attr('id');
        var $container = $('<div class="carousel slide" id="' + id + '">' +
                             '<div class="carousel-inner"></div>' +
                             '<a class="carousel-control left" href="#' + id + '" data-slide="prev">‹</a>' +
                             '<a class="carousel-control right" href="#' + id + '" data-slide="next">›</a>' +
                           '</div>');
        var template = function(json, position) {
           var $item = $('<div class="item" style="height:20em">' +
                             '<a href="${urlResum}" title="${titol}"><img src="${urlFoto}" alt="${titol}" title="${titol}" style="width:100%;height:100%;object-fit:cover"/>' +
                             '<div class="carousel-caption"><h3>${titol}</h3><h4>${autor}</h4></div></a>' +
                           '</div>');
           if (position == 0) $item.addClass('active');
           return $item;
       };
       $this.html($container);
       loadList($this, $container.find('.carousel-inner'), template).done(function() {
           // Evita la configuració de genweb4 border-radius: 0px
           $this.find('a.carousel-control').attr('style', 'border-radius: 25px !important');
           var interval = $this.attr('data-interval');
           $this.find('.carousel').carousel({ interval: interval ? interval * 1000 : interval = false });
       });
       return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-type: [json|jsonp] (default=json)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    //   - data-no-items: Text en cas que no hi hagi elements mostrar. (default="")
    jQuery.fn.gw4eActualitat = function() {
        var $this = $(this);

        var $container = $('<ul class="list-portlet"></ul>');
        var template = function(json, position) {
            var $item = $('<li><a href="${url}" title="${titol}" target="_blank">${titol}<img style="margin-left:5px;" class="link_blank" alt="(open in new window)" src="++genweb++static/images/icon_blank.gif"></a></li>');
            $item.find('a').click(function(event) {
                event.preventDefault();
                window.open($(this).attr('href'), '_blank', 'width=800,height=600,scrollbars=yes');
            });
            return $item;
        };
        loadList($this, $container, template);
        return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-type: [json|jsonp] (default=json)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    //   - data-no-items: Text en cas que no hi hagi elements mostrar. (default="")
    jQuery.fn.gw4eActualitatLarge = function() {
        var $this = $(this);

        var $container = $('<div class="container-fluid"></div>');
        var template = function(json, position) {
            var first = '<a href="${url}" title="${titol}"><img src="${imatge.src}" alt="${imatge.alt}"/></a>';
            var second = '<h3><a href="${url}" title="${titol}">${titol}</a></h3>${resum}</div>';
            if (json.imatge)
                return $('<div class="row"><div class="span3">' + first + '</div><div class="span9">' + second + '</div></div>');
            else
                return $('<div class="row"><div class="span12">' + second + '</div></div>');
        };
        loadList($this, $container, template);
        return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-item-template: Plantilla de l'item. Es poden utilitzar els tags ${nom-atribut}
    //   - data-no-items: Text en cas que no hi hagi elements mostrar. (default="")
    //   - data-type: [json|jsonp] (default=json)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    jQuery.fn.gw4eList = function() {
        var $this = $(this);
        var $container = $('<div></div>');
        var template = function(json, position) { return $($this.attr('data-item-template')); };
        loadList($this, $container, template);
        return $this;
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
