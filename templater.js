if (Meteor.isClient) {
    Template.Templater.helpers({
        template: function() {
            if (typeof(this.document) != 'object' || !('getTemplate' in this.document)) {
                throw new Meteor.Error('Invalid document: '+JSON.stringify(this.document));
            }
            return this.document.getTemplate(this.type);
        },
        data: function() {
            var data = lodash.clone(this);
            delete data.type;
            return data;
        }
    });
}

CollectionExtensions.addExtension(function (name, options) {
    var collection = this;
    
    collection._templates = {};
    
    // (type: String, template: String)
    collection.defaultTemplate = function(type, template) {
        if (!(type in collection._templates)) {
            collection._templates[type] = {
                flow: [],
                default: undefined
            }
        }
        if (typeof(template) != 'string') {
            throw new Meteor.Error('Template must be a string');
        }
        collection._templates[type].default = template;
    };
    
    // (type: String, template: (document: Object, type: String, collection: Mongo.Collection) => String)
    collection.useTemplate = function(type, template) {
        if (!(type in collection._templates)) {
            collection._templates[type] = {
                flow: [],
                default: undefined
            }
        }
        if (typeof(template) != 'function') {
            throw new Meteor.Error('Template must be a function');
        }
        collection._templates[type].flow.push(template);
    };
    
    collection.helpers({
        
        // (type: String)
        getTemplate: function(type) {
            if (type in collection._templates) {
                var context = { result: collection._templates[type].default };
                for (var t = collection._templates[type].flow.length - 1; t >= 0; t--) {
                    var result = collection._templates[type].flow[t].call(context, this, type, collection);
                    if (result) context.result = result;
                }
                return context.result;
            }
            throw new Meteor.Error('The template with type '+type+' was not returned for document '+JSON.stringify({ id: this._id, collection: collection._name }));
        }
    });
});