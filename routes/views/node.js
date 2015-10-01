var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  // Set locals
  locals.section = 'node';
  locals.filters = {
    node: req.params.node
  };
  locals.data = {
    nodes: []
  };

    // Load the current post
  view.on('init', function(next) {
    
    var q = keystone.list('Node').model.findOne({
      state: 'published',
      slug: locals.filters.node
    }).populate('author');
    
    q.exec(function(err, result) {
      locals.data.node = result;
      next(err);
    });
    
  });
    
  // Render the view
  view.render('node');
  
};
