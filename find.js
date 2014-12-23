Array.prototype.find = function(fn, i) {
  i = i === undefined ? 0 : i;

  if(fn(this[i])) {
    return this[i];
  } else {
    return this.length - 1 > i ? this.find(fn, i + 1) : null;
  }
};
