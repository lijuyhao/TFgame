// TypeScript file
class Cow extends egret.Sprite {

    private _speed: number = 0.5;

    private Path: Array<egret.Point> = [
        new egret.Point(470, 244)
        , new egret.Point(470, 427)
        , new egret.Point(657, 427)
        , new egret.Point(1135, 248)
        , new egret.Point(1135, 360)
        , new egret.Point(1300,690)
    ];

    public constructor() {
        super();
        this.addChild(new egret.Bitmap(RES.getRes('cow_png')));

    }

    public onUpdate(passTime: number) {


        this.move(passTime);


    }

    public GetDistance(p1: egret.Point, p2: egret.Point): number {

        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        //坐标轴上两点的距离 (x1-x2)平方  (y1-y2)平方  开根号
    }

    public GetSpeed(targetP2: egret.Point, currentP1: egret.Point, SpeedNum: number): egret.Point {

        var speed: egret.Point = new egret.Point();   //speed 设置为一个点
        var hypotenuse: number = this.GetDistance(targetP2, currentP1);  //两点的距离
        if (hypotenuse == 0)         //如果亮点的距离等于零
        {
            speed.x = 0;
            speed.y = 0;
            return speed;
        }
        speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
        speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
        return speed;
    }


    private direction: string = "";

    public setDirection(p: egret.Point): void {
        var xNum: number = p.x - this.x;
        var yNum: number = p.y - this.y;
        var tempDirection: string;
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
    }



    private move(passTime: number): void {

        if (this.Path.length == 0) {
            return;
        }

        var point: egret.Point = this.Path[0];  //下一个节点

        var targetSpeed: egret.Point = this.GetSpeed(point, new egret.Point(this.x, this.y), this._speed);
        var xDistance: number = 10 * targetSpeed.x;
        var yDistance: number = 10 * targetSpeed.y;

        if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {

            this.x = point.x;
            this.y = point.y;
            this.Path.shift();
            


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

    }





}






