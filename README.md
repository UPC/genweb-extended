# Genweb4 extended (gw4e)

## Desenvolupament

```sh
vagrant up
```

Accedir a l'adreça https://192.168.33.33.

## Configuració

Utilitats que faciliten la integració d'elements externs als genweb (versió 4) de la UPC.

  - Versió 2.3.2 de bootstrap.
  - Versió 1.8.3 de jQuery.
  - Versio 1.10.2 de jQuery UI.

### Element del DOM eliminat

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-remove-element hidden" data-selector="header div.header-image">#</div>
```

### Iframe amb redimensionament

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-iframe" data-url="https://portal.camins.upc.edu/oferta/conveni/public/cercaOfertes.htm">
    <div class="gw4e-content hidden">#</div>
</div>
```

Al contingut de l'iframe caldria afegir.

```html
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.5/iframeResizer.contentWindow.min.js"></script>
```

### Vídeo (Youtube)

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-youtube" data-id="YBAD7Bj2weA" data-ratio="16:9">
    <div class="gw4e-content hidden">#</div>
</div>
```

### Vídeo (HTML5)

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-video" data-url="http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv" data-ratio="16:9">
    <div class="gw4e-content hidden">#</div>
</div>
```

### Portlet bàsic

```html
<script src="https://www3.camins.upc.edu/actualitat/js/gw4.js" type="text/javascript"></script>
<div class="gw4e-actualitat" data-url="https://actualitat.camins.upc.edu/activitats.json/2?callback=callback" data-type="jsonp" data-count="5">
  <div class="portlet">
    <h2>Activitats <i class="icon-event large-icon pull-right"></i></h2>
    <ul class="gw4e-content-list list-portlet">
      <ul class="gw4e-content-item">
        <li><a href="${url}" target="_blank" title="${titol}"> ${titol} <img alt="(open in new window)" class="link_blank" src="++genweb++static/images/icon_blank.gif" /></a></li>
      </ul>
    </ul>
    <div class="portlet-footer"><a href="https://actualitat.camins.upc.edu/" target="_blank">Actualitat Camins</a> | <a href="https://actualitat.camins.upc.edu/ca/node/add/activitat" target="_blank">Proposa activitat</a></div>
  </div>
</div>
```
El format JSON ha de ser el següent.

```js
[
    {
        "titol" : "",
        "url" : ""
    },
    ....
]
```

### Portlet ampliat

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-actualitat-large" data-url="https://actualitat.camins.upc.edu/ca/noticies.json/2?callback=callback" data-type="jsonp" data-count="5">
  <div class="portlet">
    <h2>Notícies <i class="icon-news large-icon pull-right"></i></h2>
    <div class="gw4e-content-list container-fluid">
      <div class="gw4e-content-item">
        <div class="row">
          <div class="span3"><a href="${url}" title="${titol}"> <img alt="${imatge.alt}" src="${imatge.src}" /> </a></div>
          <div class="span9"><h3><a href="${url}" title="${titol}">${titol}</a></h3>${resum}</div>
        </div>
      </div>
    </div>
    <div class="portlet-footer"><a href="https://actualitat.camins.upc.edu/" target="_blank">Actualitat Camins</a> | <a href="https://actualitat.camins.upc.edu/ca/node/add/noticia" target="_blank">Proposa notícia</a></div>
  </div>
</div>
```
El format JSON ha de ser el següent.

```json
[
    {
        "titol" : "",
        "url" : "",
        "resum" : "",
        "imatge" : ""
    },
    ....
]
```

### Llista d'elements

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<h2>Software instal·lat</h2>
<div class="gw4e-list"
  data-url="https://portal.camins.upc.edu/public/api/inventariSoftware/aula/A2-S101/software">
  <ul class="gw4e-content-list list list-condensed">
    <ul class="gw4e-content-item">
      <li>${nom} (${versio})</li>
    </ul>
  </ul>
  <p class="gw4e-content-empty">No hi ha software comú.</p>
</div>

```
El format JSON ha de ser el següent.

```json
[
    {
        "nom" : "Nom de l'element",
        "versio": "1.10"
    },
    ....
]
```

### Carousel

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-carousel" data-url="https://portal.camins.upc.edu/public/tfg/resum/random?n=10" data-interval="10" data-count="4" data-height="20em">
  <h2>Treballs finals de Grau i Màster</h2>
  <div class="carousel slide" id="carousel">
    <div class="gw4e-content-list carousel-inner">
      <div class="gw4e-content-item">
        <div class="item">
          <a href="${urlResum}" title="${titol}"> <img alt="${titol}" src="${urlFoto}" title="${titol}" /></a>
          <div class="carousel-caption">
            <h3>${titol}</h3>
            <h4>${autor}</h4>
          </div>
        </div>
      </div>
    </div>
    <a class="carousel-control left" href="#carousel" data-slide="prev">‹</a>
    <a class="carousel-control right" href="#carousel" data-slide="next">›</a>
  </div>
</div>
```
El format JSON ha de ser el següent.

```json
[
    {
        "titol" : "",
        "urlResum" : "",
        "urlFoto" : "",
        "autor" : ""
    },
    ....
]
```

Llicència
---------

Copyright (C) 2015-2016 Universitat Politècnica de Catalunya - UPC BarcelonaTech - www.upc.edu

```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
