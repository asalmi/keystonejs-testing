var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Node Model
 * ==========
 */

var Node = new keystone.List('Node', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Node.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  content: {
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  }
});

Node.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Node.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Node.register();
