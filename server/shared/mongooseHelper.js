const aggregateFacetGenerator = (skip, limit) => {
  return {
    "items": [{ "$skip": skip }, { "$limit": limit }],
    "total": [{ "$count": "count" }]
  }
}


const aggregateResultWithCountParser = (result) => {
  let items = 0
  let totalCount = 0
  if (result.length) {
    if ('items' in result[0]) {
      items = result[0].items;
    }
    if ('total' in result[0]) {
      if (result[0].total.length && 'count' in result[0].total[0]) {
        totalCount = result[0].total[0].count;
      }
    }
  }
  return {
    items,
    totalCount
  }
};


module.exports = {
  aggregateFacetGenerator,
  aggregateResultWithCountParser,
};
