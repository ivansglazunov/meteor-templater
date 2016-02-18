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
    var templates = {};
    
    var collection = this;
    
    // (type: String, template: (document: Object, type: String, collection: Mongo.Collection) => String)
    collection.useTemplate = function(type, template) {
        if (type in templates) {
            throw new Meteor.Error('Template with type '+type+' already defined');
        }
        if (typeof(template) != 'function') {
            throw new Meteor.Error('Template must be a function');
        }
        templates[type] = template;
    };
    
    collection.helpers({
        
        // (type: String)
        getTemplate: function(type) {
            return templates[type](this, type, collection);
        }
    });
});