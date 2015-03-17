'use strict';

///////////////////////////////////////////////////////////////////////////////
// Scalar
///////////////////////////////////////////////////////////////////////////////
function Scalar(s){
  if(!(this instanceof Scalar)){ return new Scalar(s); }

  this.s = s;
}
Scalar.times = function(s, v){
  return new Vector2(s.s * v.dx, s.s * v.dy);
};
Scalar.plus  = function(s1,s2){
  return new Scalar(s1.s + s2.s);
};
Scalar.prototype.times = function(v){ return Scalar.times(this, v); };
Scalar.prototype.plus  = function(s){ return Scalar.plus(this, s);  };

///////////////////////////////////////////////////////////////////////////////
// Point
///////////////////////////////////////////////////////////////////////////////
function Position2(x,y){
  if(!(this instanceof Position2)){ return new Position2(x,y); }

  this.x = x;
  this.y = y;
}
Position2.origin = new Position2(0,0);
Position2.equals = function(p1, p2){
  return p1.x === p2.x && p1.y === p2.y;
};
Position2.offset = function(p, v){
  return new Position2(p.x + v.dx, p.y + v.dy);
};
Position2.prototype.equals     = function(p2){ return Position2.equals(this, p2); };
Position2.prototype.offset     = function(v){  return Position2.offset(this, v);  };
Position2.prototype.getOffset  = function(p2){ return Vector2.fromTo(p2, this);   };

///////////////////////////////////////////////////////////////////////////////
// Vector
///////////////////////////////////////////////////////////////////////////////
function Vector2(dx,dy){
  if(!(this instanceof Vector2)){ return new Vector2(dx, dy); }

  this.dx = dx;
  this.dy = dy;
}
Vector2.zero = new Vector2(0,0);
Vector2.equals = function(v1, v2){
  return v1.dx === v2.dx && v1.dy === v2.dy;
};
Vector2.plus = function(v1,v2){
  return new Vector2(v1.dx + v2.dx, v1.dy + v2.dy);
};
Vector2.times = function(v,s){
  return Scalar.times(s,v);
};
Vector2.dot = function(v1,v2){
  return v1.dx*v2.dx + v1.dy*v2.dy;
};
Vector2.magnitude = function(v){
  return Math.sqrt(Vector2.dot(v,v));
};
Vector2.unit      = function(v){
  var mag = Vector2.magnitude(v);
  return new Vector2(v.dx / mag, v.dy / mag);
};
Vector2.fromTo = function(p1, p2){
  return new Vector2(p2.x - p1.x, p2.y - p1.y);
};
Vector2.rotate = function(v,r){
  var cos = Math.cos(r);
  var sin = Math.sin(r);
  return new Vector2(v.dx*cos - v.dy*sin, v.dx*sin + v.dy*cos);
};
Vector2.fromRotation = function(r){
  var cos = Math.cos(r);
  var sin = Math.sin(r);
  return new Vector2(cos, sin);
};
Vector2.prototype.equals    = function(v2){ return Vector2.equals(this, v2); };
Vector2.prototype.plus      = function(v2){ return Vector2.plus(this, v2);   };
Vector2.prototype.times     = function(s){  return Vector2.times(this, s);   };
Vector2.prototype.dot       = function(v2){ return Vector2.dot(this, v2);    };
Vector2.prototype.magnitude = function(){   return Vector2.magnitude(this);  };
Vector2.prototype.normalize = function(){   return Vector2.unit(this);       };
Vector2.prototype.rotate    = function(s){  return Vector2.rotate(this, s);  };

//Exports:
module.exports    = {};
module.exports.S  = module.exports.Scalar    = Scalar;
module.exports.P2 = module.exports.Position2 = Position2;
module.exports.V2 = module.exports.Vector2   = Vector2;