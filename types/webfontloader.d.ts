declare module "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" {
    // webfontloader uses export = syntax, see
    // https://stackoverflow.com/questions/41892470/how-to-reexport-from-a-module-that-uses-export
    import WebFont = require('webfontloader');
    export default WebFont;
}