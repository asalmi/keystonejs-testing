var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  // Init locals
  locals.section = 'participant';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    posts: [],
    categories: []
  };
    
  
  // Load the posts
  view.on('init', function(next) {
    
    var q = keystone.list('Participant').paginate({
        page: req.query.page || 1,
        perPage: 10,
        maxPages: 10
      })
      .where('state', 'published')
      .sort('-publishedDate')
      .populate('author categories');
    
    if (locals.data.category) {
      q.where('categories').in([locals.data.category]);
    }
    
    q.exec(function(err, results) {
      locals.data.participant = results;
      next(err);
    });
    
  });
  
  // Render the view
  view.render('participants');
  
};
