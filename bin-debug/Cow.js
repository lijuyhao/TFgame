var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// TypeScript file
var Cow = (function (_super) {
    __extends(Cow, _super);
    function Cow() {
        var _this = _super.call(this) || this;
        _this._speed = 0.5;
        _this.direction = "";
        _this.addChild(new egret.Bitmap(RES.getRes('cow_png')));
        return _this;
    }
    Cow.prototype.onUpdate = function (passTime) {
        this.Path = [
            new egret.Point(470, 244),
            new egret.Point(470, 427),
            new egret.Point(657, 427),
            new egret.Point(1135, 248),
            new egret.Point(1135, 360)
        ];
        this.move(passTime);
    };
    Cow.prototype.GetDistance = function (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        //坐标轴上两点的距离 (x1-x2)平方  (y1-y2)平方  开根号
    };
    Cow.prototype.GetSpeed = function (targetP2, currentP1, SpeedNum) {
        var speed = new egret.Point(); //speed 设置为一个点
        var hypotenuse = this.GetDistance(targetP2, currentP1); //两点的距离
        if (hypotenuse == 0) {
            speed.x = 0;
            speed.y = 0;
            return speed;
        }
        speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
        speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
        return speed;
    };
    Cow.prototype.setDirection = function (p) {
        var xNum = p.x - this.x;
        var yNum = p.y - this.y;
        var tempDirection;
        if (xNum == 0) {
            if (yNum > 0) {
                tempDirection = "down";
            }
            if (yNum < 0) {
                tempDirection = "up";
            }
        }
        if (yNum == 0) {
            if (xNum > 0) {
                tempDirection = "right";
            }
            if (xNum < 0) {
                tempDirection = "left";
            }
        }
        if (tempDirection != this.direction) {
            this.direction = tempDirection;
            this.addChild(new Cow());
        }
        return;
    };
    Cow.prototype.move = function (passTime) {
        if (this.Path.length == 0) {
            return;
        }
        var point = this.Path[0]; //下一个节点
        var targetSpeed = this.GetSpeed(point, new egret.Point(this.x, this.y), this._speed);
        var xDistance = 10 * targetSpeed.x;
        var yDistance = 10 * targetSpeed.y;
        if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {
            this.x = point.x;
            this.y = point.y;
            this.Path.shift();
            console.log(this.Path);
            if (this.Path.length == 0) {
                //当每次到达一个拐点时候，我们就删除路径中的当前点当到达的时候，我们派发事件  同时删除精灵。
                this.parent.removeChild(this);
                return;
            }
            else {
                this.setDirection(this.Path[0]);
            }
        }
        else {
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
        }
    };
    return Cow;
}(egret.Sprite));
__reflect(Cow.prototype, "Cow");
//# sourceMappingURL=Cow.js.map