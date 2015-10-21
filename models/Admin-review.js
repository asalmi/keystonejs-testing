var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Admin review Model
 * ==========
 */

var AdminReview = new keystone.List('Admin review', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

AdminReview.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  site_reviewed: { type: Types.Relationship, ref: 'Site', index: true, many: true, label: 'Site reviewed' },
  publishedDate: { type: Types.Date, index: true},

}, 'First impression', {
    questionaire1: {
      q1: { type: Boolean, label: 'Tekstit hyvää yleiskieltä' },
      q2: { type: Boolean, label: 'Sisältöä jaoteltu ja rytmitetty kappaleilla ja otsikoilla' },
      q3: { type: Boolean, label: 'Tekstiä on helppo lukea' },
      q4: { type: Boolean, label: 'Tekstiä jaksaa lukea, sitä ei ole liikaa' },
      q5: { type: Boolean, label: 'Ei suuria kirjoitusvirheitä' },
      q6: { type: Boolean, label: 'Ei asiavirheitä' },
      q7: { type: Boolean, label: 'Tekstiä on elävöitetty korostamalla, alleviivaamalla tai muulla tavalla' },
      q8: { type: Boolean, label: 'Tektstit ei sisällä hymiöitä' },
      q9: { type: Boolean, label: 'Tekstit ei sisällä karkeaa kieltä (kiroilua, K18 materliaalia jne.)' },
      q10: { type: Boolean, label: 'Tallin sivuilta ei löydy "lorem ipsumia" tai muuta täytesisältöä (myös hevoslistausten "tyhjä kuva")' },
      q11: { type: Boolean, label: 'Arvostelija ei eksynyt "404 Not found" sivulle' },
    }
}, 'Content', {
    questionaire2: {
      q1: { type: Boolean, label: 'plaa' }
    }
}, 'Summary', {
    content: {
      extended: { type: Types.Html, wysiwyg: true, height: 400 },
    }
});


AdminReview.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

/**
 * Relationships
 */

//AdminReview.relationship({ ref: 'Site', path: 'sites', refPath: 'all_reviews' });


AdminReview.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
AdminReview.register();
