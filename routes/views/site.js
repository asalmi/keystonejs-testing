var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  // Set locals
  locals.section = 'site';
  locals.filters = {
    post: req.params.post
  };
  locals.data = {
    reviews: []
  };
  
  // Load the current post
  view.on('init', function(next) {
    
    var q = keystone.list('Site').model.findOne({
      state: 'published',
      slug: locals.filters.post
    }).populate('author');
    
    q.exec(function(err, result) {
      locals.data.post = result;
      next(err);
    });
    
  });

  view.on('init', function(next) {
    
    //keystone.list('Site').model.find().populate('all_reviews').exec(function(err, results) {
    keystone.list('Review').model.find().where('site_reviewed', locals.data.post.id ).sort('name').exec(function(err, results) {  

      locals.data.reviews = results;

      //console.log(results);

      next(err);

    });
    
  });
    
  // Render the view
  view.render('site');
  
};
