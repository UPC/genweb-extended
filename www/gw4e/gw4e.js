$(function() {
    var ratioToHeightPercent = function(ratio) {
        var x = 16, y = 9;
        var values = ratio.split(':');
        if (values.length == 2 && values[0] > 0 && values[1] > 0) {
            x = values[0];
            y = values[1];
        }
        return (100.0 * y) / x;
    };

    // Converteix un array multidimensinal a un array d'una dimensió
    // ex.
    // [ 'elem1 ' => [
    //     'elem11' => 'value 11',
    //     'elem12' => 'value 12'
    //   ],
    //   'elem2' => 'value 2'
    // ]
    // Passa a ser:
    // [
    //   'elem1.elem11' => 'value 11',
    //   'elem1.elem12' => 'value 12',
    //   'elem2' => 'value 2'
    // ]
    var compactArray = function(object) {
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

    var loadList = function($element, $container, template, $empty) {
        var deferred = new $.Deferred();

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
                var item = template(json[i], i);
                var tags = compactArray(json[i]);
                $.each(Object.keys(tags), function(index, value) {
                    var re = new RegExp('\\$\\{' + value + '\\}', 'g');
                    item = item.replace(re, tags[value]);
                });
                $container.append(item);
            }
            if ($empty && first >= last) {
                $container.replaceWith($empty);
            }
            return deferred.resolve();
        }).fail(function() {
            return deferred.reject();
        });
        return deferred;
    };

    jQuery.fn.gw4eFixTemplateUrl = function() {
        var $this = $(this);
        if (typeof portal_url != "undefined") {
            ['ca', 'es', 'en'].forEach(function(language) {
                $this.find('a[href^="' + portal_url + '/' + language + '/${"]').each(function(index, element) {
                    $(this).attr('href', $(this).attr('href').replace(portal_url + '/' + language + '/', ''));
                });
            });
        }
        return this;
    }

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
        var $iframe = $('<iframe frameborder="0" scrolling="no" width="100%" height="1000">#</iframe>')
            .attr('src', $this.attr('data-url'));
        $container.append($iframe);
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.15/iframeResizer.min.js').done(function() {
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
    //   - data-height: Alçada del carousel.
    jQuery.fn.gw4eCarousel = function() {
        var $this = $(this);
        var $container = $this.find('.gw4e-content-list');
        var $item = $this.find('.gw4e-content-item').gw4eFixTemplateUrl().detach();
        var $empty = false;

        if ($this.attr('data-height')) $item.find('.item').height($this.attr('data-height'));
        $item.find('img').css('width', '100%').css('height', '100%').css('object-fit', 'cover');
        var template = function(json, position) {
            $item.find('.item').toggleClass('active', position == 0);
            return $item.html();
        };
        loadList($this, $container, template, $empty).done(function() {
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
        var $container = $this.find('.gw4e-content-list');
        var $empty = false;
        var item = $this.find('.gw4e-content-item').detach().gw4eFixTemplateUrl().html();
        var template = function(json, position) { return item; };
        loadList($this, $container, template, $empty).done(function() {
            $this.find('ul.list-portlet li a').click(function(event) {
                event.preventDefault();
                window.open($(this).attr('href'), '_blank', 'width=800,height=600,scrollbars=yes');
            });
            return $this;
        });
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
        var $container = $this.find('.gw4e-content-list');
        var $empty = false;
        // var item = $this.find('.gw4e-content-item').detach().html();
        var item = $this.find('.gw4e-content-item').detach().gw4eFixTemplateUrl().html();
        var template = function(json, position) {
            if (json.imatge) return item;
            var $item = $('<div></div>').html(item);
            $item.find('.span3').remove();
            $item.find('.span9').removeClass('span9').addClass('span12');
            return $item.html();
        };
        loadList($this, $container, template, $empty);
        return this;
    };

    // Atributs HTML
    //   - data-url: Data source url (jsonp format)
    //   - data-type: [json|jsonp] (default=json)
    //   - data-start: Primer element a mostrar (default=1)
    //   - data-count: Número d'elements a mostrar (default=all)
    jQuery.fn.gw4eList = function() {
        var $this = $(this);
        var $container = $this.find('.gw4e-content-list');
        var $empty = $this.find('.gw4e-content-empty').detach();
        var item = $this.find('.gw4e-content-item').detach().gw4eFixTemplateUrl().html();
        var template = function(json, position) { return item; };
        loadList($this, $container, template, $empty);
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
