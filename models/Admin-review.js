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
      q1: { type: Types.Number, label: 'Points'}
    }
}, 'Content', {
    questionaire2: {
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
}, 'Design', {
    questionaire3: {
      q1: { type: Boolean, label: 'Ulkoasu toimii työpöytä resoluutiolla (min: 00 x 00)' },
      q2: { type: Boolean, label: 'Ulkoasu toimii mobiiliresoluutiolla (max: 00 x 00)' },
      q3: { type: Boolean, label: 'Mobiiliresoluutiolla näkyy sama sisältö kuin työpöytäversiolla' },
      q4: { type: Boolean, label: 'Ulkoasussa vähintään kaksi elementtiä: otsake (navi + otsikko) ja sisältö' },
      q5: { type: Boolean, label: 'Etusivulta löytyy ylläpitäjän nimimerkki ja sähköpostiosoite' },
      q6: { type: Boolean, label: 'Jokaiselta sivulta löytyy ylläpitäjän nimimerkki ja sähköpostiosoite' },
      q7: { type: Boolean, label: 'Etusivulla mainintaan "virtuaalitalli"' },
      q8: { type: Boolean, label: 'Jokaisella sivulla mainitaan "virtuaalitalli"' },
      q9: { type: Boolean, label: 'Hevosen sivulla mainintaan "virtuaalihevonen"' },
      q10: { type: Boolean, label: 'Navigaatio löytyy helposti' },
      q11: { type: Boolean, label: 'Navigaation linkit kuvaavia ja ne toimivat ' },
      q12: { type: Boolean, label: 'Sisältöosuudella tarpeeksi leveä alue, mutta se ei levähdä koko resuluution mittaiseksi ' },
      q13: { type: Boolean, label: 'Jos sivu on pitkä löytyy vähintään sivun alaosasta "takaisin ylös" linkki' },
      q14: { type: Boolean, label: 'Design tasapainoinen' },
      q15: { type: Boolean, label: 'Grafiikka laadultaan hyvä, ei pikselöintiä havaittavissa' },
      q16: { type: Boolean, label: 'Mahdollisista koristekuvista löytyy klikatessa isomman resoluution versio' },
      q17: { type: Boolean, label: 'Sivu latautumisaika on alle 10s (yhteyden nopeus)' },
      q18: { type: Boolean, label: 'Sivu latautumisaika on alle 10s (3G nopeudella)' }

    }
}, 'Activity', {
    questionaire4: {
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
