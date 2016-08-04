# EVE Formulae Book

> EVE related formulae for Google Spreadsheets.

- Last update on August 4, 2016
- EVE YC 118.7
- Market data from [EVE-Central](https://eve-central.com)

## Disclaimer

The add-on and the external services it depends on are not guaranteed to work 100% of the time. They might cease to exist without notice, and the data provided might not be reliable.

All the effort I put here is pro-bono. If you feel like something's not right, missing or have any feedback you can contact me at hagg3n at gmail dot com, but I can't guarantee I'll respond in time or at all.

Meanwhile enjoy.

## Usage

[Get the add-on](http://) then open your spreadsheet and choose the menu option **Add-ons** &rarr; **EVE Formulae Book** &rarr; **Use in this spreadsheet**. Now you can start typing `=EVE` in any cell to see a list of all formulas available to you.

## Formulae

You can check out below all the formulas you'll have by using this add-on.

### EVEMARKET

#### Example

```
=EVEMARKET("max", "buy", "any", "Veldspar", "Verge Vendor")
```

#### Arguments

1. The value you're looking for, accepts "min" for minimum price, "max" for maximum price, or "avg" for average price.
2. The order bid, accepts "buy", "sell", or "all" for both.
3. Minimum order volume for it to be included. Accepts a number, or "any" for any amount.
4. Exact name of the item. e.g. "Veldspar", "Retriever", "1MN Microwarpdrive I"
5. Optional. Exact name of the region or solar system. e.g. "Sinq Laison", "The Forge", "Jita", "Trossere". If it's not provided the result include orders from all regions.

## License

```
The MIT License (MIT)
Copyright (c) 2016 Arthur Corenzan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
