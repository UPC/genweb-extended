function caminstech_translate_images(url, $div) {
    $div.find('img').each(function(i, value) {
        if ($(value).attr('src').indexOf('resolveuid/') == 0) {
            $('<div/>').load('grabber.php?url=' + url + '/' + $(value).attr('src'), function() {
                $(value).attr('src', $(this).html());
            });
        }
    });
}

function caminstech_migrate($gw3) {
    $gw3.find('img.image-right').addClass('img-rounded');
    $gw3.find('ul').addClass('list list-condensed');
    $gw3.find('div.gb').removeClass('gb').addClass('box box-small clearfix');
    $gw3.find('div.fitxa').removeClass('fitxa').addClass('box box-small clearfix');
    $gw3.find('div.textDestacat').removeClass('textDestacat').addClass('well well-small clearfix');
    $gw3.find('div.caixaPortlet').removeClass('caixaPortlet').addClass('well well-small clearfix');
    $gw3.find('table.invisible').removeClass('invisible');
    $gw3.find('h2').addClass('xl liniaDalt');
    $gw3.find('a').each(function(i, value) {
        if ($(value).attr('href')) {
            href = $(value).attr('href').replace('http://www.camins.upc.edu', '').replace('https://www.camins.upc.edu', '');
            var external = href.startsWith('http://') || href.startsWith('https://');
            $(value).attr('href', href);
            if (external) {
                $(value).attr('target', '_blank');
            }
            else {
                $(value).removeAttr('target');
            }
        }
    });
    $gw3.find('a.external-link').removeClass('external-link');
    $gw3.find('a.internal-link').removeClass('internal-link');
    $gw3.find('span.external-link').removeClass('external-link');
    $gw3.find('span.internal-link').removeClass('internal-link');
    $gw3.find('p[align=center]').removeAttr('align').css('text-align', 'center');
    $gw3.find('p[align=left]').removeAttr('align').css('text-align', 'left');
    $gw3.find('p[align=right]').removeAttr('align').css('text-align', 'right');
    $gw3.find('.documentDescription').removeClass('documentDescription');
    $gw3.find('*[class=""]').removeAttr('class');

    $gw3.find('div.fila').removeClass('fila').addClass('row-fluid');
    $gw3.find('div.cella.w1\\:2')
      .removeClass('cella')
      .removeClass('w1:2')
      .removeClass('p0')
      .removeClass('p1:2')
      .addClass('span6');
    $gw3.find('div.cella.w1\\:3')
      .removeClass('cella')
      .removeClass('w1:3')
      .removeClass('p0')
      .removeClass('p1:3')
      .removeClass('p2:3')
      .addClass('span4');
    $gw3.find('div.cella.w2\\:3')
      .removeClass('cella')
      .removeClass('w2:3')
      .removeClass('p0')
      .removeClass('p1:3')
      .removeClass('p2:3')
      .addClass('span8');
    $gw3.find('div.cella.w1\\:4')
      .removeClass('cella')
      .removeClass('w1:4')
      .removeClass('p0')
      .removeClass('p1:4')
      .removeClass('p2:4')
      .removeClass('p3:4')
      .addClass('span3');
    $gw3.find('div.cella.w2\\:4')
      .removeClass('cella')
      .removeClass('w2:4')
      .removeClass('p0')
      .removeClass('p1:4')
      .removeClass('p2:4')
      .removeClass('p3:4')
      .addClass('span3');
    $gw3.find('div.cella.w3\\:4')
      .removeClass('cella')
      .removeClass('w3:4')
      .removeClass('p0')
      .removeClass('p1:4')
      .removeClass('p2:4')
      .removeClass('p3:4')
      .addClass('span3');
    return $gw3;
}
