var Obj = function(a, b) {
       this.x = a;
       this.y = b;
   }
   Obj.prototype.add = function(z) {
       return this.x + this.y + z;
   }
   var o = new Obj(1, 2);
   console.log(o.add(3)); //控制台将输出6。
   function wrap(obj, meth) {
       //obj: 需hook的原型对象
       //meth：需hook的原型属性名
       var orig = obj[meth];
       obj[meth] = function wrapper() {
           console.log("function start execute.");
           var res = orig.apply(this, arguments);
           console.log("functionfinish execute");
           return res;
       }
   }
   var o = new Obj(1, 2);
   wrap(Obj.prototype, 'add');
   console.log(o.add(3)); //控制台将输出6。