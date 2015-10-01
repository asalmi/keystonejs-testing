var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Site Model
 * ==========
 */

var Site = new keystone.List('Site', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Site.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	category: { type: String },
	site_url: { type: Types.Url, label: 'Site URL' },
	//all_reviews: { type: Types.Relationship, ref: 'Review', index: true },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

/**
 * Virtuals
 * ========
 */

Site.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

/**
 * Relationships
 */

//Site.relationship({ ref: 'Review', path: 'reviews', refPath: 'site_reviewed' });


Site.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Site.register();
