var ProductList=ProductList||{};ProductList.Utils=function(){"use strict";function a(a){return[].slice.call(a)}function b(a,b){return a.sort(function(a,c){return a[b]>c[b]?1:-1})}function c(a,b){return a.sort(function(a,c){return a.data[b]>c.data[b]?1:-1})}function d(a,b){return a.filter(function(a){return a.getId()==b}).pop()}function e(a){return Math.floor(Math.random()*a)}function f(a){return JSON.parse(JSON.stringify(a))}return{convertToArray:a,sortItemsByProperty:b,sortItemObjectsByProperty:c,getRandom:e,copyObject:f,getItemById:d}}();