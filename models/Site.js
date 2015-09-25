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
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Site.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Site.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Site.register();
