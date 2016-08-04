/**
* EVE Formulae Book
* Version 2.0.0 August 4, 2016
* More on https://github.com/haggen/eve-formulae-book
*/

function onInstall() {
  onOpen();
}

function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Use in this spreadsheet', 'use').addToUi();
}

function use() {
  var title   = "EVE Formulae Book";
  var message = "Congratulations capsuleer, your Formulae Book is ready to use, you can find more information choosing the menu option Add-ons &rarr; EVE Formulae Book &rarr; Help. \n\nFly safe.";

  var ui = SpreadsheetApp.getUi();

  ui.alert(title, message, ui.ButtonSet.OK);
}

//-

var FormulaeBook = {};

FormulaeBook.uri = 'https://eve-capsuleers-formulae-book.herokuapp.com';

FormulaeBook.fetch = function(path, params) {
  var cache = CacheService.getUserCache();

  var uri = this.uri + path + '?';

  for(var key in params) {
    if(params.hasOwnProperty(key)) {
      uri += key + '=' + encodeURIComponent(params[key]) + '&';
    }
  }

  uri = uri.replace(/[?&]$/, '');

  var response = cache.get(uri);

  if(!response) {
    response = UrlFetchApp.fetch(uri);

    if(response.getResponseCode() === 200) {
      response = response.getContentText();
      cache.put(uri, response, 60);
    } else {
      response = null;
    }

    Utilities.sleep(1000);
  }

  return response && JSON.parse(response);
};

/**
* Fetch the minimum, maximum or average price of an item, optionally, in a specific region or solar system.
*
* @param {"max"} value The value you're looking for, accepts "min" for minimum price, "max" for maximum price, or "avg" for average price.
* @param {"buy"} bid The type of the order, accepts "buy", "sell", or "all" for both types.
* @param {10000} minimum Minimum order volume for it to be included. Accepts a number, or "any" for any amount.
* @param {"Veldspar"} item Exact name of the item.
* @param {"Jita"} location Optional. Exact name of the region or solar system.
* @return {"14.6"} Price information of the item if it's found, 0 otherwise.
*
* @customfunction
*/
function EVEMARKET(value, bid, minimum, item, location) {
  var response = FormulaeBook.fetch('/market', {item: item, minimum: minimum, location: location});
  return response ? response[bid][value] : 0;
}
