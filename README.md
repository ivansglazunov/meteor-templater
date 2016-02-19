# Templater

```js
meteor add ivansglazunov:templater
```

Link collection some templates.

## Documentation

### collection.defaultTemplate
> type: String, template: String

Register default template name for type

```js
collection.defaultTemplate('test', 'Default');
```

### collection.getTemplate
> type: String

Learn how to use the template for the document.

```js
var document = collection.findOne();
document.getTemplate('test'); // "Default"
```

### collection.useTemplate
> type: String, template: (document: Object, type: String, collection: Mongo.Collection) => String

Register link of the collection to the template.

```js
collection.useTemplate('test', function(document, type, collection) {
    return 'OtherTemplate';
});
document.getTemplate('test'); // "OtherTemplate"
```

### Flow

If you call the function several times, it will add a few templates.

```js
collection.useTemplate('abc', function(document, type, collection) {
    return '1';
});
collection.useTemplate('abc', function(document, type, collection) {
    if (document._id == '123') return '2';
});
collection.useTemplate('abc', function(document, type, collection) {
    if (document._id == '456') return '3';
});
collection.useTemplate('abc', function(document, type, collection) {
    if (this.result == '2') return '4';
});
collection.findOne('666').getTemplate('abc'); // "1"
collection.findOne('123').getTemplate('abc'); // "4"
collection.findOne('456').getTemplate('abc'); // "3"
```

### {{>Templater}}
> document: Document type: String

Use this in your templates

```html
<template name="OtherTemplate">
1
{{#if UI.contentBlock}}{{> UI.contentBlock}}{{/if}}
3
</template>
```

```html
{{>Templater document=document type='test'}}
{{#Templater document=document type='test'}}
2
{{/Templater}}
```

Result:
```html
13123
```

#### Arguments

```html
<template name="OtherTemplate">
{{z}}
</template>
```

```html
{{>Templater document=document type='test' z="All arguments available in the template."}}
```

Result:
```html
All arguments available in the template.
```

## Versions

### 0.0.2
* Added flow and defaults

### 0.0.1
* Added template order array