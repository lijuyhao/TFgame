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
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this._lastTimeStamp = 0;
        _this._cowBirthTime = 0;
        _this._timeOnEnterFrame = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addBg();
        _this._animal_cow_layer = new egret.Sprite();
        _this.addChild(_this._animal_cow_layer);
        egret.startTick(_this.onUpdate, _this);
        _this.addLabel();
        return _this;
    }
    GameStart.prototype.onAddToStage = function () {
        new eui.Theme('resource/default.thm.json', this.stage);
    };
    GameStart.prototype.addBg = function () {
        this.skinName = 'Game_star_bg';
    };
    GameStart.prototype.addLabel = function () {
        //测试添加json文件
        var myLable = new eui.Label();
        var data = RES.getRes('scene1sprite_json');
        this.addChild(myLable);
        myLable.$setText(data.sprite[0].name);
    };
    GameStart.prototype.onUpdate = function (timeStamp) {
        var span = timeStamp - this._lastTimeStamp;
        this._lastTimeStamp = timeStamp;
        this._cowBirthTime += span;
        if (this._cowBirthTime >= 200) {
            var cow = new Cow();
            cow.x = 200;
            cow.y = 244;
            cow.scaleX = -1;
            cow.anchorOffsetX = 45;
            cow.anchorOffsetY = 45;
            this._animal_cow_layer.addChild(cow);
            this._cowBirthTime = 0;
        }
        for (var i = this._animal_cow_layer.numChildren - 1; i >= 0; i--) {
            var actor = this._animal_cow_layer.getChildAt(i);
            actor.onUpdate(span);
        }
        return false;
    };
    return GameStart;
}(eui.Component));
__reflect(GameStart.prototype, "GameStart");
//# sourceMappingURL=GameStart.js.map