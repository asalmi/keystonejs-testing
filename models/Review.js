var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Review Model
 * ==========
 */

var Review = new keystone.List('Review', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Review.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  site_reviewed: { type: Types.Relationship, ref: 'Site', index: true, many: true },
  publishedDate: { type: Types.Date, index: true},
  content: {
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  }
});

Review.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

/**
 * Relationships
 */

Review.relationship({ ref: 'Site', path: 'sites', refPath: 'all_reviews' });


Review.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Review.register();
