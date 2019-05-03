# Requirements
* HTML of markdown already rendered
* CSS of [yaposi](https://github.com/johnbalvin/yaposi) preview
     * https://storage.googleapis.com/yaposi/release/1.2/preview.css
* [prettify.js](https://storage.googleapis.com/yaposi/prettify/prettify.js)
* Pick any CSS style from 
[prettify](https://github.com/google/code-prettify) and add it to your HTML
  * [desert](https://storage.googleapis.com/yaposi/prettify/styles/desert.css)
  * [doxy](https://storage.googleapis.com/yaposi/prettify/styles/doxy.css)
  * [sons-of-obsidian](https://storage.googleapis.com/yaposi/prettify/styles/sons-of-obsidian.css)
  * [sunburst](https://storage.googleapis.com/yaposi/prettify/styles/sunburst.css)

### Usage
* Put all HTML rendered into a wrapper with class "yaposi-preview"

* Call  `PR.prettyPrint()` when page is loaded
 ### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Example Yaposi preview</title>
  <link rel="stylesheet" href="https://storage.googleapis.com/yaposi/release/1.2/preview.css">
  <link rel="stylesheet" href="https://storage.googleapis.com/yaposi/prettify/styles/sunburst.css">
  <script type="module">
      import {PR} from 'https://storage.googleapis.com/yaposi/prettify/prettify.js';
      PR.prettyPrint()
  </script>
  </head>
  <body>
     <div class="yaposi-preview">
    <!--- 
        HTML rendered
      -->
     </div>
  </body>
</html>
```