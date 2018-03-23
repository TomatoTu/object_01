function sortBy(key,desc) {
  return function(a,b){
    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}

/**
 * Expose `sortBy`
 * @type {Function}
 */
module.exports = sortBy;