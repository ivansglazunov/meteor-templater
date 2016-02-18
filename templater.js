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
    
    // (type: String, template: (document: Object, type: String, collection: Mongo.Collection) => String)
    collection.useTemplate = function(type, template) {
        if (!(type in collection._templates)) {
            collection._templates[type] = [];
        }
        if (typeof(template) != 'function') {
            throw new Meteor.Error('Template must be a function');
        }
        collection._templates[type].push(template);
    };
    
    collection.helpers({
        
        // (type: String)
        getTemplate: function(type) {
            for (var t = collection._templates[type].length - 1; t >= 0; t--) {
                var result = collection._templates[type][t](this, type, collection);
                if (result) return result;
            }
            throw new Meteor.Error('The template with type '+type+' was not returned for document '+JSON.stringify({ id: this._id, collection: collection._name }));
        }
    });
});