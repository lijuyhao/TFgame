// TypeScript file
class GameStart extends eui.Component {

    private _lastTimeStamp: number = 0;

    private _cowBirthTime: number = 0;

    private _animal_cow_layer: egret.Sprite;

    private _timeOnEnterFrame = 0;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addBg();
        this._animal_cow_layer = new egret.Sprite();
        this.addChild(this._animal_cow_layer);
        egret.startTick(this.onUpdate, this);
        this.addLabel();

    }

    private onAddToStage() {
        new eui.Theme('resource/default.thm.json', this.stage);
    }

    private addBg() {
        this.skinName = 'Game_star_bg';
    }

    private addLabel() {
        //测试添加json文件
        var myLable: eui.Label = new eui.Label();
        var data = RES.getRes('scene1sprite_json');
        this.addChild(myLable);
        myLable.$setText(data.sprite[0].name);
    }

    private onUpdate(timeStamp: number) {
        var span: number = timeStamp - this._lastTimeStamp;
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
            var actor: Cow = <Cow>this._animal_cow_layer.getChildAt(i);
            actor.onUpdate(span);
        }

        return false;
    }


   




}