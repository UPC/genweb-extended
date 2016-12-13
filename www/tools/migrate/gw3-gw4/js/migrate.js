function gw4e_translate_images(url, $div) {
    $div.find('img').each(function(i, value) {
        if ($(value).attr('src').indexOf('resolveuid/') == 0) {
            $('<div/>').load('grabber.php?url=' + url + '/' + $(value).attr('src'), function() {
                $(value).attr('src', $(this).html());
            });
        }
    });
}

function gw4e_migrate($gw3) {
    // <*>
    $gw3.find('.documentDescription').removeClass('documentDescription');

    // <h?>
    $gw3.find('h2').addClass('xl liniaDalt');

    // <p>
    $gw3.find('p[align=center]').removeAttr('align').css('text-align', 'center');
    $gw3.find('p[align=left]').removeAttr('align').css('text-align', 'left');
    $gw3.find('p[align=right]').removeAttr('align').css('text-align', 'right');

    // <a>
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

    // <span>
    $gw3.find('span.external-link').removeClass('external-link');
    $gw3.find('span.internal-link').removeClass('internal-link');

    // <img>
    $gw3.find('img.image-right').addClass('img-rounded');
    $gw3.find('img[src="resolveuid/0015cddb-0395-44ec-a6c0-99f48266495e"]').remove();

    // <table>
    $gw3.find('table.invisible').removeClass('invisible');
    $gw3.find('table.grid').removeClass('grid').addClass('table table-striped');

    // <ul>
    $gw3.find('ul').addClass('list list-condensed');

    // <div>
    $gw3.find('div.list').removeClass('list');
    $gw3.find('div.list-highlighted').removeClass('list-highlighted');
    $gw3.find('div.llistatIndex').removeClass('llistatIndex');
    $gw3.find('div.gb').removeClass('gb').addClass('box box-small clearfix');
    $gw3.find('div.fitxa').removeClass('fitxa').addClass('box box-small clearfix');
    $gw3.find('div.destacatBandejat').removeClass('destacatBandejat').addClass('well well-small clearfix');
    $gw3.find('div.textDestacat').removeClass('textDestacat').addClass('well well-small clearfix');
    $gw3.find('div.caixaPortlet').removeClass('caixaPortlet').addClass('well well-small clearfix');

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

    // Netejar
    $gw3.find('*[class=""]').removeAttr('class');
    $gw3.find('span:not([class])').each(function(index, element) {
        $(element).replaceWith($(element).html());
    });
    return $gw3;
}
