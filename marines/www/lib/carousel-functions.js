var Point = function(x, y) {
  return {
    x: x,
    y: y,
    parse: function(a){ return angular.isNumber(a) ? Point(a, a) : a; },
    add:      function(p){ p = this.parse(p); return Point(this.x + p.x, this.y + p.y)},
    subtract: function(p){ p = this.parse(p); return Point(this.x - p.x, this.y - p.y)},
    multiply: function(p){ p = this.parse(p); return Point(this.x * p.x, this.y * p.y)},
    divide:   function(p){ p = this.parse(p); return Point(this.x / p.x, this.y / p.y)},
    modulo:   function(p){ p = this.parse(p); return Point(this.x % p.x, this.y % p.y)},
    abs: function(){ return Point(Math.abs(this.x), Math.abs(this.y)); },
    clone: function(){ return Point(this.x, this.y); },
  };
};

var Size = function(width, height) {
  return {
    width: width,
    height: height,
    parse: function(a){ return angular.isNumber(a) ? Size(a, a) : a; },
    add:      function(size){ size = this.parse(size); return Size(this.width + size.width, this.height + size.height); },
    subtract: function(size){ size = this.parse(size); return Size(this.width - size.width, this.height - size.height); },
    multiply: function(size){ size = this.parse(size); return Size(this.width * size.width, this.height * size.height); },
    divide:   function(size){ size = this.parse(size); return Size(this.width / size.width, this.height / size.height); },
    modulo:   function(size){ size = this.parse(size); return Size(this.width % size.width, this.height % size.height); },
    abs: function(){ return Size(Math.abs(this.width), Math.abs(this.height)); },
    clone: function(){ return Size(this.width, this.height); },
    toPoint: function(){ return Point(this.width, this.height); },
  };
};

var Rectangle = function(topLeft, size) {
  return {
    topLeft: topLeft,
    size: size,
    getCenter: function(){ return Point(this.topLeft.x + this.size.width * 0.5, this.topLeft.y + this.size.height * 0.5); },
    setCenter: function(p){
      this.topLeft.x = p.x - this.size.width * 0.5;
      this.topLeft.y = p.y - this.size.height * 0.5;
    },
    getBottomRight: function(){ console.log(this.topLeft, this.size);
                               return this.topLeft
                               .add(
                                 this.size
                                 .toPoint()
                               ); 
                              },
    clone: function(){ return Rectange(this.topLeft.clone(), this.size.clone()); },
  }
}


var clamp = function (num, min, max) {
  return Math.min(Math.max(num, min), max);
};

var clampPoint = function (pt, min, max) {
  pt.x = clamp(pt.x, min.x, max.x);
  pt.y = clamp(pt.y, min.y, max.y);
  return pt;
};

