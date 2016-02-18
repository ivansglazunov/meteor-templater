# Templater

```js
meteor add ivansglazunov:templater
```

Link collection some templates.

## Documentation

### collection.useTemplate
> type: String, template: (document: Object, type: String, collection: Mongo.Collection) => String

Register link of the collection to the template.

```js
collection.useTemplate('test', function(document, type, collection) {
    return 'OtherTemplate';
});
```

### collection.getTemplate
> type: String

Learn how to use the template for the document.

```js
var document = collection.findOne();
document.getTemplate('test'); // "OtherTemplate"
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