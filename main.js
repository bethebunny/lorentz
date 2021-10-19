/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/webfontloader/webfontloader.js":
/*!*****************************************************!*\
  !*** ./node_modules/webfontloader/webfontloader.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return Z}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0;}());


/***/ }),

/***/ "pixi.js":
/*!***********************!*\
  !*** external "PIXI" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = PIXI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "pixi.js");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pixi_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webfontloader */ "./node_modules/webfontloader/webfontloader.js");
/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_1__);



const C = 50; // Speed of light in meters per second
const C2 = C * C;
const D = 1; // Meters between grid points
const PIXELS_PER_METER = 1;
const MINIMAP_SCALE = 1 / 50;
/* TODO:
    - Display all visible grid coordinates
        - Regardless of viewpoint
    - Simplify or eliminate the duality between PhysicalObject and PIXI.DisplayObject.
    - Simplify minimap / viewport abstractions
    - Fuel / different engines
    - Inventory
    - Triangular ship
    - Particles for thrust
    - Speed up animations based on time dilation
    - Have Wigner rotation rotate the world rather than the player
    - Thomas precession
        - I think this is actually done
    - Relativity for rotation
    - Time no longer pauses on tab-out
    - Collisions?
    - Have the ship always point upwards and rotate space instead?
        - Render a compass
    - Interact with stations
    - Doppler effect on color visuals
        - Likely needs to be de-emphasized to be actually visible at high speeds x
    
    - Much later
        - Gravity
        - General relativity
*/
class Matrix2D {
    a;
    b;
    c;
    d;
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    timesScalar = (s) => new Matrix2D(this.a * s, this.b * s, this.c * s, this.d * s);
    timesVector = ({ x, y }) => new Vector(this.a * x + this.b * y, this.c * x + this.d * y);
    timesMatrix = ({ a, b, c, d }) => new Matrix2D(this.a * a + this.b * c, this.a * b + this.b * d, this.c * a + this.d * c, this.c * b + this.d * d);
    inverse() {
        let { a, b, c, d } = this;
        let determinant = a * d - b * c;
        return new Matrix2D(d, -b, -c, a).timesScalar(1 / determinant);
    }
    static fromEigenvectors(v1, e1, v2, e2) {
        let scale = new Matrix2D(e1, 0, 0, e2);
        let basis = new Matrix2D(v1.x, v2.x, v1.y, v2.y);
        return basis.timesMatrix(scale.timesMatrix(basis.inverse()));
    }
    toPixiMatrix() {
        return new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Matrix(this.a, this.c, this.b, this.d);
    }
}
let rotationMatrix = (theta) => new Matrix2D(Math.cos(theta), -Math.sin(theta), Math.sin(theta), Math.cos(theta));
class Vector {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    relativisticPlus(other) {
        // https://en.wikipedia.org/wiki/Wigner_rotation#Two_general_boosts
        // Not associative or commutative, also results in a net rotation (thomasRotation)
        // I think there's something wrong here, close enough to C a boost perpendicular to the original speed
        // ends up moving in the opposite direction of the new boost
        let u = this, v = other;
        let u_gamma = u.gamma();
        let u_dot_v = u.dot(v);
        return u
            .times(1 + ((u_dot_v / C2) * u_gamma) / (1 + u_gamma))
            .plus(v.times(1 / u_gamma))
            .times(1 / (1 + u_dot_v / C2));
    }
    thomasRotationAngle(other) {
        // https://en.wikipedia.org/wiki/Wigner_rotation#Finding_the_axis_and_angle_of_the_Thomas_rotation
        // Hmm what's the sign of the rotation here? I actually just don't know or have any intuitive sense.
        // It seems like it tracks with the article that the resulting angle is commutative in u + v vs v + u
        let u = this, v = other;
        let u_gamma = u.gamma(), v_gamma = v.gamma(), composite_gamma = u_gamma * v_gamma * (1 + u.dot(v) / C2);
        // z component of the cross product
        // negated because ?! anyway it seems much better behaved this way; not negating it causes accelerations
        // to become unstable and you can get weird cases where a constant acceleration causes you to travel in circles
        // relative to coordinate space
        // I suspect it's negative because of some weirdness in the way I'm thinking about coordinate space.
        // I'm still wondering if I need to do this at all, or if I can somehow make this a more natural part of the simulation;
        // the physical meaning of this rotation still eludes me.
        let sign = -Math.sign(u.x * v.y - u.y * v.x);
        return (sign *
            Math.acos(Math.pow(1 + u_gamma + v_gamma + composite_gamma, 2) /
                ((1 + u_gamma) * (1 + v_gamma) * (1 + composite_gamma)) -
                1));
    }
    plus = (other) => new Vector(this.x + other.x, this.y + other.y);
    dot = (other) => this.x * other.x + this.y * other.y;
    minus = (other) => new Vector(this.x - other.x, this.y - other.y);
    times = (m) => new Vector(this.x * m, this.y * m);
    magnitude = () => Math.sqrt(this.x * this.x + this.y * this.y);
    unit = () => this.times(1 / this.magnitude());
    orthogonal = () => new Vector(-this.y, this.x);
    project(onto) {
        let unit = onto.unit();
        return unit.times(this.dot(unit));
    }
    gamma() {
        let v = this.magnitude();
        return Math.pow(1 - (v * v) / C2, -0.5);
    }
    lorentzTransform() {
        return Matrix2D.fromEigenvectors(this, 1 / this.gamma(), this.orthogonal(), 1);
    }
    inverseLorentzTransform() {
        return Matrix2D.fromEigenvectors(this, this.gamma(), this.orthogonal(), 1);
    }
    toString() {
        return `V{${this.x.toFixed(5)}, ${this.y.toFixed(5)}}`;
    }
}
// TODO: we want `step` to vary in x and y so we can have a separate scale / color
// Useful since length contraction only happens along the axis of travel
class Grid extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics {
    step;
    color;
    constructor({ x: xmin, y: ymin }, { x: xmax, y: ymax }, step, color) {
        super();
        this.step = step;
        this.color = color;
        this.step = step;
        this.color = color;
        this.beginFill(color);
        let radius = 2;
        for (let x = xmin; x <= xmax; x += step) {
            for (let y = ymin; y <= ymax; y += step) {
                this.drawCircle(x, y, radius);
            }
        }
        // For grid lines instead
        // this.lineStyle(0.5, color);
        // for (let x = xmin; x <= xmax; x += step) {
        //   this.moveTo(x, ymin);
        //   this.lineTo(x, ymax);
        // }
        // for (let y = ymin; y <= ymax; y += step) {
        //   this.moveTo(xmin, y);
        //   this.lineTo(xmax, y);
        // }
    }
    setPosition({ x, y }) {
        this.position.set(posMod(x, this.step), posMod(y, this.step));
    }
}
class PhysicalObject {
    position;
    velocity;
    direction;
    mass;
    static MASS = 1;
    // TODO We're not creating all objects at the beginning of the game :P They should start
    // with the time of the object that created them. Objects at the beginning of the game
    // should start with negative t based on distance to the player.
    t = 0;
    angularVelocity = 0;
    externalForces = [];
    _referenceFrame = null;
    pixiObject = null;
    minimapObject = null;
    constructor(position, velocity = new Vector(), direction = new Vector(1, 0), mass = PhysicalObject.MASS) {
        this.position = position;
        this.velocity = velocity;
        this.direction = direction;
        this.mass = mass;
    }
    properForces() {
        return this.externalForces;
    }
    properAcceleration() {
        var forces = new Vector();
        this.properForces().forEach((force) => {
            forces = forces.plus(force);
        });
        return forces.times(1 / this.mass);
    }
    set referenceFrame(frame) {
        if (this._referenceFrame) {
            this._referenceFrame.removeObject(this);
        }
        this._referenceFrame = frame;
        this.resetPixiObjects();
    }
    get referenceFrame() {
        return this._referenceFrame;
    }
    resetPixiObjects() {
        let { pixiObject, minimapObject } = this;
        this.pixiObject = this.createPixiObject();
        this.minimapObject = this.createMinimapObject();
        this.minimapObject.scale.set(1 / MINIMAP_SCALE, 1 / MINIMAP_SCALE);
        if (this._referenceFrame) {
            this._referenceFrame.objectContainer.removeChild(pixiObject);
            this._referenceFrame.objectContainer.addChild(this.pixiObject);
            this._referenceFrame.minimapObjectContainer.removeChild(minimapObject);
            this._referenceFrame.minimapObjectContainer.addChild(this.minimapObject);
        }
    }
    createPixiObject() {
        return new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
    }
    createMinimapObject() {
        // TODO: these should probably throw instead
        return new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
    }
    update(properDT) {
        this.t += properDT;
        let { position, velocity, direction } = this;
        let acceleration = this.properAcceleration();
        if (acceleration.x != 0 || acceleration.y != 0) {
            let boost = acceleration.times(properDT);
            let new_velocity = velocity.relativisticPlus(boost);
            this.velocity = new_velocity;
            // I wish I had some intuition for what Thomas rotation means physically. Since the rotation
            // only happens between 2 boosts, but we consider ourselves to be at rest, why do we rotate when we boost
            // and what do we rotate relative to?
            this.direction = rotationMatrix(velocity.thomasRotationAngle(boost)).timesVector(direction);
        }
        if (this.angularVelocity != 0) {
            this.direction = rotationMatrix(properDT * this.angularVelocity).timesVector(this.direction);
        }
        // Right now length contraction is basically computed here; we update the player's position in the coordinate frame
        // as v * dt * gamma, which can either be interpreted as length contraction (from the perspective of the ship)
        // or time dilation (from the perspective of the coordinate frame's clock)
        this.position = position.plus(velocity.times(properDT * velocity.gamma()));
        // Update PIXI object
        this.pixiObject.position.set(this.position.x, this.position.y);
        this.pixiObject.rotation = Math.atan2(this.direction.y, this.direction.x);
        this.minimapObject.position.set(this.position.x, this.position.y);
    }
}
class PhysicalObjectWithThrust extends PhysicalObject {
    thrust = 0;
    properForces() {
        return [this.direction.times(this.thrust), ...super.properForces()];
    }
}
class Ship extends PhysicalObjectWithThrust {
    size = 50;
    color = 0xffffff;
    createPixiObject() {
        var graphics = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        graphics.beginFill(this.color);
        let radius = this.size / 2;
        graphics.lineStyle(3, 0x000000);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.moveTo(0, 0);
        graphics.lineTo(radius, 0);
        return graphics;
    }
    createMinimapObject() {
        return new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics().beginFill(0x00ff00).drawCircle(0, 0, 3).endFill();
    }
}
class Station extends PhysicalObject {
    size = 180;
    color = 0xffffff;
    name = "Station 1";
    text = null;
    update(properDT) {
        super.update(properDT);
        this.text.text = `Clock: ${this.t.toFixed(3)}`;
    }
    createPixiObject() {
        var graphics = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        graphics.beginFill(this.color);
        let radius = this.size / 2;
        graphics.lineStyle(3, 0x000000);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.moveTo(0, 0);
        graphics.lineTo(radius, 0);
        // Changing text is supposedly expensive, might need to figure out a better option
        // Better option is to use BitmapText, we'll cross that bridge later
        let text = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text("", new pixi_js__WEBPACK_IMPORTED_MODULE_0__.TextStyle({
            fontWeight: "bold",
            align: "center",
            fill: 0x00aa33,
            fontSize: 15,
        }));
        text.position.set(-35, 20);
        this.text = text;
        graphics.addChild(text);
        return graphics;
    }
    createMinimapObject() {
        let g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics().beginFill(0xffffff).drawCircle(0, 0, 3).endFill();
        g.interactive = true;
        g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Circle(0, 0, 10);
        let text = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text(this.name, new pixi_js__WEBPACK_IMPORTED_MODULE_0__.TextStyle({
            fill: 0xffffff,
            fontSize: 10,
            fontFamily: "Major Mono Display",
        }));
        text.position.set(10, -10);
        text.visible = false;
        g.addChild(text);
        g.on("mouseover", () => {
            text.visible = true;
        });
        g.on("mouseout", () => {
            text.visible = false;
        });
        return g;
    }
}
class ReferenceFrame extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    velocity;
    objects;
    // A set of objects which are all locked at traveling at the same velocity and all
    // have the same proper time (not true once we add general relativity)
    // This is _somewhat_ of a physical analog, although in physics different points in
    // spacetime wouldn't share a reference frame.
    // It's mostly a great optimization that allows us to only compute transformations once
    // per group of objects with locked velocities.
    objectContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
    minimapObjectContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
    constructor(velocity = new Vector(), objects = new Set()) {
        super();
        this.velocity = velocity;
        this.objects = objects;
        super.addChild(this.objectContainer);
        objects.forEach(this.addObject.bind(this));
    }
    addObject(object) {
        // PhysicalObject, not PIXI.DrawableObject
        this.objects.add(object);
        object.referenceFrame = this;
    }
    removeObject(object) {
        this.objects.delete(object);
        this.objectContainer.removeChild(object.pixiObject);
        this.minimapObjectContainer.removeChild(object.minimapObject);
    }
    update(observerDT, observerFrame, observerPosition, oldObserverPosition) {
        // This is complex and hard to get right.
        // - We have a player with a rest reference frame.
        //   - The player is always at the center of their reference frame.
        // - We need objects to appear transformed with a lorentz transform relative
        //     to the origin of the player's reference frame.
        // - PIXI has a pivot, which changes the origin of rotation, but not scaling / skew
        // - So to get the right transformation at the right origin, we
        //   - have a reference frame (PIXI container) whose origin is the player's position
        //   - apply the transformation in that container
        //   - have a second container inside it whose coordinates are relative to the player's position
        //      - the objects themselves have position in world coordinates
        //      - the container then has position of the inverse of player position
        let relativeVelocity = this.velocity
            .times(-1)
            .relativisticPlus(observerFrame.velocity);
        let gamma = relativeVelocity.gamma();
        let properDT = observerDT * gamma;
        // Update frame objects
        this.objects.forEach((o) => {
            let oldDistance = o.position.minus(oldObserverPosition).magnitude();
            let newDistance = o.position.minus(observerPosition).magnitude();
            let dopplerDT = (oldDistance - newDistance) / C;
            o.update(properDT + dopplerDT);
        });
        // Offset frame object container relative to the observer
        this.objectContainer.position.set(-observerPosition.x, -observerPosition.y);
        this.minimapObjectContainer.position.set(-observerPosition.x, -observerPosition.y);
        // Update the lorentz contraction transform
        this.transform.setFromMatrix(relativeVelocity.lorentzTransform().toPixiMatrix());
    }
}
class Player {
    object;
    referenceFrame;
    constructor(object) {
        this.object = object;
        this.referenceFrame = new ReferenceFrame(object.velocity, new Set([object]));
    }
    update(properDT) {
        // The player's object is always at the origin in its own reference frame.
        // The player's reference frame may move relative to the game world.
        this.object.update(properDT);
        this.referenceFrame.velocity = this.object.velocity;
        this.object.pixiObject.position.set(0, 0);
        this.object.minimapObject.position.set(0, 0);
        this.referenceFrame.position.set(this.object.position.x, this.object.position.y);
    }
}
let posMod = (x, n) => ((x % n) + n) % n;
// TODO: replace this with actual React and just render over the webgl :P
class ReactiveText {
    updateText;
    pixiObject;
    constructor(updateText, style = {}) {
        this.updateText = updateText;
        this.pixiObject = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text("", new pixi_js__WEBPACK_IMPORTED_MODULE_0__.TextStyle({ ...style }));
    }
    update() {
        // TODO: this currently updates every frame, it should be able to be marked as dirty or something
        this.pixiObject.text = this.updateText();
    }
}
const WORLD_DATA = [
    new ReferenceFrame(new Vector(0, 0), new Set([
        new Station(new Vector(-4000, 0)),
        new Station(new Vector(250, 250)),
        new Station(new Vector(4000, 0)),
    ])),
];
class Minimap extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics {
    objects = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
    viewportWidth;
    viewportHeight;
    viewportOutline = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
    draggingViewport = false;
    onViewportSelect = (position) => null;
    interactive = true;
    constructor(width, height, screen) {
        super();
        this.viewportWidth = screen.width;
        this.viewportHeight = screen.height;
        // Draw background and outline
        this.lineStyle(3, 0x0000ff);
        this.beginFill(0x000000);
        this.drawRect(0, 0, width, height);
        // Set up objects container
        this.objects.position.set(width / 2, height / 2);
        this.objects.scale.set(MINIMAP_SCALE, MINIMAP_SCALE);
        this.addChild(this.objects);
        // Set up mask (don't display objects outside of minimap bounds)
        this.objects.mask = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics()
            .beginFill(0xff3300)
            .drawRect(3, 2, width - 3, height - 3)
            .endFill();
        // Adding as a child causes the mask's position to be relative to the Minimap's
        this.addChild(this.objects.mask);
        // Set up viewport outline
        this.viewportOutline.mask = this.objects.mask;
        this.objects.addChild(this.viewportOutline);
        // Set up interaction events
        this
            .on("pointerdown", this.startDrag.bind(this))
            .on("pointerup", this.endDrag.bind(this))
            .on("pointerout", this.endDrag.bind(this))
            .on("pointermove", this.dragMove.bind(this));
    }
    updateViewport(velocity, center) {
        // Manually transform the viewport so we can control the line width
        let { x, y } = center;
        let deltaX = this.viewportWidth / 2, deltaY = this.viewportHeight / 2;
        let ll = new Vector(x - deltaX, y - deltaY), lr = new Vector(x + deltaX, y - deltaY);
        let ul = new Vector(x - deltaX, y + deltaY), ur = new Vector(x + deltaX, y + deltaY);
        let transform = velocity.inverseLorentzTransform();
        let tll = transform.timesVector(ll), tlr = transform.timesVector(lr), tul = transform.timesVector(ul), tur = transform.timesVector(ur);
        this.viewportOutline
            .clear()
            .lineStyle(1 / MINIMAP_SCALE, 0x00ff00)
            .moveTo(tll.x, tll.y)
            .lineTo(tlr.x, tlr.y)
            .lineTo(tur.x, tur.y)
            .lineTo(tul.x, tul.y)
            .lineTo(tll.x, tll.y);
    }
    startDrag(event) {
        this.draggingViewport = true;
        this.onViewportSelect(event.data.getLocalPosition(this));
    }
    endDrag(event) {
        this.draggingViewport = false;
    }
    dragMove(event) {
        if (this.draggingViewport)
            this.onViewportSelect(event.data.getLocalPosition(this));
    }
}
class Game {
    app;
    // Game display info and tracking
    worldLayer = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
    hud = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container(); // TODO: make this React / move it outside of webgl
    _debugInfo = [];
    followingPlayer = true;
    minimap;
    viewportPosition;
    // Game viz grid
    _playerGrid = new Grid(new Vector(-1000, -1000), new Vector(1000, 1000), 100, 0x555555);
    _coordinateGrid = new Grid(new Vector(-1000, -1000), new Vector(1000, 1000), 100, 0x448844);
    // Game world state
    player = new Player(new Ship(new Vector(2000, 0), new Vector(0.01, 0.03)));
    referenceFrames = [];
    last_update_time = new Date().getTime();
    // Constant
    thrust_delta = 7.5;
    // TODO: Game should internally make and own the Application
    constructor(app) {
        this.app = app;
        this.worldLayer.transform.setFromMatrix(new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Matrix()
            .scale(PIXELS_PER_METER, PIXELS_PER_METER)
            .translate(app.screen.width / 2, app.screen.height / 2));
        this.buildHUD();
        app.stage.addChild(this.worldLayer);
        app.stage.addChild(this.hud);
        this.worldLayer.addChild(this.player.referenceFrame);
        this.minimap.objects.addChild(this.player.referenceFrame.minimapObjectContainer);
        this.viewportPosition = this.player.object.position;
        // Add initial world data
        WORLD_DATA.forEach((frame) => {
            this.referenceFrames.push(frame);
            // The universe is always relative to the player's reference frame.
            // Add at 0 to draw under the player
            this.player.referenceFrame.addChildAt(frame, 0);
            // TODO
            this.minimap.objects.addChild(frame.minimapObjectContainer);
            // frame.minimapObjectContainer.mask = this.minimap.objects_mask;
        });
        this.player.referenceFrame.addChildAt(this._playerGrid, 0);
        // this.referenceFrames[0] is coordinate frame for now :P
        this.referenceFrames[0].addChildAt(this._coordinateGrid, 0);
    }
    buildHUD() {
        this.hud = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
        [
            () => `Position ${this.player.object.position}`,
            () => `Beta: ${(this.player.referenceFrame.velocity.magnitude() / C).toFixed(5)}c`,
            () => `Gamma: ${this.player.referenceFrame.velocity.gamma().toFixed(5)}`,
            () => `Velocity direction: ${this.player.referenceFrame.velocity.unit()}`,
            () => `Acceleration: ${this.player.object.properAcceleration()}`,
            () => `Time: ${this.player.object.t.toFixed(3)}`,
        ].forEach((updateText, i) => {
            let text = new ReactiveText(updateText, {
                fontFamily: "Major Mono Display",
                fill: 0xffffff,
                fontSize: 15,
            });
            this._debugInfo.push(text);
            text.pixiObject.position.set(10, (i + 1) * 20);
            this.hud.addChild(text.pixiObject);
        });
        let minimap_width = this.app.screen.width / 4, minimap_height = this.app.screen.height / 4;
        this.minimap = new Minimap(minimap_width, minimap_height, this.app.screen);
        this.minimap.position.set(minimap_width / 10, this.app.screen.height - minimap_height - minimap_width / 10);
        this.minimap.onViewportSelect = (({ x, y }) => {
            // TODO: move math into Minimap
            this.viewportPosition = new Vector(x - minimap_width / 2, y - minimap_height / 2)
                .times(1 / MINIMAP_SCALE)
                .plus(this.player.object.position);
            this.followingPlayer = false;
        }).bind(this);
        this.hud.addChild(this.minimap);
    }
    updateState = (dt) => {
        // dt is proper time for the player
        let oldPosition = this.player.object.position;
        this.player.update(dt);
        let { position, velocity } = this.player.object;
        let { x, y } = position;
        this._debugInfo.forEach((o) => o.update());
        // We use the old position to compute doppler effects and observational delay
        // The simulator only computes new state as needed eg. as observed by the player
        // given distance to observed objects and C.
        this.referenceFrames.forEach((frame) => {
            frame.update(dt, this.player.referenceFrame, position, oldPosition);
        });
        if (this.followingPlayer)
            this.viewportPosition = position;
        let contractedViewpoint = velocity
            .lorentzTransform()
            .timesVector(this.viewportPosition.minus(position))
            .plus(position);
        // Update UI with the new player position and viewpoint
        this.worldLayer.pivot.set(contractedViewpoint.x, contractedViewpoint.y);
        this.minimap.updateViewport(velocity, contractedViewpoint.minus(position));
        this._playerGrid.setPosition(contractedViewpoint.times(-1));
        this._coordinateGrid.setPosition(contractedViewpoint.times(-1));
    };
    tick = () => {
        let t = new Date().getTime();
        this.updateState((t - this.last_update_time) / 1000);
        this.last_update_time = t;
    };
    handleKeyDown = ({ code }) => {
        switch (code) {
            case "KeyW":
                this.player.object.thrust = this.thrust_delta;
                break;
            case "KeyS":
                this.player.object.thrust = -this.thrust_delta;
                break;
            case "KeyA":
                this.player.object.angularVelocity = -3;
                break;
            case "KeyD":
                this.player.object.angularVelocity = 3;
                break;
            case "Space":
                this.followingPlayer = true;
                break;
        }
    };
    handleKeyUp = ({ code }) => {
        console.log(code);
        switch (code) {
            case "KeyW":
                this.player.object.thrust = 0;
                break;
            case "KeyS":
                this.player.object.thrust = 0;
                break;
            case "KeyA":
                this.player.object.angularVelocity = 0;
                break;
            case "KeyD":
                this.player.object.angularVelocity = 0;
                break;
        }
    };
    handleKeyPress = ({ key, code }) => {
        switch (code) {
        }
    };
}
let setup = () => {
    return new Promise((resolve) => webfontloader__WEBPACK_IMPORTED_MODULE_1___default().load({
        google: { families: ["Major Mono Display"] },
        active: () => resolve(null),
    }));
};
let main = () => {
    let width = window.innerWidth, height = window.innerHeight;
    let app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application({
        width,
        height,
        backgroundColor: 0x191919,
        antialias: true,
    });
    document.body.appendChild(app.view);
    let game = new Game(app);
    // Can also just use setTimeout but using app.ticker in case that's better for frame something something
    app.ticker.add(game.tick);
    document.addEventListener("keypress", game.handleKeyPress);
    document.addEventListener("keydown", game.handleKeyDown);
    document.addEventListener("keyup", game.handleKeyUp);
};
document.addEventListener("DOMContentLoaded", () => setup().then(main));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUM7QUFFRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb3JlbnR6Ly4vbm9kZV9tb2R1bGVzL3dlYmZvbnRsb2FkZXIvd2ViZm9udGxvYWRlci5qcyIsIndlYnBhY2s6Ly9sb3JlbnR6L2V4dGVybmFsIHZhciBcIlBJWElcIiIsIndlYnBhY2s6Ly9sb3JlbnR6L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xvcmVudHovd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbG9yZW50ei93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbG9yZW50ei93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xvcmVudHovd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sb3JlbnR6Ly4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogV2ViIEZvbnQgTG9hZGVyIHYxLjYuMjggLSAoYykgQWRvYmUgU3lzdGVtcywgR29vZ2xlLiBMaWNlbnNlOiBBcGFjaGUgMi4wICovKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYWEoYSxiLGMpe3JldHVybiBhLmNhbGwuYXBwbHkoYS5iaW5kLGFyZ3VtZW50cyl9ZnVuY3Rpb24gYmEoYSxiLGMpe2lmKCFhKXRocm93IEVycm9yKCk7aWYoMjxhcmd1bWVudHMubGVuZ3RoKXt2YXIgZD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjLGQpO3JldHVybiBhLmFwcGx5KGIsYyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBhLmFwcGx5KGIsYXJndW1lbnRzKX19ZnVuY3Rpb24gcChhLGIsYyl7cD1GdW5jdGlvbi5wcm90b3R5cGUuYmluZCYmLTEhPUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLnRvU3RyaW5nKCkuaW5kZXhPZihcIm5hdGl2ZSBjb2RlXCIpP2FhOmJhO3JldHVybiBwLmFwcGx5KG51bGwsYXJndW1lbnRzKX12YXIgcT1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4rbmV3IERhdGV9O2Z1bmN0aW9uIGNhKGEsYil7dGhpcy5hPWE7dGhpcy5vPWJ8fGE7dGhpcy5jPXRoaXMuby5kb2N1bWVudH12YXIgZGE9ISF3aW5kb3cuRm9udEZhY2U7ZnVuY3Rpb24gdChhLGIsYyxkKXtiPWEuYy5jcmVhdGVFbGVtZW50KGIpO2lmKGMpZm9yKHZhciBlIGluIGMpYy5oYXNPd25Qcm9wZXJ0eShlKSYmKFwic3R5bGVcIj09ZT9iLnN0eWxlLmNzc1RleHQ9Y1tlXTpiLnNldEF0dHJpYnV0ZShlLGNbZV0pKTtkJiZiLmFwcGVuZENoaWxkKGEuYy5jcmVhdGVUZXh0Tm9kZShkKSk7cmV0dXJuIGJ9ZnVuY3Rpb24gdShhLGIsYyl7YT1hLmMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYilbMF07YXx8KGE9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTthLmluc2VydEJlZm9yZShjLGEubGFzdENoaWxkKX1mdW5jdGlvbiB2KGEpe2EucGFyZW50Tm9kZSYmYS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpfVxuZnVuY3Rpb24gdyhhLGIsYyl7Yj1ifHxbXTtjPWN8fFtdO2Zvcih2YXIgZD1hLmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLGU9MDtlPGIubGVuZ3RoO2UrPTEpe2Zvcih2YXIgZj0hMSxnPTA7ZzxkLmxlbmd0aDtnKz0xKWlmKGJbZV09PT1kW2ddKXtmPSEwO2JyZWFrfWZ8fGQucHVzaChiW2VdKX1iPVtdO2ZvcihlPTA7ZTxkLmxlbmd0aDtlKz0xKXtmPSExO2ZvcihnPTA7ZzxjLmxlbmd0aDtnKz0xKWlmKGRbZV09PT1jW2ddKXtmPSEwO2JyZWFrfWZ8fGIucHVzaChkW2VdKX1hLmNsYXNzTmFtZT1iLmpvaW4oXCIgXCIpLnJlcGxhY2UoL1xccysvZyxcIiBcIikucmVwbGFjZSgvXlxccyt8XFxzKyQvLFwiXCIpfWZ1bmN0aW9uIHkoYSxiKXtmb3IodmFyIGM9YS5jbGFzc05hbWUuc3BsaXQoL1xccysvKSxkPTAsZT1jLmxlbmd0aDtkPGU7ZCsrKWlmKGNbZF09PWIpcmV0dXJuITA7cmV0dXJuITF9XG5mdW5jdGlvbiBlYShhKXtyZXR1cm4gYS5vLmxvY2F0aW9uLmhvc3RuYW1lfHxhLmEubG9jYXRpb24uaG9zdG5hbWV9ZnVuY3Rpb24geihhLGIsYyl7ZnVuY3Rpb24gZCgpe20mJmUmJmYmJihtKGcpLG09bnVsbCl9Yj10KGEsXCJsaW5rXCIse3JlbDpcInN0eWxlc2hlZXRcIixocmVmOmIsbWVkaWE6XCJhbGxcIn0pO3ZhciBlPSExLGY9ITAsZz1udWxsLG09Y3x8bnVsbDtkYT8oYi5vbmxvYWQ9ZnVuY3Rpb24oKXtlPSEwO2QoKX0sYi5vbmVycm9yPWZ1bmN0aW9uKCl7ZT0hMDtnPUVycm9yKFwiU3R5bGVzaGVldCBmYWlsZWQgdG8gbG9hZFwiKTtkKCl9KTpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZT0hMDtkKCl9LDApO3UoYSxcImhlYWRcIixiKX1cbmZ1bmN0aW9uIEEoYSxiLGMsZCl7dmFyIGU9YS5jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtpZihlKXt2YXIgZj10KGEsXCJzY3JpcHRcIix7c3JjOmJ9KSxnPSExO2Yub25sb2FkPWYub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7Z3x8dGhpcy5yZWFkeVN0YXRlJiZcImxvYWRlZFwiIT10aGlzLnJlYWR5U3RhdGUmJlwiY29tcGxldGVcIiE9dGhpcy5yZWFkeVN0YXRlfHwoZz0hMCxjJiZjKG51bGwpLGYub25sb2FkPWYub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsXCJIRUFEXCI9PWYucGFyZW50Tm9kZS50YWdOYW1lJiZlLnJlbW92ZUNoaWxkKGYpKX07ZS5hcHBlbmRDaGlsZChmKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Z3x8KGc9ITAsYyYmYyhFcnJvcihcIlNjcmlwdCBsb2FkIHRpbWVvdXRcIikpKX0sZHx8NUUzKTtyZXR1cm4gZn1yZXR1cm4gbnVsbH07ZnVuY3Rpb24gQigpe3RoaXMuYT0wO3RoaXMuYz1udWxsfWZ1bmN0aW9uIEMoYSl7YS5hKys7cmV0dXJuIGZ1bmN0aW9uKCl7YS5hLS07RChhKX19ZnVuY3Rpb24gRShhLGIpe2EuYz1iO0QoYSl9ZnVuY3Rpb24gRChhKXswPT1hLmEmJmEuYyYmKGEuYygpLGEuYz1udWxsKX07ZnVuY3Rpb24gRihhKXt0aGlzLmE9YXx8XCItXCJ9Ri5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXtmb3IodmFyIGI9W10sYz0wO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspYi5wdXNoKGFyZ3VtZW50c1tjXS5yZXBsYWNlKC9bXFxXX10rL2csXCJcIikudG9Mb3dlckNhc2UoKSk7cmV0dXJuIGIuam9pbih0aGlzLmEpfTtmdW5jdGlvbiBHKGEsYil7dGhpcy5jPWE7dGhpcy5mPTQ7dGhpcy5hPVwiblwiO3ZhciBjPShifHxcIm40XCIpLm1hdGNoKC9eKFtuaW9dKShbMS05XSkkL2kpO2MmJih0aGlzLmE9Y1sxXSx0aGlzLmY9cGFyc2VJbnQoY1syXSwxMCkpfWZ1bmN0aW9uIGZhKGEpe3JldHVybiBIKGEpK1wiIFwiKyhhLmYrXCIwMFwiKStcIiAzMDBweCBcIitJKGEuYyl9ZnVuY3Rpb24gSShhKXt2YXIgYj1bXTthPWEuc3BsaXQoLyxcXHMqLyk7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY10ucmVwbGFjZSgvWydcIl0vZyxcIlwiKTstMSE9ZC5pbmRleE9mKFwiIFwiKXx8L15cXGQvLnRlc3QoZCk/Yi5wdXNoKFwiJ1wiK2QrXCInXCIpOmIucHVzaChkKX1yZXR1cm4gYi5qb2luKFwiLFwiKX1mdW5jdGlvbiBKKGEpe3JldHVybiBhLmErYS5mfWZ1bmN0aW9uIEgoYSl7dmFyIGI9XCJub3JtYWxcIjtcIm9cIj09PWEuYT9iPVwib2JsaXF1ZVwiOlwiaVwiPT09YS5hJiYoYj1cIml0YWxpY1wiKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIGdhKGEpe3ZhciBiPTQsYz1cIm5cIixkPW51bGw7YSYmKChkPWEubWF0Y2goLyhub3JtYWx8b2JsaXF1ZXxpdGFsaWMpL2kpKSYmZFsxXSYmKGM9ZFsxXS5zdWJzdHIoMCwxKS50b0xvd2VyQ2FzZSgpKSwoZD1hLm1hdGNoKC8oWzEtOV0wMHxub3JtYWx8Ym9sZCkvaSkpJiZkWzFdJiYoL2JvbGQvaS50ZXN0KGRbMV0pP2I9NzovWzEtOV0wMC8udGVzdChkWzFdKSYmKGI9cGFyc2VJbnQoZFsxXS5zdWJzdHIoMCwxKSwxMCkpKSk7cmV0dXJuIGMrYn07ZnVuY3Rpb24gaGEoYSxiKXt0aGlzLmM9YTt0aGlzLmY9YS5vLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDt0aGlzLmg9Yjt0aGlzLmE9bmV3IEYoXCItXCIpO3RoaXMuaj0hMSE9PWIuZXZlbnRzO3RoaXMuZz0hMSE9PWIuY2xhc3Nlc31mdW5jdGlvbiBpYShhKXthLmcmJncoYS5mLFthLmEuYyhcIndmXCIsXCJsb2FkaW5nXCIpXSk7SyhhLFwibG9hZGluZ1wiKX1mdW5jdGlvbiBMKGEpe2lmKGEuZyl7dmFyIGI9eShhLmYsYS5hLmMoXCJ3ZlwiLFwiYWN0aXZlXCIpKSxjPVtdLGQ9W2EuYS5jKFwid2ZcIixcImxvYWRpbmdcIildO2J8fGMucHVzaChhLmEuYyhcIndmXCIsXCJpbmFjdGl2ZVwiKSk7dyhhLmYsYyxkKX1LKGEsXCJpbmFjdGl2ZVwiKX1mdW5jdGlvbiBLKGEsYixjKXtpZihhLmomJmEuaFtiXSlpZihjKWEuaFtiXShjLmMsSihjKSk7ZWxzZSBhLmhbYl0oKX07ZnVuY3Rpb24gamEoKXt0aGlzLmM9e319ZnVuY3Rpb24ga2EoYSxiLGMpe3ZhciBkPVtdLGU7Zm9yKGUgaW4gYilpZihiLmhhc093blByb3BlcnR5KGUpKXt2YXIgZj1hLmNbZV07ZiYmZC5wdXNoKGYoYltlXSxjKSl9cmV0dXJuIGR9O2Z1bmN0aW9uIE0oYSxiKXt0aGlzLmM9YTt0aGlzLmY9Yjt0aGlzLmE9dCh0aGlzLmMsXCJzcGFuXCIse1wiYXJpYS1oaWRkZW5cIjpcInRydWVcIn0sdGhpcy5mKX1mdW5jdGlvbiBOKGEpe3UoYS5jLFwiYm9keVwiLGEuYSl9ZnVuY3Rpb24gTyhhKXtyZXR1cm5cImRpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOi05OTk5cHg7bGVmdDotOTk5OXB4O2ZvbnQtc2l6ZTozMDBweDt3aWR0aDphdXRvO2hlaWdodDphdXRvO2xpbmUtaGVpZ2h0Om5vcm1hbDttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC12YXJpYW50Om5vcm1hbDt3aGl0ZS1zcGFjZTpub3dyYXA7Zm9udC1mYW1pbHk6XCIrSShhLmMpK1wiO1wiKyhcImZvbnQtc3R5bGU6XCIrSChhKStcIjtmb250LXdlaWdodDpcIisoYS5mK1wiMDBcIikrXCI7XCIpfTtmdW5jdGlvbiBQKGEsYixjLGQsZSxmKXt0aGlzLmc9YTt0aGlzLmo9Yjt0aGlzLmE9ZDt0aGlzLmM9Yzt0aGlzLmY9ZXx8M0UzO3RoaXMuaD1mfHx2b2lkIDB9UC5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmMuby5kb2N1bWVudCxiPXRoaXMsYz1xKCksZD1uZXcgUHJvbWlzZShmdW5jdGlvbihkLGUpe2Z1bmN0aW9uIGYoKXtxKCktYz49Yi5mP2UoKTphLmZvbnRzLmxvYWQoZmEoYi5hKSxiLmgpLnRoZW4oZnVuY3Rpb24oYSl7MTw9YS5sZW5ndGg/ZCgpOnNldFRpbWVvdXQoZiwyNSl9LGZ1bmN0aW9uKCl7ZSgpfSl9ZigpfSksZT1udWxsLGY9bmV3IFByb21pc2UoZnVuY3Rpb24oYSxkKXtlPXNldFRpbWVvdXQoZCxiLmYpfSk7UHJvbWlzZS5yYWNlKFtmLGRdKS50aGVuKGZ1bmN0aW9uKCl7ZSYmKGNsZWFyVGltZW91dChlKSxlPW51bGwpO2IuZyhiLmEpfSxmdW5jdGlvbigpe2IuaihiLmEpfSl9O2Z1bmN0aW9uIFEoYSxiLGMsZCxlLGYsZyl7dGhpcy52PWE7dGhpcy5CPWI7dGhpcy5jPWM7dGhpcy5hPWQ7dGhpcy5zPWd8fFwiQkVTYnN3eVwiO3RoaXMuZj17fTt0aGlzLnc9ZXx8M0UzO3RoaXMudT1mfHxudWxsO3RoaXMubT10aGlzLmo9dGhpcy5oPXRoaXMuZz1udWxsO3RoaXMuZz1uZXcgTSh0aGlzLmMsdGhpcy5zKTt0aGlzLmg9bmV3IE0odGhpcy5jLHRoaXMucyk7dGhpcy5qPW5ldyBNKHRoaXMuYyx0aGlzLnMpO3RoaXMubT1uZXcgTSh0aGlzLmMsdGhpcy5zKTthPW5ldyBHKHRoaXMuYS5jK1wiLHNlcmlmXCIsSih0aGlzLmEpKTthPU8oYSk7dGhpcy5nLmEuc3R5bGUuY3NzVGV4dD1hO2E9bmV3IEcodGhpcy5hLmMrXCIsc2Fucy1zZXJpZlwiLEoodGhpcy5hKSk7YT1PKGEpO3RoaXMuaC5hLnN0eWxlLmNzc1RleHQ9YTthPW5ldyBHKFwic2VyaWZcIixKKHRoaXMuYSkpO2E9TyhhKTt0aGlzLmouYS5zdHlsZS5jc3NUZXh0PWE7YT1uZXcgRyhcInNhbnMtc2VyaWZcIixKKHRoaXMuYSkpO2E9XG5PKGEpO3RoaXMubS5hLnN0eWxlLmNzc1RleHQ9YTtOKHRoaXMuZyk7Tih0aGlzLmgpO04odGhpcy5qKTtOKHRoaXMubSl9dmFyIFI9e0Q6XCJzZXJpZlwiLEM6XCJzYW5zLXNlcmlmXCJ9LFM9bnVsbDtmdW5jdGlvbiBUKCl7aWYobnVsbD09PVMpe3ZhciBhPS9BcHBsZVdlYktpdFxcLyhbMC05XSspKD86XFwuKFswLTldKykpLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtTPSEhYSYmKDUzNj5wYXJzZUludChhWzFdLDEwKXx8NTM2PT09cGFyc2VJbnQoYVsxXSwxMCkmJjExPj1wYXJzZUludChhWzJdLDEwKSl9cmV0dXJuIFN9US5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmYuc2VyaWY9dGhpcy5qLmEub2Zmc2V0V2lkdGg7dGhpcy5mW1wic2Fucy1zZXJpZlwiXT10aGlzLm0uYS5vZmZzZXRXaWR0aDt0aGlzLkE9cSgpO1UodGhpcyl9O1xuZnVuY3Rpb24gbGEoYSxiLGMpe2Zvcih2YXIgZCBpbiBSKWlmKFIuaGFzT3duUHJvcGVydHkoZCkmJmI9PT1hLmZbUltkXV0mJmM9PT1hLmZbUltkXV0pcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gVShhKXt2YXIgYj1hLmcuYS5vZmZzZXRXaWR0aCxjPWEuaC5hLm9mZnNldFdpZHRoLGQ7KGQ9Yj09PWEuZi5zZXJpZiYmYz09PWEuZltcInNhbnMtc2VyaWZcIl0pfHwoZD1UKCkmJmxhKGEsYixjKSk7ZD9xKCktYS5BPj1hLnc/VCgpJiZsYShhLGIsYykmJihudWxsPT09YS51fHxhLnUuaGFzT3duUHJvcGVydHkoYS5hLmMpKT9WKGEsYS52KTpWKGEsYS5CKTptYShhKTpWKGEsYS52KX1mdW5jdGlvbiBtYShhKXtzZXRUaW1lb3V0KHAoZnVuY3Rpb24oKXtVKHRoaXMpfSxhKSw1MCl9ZnVuY3Rpb24gVihhLGIpe3NldFRpbWVvdXQocChmdW5jdGlvbigpe3YodGhpcy5nLmEpO3YodGhpcy5oLmEpO3YodGhpcy5qLmEpO3YodGhpcy5tLmEpO2IodGhpcy5hKX0sYSksMCl9O2Z1bmN0aW9uIFcoYSxiLGMpe3RoaXMuYz1hO3RoaXMuYT1iO3RoaXMuZj0wO3RoaXMubT10aGlzLmo9ITE7dGhpcy5zPWN9dmFyIFg9bnVsbDtXLnByb3RvdHlwZS5nPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYTtiLmcmJncoYi5mLFtiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImFjdGl2ZVwiKV0sW2IuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwibG9hZGluZ1wiKSxiLmEuYyhcIndmXCIsYS5jLEooYSkudG9TdHJpbmcoKSxcImluYWN0aXZlXCIpXSk7SyhiLFwiZm9udGFjdGl2ZVwiLGEpO3RoaXMubT0hMDtuYSh0aGlzKX07XG5XLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYTtpZihiLmcpe3ZhciBjPXkoYi5mLGIuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwiYWN0aXZlXCIpKSxkPVtdLGU9W2IuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwibG9hZGluZ1wiKV07Y3x8ZC5wdXNoKGIuYS5jKFwid2ZcIixhLmMsSihhKS50b1N0cmluZygpLFwiaW5hY3RpdmVcIikpO3coYi5mLGQsZSl9SyhiLFwiZm9udGluYWN0aXZlXCIsYSk7bmEodGhpcyl9O2Z1bmN0aW9uIG5hKGEpezA9PS0tYS5mJiZhLmomJihhLm0/KGE9YS5hLGEuZyYmdyhhLmYsW2EuYS5jKFwid2ZcIixcImFjdGl2ZVwiKV0sW2EuYS5jKFwid2ZcIixcImxvYWRpbmdcIiksYS5hLmMoXCJ3ZlwiLFwiaW5hY3RpdmVcIildKSxLKGEsXCJhY3RpdmVcIikpOkwoYS5hKSl9O2Z1bmN0aW9uIG9hKGEpe3RoaXMuaj1hO3RoaXMuYT1uZXcgamE7dGhpcy5oPTA7dGhpcy5mPXRoaXMuZz0hMH1vYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt0aGlzLmM9bmV3IGNhKHRoaXMuaixhLmNvbnRleHR8fHRoaXMuaik7dGhpcy5nPSExIT09YS5ldmVudHM7dGhpcy5mPSExIT09YS5jbGFzc2VzO3BhKHRoaXMsbmV3IGhhKHRoaXMuYyxhKSxhKX07XG5mdW5jdGlvbiBxYShhLGIsYyxkLGUpe3ZhciBmPTA9PS0tYS5oOyhhLmZ8fGEuZykmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgYT1lfHxudWxsLG09ZHx8bnVsbHx8e307aWYoMD09PWMubGVuZ3RoJiZmKUwoYi5hKTtlbHNle2IuZis9Yy5sZW5ndGg7ZiYmKGIuaj1mKTt2YXIgaCxsPVtdO2ZvcihoPTA7aDxjLmxlbmd0aDtoKyspe3ZhciBrPWNbaF0sbj1tW2suY10scj1iLmEseD1rO3IuZyYmdyhyLmYsW3IuYS5jKFwid2ZcIix4LmMsSih4KS50b1N0cmluZygpLFwibG9hZGluZ1wiKV0pO0socixcImZvbnRsb2FkaW5nXCIseCk7cj1udWxsO2lmKG51bGw9PT1YKWlmKHdpbmRvdy5Gb250RmFjZSl7dmFyIHg9L0dlY2tvLipGaXJlZm94XFwvKFxcZCspLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSx4YT0vT1MgWC4qVmVyc2lvblxcLzEwXFwuLipTYWZhcmkvLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpJiYvQXBwbGUvLmV4ZWMod2luZG93Lm5hdmlnYXRvci52ZW5kb3IpO1xuWD14PzQyPHBhcnNlSW50KHhbMV0sMTApOnhhPyExOiEwfWVsc2UgWD0hMTtYP3I9bmV3IFAocChiLmcsYikscChiLmgsYiksYi5jLGssYi5zLG4pOnI9bmV3IFEocChiLmcsYikscChiLmgsYiksYi5jLGssYi5zLGEsbik7bC5wdXNoKHIpfWZvcihoPTA7aDxsLmxlbmd0aDtoKyspbFtoXS5zdGFydCgpfX0sMCl9ZnVuY3Rpb24gcGEoYSxiLGMpe3ZhciBkPVtdLGU9Yy50aW1lb3V0O2lhKGIpO3ZhciBkPWthKGEuYSxjLGEuYyksZj1uZXcgVyhhLmMsYixlKTthLmg9ZC5sZW5ndGg7Yj0wO2ZvcihjPWQubGVuZ3RoO2I8YztiKyspZFtiXS5sb2FkKGZ1bmN0aW9uKGIsZCxjKXtxYShhLGYsYixkLGMpfSl9O2Z1bmN0aW9uIHJhKGEsYil7dGhpcy5jPWE7dGhpcy5hPWJ9XG5yYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKCl7aWYoZltcIl9fbXRpX2ZudExzdFwiK2RdKXt2YXIgYz1mW1wiX19tdGlfZm50THN0XCIrZF0oKSxlPVtdLGg7aWYoYylmb3IodmFyIGw9MDtsPGMubGVuZ3RoO2wrKyl7dmFyIGs9Y1tsXS5mb250ZmFtaWx5O3ZvaWQgMCE9Y1tsXS5mb250U3R5bGUmJnZvaWQgMCE9Y1tsXS5mb250V2VpZ2h0PyhoPWNbbF0uZm9udFN0eWxlK2NbbF0uZm9udFdlaWdodCxlLnB1c2gobmV3IEcoayxoKSkpOmUucHVzaChuZXcgRyhrKSl9YShlKX1lbHNlIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtiKCl9LDUwKX12YXIgYz10aGlzLGQ9Yy5hLnByb2plY3RJZCxlPWMuYS52ZXJzaW9uO2lmKGQpe3ZhciBmPWMuYy5vO0EodGhpcy5jLChjLmEuYXBpfHxcImh0dHBzOi8vZmFzdC5mb250cy5uZXQvanNhcGlcIikrXCIvXCIrZCtcIi5qc1wiKyhlP1wiP3Y9XCIrZTpcIlwiKSxmdW5jdGlvbihlKXtlP2EoW10pOihmW1wiX19Nb25vdHlwZUNvbmZpZ3VyYXRpb25fX1wiK1xuZF09ZnVuY3Rpb24oKXtyZXR1cm4gYy5hfSxiKCkpfSkuaWQ9XCJfX01vbm90eXBlQVBJU2NyaXB0X19cIitkfWVsc2UgYShbXSl9O2Z1bmN0aW9uIHNhKGEsYil7dGhpcy5jPWE7dGhpcy5hPWJ9c2EucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGIsYyxkPXRoaXMuYS51cmxzfHxbXSxlPXRoaXMuYS5mYW1pbGllc3x8W10sZj10aGlzLmEudGVzdFN0cmluZ3N8fHt9LGc9bmV3IEI7Yj0wO2ZvcihjPWQubGVuZ3RoO2I8YztiKyspeih0aGlzLmMsZFtiXSxDKGcpKTt2YXIgbT1bXTtiPTA7Zm9yKGM9ZS5sZW5ndGg7YjxjO2IrKylpZihkPWVbYl0uc3BsaXQoXCI6XCIpLGRbMV0pZm9yKHZhciBoPWRbMV0uc3BsaXQoXCIsXCIpLGw9MDtsPGgubGVuZ3RoO2wrPTEpbS5wdXNoKG5ldyBHKGRbMF0saFtsXSkpO2Vsc2UgbS5wdXNoKG5ldyBHKGRbMF0pKTtFKGcsZnVuY3Rpb24oKXthKG0sZil9KX07ZnVuY3Rpb24gdGEoYSxiKXthP3RoaXMuYz1hOnRoaXMuYz11YTt0aGlzLmE9W107dGhpcy5mPVtdO3RoaXMuZz1ifHxcIlwifXZhciB1YT1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzXCI7ZnVuY3Rpb24gdmEoYSxiKXtmb3IodmFyIGM9Yi5sZW5ndGgsZD0wO2Q8YztkKyspe3ZhciBlPWJbZF0uc3BsaXQoXCI6XCIpOzM9PWUubGVuZ3RoJiZhLmYucHVzaChlLnBvcCgpKTt2YXIgZj1cIlwiOzI9PWUubGVuZ3RoJiZcIlwiIT1lWzFdJiYoZj1cIjpcIik7YS5hLnB1c2goZS5qb2luKGYpKX19XG5mdW5jdGlvbiB3YShhKXtpZigwPT1hLmEubGVuZ3RoKXRocm93IEVycm9yKFwiTm8gZm9udHMgdG8gbG9hZCFcIik7aWYoLTEhPWEuYy5pbmRleE9mKFwia2l0PVwiKSlyZXR1cm4gYS5jO2Zvcih2YXIgYj1hLmEubGVuZ3RoLGM9W10sZD0wO2Q8YjtkKyspYy5wdXNoKGEuYVtkXS5yZXBsYWNlKC8gL2csXCIrXCIpKTtiPWEuYytcIj9mYW1pbHk9XCIrYy5qb2luKFwiJTdDXCIpOzA8YS5mLmxlbmd0aCYmKGIrPVwiJnN1YnNldD1cIithLmYuam9pbihcIixcIikpOzA8YS5nLmxlbmd0aCYmKGIrPVwiJnRleHQ9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGEuZykpO3JldHVybiBifTtmdW5jdGlvbiB5YShhKXt0aGlzLmY9YTt0aGlzLmE9W107dGhpcy5jPXt9fVxudmFyIHphPXtsYXRpbjpcIkJFU2Jzd3lcIixcImxhdGluLWV4dFwiOlwiXFx1MDBlN1xcdTAwZjZcXHUwMGZjXFx1MDExZlxcdTAxNWZcIixjeXJpbGxpYzpcIlxcdTA0MzlcXHUwNDRmXFx1MDQxNlwiLGdyZWVrOlwiXFx1MDNiMVxcdTAzYjJcXHUwM2EzXCIsa2htZXI6XCJcXHUxNzgwXFx1MTc4MVxcdTE3ODJcIixIYW51bWFuOlwiXFx1MTc4MFxcdTE3ODFcXHUxNzgyXCJ9LEFhPXt0aGluOlwiMVwiLGV4dHJhbGlnaHQ6XCIyXCIsXCJleHRyYS1saWdodFwiOlwiMlwiLHVsdHJhbGlnaHQ6XCIyXCIsXCJ1bHRyYS1saWdodFwiOlwiMlwiLGxpZ2h0OlwiM1wiLHJlZ3VsYXI6XCI0XCIsYm9vazpcIjRcIixtZWRpdW06XCI1XCIsXCJzZW1pLWJvbGRcIjpcIjZcIixzZW1pYm9sZDpcIjZcIixcImRlbWktYm9sZFwiOlwiNlwiLGRlbWlib2xkOlwiNlwiLGJvbGQ6XCI3XCIsXCJleHRyYS1ib2xkXCI6XCI4XCIsZXh0cmFib2xkOlwiOFwiLFwidWx0cmEtYm9sZFwiOlwiOFwiLHVsdHJhYm9sZDpcIjhcIixibGFjazpcIjlcIixoZWF2eTpcIjlcIixsOlwiM1wiLHI6XCI0XCIsYjpcIjdcIn0sQmE9e2k6XCJpXCIsaXRhbGljOlwiaVwiLG46XCJuXCIsbm9ybWFsOlwiblwifSxcbkNhPS9eKHRoaW58KD86KD86ZXh0cmF8dWx0cmEpLT8pP2xpZ2h0fHJlZ3VsYXJ8Ym9va3xtZWRpdW18KD86KD86c2VtaXxkZW1pfGV4dHJhfHVsdHJhKS0/KT9ib2xkfGJsYWNrfGhlYXZ5fGx8cnxifFsxLTldMDApPyhufGl8bm9ybWFsfGl0YWxpYyk/JC87XG5mdW5jdGlvbiBEYShhKXtmb3IodmFyIGI9YS5mLmxlbmd0aCxjPTA7YzxiO2MrKyl7dmFyIGQ9YS5mW2NdLnNwbGl0KFwiOlwiKSxlPWRbMF0ucmVwbGFjZSgvXFwrL2csXCIgXCIpLGY9W1wibjRcIl07aWYoMjw9ZC5sZW5ndGgpe3ZhciBnO3ZhciBtPWRbMV07Zz1bXTtpZihtKWZvcih2YXIgbT1tLnNwbGl0KFwiLFwiKSxoPW0ubGVuZ3RoLGw9MDtsPGg7bCsrKXt2YXIgaztrPW1bbF07aWYoay5tYXRjaCgvXltcXHctXSskLykpe3ZhciBuPUNhLmV4ZWMoay50b0xvd2VyQ2FzZSgpKTtpZihudWxsPT1uKWs9XCJcIjtlbHNle2s9blsyXTtrPW51bGw9PWt8fFwiXCI9PWs/XCJuXCI6QmFba107bj1uWzFdO2lmKG51bGw9PW58fFwiXCI9PW4pbj1cIjRcIjtlbHNlIHZhciByPUFhW25dLG49cj9yOmlzTmFOKG4pP1wiNFwiOm4uc3Vic3RyKDAsMSk7az1bayxuXS5qb2luKFwiXCIpfX1lbHNlIGs9XCJcIjtrJiZnLnB1c2goayl9MDxnLmxlbmd0aCYmKGY9Zyk7Mz09ZC5sZW5ndGgmJihkPWRbMl0sZz1bXSxkPWQ/ZC5zcGxpdChcIixcIik6XG5nLDA8ZC5sZW5ndGgmJihkPXphW2RbMF1dKSYmKGEuY1tlXT1kKSl9YS5jW2VdfHwoZD16YVtlXSkmJihhLmNbZV09ZCk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrPTEpYS5hLnB1c2gobmV3IEcoZSxmW2RdKSl9fTtmdW5jdGlvbiBFYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifXZhciBGYT17QXJpbW86ITAsQ291c2luZTohMCxUaW5vczohMH07RWEucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGI9bmV3IEIsYz10aGlzLmMsZD1uZXcgdGEodGhpcy5hLmFwaSx0aGlzLmEudGV4dCksZT10aGlzLmEuZmFtaWxpZXM7dmEoZCxlKTt2YXIgZj1uZXcgeWEoZSk7RGEoZik7eihjLHdhKGQpLEMoYikpO0UoYixmdW5jdGlvbigpe2EoZi5hLGYuYyxGYSl9KX07ZnVuY3Rpb24gR2EoYSxiKXt0aGlzLmM9YTt0aGlzLmE9Yn1HYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmEuaWQsYz10aGlzLmMubztiP0EodGhpcy5jLCh0aGlzLmEuYXBpfHxcImh0dHBzOi8vdXNlLnR5cGVraXQubmV0XCIpK1wiL1wiK2IrXCIuanNcIixmdW5jdGlvbihiKXtpZihiKWEoW10pO2Vsc2UgaWYoYy5UeXBla2l0JiZjLlR5cGVraXQuY29uZmlnJiZjLlR5cGVraXQuY29uZmlnLmZuKXtiPWMuVHlwZWtpdC5jb25maWcuZm47Zm9yKHZhciBlPVtdLGY9MDtmPGIubGVuZ3RoO2YrPTIpZm9yKHZhciBnPWJbZl0sbT1iW2YrMV0saD0wO2g8bS5sZW5ndGg7aCsrKWUucHVzaChuZXcgRyhnLG1baF0pKTt0cnl7Yy5UeXBla2l0LmxvYWQoe2V2ZW50czohMSxjbGFzc2VzOiExLGFzeW5jOiEwfSl9Y2F0Y2gobCl7fWEoZSl9fSwyRTMpOmEoW10pfTtmdW5jdGlvbiBIYShhLGIpe3RoaXMuYz1hO3RoaXMuZj1iO3RoaXMuYT1bXX1IYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmYuaWQsYz10aGlzLmMubyxkPXRoaXM7Yj8oYy5fX3dlYmZvbnRmb250ZGVja21vZHVsZV9ffHwoYy5fX3dlYmZvbnRmb250ZGVja21vZHVsZV9fPXt9KSxjLl9fd2ViZm9udGZvbnRkZWNrbW9kdWxlX19bYl09ZnVuY3Rpb24oYixjKXtmb3IodmFyIGc9MCxtPWMuZm9udHMubGVuZ3RoO2c8bTsrK2cpe3ZhciBoPWMuZm9udHNbZ107ZC5hLnB1c2gobmV3IEcoaC5uYW1lLGdhKFwiZm9udC13ZWlnaHQ6XCIraC53ZWlnaHQrXCI7Zm9udC1zdHlsZTpcIitoLnN0eWxlKSkpfWEoZC5hKX0sQSh0aGlzLmMsKHRoaXMuZi5hcGl8fFwiaHR0cHM6Ly9mLmZvbnRkZWNrLmNvbS9zL2Nzcy9qcy9cIikrZWEodGhpcy5jKStcIi9cIitiK1wiLmpzXCIsZnVuY3Rpb24oYil7YiYmYShbXSl9KSk6YShbXSl9O3ZhciBZPW5ldyBvYSh3aW5kb3cpO1kuYS5jLmN1c3RvbT1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgc2EoYixhKX07WS5hLmMuZm9udGRlY2s9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IEhhKGIsYSl9O1kuYS5jLm1vbm90eXBlPWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyByYShiLGEpfTtZLmEuYy50eXBla2l0PWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBHYShiLGEpfTtZLmEuYy5nb29nbGU9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IEVhKGIsYSl9O3ZhciBaPXtsb2FkOnAoWS5sb2FkLFkpfTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBafSk6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPVo6KHdpbmRvdy5XZWJGb250PVosd2luZG93LldlYkZvbnRDb25maWcmJlkubG9hZCh3aW5kb3cuV2ViRm9udENvbmZpZykpO30oKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFBJWEk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENvbnRhaW5lciwgR3JhcGhpY3MsIFRleHQsIFRleHRTdHlsZSB9IGZyb20gXCJwaXhpLmpzXCI7XHJcbmltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuaW1wb3J0IFdlYkZvbnQgZnJvbSBcIndlYmZvbnRsb2FkZXJcIjtcclxuXHJcbmNvbnN0IEMgPSA1MDsgLy8gU3BlZWQgb2YgbGlnaHQgaW4gbWV0ZXJzIHBlciBzZWNvbmRcclxuY29uc3QgQzIgPSBDICogQztcclxuY29uc3QgRCA9IDE7IC8vIE1ldGVycyBiZXR3ZWVuIGdyaWQgcG9pbnRzXHJcbmNvbnN0IFBJWEVMU19QRVJfTUVURVIgPSAxO1xyXG5jb25zdCBNSU5JTUFQX1NDQUxFID0gMSAvIDUwO1xyXG5cclxuLyogVE9ETzpcclxuICAgIC0gRGlzcGxheSBhbGwgdmlzaWJsZSBncmlkIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgLSBSZWdhcmRsZXNzIG9mIHZpZXdwb2ludFxyXG4gICAgLSBTaW1wbGlmeSBvciBlbGltaW5hdGUgdGhlIGR1YWxpdHkgYmV0d2VlbiBQaHlzaWNhbE9iamVjdCBhbmQgUElYSS5EaXNwbGF5T2JqZWN0LlxyXG4gICAgLSBTaW1wbGlmeSBtaW5pbWFwIC8gdmlld3BvcnQgYWJzdHJhY3Rpb25zXHJcbiAgICAtIEZ1ZWwgLyBkaWZmZXJlbnQgZW5naW5lc1xyXG4gICAgLSBJbnZlbnRvcnlcclxuICAgIC0gVHJpYW5ndWxhciBzaGlwXHJcbiAgICAtIFBhcnRpY2xlcyBmb3IgdGhydXN0XHJcbiAgICAtIFNwZWVkIHVwIGFuaW1hdGlvbnMgYmFzZWQgb24gdGltZSBkaWxhdGlvblxyXG4gICAgLSBIYXZlIFdpZ25lciByb3RhdGlvbiByb3RhdGUgdGhlIHdvcmxkIHJhdGhlciB0aGFuIHRoZSBwbGF5ZXJcclxuICAgIC0gVGhvbWFzIHByZWNlc3Npb25cclxuICAgICAgICAtIEkgdGhpbmsgdGhpcyBpcyBhY3R1YWxseSBkb25lICAgIFxyXG4gICAgLSBSZWxhdGl2aXR5IGZvciByb3RhdGlvblxyXG4gICAgLSBUaW1lIG5vIGxvbmdlciBwYXVzZXMgb24gdGFiLW91dFxyXG4gICAgLSBDb2xsaXNpb25zP1xyXG4gICAgLSBIYXZlIHRoZSBzaGlwIGFsd2F5cyBwb2ludCB1cHdhcmRzIGFuZCByb3RhdGUgc3BhY2UgaW5zdGVhZD9cclxuICAgICAgICAtIFJlbmRlciBhIGNvbXBhc3NcclxuICAgIC0gSW50ZXJhY3Qgd2l0aCBzdGF0aW9uc1xyXG4gICAgLSBEb3BwbGVyIGVmZmVjdCBvbiBjb2xvciB2aXN1YWxzXHJcbiAgICAgICAgLSBMaWtlbHkgbmVlZHMgdG8gYmUgZGUtZW1waGFzaXplZCB0byBiZSBhY3R1YWxseSB2aXNpYmxlIGF0IGhpZ2ggc3BlZWRzIHhcclxuICAgIFxyXG4gICAgLSBNdWNoIGxhdGVyXHJcbiAgICAgICAgLSBHcmF2aXR5XHJcbiAgICAgICAgLSBHZW5lcmFsIHJlbGF0aXZpdHlcclxuKi9cclxuXHJcbmNsYXNzIE1hdHJpeDJEIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYTogbnVtYmVyLCBwdWJsaWMgYjogbnVtYmVyLCBwdWJsaWMgYzogbnVtYmVyLCBwdWJsaWMgZDogbnVtYmVyKSB7IH1cclxuICB0aW1lc1NjYWxhciA9IChzOiBudW1iZXIpOiBNYXRyaXgyRCA9PlxyXG4gICAgbmV3IE1hdHJpeDJEKHRoaXMuYSAqIHMsIHRoaXMuYiAqIHMsIHRoaXMuYyAqIHMsIHRoaXMuZCAqIHMpO1xyXG4gIHRpbWVzVmVjdG9yID0gKHsgeCwgeSB9OiBWZWN0b3IpOiBWZWN0b3IgPT5cclxuICAgIG5ldyBWZWN0b3IodGhpcy5hICogeCArIHRoaXMuYiAqIHksIHRoaXMuYyAqIHggKyB0aGlzLmQgKiB5KTtcclxuICB0aW1lc01hdHJpeCA9ICh7IGEsIGIsIGMsIGQgfTogTWF0cml4MkQpOiBNYXRyaXgyRCA9PlxyXG4gICAgbmV3IE1hdHJpeDJEKFxyXG4gICAgICB0aGlzLmEgKiBhICsgdGhpcy5iICogYyxcclxuICAgICAgdGhpcy5hICogYiArIHRoaXMuYiAqIGQsXHJcbiAgICAgIHRoaXMuYyAqIGEgKyB0aGlzLmQgKiBjLFxyXG4gICAgICB0aGlzLmMgKiBiICsgdGhpcy5kICogZFxyXG4gICAgKTtcclxuICBpbnZlcnNlKCk6IE1hdHJpeDJEIHtcclxuICAgIGxldCB7IGEsIGIsIGMsIGQgfSA9IHRoaXM7XHJcbiAgICBsZXQgZGV0ZXJtaW5hbnQgPSBhICogZCAtIGIgKiBjO1xyXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgyRChkLCAtYiwgLWMsIGEpLnRpbWVzU2NhbGFyKDEgLyBkZXRlcm1pbmFudCk7XHJcbiAgfVxyXG4gIHN0YXRpYyBmcm9tRWlnZW52ZWN0b3JzKHYxOiBWZWN0b3IsIGUxOiBudW1iZXIsIHYyOiBWZWN0b3IsIGUyOiBudW1iZXIpOiBNYXRyaXgyRCB7XHJcbiAgICBsZXQgc2NhbGUgPSBuZXcgTWF0cml4MkQoZTEsIDAsIDAsIGUyKTtcclxuICAgIGxldCBiYXNpcyA9IG5ldyBNYXRyaXgyRCh2MS54LCB2Mi54LCB2MS55LCB2Mi55KTtcclxuICAgIHJldHVybiBiYXNpcy50aW1lc01hdHJpeChzY2FsZS50aW1lc01hdHJpeChiYXNpcy5pbnZlcnNlKCkpKTtcclxuICB9XHJcbiAgdG9QaXhpTWF0cml4KCk6IFBJWEkuTWF0cml4IHtcclxuICAgIHJldHVybiBuZXcgUElYSS5NYXRyaXgodGhpcy5hLCB0aGlzLmMsIHRoaXMuYiwgdGhpcy5kKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCByb3RhdGlvbk1hdHJpeCA9ICh0aGV0YTogbnVtYmVyKSA9PlxyXG4gIG5ldyBNYXRyaXgyRChcclxuICAgIE1hdGguY29zKHRoZXRhKSxcclxuICAgIC1NYXRoLnNpbih0aGV0YSksXHJcbiAgICBNYXRoLnNpbih0aGV0YSksXHJcbiAgICBNYXRoLmNvcyh0aGV0YSlcclxuICApO1xyXG5cclxuY2xhc3MgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcihyZWFkb25seSB4ID0gMCwgcmVhZG9ubHkgeSA9IDApIHsgfVxyXG4gIHJlbGF0aXZpc3RpY1BsdXMob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XaWduZXJfcm90YXRpb24jVHdvX2dlbmVyYWxfYm9vc3RzXHJcbiAgICAvLyBOb3QgYXNzb2NpYXRpdmUgb3IgY29tbXV0YXRpdmUsIGFsc28gcmVzdWx0cyBpbiBhIG5ldCByb3RhdGlvbiAodGhvbWFzUm90YXRpb24pXHJcbiAgICAvLyBJIHRoaW5rIHRoZXJlJ3Mgc29tZXRoaW5nIHdyb25nIGhlcmUsIGNsb3NlIGVub3VnaCB0byBDIGEgYm9vc3QgcGVycGVuZGljdWxhciB0byB0aGUgb3JpZ2luYWwgc3BlZWRcclxuICAgIC8vIGVuZHMgdXAgbW92aW5nIGluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24gb2YgdGhlIG5ldyBib29zdFxyXG4gICAgbGV0IHUgPSB0aGlzLFxyXG4gICAgICB2ID0gb3RoZXI7XHJcbiAgICBsZXQgdV9nYW1tYSA9IHUuZ2FtbWEoKTtcclxuICAgIGxldCB1X2RvdF92ID0gdS5kb3Qodik7XHJcbiAgICByZXR1cm4gdVxyXG4gICAgICAudGltZXMoMSArICgodV9kb3RfdiAvIEMyKSAqIHVfZ2FtbWEpIC8gKDEgKyB1X2dhbW1hKSlcclxuICAgICAgLnBsdXModi50aW1lcygxIC8gdV9nYW1tYSkpXHJcbiAgICAgIC50aW1lcygxIC8gKDEgKyB1X2RvdF92IC8gQzIpKTtcclxuICB9XHJcbiAgdGhvbWFzUm90YXRpb25BbmdsZShvdGhlcjogVmVjdG9yKTogbnVtYmVyIHtcclxuICAgIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dpZ25lcl9yb3RhdGlvbiNGaW5kaW5nX3RoZV9heGlzX2FuZF9hbmdsZV9vZl90aGVfVGhvbWFzX3JvdGF0aW9uXHJcbiAgICAvLyBIbW0gd2hhdCdzIHRoZSBzaWduIG9mIHRoZSByb3RhdGlvbiBoZXJlPyBJIGFjdHVhbGx5IGp1c3QgZG9uJ3Qga25vdyBvciBoYXZlIGFueSBpbnR1aXRpdmUgc2Vuc2UuXHJcbiAgICAvLyBJdCBzZWVtcyBsaWtlIGl0IHRyYWNrcyB3aXRoIHRoZSBhcnRpY2xlIHRoYXQgdGhlIHJlc3VsdGluZyBhbmdsZSBpcyBjb21tdXRhdGl2ZSBpbiB1ICsgdiB2cyB2ICsgdVxyXG4gICAgbGV0IHUgPSB0aGlzLFxyXG4gICAgICB2ID0gb3RoZXI7XHJcbiAgICBsZXQgdV9nYW1tYSA9IHUuZ2FtbWEoKSxcclxuICAgICAgdl9nYW1tYSA9IHYuZ2FtbWEoKSxcclxuICAgICAgY29tcG9zaXRlX2dhbW1hID0gdV9nYW1tYSAqIHZfZ2FtbWEgKiAoMSArIHUuZG90KHYpIC8gQzIpO1xyXG4gICAgLy8geiBjb21wb25lbnQgb2YgdGhlIGNyb3NzIHByb2R1Y3RcclxuICAgIC8vIG5lZ2F0ZWQgYmVjYXVzZSA/ISBhbnl3YXkgaXQgc2VlbXMgbXVjaCBiZXR0ZXIgYmVoYXZlZCB0aGlzIHdheTsgbm90IG5lZ2F0aW5nIGl0IGNhdXNlcyBhY2NlbGVyYXRpb25zXHJcbiAgICAvLyB0byBiZWNvbWUgdW5zdGFibGUgYW5kIHlvdSBjYW4gZ2V0IHdlaXJkIGNhc2VzIHdoZXJlIGEgY29uc3RhbnQgYWNjZWxlcmF0aW9uIGNhdXNlcyB5b3UgdG8gdHJhdmVsIGluIGNpcmNsZXNcclxuICAgIC8vIHJlbGF0aXZlIHRvIGNvb3JkaW5hdGUgc3BhY2VcclxuICAgIC8vIEkgc3VzcGVjdCBpdCdzIG5lZ2F0aXZlIGJlY2F1c2Ugb2Ygc29tZSB3ZWlyZG5lc3MgaW4gdGhlIHdheSBJJ20gdGhpbmtpbmcgYWJvdXQgY29vcmRpbmF0ZSBzcGFjZS5cclxuICAgIC8vIEknbSBzdGlsbCB3b25kZXJpbmcgaWYgSSBuZWVkIHRvIGRvIHRoaXMgYXQgYWxsLCBvciBpZiBJIGNhbiBzb21laG93IG1ha2UgdGhpcyBhIG1vcmUgbmF0dXJhbCBwYXJ0IG9mIHRoZSBzaW11bGF0aW9uO1xyXG4gICAgLy8gdGhlIHBoeXNpY2FsIG1lYW5pbmcgb2YgdGhpcyByb3RhdGlvbiBzdGlsbCBlbHVkZXMgbWUuXHJcbiAgICBsZXQgc2lnbiA9IC1NYXRoLnNpZ24odS54ICogdi55IC0gdS55ICogdi54KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHNpZ24gKlxyXG4gICAgICBNYXRoLmFjb3MoXHJcbiAgICAgICAgTWF0aC5wb3coMSArIHVfZ2FtbWEgKyB2X2dhbW1hICsgY29tcG9zaXRlX2dhbW1hLCAyKSAvXHJcbiAgICAgICAgKCgxICsgdV9nYW1tYSkgKiAoMSArIHZfZ2FtbWEpICogKDEgKyBjb21wb3NpdGVfZ2FtbWEpKSAtXHJcbiAgICAgICAgMVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuICBwbHVzID0gKG90aGVyOiBWZWN0b3IpOiBWZWN0b3IgPT4gbmV3IFZlY3Rvcih0aGlzLnggKyBvdGhlci54LCB0aGlzLnkgKyBvdGhlci55KTtcclxuICBkb3QgPSAob3RoZXI6IFZlY3Rvcik6IG51bWJlciA9PiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcclxuICBtaW51cyA9IChvdGhlcjogVmVjdG9yKTogVmVjdG9yID0+IG5ldyBWZWN0b3IodGhpcy54IC0gb3RoZXIueCwgdGhpcy55IC0gb3RoZXIueSk7XHJcbiAgdGltZXMgPSAobTogbnVtYmVyKTogVmVjdG9yID0+IG5ldyBWZWN0b3IodGhpcy54ICogbSwgdGhpcy55ICogbSk7XHJcbiAgbWFnbml0dWRlID0gKCk6IG51bWJlciA9PiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcclxuICB1bml0ID0gKCk6IFZlY3RvciA9PiB0aGlzLnRpbWVzKDEgLyB0aGlzLm1hZ25pdHVkZSgpKTtcclxuICBvcnRob2dvbmFsID0gKCk6IFZlY3RvciA9PiBuZXcgVmVjdG9yKC10aGlzLnksIHRoaXMueCk7XHJcbiAgcHJvamVjdChvbnRvOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgbGV0IHVuaXQgPSBvbnRvLnVuaXQoKTtcclxuICAgIHJldHVybiB1bml0LnRpbWVzKHRoaXMuZG90KHVuaXQpKTtcclxuICB9XHJcbiAgZ2FtbWEoKTogbnVtYmVyIHtcclxuICAgIGxldCB2ID0gdGhpcy5tYWduaXR1ZGUoKTtcclxuICAgIHJldHVybiBNYXRoLnBvdygxIC0gKHYgKiB2KSAvIEMyLCAtMC41KTtcclxuICB9XHJcbiAgbG9yZW50elRyYW5zZm9ybSgpOiBNYXRyaXgyRCB7XHJcbiAgICByZXR1cm4gTWF0cml4MkQuZnJvbUVpZ2VudmVjdG9ycyhcclxuICAgICAgdGhpcyxcclxuICAgICAgMSAvIHRoaXMuZ2FtbWEoKSxcclxuICAgICAgdGhpcy5vcnRob2dvbmFsKCksXHJcbiAgICAgIDFcclxuICAgICk7XHJcbiAgfVxyXG4gIGludmVyc2VMb3JlbnR6VHJhbnNmb3JtKCk6IE1hdHJpeDJEIHtcclxuICAgIHJldHVybiBNYXRyaXgyRC5mcm9tRWlnZW52ZWN0b3JzKHRoaXMsIHRoaXMuZ2FtbWEoKSwgdGhpcy5vcnRob2dvbmFsKCksIDEpO1xyXG4gIH1cclxuICB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBWeyR7dGhpcy54LnRvRml4ZWQoNSl9LCAke3RoaXMueS50b0ZpeGVkKDUpfX1gO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVE9ETzogd2Ugd2FudCBgc3RlcGAgdG8gdmFyeSBpbiB4IGFuZCB5IHNvIHdlIGNhbiBoYXZlIGEgc2VwYXJhdGUgc2NhbGUgLyBjb2xvclxyXG4vLyBVc2VmdWwgc2luY2UgbGVuZ3RoIGNvbnRyYWN0aW9uIG9ubHkgaGFwcGVucyBhbG9uZyB0aGUgYXhpcyBvZiB0cmF2ZWxcclxuY2xhc3MgR3JpZCBleHRlbmRzIEdyYXBoaWNzIHtcclxuICBjb25zdHJ1Y3Rvcih7IHg6IHhtaW4sIHk6IHltaW4gfTogVmVjdG9yLCB7IHg6IHhtYXgsIHk6IHltYXggfTogVmVjdG9yLCBwcml2YXRlIHN0ZXA6IG51bWJlciwgcHJpdmF0ZSBjb2xvcjogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGVwID0gc3RlcDtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMuYmVnaW5GaWxsKGNvbG9yKTtcclxuICAgIGxldCByYWRpdXMgPSAyO1xyXG4gICAgZm9yIChsZXQgeCA9IHhtaW47IHggPD0geG1heDsgeCArPSBzdGVwKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSB5bWluOyB5IDw9IHltYXg7IHkgKz0gc3RlcCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0NpcmNsZSh4LCB5LCByYWRpdXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb3IgZ3JpZCBsaW5lcyBpbnN0ZWFkXHJcbiAgICAvLyB0aGlzLmxpbmVTdHlsZSgwLjUsIGNvbG9yKTtcclxuICAgIC8vIGZvciAobGV0IHggPSB4bWluOyB4IDw9IHhtYXg7IHggKz0gc3RlcCkge1xyXG4gICAgLy8gICB0aGlzLm1vdmVUbyh4LCB5bWluKTtcclxuICAgIC8vICAgdGhpcy5saW5lVG8oeCwgeW1heCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBmb3IgKGxldCB5ID0geW1pbjsgeSA8PSB5bWF4OyB5ICs9IHN0ZXApIHtcclxuICAgIC8vICAgdGhpcy5tb3ZlVG8oeG1pbiwgeSk7XHJcbiAgICAvLyAgIHRoaXMubGluZVRvKHhtYXgsIHkpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuICBzZXRQb3NpdGlvbih7IHgsIHkgfTogVmVjdG9yKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NNb2QoeCwgdGhpcy5zdGVwKSwgcG9zTW9kKHksIHRoaXMuc3RlcCkpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUGh5c2ljYWxPYmplY3Qge1xyXG4gIHN0YXRpYyBNQVNTID0gMTtcclxuXHJcbiAgLy8gVE9ETyBXZSdyZSBub3QgY3JlYXRpbmcgYWxsIG9iamVjdHMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2FtZSA6UCBUaGV5IHNob3VsZCBzdGFydFxyXG4gIC8vIHdpdGggdGhlIHRpbWUgb2YgdGhlIG9iamVjdCB0aGF0IGNyZWF0ZWQgdGhlbS4gT2JqZWN0cyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBnYW1lXHJcbiAgLy8gc2hvdWxkIHN0YXJ0IHdpdGggbmVnYXRpdmUgdCBiYXNlZCBvbiBkaXN0YW5jZSB0byB0aGUgcGxheWVyLlxyXG4gIHB1YmxpYyB0OiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBhbmd1bGFyVmVsb2NpdHk6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIGV4dGVybmFsRm9yY2VzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcbiAgcHJpdmF0ZSBfcmVmZXJlbmNlRnJhbWU6IFJlZmVyZW5jZUZyYW1lIHwgbnVsbCA9IG51bGw7XHJcbiAgcHVibGljIHBpeGlPYmplY3Q6IFBJWEkuR3JhcGhpY3MgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgbWluaW1hcE9iamVjdDogUElYSS5HcmFwaGljcyB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxyXG4gICAgcHVibGljIHZlbG9jaXR5OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCksXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDEsIDApLFxyXG4gICAgcHVibGljIG1hc3M6IG51bWJlciA9IFBoeXNpY2FsT2JqZWN0Lk1BU1NcclxuICApIHsgfVxyXG4gIHByb3BlckZvcmNlcygpOiBBcnJheTxWZWN0b3I+IHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVybmFsRm9yY2VzO1xyXG4gIH1cclxuICBwcm9wZXJBY2NlbGVyYXRpb24oKTogVmVjdG9yIHtcclxuICAgIHZhciBmb3JjZXMgPSBuZXcgVmVjdG9yKCk7XHJcbiAgICB0aGlzLnByb3BlckZvcmNlcygpLmZvckVhY2goKGZvcmNlKSA9PiB7XHJcbiAgICAgIGZvcmNlcyA9IGZvcmNlcy5wbHVzKGZvcmNlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZvcmNlcy50aW1lcygxIC8gdGhpcy5tYXNzKTtcclxuICB9XHJcbiAgc2V0IHJlZmVyZW5jZUZyYW1lKGZyYW1lKSB7XHJcbiAgICBpZiAodGhpcy5fcmVmZXJlbmNlRnJhbWUpIHtcclxuICAgICAgdGhpcy5fcmVmZXJlbmNlRnJhbWUucmVtb3ZlT2JqZWN0KHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcmVmZXJlbmNlRnJhbWUgPSBmcmFtZTtcclxuICAgIHRoaXMucmVzZXRQaXhpT2JqZWN0cygpO1xyXG4gIH1cclxuICBnZXQgcmVmZXJlbmNlRnJhbWUoKTogUmVmZXJlbmNlRnJhbWUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZUZyYW1lO1xyXG4gIH1cclxuICByZXNldFBpeGlPYmplY3RzKCkge1xyXG4gICAgbGV0IHsgcGl4aU9iamVjdCwgbWluaW1hcE9iamVjdCB9ID0gdGhpcztcclxuICAgIHRoaXMucGl4aU9iamVjdCA9IHRoaXMuY3JlYXRlUGl4aU9iamVjdCgpO1xyXG4gICAgdGhpcy5taW5pbWFwT2JqZWN0ID0gdGhpcy5jcmVhdGVNaW5pbWFwT2JqZWN0KCk7XHJcbiAgICB0aGlzLm1pbmltYXBPYmplY3Quc2NhbGUuc2V0KDEgLyBNSU5JTUFQX1NDQUxFLCAxIC8gTUlOSU1BUF9TQ0FMRSk7XHJcbiAgICBpZiAodGhpcy5fcmVmZXJlbmNlRnJhbWUpIHtcclxuICAgICAgdGhpcy5fcmVmZXJlbmNlRnJhbWUub2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkKHBpeGlPYmplY3QpO1xyXG4gICAgICB0aGlzLl9yZWZlcmVuY2VGcmFtZS5vYmplY3RDb250YWluZXIuYWRkQ2hpbGQodGhpcy5waXhpT2JqZWN0KTtcclxuICAgICAgdGhpcy5fcmVmZXJlbmNlRnJhbWUubWluaW1hcE9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZChtaW5pbWFwT2JqZWN0KTtcclxuICAgICAgdGhpcy5fcmVmZXJlbmNlRnJhbWUubWluaW1hcE9iamVjdENvbnRhaW5lci5hZGRDaGlsZCh0aGlzLm1pbmltYXBPYmplY3QpO1xyXG4gICAgfVxyXG4gIH1cclxuICBjcmVhdGVQaXhpT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBHcmFwaGljcygpO1xyXG4gIH1cclxuICBjcmVhdGVNaW5pbWFwT2JqZWN0KCkge1xyXG4gICAgLy8gVE9ETzogdGhlc2Ugc2hvdWxkIHByb2JhYmx5IHRocm93IGluc3RlYWRcclxuICAgIHJldHVybiBuZXcgR3JhcGhpY3MoKTtcclxuICB9XHJcbiAgdXBkYXRlKHByb3BlckRUKSB7XHJcbiAgICB0aGlzLnQgKz0gcHJvcGVyRFQ7XHJcbiAgICBsZXQgeyBwb3NpdGlvbiwgdmVsb2NpdHksIGRpcmVjdGlvbiB9ID0gdGhpcztcclxuICAgIGxldCBhY2NlbGVyYXRpb24gPSB0aGlzLnByb3BlckFjY2VsZXJhdGlvbigpO1xyXG4gICAgaWYgKGFjY2VsZXJhdGlvbi54ICE9IDAgfHwgYWNjZWxlcmF0aW9uLnkgIT0gMCkge1xyXG4gICAgICBsZXQgYm9vc3QgPSBhY2NlbGVyYXRpb24udGltZXMocHJvcGVyRFQpO1xyXG4gICAgICBsZXQgbmV3X3ZlbG9jaXR5ID0gdmVsb2NpdHkucmVsYXRpdmlzdGljUGx1cyhib29zdCk7XHJcbiAgICAgIHRoaXMudmVsb2NpdHkgPSBuZXdfdmVsb2NpdHk7XHJcbiAgICAgIC8vIEkgd2lzaCBJIGhhZCBzb21lIGludHVpdGlvbiBmb3Igd2hhdCBUaG9tYXMgcm90YXRpb24gbWVhbnMgcGh5c2ljYWxseS4gU2luY2UgdGhlIHJvdGF0aW9uXHJcbiAgICAgIC8vIG9ubHkgaGFwcGVucyBiZXR3ZWVuIDIgYm9vc3RzLCBidXQgd2UgY29uc2lkZXIgb3Vyc2VsdmVzIHRvIGJlIGF0IHJlc3QsIHdoeSBkbyB3ZSByb3RhdGUgd2hlbiB3ZSBib29zdFxyXG4gICAgICAvLyBhbmQgd2hhdCBkbyB3ZSByb3RhdGUgcmVsYXRpdmUgdG8/XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gcm90YXRpb25NYXRyaXgoXHJcbiAgICAgICAgdmVsb2NpdHkudGhvbWFzUm90YXRpb25BbmdsZShib29zdClcclxuICAgICAgKS50aW1lc1ZlY3RvcihkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYW5ndWxhclZlbG9jaXR5ICE9IDApIHtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSByb3RhdGlvbk1hdHJpeChcclxuICAgICAgICBwcm9wZXJEVCAqIHRoaXMuYW5ndWxhclZlbG9jaXR5XHJcbiAgICAgICkudGltZXNWZWN0b3IodGhpcy5kaXJlY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgLy8gUmlnaHQgbm93IGxlbmd0aCBjb250cmFjdGlvbiBpcyBiYXNpY2FsbHkgY29tcHV0ZWQgaGVyZTsgd2UgdXBkYXRlIHRoZSBwbGF5ZXIncyBwb3NpdGlvbiBpbiB0aGUgY29vcmRpbmF0ZSBmcmFtZVxyXG4gICAgLy8gYXMgdiAqIGR0ICogZ2FtbWEsIHdoaWNoIGNhbiBlaXRoZXIgYmUgaW50ZXJwcmV0ZWQgYXMgbGVuZ3RoIGNvbnRyYWN0aW9uIChmcm9tIHRoZSBwZXJzcGVjdGl2ZSBvZiB0aGUgc2hpcClcclxuICAgIC8vIG9yIHRpbWUgZGlsYXRpb24gKGZyb20gdGhlIHBlcnNwZWN0aXZlIG9mIHRoZSBjb29yZGluYXRlIGZyYW1lJ3MgY2xvY2spXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb24ucGx1cyh2ZWxvY2l0eS50aW1lcyhwcm9wZXJEVCAqIHZlbG9jaXR5LmdhbW1hKCkpKTtcclxuICAgIC8vIFVwZGF0ZSBQSVhJIG9iamVjdFxyXG4gICAgdGhpcy5waXhpT2JqZWN0LnBvc2l0aW9uLnNldCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLnBpeGlPYmplY3Qucm90YXRpb24gPSBNYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uLnksIHRoaXMuZGlyZWN0aW9uLngpO1xyXG4gICAgdGhpcy5taW5pbWFwT2JqZWN0LnBvc2l0aW9uLnNldCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQaHlzaWNhbE9iamVjdFdpdGhUaHJ1c3QgZXh0ZW5kcyBQaHlzaWNhbE9iamVjdCB7XHJcbiAgcHVibGljIHRocnVzdDogbnVtYmVyID0gMDtcclxuICBwcm9wZXJGb3JjZXMoKSB7XHJcbiAgICByZXR1cm4gW3RoaXMuZGlyZWN0aW9uLnRpbWVzKHRoaXMudGhydXN0KSwgLi4uc3VwZXIucHJvcGVyRm9yY2VzKCldO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgU2hpcCBleHRlbmRzIFBoeXNpY2FsT2JqZWN0V2l0aFRocnVzdCB7XHJcbiAgcmVhZG9ubHkgc2l6ZSA9IDUwO1xyXG4gIHJlYWRvbmx5IGNvbG9yID0gMHhmZmZmZmY7XHJcbiAgY3JlYXRlUGl4aU9iamVjdCgpIHtcclxuICAgIHZhciBncmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xyXG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xyXG4gICAgbGV0IHJhZGl1cyA9IHRoaXMuc2l6ZSAvIDI7XHJcbiAgICBncmFwaGljcy5saW5lU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCByYWRpdXMpO1xyXG4gICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG5cclxuICAgIGdyYXBoaWNzLm1vdmVUbygwLCAwKTtcclxuICAgIGdyYXBoaWNzLmxpbmVUbyhyYWRpdXMsIDApO1xyXG4gICAgcmV0dXJuIGdyYXBoaWNzO1xyXG4gIH1cclxuICBjcmVhdGVNaW5pbWFwT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBHcmFwaGljcygpLmJlZ2luRmlsbCgweDAwZmYwMCkuZHJhd0NpcmNsZSgwLCAwLCAzKS5lbmRGaWxsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGF0aW9uIGV4dGVuZHMgUGh5c2ljYWxPYmplY3Qge1xyXG4gIHNpemUgPSAxODA7XHJcbiAgY29sb3IgPSAweGZmZmZmZjtcclxuICBuYW1lID0gXCJTdGF0aW9uIDFcIjtcclxuICBwcml2YXRlIHRleHQ6IFBJWEkuVGV4dCB8IG51bGwgPSBudWxsO1xyXG5cclxuICB1cGRhdGUocHJvcGVyRFQ6IG51bWJlcikge1xyXG4gICAgc3VwZXIudXBkYXRlKHByb3BlckRUKTtcclxuICAgIHRoaXMudGV4dC50ZXh0ID0gYENsb2NrOiAke3RoaXMudC50b0ZpeGVkKDMpfWA7XHJcbiAgfVxyXG4gIGNyZWF0ZVBpeGlPYmplY3QoKSB7XHJcbiAgICB2YXIgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcclxuICAgIGdyYXBoaWNzLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcclxuICAgIGxldCByYWRpdXMgPSB0aGlzLnNpemUgLyAyO1xyXG4gICAgZ3JhcGhpY3MubGluZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgcmFkaXVzKTtcclxuICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuXHJcbiAgICBncmFwaGljcy5tb3ZlVG8oMCwgMCk7XHJcbiAgICBncmFwaGljcy5saW5lVG8ocmFkaXVzLCAwKTtcclxuXHJcbiAgICAvLyBDaGFuZ2luZyB0ZXh0IGlzIHN1cHBvc2VkbHkgZXhwZW5zaXZlLCBtaWdodCBuZWVkIHRvIGZpZ3VyZSBvdXQgYSBiZXR0ZXIgb3B0aW9uXHJcbiAgICAvLyBCZXR0ZXIgb3B0aW9uIGlzIHRvIHVzZSBCaXRtYXBUZXh0LCB3ZSdsbCBjcm9zcyB0aGF0IGJyaWRnZSBsYXRlclxyXG4gICAgbGV0IHRleHQgPSBuZXcgVGV4dChcclxuICAgICAgXCJcIixcclxuICAgICAgbmV3IFRleHRTdHlsZSh7XHJcbiAgICAgICAgZm9udFdlaWdodDogXCJib2xkXCIsXHJcbiAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgZmlsbDogMHgwMGFhMzMsXHJcbiAgICAgICAgZm9udFNpemU6IDE1LFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRleHQucG9zaXRpb24uc2V0KC0zNSwgMjApO1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIGdyYXBoaWNzLmFkZENoaWxkKHRleHQpO1xyXG4gICAgcmV0dXJuIGdyYXBoaWNzO1xyXG4gIH1cclxuICBjcmVhdGVNaW5pbWFwT2JqZWN0KCkge1xyXG4gICAgbGV0IGcgPSBuZXcgR3JhcGhpY3MoKS5iZWdpbkZpbGwoMHhmZmZmZmYpLmRyYXdDaXJjbGUoMCwgMCwgMykuZW5kRmlsbCgpO1xyXG4gICAgZy5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICBnLmhpdEFyZWEgPSBuZXcgUElYSS5DaXJjbGUoMCwgMCwgMTApO1xyXG4gICAgbGV0IHRleHQgPSBuZXcgVGV4dChcclxuICAgICAgdGhpcy5uYW1lLFxyXG4gICAgICBuZXcgVGV4dFN0eWxlKHtcclxuICAgICAgICBmaWxsOiAweGZmZmZmZixcclxuICAgICAgICBmb250U2l6ZTogMTAsXHJcbiAgICAgICAgZm9udEZhbWlseTogXCJNYWpvciBNb25vIERpc3BsYXlcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0ZXh0LnBvc2l0aW9uLnNldCgxMCwgLTEwKTtcclxuICAgIHRleHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgZy5hZGRDaGlsZCh0ZXh0KTtcclxuICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xyXG4gICAgICB0ZXh0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBnLm9uKFwibW91c2VvdXRcIiwgKCkgPT4ge1xyXG4gICAgICB0ZXh0LnZpc2libGUgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGc7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBSZWZlcmVuY2VGcmFtZSBleHRlbmRzIENvbnRhaW5lciB7XHJcbiAgLy8gQSBzZXQgb2Ygb2JqZWN0cyB3aGljaCBhcmUgYWxsIGxvY2tlZCBhdCB0cmF2ZWxpbmcgYXQgdGhlIHNhbWUgdmVsb2NpdHkgYW5kIGFsbFxyXG4gIC8vIGhhdmUgdGhlIHNhbWUgcHJvcGVyIHRpbWUgKG5vdCB0cnVlIG9uY2Ugd2UgYWRkIGdlbmVyYWwgcmVsYXRpdml0eSlcclxuICAvLyBUaGlzIGlzIF9zb21ld2hhdF8gb2YgYSBwaHlzaWNhbCBhbmFsb2csIGFsdGhvdWdoIGluIHBoeXNpY3MgZGlmZmVyZW50IHBvaW50cyBpblxyXG4gIC8vIHNwYWNldGltZSB3b3VsZG4ndCBzaGFyZSBhIHJlZmVyZW5jZSBmcmFtZS5cclxuICAvLyBJdCdzIG1vc3RseSBhIGdyZWF0IG9wdGltaXphdGlvbiB0aGF0IGFsbG93cyB1cyB0byBvbmx5IGNvbXB1dGUgdHJhbnNmb3JtYXRpb25zIG9uY2VcclxuICAvLyBwZXIgZ3JvdXAgb2Ygb2JqZWN0cyB3aXRoIGxvY2tlZCB2ZWxvY2l0aWVzLlxyXG4gIHB1YmxpYyBvYmplY3RDb250YWluZXI6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcclxuICBwdWJsaWMgbWluaW1hcE9iamVjdENvbnRhaW5lcjogQ29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2ZWxvY2l0eTogVmVjdG9yID0gbmV3IFZlY3RvcigpLCBwdWJsaWMgb2JqZWN0czogU2V0PFBoeXNpY2FsT2JqZWN0PiA9IG5ldyBTZXQoKSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHN1cGVyLmFkZENoaWxkKHRoaXMub2JqZWN0Q29udGFpbmVyKTtcclxuICAgIG9iamVjdHMuZm9yRWFjaCh0aGlzLmFkZE9iamVjdC5iaW5kKHRoaXMpKTtcclxuICB9XHJcbiAgYWRkT2JqZWN0KG9iamVjdDogUGh5c2ljYWxPYmplY3QpIHtcclxuICAgIC8vIFBoeXNpY2FsT2JqZWN0LCBub3QgUElYSS5EcmF3YWJsZU9iamVjdFxyXG4gICAgdGhpcy5vYmplY3RzLmFkZChvYmplY3QpO1xyXG4gICAgb2JqZWN0LnJlZmVyZW5jZUZyYW1lID0gdGhpcztcclxuICB9XHJcbiAgcmVtb3ZlT2JqZWN0KG9iamVjdDogUGh5c2ljYWxPYmplY3QpIHtcclxuICAgIHRoaXMub2JqZWN0cy5kZWxldGUob2JqZWN0KTtcclxuICAgIHRoaXMub2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkKG9iamVjdC5waXhpT2JqZWN0KTtcclxuICAgIHRoaXMubWluaW1hcE9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZChvYmplY3QubWluaW1hcE9iamVjdCk7XHJcbiAgfVxyXG4gIHVwZGF0ZShvYnNlcnZlckRUOiBudW1iZXIsIG9ic2VydmVyRnJhbWU6IFJlZmVyZW5jZUZyYW1lLCBvYnNlcnZlclBvc2l0aW9uOiBWZWN0b3IsIG9sZE9ic2VydmVyUG9zaXRpb246IFZlY3Rvcikge1xyXG4gICAgLy8gVGhpcyBpcyBjb21wbGV4IGFuZCBoYXJkIHRvIGdldCByaWdodC5cclxuICAgIC8vIC0gV2UgaGF2ZSBhIHBsYXllciB3aXRoIGEgcmVzdCByZWZlcmVuY2UgZnJhbWUuXHJcbiAgICAvLyAgIC0gVGhlIHBsYXllciBpcyBhbHdheXMgYXQgdGhlIGNlbnRlciBvZiB0aGVpciByZWZlcmVuY2UgZnJhbWUuXHJcbiAgICAvLyAtIFdlIG5lZWQgb2JqZWN0cyB0byBhcHBlYXIgdHJhbnNmb3JtZWQgd2l0aCBhIGxvcmVudHogdHJhbnNmb3JtIHJlbGF0aXZlXHJcbiAgICAvLyAgICAgdG8gdGhlIG9yaWdpbiBvZiB0aGUgcGxheWVyJ3MgcmVmZXJlbmNlIGZyYW1lLlxyXG4gICAgLy8gLSBQSVhJIGhhcyBhIHBpdm90LCB3aGljaCBjaGFuZ2VzIHRoZSBvcmlnaW4gb2Ygcm90YXRpb24sIGJ1dCBub3Qgc2NhbGluZyAvIHNrZXdcclxuICAgIC8vIC0gU28gdG8gZ2V0IHRoZSByaWdodCB0cmFuc2Zvcm1hdGlvbiBhdCB0aGUgcmlnaHQgb3JpZ2luLCB3ZVxyXG4gICAgLy8gICAtIGhhdmUgYSByZWZlcmVuY2UgZnJhbWUgKFBJWEkgY29udGFpbmVyKSB3aG9zZSBvcmlnaW4gaXMgdGhlIHBsYXllcidzIHBvc2l0aW9uXHJcbiAgICAvLyAgIC0gYXBwbHkgdGhlIHRyYW5zZm9ybWF0aW9uIGluIHRoYXQgY29udGFpbmVyXHJcbiAgICAvLyAgIC0gaGF2ZSBhIHNlY29uZCBjb250YWluZXIgaW5zaWRlIGl0IHdob3NlIGNvb3JkaW5hdGVzIGFyZSByZWxhdGl2ZSB0byB0aGUgcGxheWVyJ3MgcG9zaXRpb25cclxuICAgIC8vICAgICAgLSB0aGUgb2JqZWN0cyB0aGVtc2VsdmVzIGhhdmUgcG9zaXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZXNcclxuICAgIC8vICAgICAgLSB0aGUgY29udGFpbmVyIHRoZW4gaGFzIHBvc2l0aW9uIG9mIHRoZSBpbnZlcnNlIG9mIHBsYXllciBwb3NpdGlvblxyXG4gICAgbGV0IHJlbGF0aXZlVmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5XHJcbiAgICAgIC50aW1lcygtMSlcclxuICAgICAgLnJlbGF0aXZpc3RpY1BsdXMob2JzZXJ2ZXJGcmFtZS52ZWxvY2l0eSk7XHJcbiAgICBsZXQgZ2FtbWEgPSByZWxhdGl2ZVZlbG9jaXR5LmdhbW1hKCk7XHJcbiAgICBsZXQgcHJvcGVyRFQgPSBvYnNlcnZlckRUICogZ2FtbWE7XHJcblxyXG4gICAgLy8gVXBkYXRlIGZyYW1lIG9iamVjdHNcclxuICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgIGxldCBvbGREaXN0YW5jZSA9IG8ucG9zaXRpb24ubWludXMob2xkT2JzZXJ2ZXJQb3NpdGlvbikubWFnbml0dWRlKCk7XHJcbiAgICAgIGxldCBuZXdEaXN0YW5jZSA9IG8ucG9zaXRpb24ubWludXMob2JzZXJ2ZXJQb3NpdGlvbikubWFnbml0dWRlKCk7XHJcbiAgICAgIGxldCBkb3BwbGVyRFQgPSAob2xkRGlzdGFuY2UgLSBuZXdEaXN0YW5jZSkgLyBDO1xyXG4gICAgICBvLnVwZGF0ZShwcm9wZXJEVCArIGRvcHBsZXJEVCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPZmZzZXQgZnJhbWUgb2JqZWN0IGNvbnRhaW5lciByZWxhdGl2ZSB0byB0aGUgb2JzZXJ2ZXJcclxuICAgIHRoaXMub2JqZWN0Q29udGFpbmVyLnBvc2l0aW9uLnNldCgtb2JzZXJ2ZXJQb3NpdGlvbi54LCAtb2JzZXJ2ZXJQb3NpdGlvbi55KTtcclxuICAgIHRoaXMubWluaW1hcE9iamVjdENvbnRhaW5lci5wb3NpdGlvbi5zZXQoXHJcbiAgICAgIC1vYnNlcnZlclBvc2l0aW9uLngsXHJcbiAgICAgIC1vYnNlcnZlclBvc2l0aW9uLnlcclxuICAgICk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBsb3JlbnR6IGNvbnRyYWN0aW9uIHRyYW5zZm9ybVxyXG4gICAgdGhpcy50cmFuc2Zvcm0uc2V0RnJvbU1hdHJpeChcclxuICAgICAgcmVsYXRpdmVWZWxvY2l0eS5sb3JlbnR6VHJhbnNmb3JtKCkudG9QaXhpTWF0cml4KClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIHJlYWRvbmx5IHJlZmVyZW5jZUZyYW1lOiBSZWZlcmVuY2VGcmFtZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgb2JqZWN0OiBQaHlzaWNhbE9iamVjdFdpdGhUaHJ1c3QpIHtcclxuICAgIHRoaXMucmVmZXJlbmNlRnJhbWUgPSBuZXcgUmVmZXJlbmNlRnJhbWUob2JqZWN0LnZlbG9jaXR5LCBuZXcgU2V0KFtvYmplY3RdKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUocHJvcGVyRFQ6IG51bWJlcikge1xyXG4gICAgLy8gVGhlIHBsYXllcidzIG9iamVjdCBpcyBhbHdheXMgYXQgdGhlIG9yaWdpbiBpbiBpdHMgb3duIHJlZmVyZW5jZSBmcmFtZS5cclxuICAgIC8vIFRoZSBwbGF5ZXIncyByZWZlcmVuY2UgZnJhbWUgbWF5IG1vdmUgcmVsYXRpdmUgdG8gdGhlIGdhbWUgd29ybGQuXHJcbiAgICB0aGlzLm9iamVjdC51cGRhdGUocHJvcGVyRFQpO1xyXG4gICAgdGhpcy5yZWZlcmVuY2VGcmFtZS52ZWxvY2l0eSA9IHRoaXMub2JqZWN0LnZlbG9jaXR5O1xyXG4gICAgdGhpcy5vYmplY3QucGl4aU9iamVjdC5wb3NpdGlvbi5zZXQoMCwgMCk7XHJcbiAgICB0aGlzLm9iamVjdC5taW5pbWFwT2JqZWN0LnBvc2l0aW9uLnNldCgwLCAwKTtcclxuICAgIHRoaXMucmVmZXJlbmNlRnJhbWUucG9zaXRpb24uc2V0KFxyXG4gICAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi54LFxyXG4gICAgICB0aGlzLm9iamVjdC5wb3NpdGlvbi55XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxubGV0IHBvc01vZCA9ICh4OiBudW1iZXIsIG46IG51bWJlcik6IG51bWJlciA9PiAoKHggJSBuKSArIG4pICUgbjtcclxuXHJcbi8vIFRPRE86IHJlcGxhY2UgdGhpcyB3aXRoIGFjdHVhbCBSZWFjdCBhbmQganVzdCByZW5kZXIgb3ZlciB0aGUgd2ViZ2wgOlBcclxuY2xhc3MgUmVhY3RpdmVUZXh0IHtcclxuICBwdWJsaWMgcGl4aU9iamVjdDogVGV4dDtcclxuICBjb25zdHJ1Y3RvcihyZWFkb25seSB1cGRhdGVUZXh0OiAoKSA9PiBzdHJpbmcsIHN0eWxlID0ge30pIHtcclxuICAgIHRoaXMucGl4aU9iamVjdCA9IG5ldyBUZXh0KFwiXCIsIG5ldyBUZXh0U3R5bGUoeyAuLi5zdHlsZSB9KSk7XHJcbiAgfVxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIC8vIFRPRE86IHRoaXMgY3VycmVudGx5IHVwZGF0ZXMgZXZlcnkgZnJhbWUsIGl0IHNob3VsZCBiZSBhYmxlIHRvIGJlIG1hcmtlZCBhcyBkaXJ0eSBvciBzb21ldGhpbmdcclxuICAgIHRoaXMucGl4aU9iamVjdC50ZXh0ID0gdGhpcy51cGRhdGVUZXh0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBXT1JMRF9EQVRBID0gW1xyXG4gIG5ldyBSZWZlcmVuY2VGcmFtZShuZXcgVmVjdG9yKDAsIDApLCBuZXcgU2V0KFtcclxuICAgIG5ldyBTdGF0aW9uKG5ldyBWZWN0b3IoLTQwMDAsIDApKSxcclxuICAgIG5ldyBTdGF0aW9uKG5ldyBWZWN0b3IoMjUwLCAyNTApKSxcclxuICAgIG5ldyBTdGF0aW9uKG5ldyBWZWN0b3IoNDAwMCwgMCkpLFxyXG4gIF0pKSxcclxuXTtcclxuXHJcblxyXG5jbGFzcyBNaW5pbWFwIGV4dGVuZHMgR3JhcGhpY3Mge1xyXG4gIHB1YmxpYyBvYmplY3RzOiBDb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XHJcbiAgcHJpdmF0ZSB2aWV3cG9ydFdpZHRoOiBudW1iZXJcclxuICBwcml2YXRlIHZpZXdwb3J0SGVpZ2h0OiBudW1iZXJcclxuICBwcml2YXRlIHZpZXdwb3J0T3V0bGluZTogR3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcclxuICBwcml2YXRlIGRyYWdnaW5nVmlld3BvcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgb25WaWV3cG9ydFNlbGVjdDogKHBvc2l0aW9uOiBQSVhJLk9ic2VydmFibGVQb2ludCkgPT4gdm9pZCA9IChwb3NpdGlvbikgPT4gbnVsbDtcclxuXHJcbiAgaW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2NyZWVuOiBQSVhJLlJlY3RhbmdsZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudmlld3BvcnRXaWR0aCA9IHNjcmVlbi53aWR0aDtcclxuICAgIHRoaXMudmlld3BvcnRIZWlnaHQgPSBzY3JlZW4uaGVpZ2h0O1xyXG5cclxuICAgIC8vIERyYXcgYmFja2dyb3VuZCBhbmQgb3V0bGluZVxyXG4gICAgdGhpcy5saW5lU3R5bGUoMywgMHgwMDAwZmYpO1xyXG4gICAgdGhpcy5iZWdpbkZpbGwoMHgwMDAwMDApO1xyXG4gICAgdGhpcy5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBTZXQgdXAgb2JqZWN0cyBjb250YWluZXJcclxuICAgIHRoaXMub2JqZWN0cy5wb3NpdGlvbi5zZXQod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuICAgIHRoaXMub2JqZWN0cy5zY2FsZS5zZXQoTUlOSU1BUF9TQ0FMRSwgTUlOSU1BUF9TQ0FMRSk7XHJcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMub2JqZWN0cyk7XHJcblxyXG4gICAgLy8gU2V0IHVwIG1hc2sgKGRvbid0IGRpc3BsYXkgb2JqZWN0cyBvdXRzaWRlIG9mIG1pbmltYXAgYm91bmRzKVxyXG4gICAgdGhpcy5vYmplY3RzLm1hc2sgPSBuZXcgR3JhcGhpY3MoKVxyXG4gICAgICAuYmVnaW5GaWxsKDB4ZmYzMzAwKVxyXG4gICAgICAuZHJhd1JlY3QoMywgMiwgd2lkdGggLSAzLCBoZWlnaHQgLSAzKVxyXG4gICAgICAuZW5kRmlsbCgpO1xyXG4gICAgLy8gQWRkaW5nIGFzIGEgY2hpbGQgY2F1c2VzIHRoZSBtYXNrJ3MgcG9zaXRpb24gdG8gYmUgcmVsYXRpdmUgdG8gdGhlIE1pbmltYXAnc1xyXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLm9iamVjdHMubWFzayk7XHJcblxyXG4gICAgLy8gU2V0IHVwIHZpZXdwb3J0IG91dGxpbmVcclxuICAgIHRoaXMudmlld3BvcnRPdXRsaW5lLm1hc2sgPSB0aGlzLm9iamVjdHMubWFzaztcclxuICAgIHRoaXMub2JqZWN0cy5hZGRDaGlsZCh0aGlzLnZpZXdwb3J0T3V0bGluZSk7XHJcblxyXG4gICAgLy8gU2V0IHVwIGludGVyYWN0aW9uIGV2ZW50c1xyXG4gICAgdGhpc1xyXG4gICAgICAub24oXCJwb2ludGVyZG93blwiLCB0aGlzLnN0YXJ0RHJhZy5iaW5kKHRoaXMpKVxyXG4gICAgICAub24oXCJwb2ludGVydXBcIiwgdGhpcy5lbmREcmFnLmJpbmQodGhpcykpXHJcbiAgICAgIC5vbihcInBvaW50ZXJvdXRcIiwgdGhpcy5lbmREcmFnLmJpbmQodGhpcykpXHJcbiAgICAgIC5vbihcInBvaW50ZXJtb3ZlXCIsIHRoaXMuZHJhZ01vdmUuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVWaWV3cG9ydCh2ZWxvY2l0eTogVmVjdG9yLCBjZW50ZXI6IFZlY3Rvcikge1xyXG4gICAgLy8gTWFudWFsbHkgdHJhbnNmb3JtIHRoZSB2aWV3cG9ydCBzbyB3ZSBjYW4gY29udHJvbCB0aGUgbGluZSB3aWR0aFxyXG4gICAgbGV0IHsgeCwgeSB9ID0gY2VudGVyO1xyXG4gICAgbGV0IGRlbHRhWCA9IHRoaXMudmlld3BvcnRXaWR0aCAvIDIsXHJcbiAgICAgIGRlbHRhWSA9IHRoaXMudmlld3BvcnRIZWlnaHQgLyAyO1xyXG4gICAgbGV0IGxsID0gbmV3IFZlY3Rvcih4IC0gZGVsdGFYLCB5IC0gZGVsdGFZKSxcclxuICAgICAgbHIgPSBuZXcgVmVjdG9yKHggKyBkZWx0YVgsIHkgLSBkZWx0YVkpO1xyXG4gICAgbGV0IHVsID0gbmV3IFZlY3Rvcih4IC0gZGVsdGFYLCB5ICsgZGVsdGFZKSxcclxuICAgICAgdXIgPSBuZXcgVmVjdG9yKHggKyBkZWx0YVgsIHkgKyBkZWx0YVkpO1xyXG4gICAgbGV0IHRyYW5zZm9ybSA9IHZlbG9jaXR5LmludmVyc2VMb3JlbnR6VHJhbnNmb3JtKCk7XHJcbiAgICBsZXQgdGxsID0gdHJhbnNmb3JtLnRpbWVzVmVjdG9yKGxsKSxcclxuICAgICAgdGxyID0gdHJhbnNmb3JtLnRpbWVzVmVjdG9yKGxyKSxcclxuICAgICAgdHVsID0gdHJhbnNmb3JtLnRpbWVzVmVjdG9yKHVsKSxcclxuICAgICAgdHVyID0gdHJhbnNmb3JtLnRpbWVzVmVjdG9yKHVyKTtcclxuXHJcbiAgICB0aGlzLnZpZXdwb3J0T3V0bGluZVxyXG4gICAgICAuY2xlYXIoKVxyXG4gICAgICAubGluZVN0eWxlKDEgLyBNSU5JTUFQX1NDQUxFLCAweDAwZmYwMClcclxuICAgICAgLm1vdmVUbyh0bGwueCwgdGxsLnkpXHJcbiAgICAgIC5saW5lVG8odGxyLngsIHRsci55KVxyXG4gICAgICAubGluZVRvKHR1ci54LCB0dXIueSlcclxuICAgICAgLmxpbmVUbyh0dWwueCwgdHVsLnkpXHJcbiAgICAgIC5saW5lVG8odGxsLngsIHRsbC55KTtcclxuICB9XHJcblxyXG4gIHN0YXJ0RHJhZyhldmVudDogUElYSS5JbnRlcmFjdGlvbkV2ZW50KSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nVmlld3BvcnQgPSB0cnVlO1xyXG4gICAgdGhpcy5vblZpZXdwb3J0U2VsZWN0KGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBlbmREcmFnKGV2ZW50OiBQSVhJLkludGVyYWN0aW9uRXZlbnQpIHtcclxuICAgIHRoaXMuZHJhZ2dpbmdWaWV3cG9ydCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZHJhZ01vdmUoZXZlbnQ6IFBJWEkuSW50ZXJhY3Rpb25FdmVudCkge1xyXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdWaWV3cG9ydCkgdGhpcy5vblZpZXdwb3J0U2VsZWN0KGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzKSk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAvLyBHYW1lIGRpc3BsYXkgaW5mbyBhbmQgdHJhY2tpbmdcclxuICBwdWJsaWMgd29ybGRMYXllcjogQ29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xyXG4gIHB1YmxpYyBodWQ6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTsgIC8vIFRPRE86IG1ha2UgdGhpcyBSZWFjdCAvIG1vdmUgaXQgb3V0c2lkZSBvZiB3ZWJnbFxyXG4gIHByaXZhdGUgX2RlYnVnSW5mbzogQXJyYXk8UmVhY3RpdmVUZXh0PiA9IFtdO1xyXG4gIHB1YmxpYyBmb2xsb3dpbmdQbGF5ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBwdWJsaWMgbWluaW1hcDogTWluaW1hcDtcclxuICBwdWJsaWMgdmlld3BvcnRQb3NpdGlvbjogVmVjdG9yO1xyXG5cclxuICAvLyBHYW1lIHZpeiBncmlkXHJcbiAgcHJpdmF0ZSBfcGxheWVyR3JpZDogR3JpZCA9IG5ldyBHcmlkKG5ldyBWZWN0b3IoLTEwMDAsIC0xMDAwKSwgbmV3IFZlY3RvcigxMDAwLCAxMDAwKSwgMTAwLCAweDU1NTU1NSk7XHJcbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZUdyaWQ6IEdyaWQgPSBuZXcgR3JpZChuZXcgVmVjdG9yKC0xMDAwLCAtMTAwMCksIG5ldyBWZWN0b3IoMTAwMCwgMTAwMCksIDEwMCwgMHg0NDg4NDQpO1xyXG5cclxuICAvLyBHYW1lIHdvcmxkIHN0YXRlXHJcbiAgcHVibGljIHBsYXllcjogUGxheWVyID0gbmV3IFBsYXllcihcclxuICAgIG5ldyBTaGlwKG5ldyBWZWN0b3IoMjAwMCwgMCksIG5ldyBWZWN0b3IoMC4wMSwgMC4wMykpXHJcbiAgKTtcclxuICBwdWJsaWMgcmVmZXJlbmNlRnJhbWVzOiBBcnJheTxSZWZlcmVuY2VGcmFtZT4gPSBbXTtcclxuICBwdWJsaWMgbGFzdF91cGRhdGVfdGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gIC8vIENvbnN0YW50XHJcbiAgcHVibGljIHRocnVzdF9kZWx0YTogbnVtYmVyID0gNy41O1xyXG5cclxuICAvLyBUT0RPOiBHYW1lIHNob3VsZCBpbnRlcm5hbGx5IG1ha2UgYW5kIG93biB0aGUgQXBwbGljYXRpb25cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwOiBQSVhJLkFwcGxpY2F0aW9uKSB7XHJcbiAgICB0aGlzLndvcmxkTGF5ZXIudHJhbnNmb3JtLnNldEZyb21NYXRyaXgoXHJcbiAgICAgIG5ldyBQSVhJLk1hdHJpeCgpXHJcbiAgICAgICAgLnNjYWxlKFBJWEVMU19QRVJfTUVURVIsIFBJWEVMU19QRVJfTUVURVIpXHJcbiAgICAgICAgLnRyYW5zbGF0ZShhcHAuc2NyZWVuLndpZHRoIC8gMiwgYXBwLnNjcmVlbi5oZWlnaHQgLyAyKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkSFVEKCk7XHJcbiAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQodGhpcy53b3JsZExheWVyKTtcclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZCh0aGlzLmh1ZCk7XHJcbiAgICB0aGlzLndvcmxkTGF5ZXIuYWRkQ2hpbGQodGhpcy5wbGF5ZXIucmVmZXJlbmNlRnJhbWUpO1xyXG4gICAgdGhpcy5taW5pbWFwLm9iamVjdHMuYWRkQ2hpbGQoXHJcbiAgICAgIHRoaXMucGxheWVyLnJlZmVyZW5jZUZyYW1lLm1pbmltYXBPYmplY3RDb250YWluZXJcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy52aWV3cG9ydFBvc2l0aW9uID0gdGhpcy5wbGF5ZXIub2JqZWN0LnBvc2l0aW9uO1xyXG5cclxuICAgIC8vIEFkZCBpbml0aWFsIHdvcmxkIGRhdGFcclxuICAgIFdPUkxEX0RBVEEuZm9yRWFjaCgoZnJhbWUpID0+IHtcclxuICAgICAgdGhpcy5yZWZlcmVuY2VGcmFtZXMucHVzaChmcmFtZSk7XHJcbiAgICAgIC8vIFRoZSB1bml2ZXJzZSBpcyBhbHdheXMgcmVsYXRpdmUgdG8gdGhlIHBsYXllcidzIHJlZmVyZW5jZSBmcmFtZS5cclxuICAgICAgLy8gQWRkIGF0IDAgdG8gZHJhdyB1bmRlciB0aGUgcGxheWVyXHJcbiAgICAgIHRoaXMucGxheWVyLnJlZmVyZW5jZUZyYW1lLmFkZENoaWxkQXQoZnJhbWUsIDApO1xyXG4gICAgICAvLyBUT0RPXHJcbiAgICAgIHRoaXMubWluaW1hcC5vYmplY3RzLmFkZENoaWxkKGZyYW1lLm1pbmltYXBPYmplY3RDb250YWluZXIpO1xyXG4gICAgICAvLyBmcmFtZS5taW5pbWFwT2JqZWN0Q29udGFpbmVyLm1hc2sgPSB0aGlzLm1pbmltYXAub2JqZWN0c19tYXNrO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXIucmVmZXJlbmNlRnJhbWUuYWRkQ2hpbGRBdCh0aGlzLl9wbGF5ZXJHcmlkLCAwKTtcclxuICAgIC8vIHRoaXMucmVmZXJlbmNlRnJhbWVzWzBdIGlzIGNvb3JkaW5hdGUgZnJhbWUgZm9yIG5vdyA6UFxyXG4gICAgdGhpcy5yZWZlcmVuY2VGcmFtZXNbMF0uYWRkQ2hpbGRBdCh0aGlzLl9jb29yZGluYXRlR3JpZCwgMCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEhVRCgpIHtcclxuICAgIHRoaXMuaHVkID0gbmV3IENvbnRhaW5lcigpO1xyXG4gICAgW1xyXG4gICAgICAoKSA9PiBgUG9zaXRpb24gJHt0aGlzLnBsYXllci5vYmplY3QucG9zaXRpb259YCxcclxuICAgICAgKCkgPT5cclxuICAgICAgICBgQmV0YTogJHsodGhpcy5wbGF5ZXIucmVmZXJlbmNlRnJhbWUudmVsb2NpdHkubWFnbml0dWRlKCkgLyBDKS50b0ZpeGVkKFxyXG4gICAgICAgICAgNVxyXG4gICAgICAgICl9Y2AsXHJcbiAgICAgICgpID0+IGBHYW1tYTogJHt0aGlzLnBsYXllci5yZWZlcmVuY2VGcmFtZS52ZWxvY2l0eS5nYW1tYSgpLnRvRml4ZWQoNSl9YCxcclxuICAgICAgKCkgPT4gYFZlbG9jaXR5IGRpcmVjdGlvbjogJHt0aGlzLnBsYXllci5yZWZlcmVuY2VGcmFtZS52ZWxvY2l0eS51bml0KCl9YCxcclxuICAgICAgKCkgPT4gYEFjY2VsZXJhdGlvbjogJHt0aGlzLnBsYXllci5vYmplY3QucHJvcGVyQWNjZWxlcmF0aW9uKCl9YCxcclxuICAgICAgKCkgPT4gYFRpbWU6ICR7dGhpcy5wbGF5ZXIub2JqZWN0LnQudG9GaXhlZCgzKX1gLFxyXG4gICAgXS5mb3JFYWNoKCh1cGRhdGVUZXh0LCBpKSA9PiB7XHJcbiAgICAgIGxldCB0ZXh0ID0gbmV3IFJlYWN0aXZlVGV4dCh1cGRhdGVUZXh0LCB7XHJcbiAgICAgICAgZm9udEZhbWlseTogXCJNYWpvciBNb25vIERpc3BsYXlcIixcclxuICAgICAgICBmaWxsOiAweGZmZmZmZixcclxuICAgICAgICBmb250U2l6ZTogMTUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9kZWJ1Z0luZm8ucHVzaCh0ZXh0KTtcclxuICAgICAgdGV4dC5waXhpT2JqZWN0LnBvc2l0aW9uLnNldCgxMCwgKGkgKyAxKSAqIDIwKTtcclxuICAgICAgdGhpcy5odWQuYWRkQ2hpbGQodGV4dC5waXhpT2JqZWN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBtaW5pbWFwX3dpZHRoID0gdGhpcy5hcHAuc2NyZWVuLndpZHRoIC8gNCxcclxuICAgICAgbWluaW1hcF9oZWlnaHQgPSB0aGlzLmFwcC5zY3JlZW4uaGVpZ2h0IC8gNDtcclxuXHJcbiAgICB0aGlzLm1pbmltYXAgPSBuZXcgTWluaW1hcChtaW5pbWFwX3dpZHRoLCBtaW5pbWFwX2hlaWdodCwgdGhpcy5hcHAuc2NyZWVuKTtcclxuICAgIHRoaXMubWluaW1hcC5wb3NpdGlvbi5zZXQoXHJcbiAgICAgIG1pbmltYXBfd2lkdGggLyAxMCxcclxuICAgICAgdGhpcy5hcHAuc2NyZWVuLmhlaWdodCAtIG1pbmltYXBfaGVpZ2h0IC0gbWluaW1hcF93aWR0aCAvIDEwXHJcbiAgICApO1xyXG4gICAgdGhpcy5taW5pbWFwLm9uVmlld3BvcnRTZWxlY3QgPSAoKHsgeCwgeSB9OiBQSVhJLk9ic2VydmFibGVQb2ludCkgPT4ge1xyXG4gICAgICAvLyBUT0RPOiBtb3ZlIG1hdGggaW50byBNaW5pbWFwXHJcbiAgICAgIHRoaXMudmlld3BvcnRQb3NpdGlvbiA9IG5ldyBWZWN0b3IoXHJcbiAgICAgICAgeCAtIG1pbmltYXBfd2lkdGggLyAyLFxyXG4gICAgICAgIHkgLSBtaW5pbWFwX2hlaWdodCAvIDJcclxuICAgICAgKVxyXG4gICAgICAgIC50aW1lcygxIC8gTUlOSU1BUF9TQ0FMRSlcclxuICAgICAgICAucGx1cyh0aGlzLnBsYXllci5vYmplY3QucG9zaXRpb24pO1xyXG4gICAgICB0aGlzLmZvbGxvd2luZ1BsYXllciA9IGZhbHNlO1xyXG4gICAgfSkuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmh1ZC5hZGRDaGlsZCh0aGlzLm1pbmltYXApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhdGUgPSAoZHQpID0+IHtcclxuICAgIC8vIGR0IGlzIHByb3BlciB0aW1lIGZvciB0aGUgcGxheWVyXHJcbiAgICBsZXQgb2xkUG9zaXRpb24gPSB0aGlzLnBsYXllci5vYmplY3QucG9zaXRpb247XHJcbiAgICB0aGlzLnBsYXllci51cGRhdGUoZHQpO1xyXG5cclxuICAgIGxldCB7IHBvc2l0aW9uLCB2ZWxvY2l0eSB9ID0gdGhpcy5wbGF5ZXIub2JqZWN0O1xyXG4gICAgbGV0IHsgeCwgeSB9ID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy5fZGVidWdJbmZvLmZvckVhY2goKG8pID0+IG8udXBkYXRlKCkpO1xyXG5cclxuICAgIC8vIFdlIHVzZSB0aGUgb2xkIHBvc2l0aW9uIHRvIGNvbXB1dGUgZG9wcGxlciBlZmZlY3RzIGFuZCBvYnNlcnZhdGlvbmFsIGRlbGF5XHJcbiAgICAvLyBUaGUgc2ltdWxhdG9yIG9ubHkgY29tcHV0ZXMgbmV3IHN0YXRlIGFzIG5lZWRlZCBlZy4gYXMgb2JzZXJ2ZWQgYnkgdGhlIHBsYXllclxyXG4gICAgLy8gZ2l2ZW4gZGlzdGFuY2UgdG8gb2JzZXJ2ZWQgb2JqZWN0cyBhbmQgQy5cclxuICAgIHRoaXMucmVmZXJlbmNlRnJhbWVzLmZvckVhY2goKGZyYW1lKSA9PiB7XHJcbiAgICAgIGZyYW1lLnVwZGF0ZShkdCwgdGhpcy5wbGF5ZXIucmVmZXJlbmNlRnJhbWUsIHBvc2l0aW9uLCBvbGRQb3NpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5mb2xsb3dpbmdQbGF5ZXIpIHRoaXMudmlld3BvcnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgbGV0IGNvbnRyYWN0ZWRWaWV3cG9pbnQgPSB2ZWxvY2l0eVxyXG4gICAgICAubG9yZW50elRyYW5zZm9ybSgpXHJcbiAgICAgIC50aW1lc1ZlY3Rvcih0aGlzLnZpZXdwb3J0UG9zaXRpb24ubWludXMocG9zaXRpb24pKVxyXG4gICAgICAucGx1cyhwb3NpdGlvbik7XHJcblxyXG4gICAgLy8gVXBkYXRlIFVJIHdpdGggdGhlIG5ldyBwbGF5ZXIgcG9zaXRpb24gYW5kIHZpZXdwb2ludFxyXG4gICAgdGhpcy53b3JsZExheWVyLnBpdm90LnNldChjb250cmFjdGVkVmlld3BvaW50LngsIGNvbnRyYWN0ZWRWaWV3cG9pbnQueSk7XHJcbiAgICB0aGlzLm1pbmltYXAudXBkYXRlVmlld3BvcnQodmVsb2NpdHksIGNvbnRyYWN0ZWRWaWV3cG9pbnQubWludXMocG9zaXRpb24pKTtcclxuICAgIHRoaXMuX3BsYXllckdyaWQuc2V0UG9zaXRpb24oY29udHJhY3RlZFZpZXdwb2ludC50aW1lcygtMSkpO1xyXG4gICAgdGhpcy5fY29vcmRpbmF0ZUdyaWQuc2V0UG9zaXRpb24oY29udHJhY3RlZFZpZXdwb2ludC50aW1lcygtMSkpO1xyXG4gIH07XHJcbiAgdGljayA9ICgpID0+IHtcclxuICAgIGxldCB0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKCh0IC0gdGhpcy5sYXN0X3VwZGF0ZV90aW1lKSAvIDEwMDApO1xyXG4gICAgdGhpcy5sYXN0X3VwZGF0ZV90aW1lID0gdDtcclxuICB9O1xyXG4gIGhhbmRsZUtleURvd24gPSAoeyBjb2RlIH0pID0+IHtcclxuICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICBjYXNlIFwiS2V5V1wiOlxyXG4gICAgICAgIHRoaXMucGxheWVyLm9iamVjdC50aHJ1c3QgPSB0aGlzLnRocnVzdF9kZWx0YTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIktleVNcIjpcclxuICAgICAgICB0aGlzLnBsYXllci5vYmplY3QudGhydXN0ID0gLXRoaXMudGhydXN0X2RlbHRhO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiS2V5QVwiOlxyXG4gICAgICAgIHRoaXMucGxheWVyLm9iamVjdC5hbmd1bGFyVmVsb2NpdHkgPSAtMztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIktleURcIjpcclxuICAgICAgICB0aGlzLnBsYXllci5vYmplY3QuYW5ndWxhclZlbG9jaXR5ID0gMztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIlNwYWNlXCI6XHJcbiAgICAgICAgdGhpcy5mb2xsb3dpbmdQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGFuZGxlS2V5VXAgPSAoeyBjb2RlIH0pID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGNvZGUpO1xyXG4gICAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICAgIGNhc2UgXCJLZXlXXCI6XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIub2JqZWN0LnRocnVzdCA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJLZXlTXCI6XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIub2JqZWN0LnRocnVzdCA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJLZXlBXCI6XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIub2JqZWN0LmFuZ3VsYXJWZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJLZXlEXCI6XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIub2JqZWN0LmFuZ3VsYXJWZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfTtcclxuICBoYW5kbGVLZXlQcmVzcyA9ICh7IGtleSwgY29kZSB9KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5sZXQgc2V0dXAgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxyXG4gICAgV2ViRm9udC5sb2FkKHtcclxuICAgICAgZ29vZ2xlOiB7IGZhbWlsaWVzOiBbXCJNYWpvciBNb25vIERpc3BsYXlcIl0gfSxcclxuICAgICAgYWN0aXZlOiAoKSA9PiByZXNvbHZlKG51bGwpLFxyXG4gICAgfSlcclxuICApO1xyXG59O1xyXG5cclxubGV0IG1haW4gPSAoKSA9PiB7XHJcbiAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKHtcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiAweDE5MTkxOSxcclxuICAgIGFudGlhbGlhczogdHJ1ZSxcclxuICB9KTtcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcclxuXHJcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZShhcHApO1xyXG4gIC8vIENhbiBhbHNvIGp1c3QgdXNlIHNldFRpbWVvdXQgYnV0IHVzaW5nIGFwcC50aWNrZXIgaW4gY2FzZSB0aGF0J3MgYmV0dGVyIGZvciBmcmFtZSBzb21ldGhpbmcgc29tZXRoaW5nXHJcbiAgYXBwLnRpY2tlci5hZGQoZ2FtZS50aWNrKTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZ2FtZS5oYW5kbGVLZXlQcmVzcyk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZ2FtZS5oYW5kbGVLZXlEb3duKTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZ2FtZS5oYW5kbGVLZXlVcCk7XHJcbn07XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBzZXR1cCgpLnRoZW4obWFpbikpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=