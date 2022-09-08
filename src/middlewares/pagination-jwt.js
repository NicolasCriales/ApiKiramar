function paginatedResults(result) {
    // middleware function
    return (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
   
      // calculating the starting and ending index
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      console.log(endIndex,startIndex);
      console.log(  result);
      console.log(endIndex < result.length);
      const results = {};
      if (endIndex < result.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
   
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
   
      results.results = result.slice(startIndex, endIndex);
   
      res.paginatedResults = results;
      next();
    };
  }


module.exports = {
    paginatedResults,
}
