# Genweb4 extended (gw4e)

## Desenvolupament

```sh
vagrant up
```

Accedir a l'adreça https://192.168.33.33.


## Configuració

Utilitats que faciliten la integració d'elements externs als genweb (versió 4) de la UPC.

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

### Portlet bàsic

```html
<script src="https://www3.camins.upc.edu/actualitat/js/gw4.js" type="text/javascript"></script>
<div class="gw4e-actualitat" data-url="https://actualitat.camins.upc.edu/activitats.json/2?callback=callback" data-start="0" data-count="5">
    <div class="portlet">
        <h2>Activitats <i class="icon-event large-icon pull-right"></i></h2>
        <div class="gw4e-content hidden">#</div>
        <div class="portlet-footer">
            <a href="https://actualitat.camins.upc.edu/activitats/2" target="_blank">Més activitats</a> |
            <a href="https://actualitat.camins.upc.edu/ca/node/add/activitat" target="_blank">Proposa activitat</a>
        </div>
    </div>
</div>
```
El format JSONP ha de ser el següent.

```js
callback([
    {
        "titol" : "",
        "url" : ""
    },
    ....
])
```

### Portlet ampliat

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-actualitat-large" data-url="https://actualitat.camins.upc.edu/ca/noticies.json/2?callback=callback" data-count="5">
  <div class="portlet">
    <h2>Notícies <i class="icon-news large-icon pull-right"></i></h2>
    <div class="gw4e-content hidden">#</div>
    <div class="portlet-footer">
        <a href="https://actualitat.camins.upc.edu/noticies/2" target="_blank">Més notícies</a> |
        <a href="https://actualitat.camins.upc.edu/ca/node/add/noticia" target="_blank">Proposa notícia</a>
    </div>
  </div>
</div>
```
El format JSONP ha de ser el següent.

```js
callback([
    {
        "titol" : "",
        "url" : "",
        "resum" : "",
        "imatge" : "" // Opcional
    },
    ....
])
```

### Carousel

```html
<script src="https://www3.camins.upc.edu/gw4e/gw4e.js" type="text/javascript"></script>
<div class="gw4e-carousel" data-url="https://portal.camins.upc.edu/public/tfg/resum/random?n=10" data-interval="10" data-item-active="">
    <h2>Treballs finals de Grau i Màster</h2>
    <div class="gw4e-content hidden">#</div>
</div>
```
El format JSONP ha de ser el següent.

```js
callback([
    {
        "titol" : "",
        "urlResum" : "",
        "urlFoto" : "",
        "autor" : ""
    },
    ....
])
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
