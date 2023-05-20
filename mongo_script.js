db.articles.aggregate([ 
  {
    $set: {
    date: {
        $dateFromString: {
          dateString: "$date"
        }
      }
    }
  },
  {
    $out: "articles_formatted"
  }
]);
