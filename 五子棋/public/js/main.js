let myCanvas = document.getElementById("myCanvas")
let ctx = myCanvas.getContext("2d");
let img = document.getElementById("qipan");
let music = document.getElementById("myaudio");
let music_replay = document.getElementById("myaudio_replay");
let music_win = document.getElementById("myaudio_win");
let replay = $("#replay");
replay.click(() => {
    wuziqi.statu = 1;
    wuziqi.init();
    music_replay.play();
})
img.onload = function () {
    ctx.drawImage(img, 0, 0, 600, 600);
};
let wuziqi = {
    rn: 15,
    cn: 15,
    A: [],
    B: [],
    A_color:"#000",
    B_color:"#fff",
    All: [],
    ready: 0,
    statu: 1,
    init() {

        ctx.drawImage(img, 0, 0, 600, 600);
        this.All = [];
        for (let i = 0; i < 15; i++) {
            this.A[i] = [];
            this.B[i] = [];
            for (let j = 0; j < 15; j++) {
                this.A[i][j] = [];
                this.B[i][j] = [];
            }
        }
        this.clickIt();
    },
    test(w, h) {
        let val = (h + 1) * 15 + (w + 1);
        return this.All[val] !== 1;
    },
    clickIt() {
        $("#myCanvas").click(function (e) {
            if (wuziqi.statu) {
                var w, h;
                var l = this.offsetLeft;
                var x = e.clientX;
                var y = e.clientY;
                //获取点击相对棋盘坐标
                w = Math.round((x - l - 30) / 40);
                h = Math.round((y - 70) / 40);
                if (wuziqi.test(w, h)) {
                    music.play();
                    wuziqi.whoTurn();
                    let val = (h + 1) * 15 + (w + 1);
                    wuziqi.All[val] = 1;
                    ctx.beginPath();
                    ctx.fillStyle = !wuziqi.ready ? wuziqi.A_color : wuziqi.B_color;
                    ctx.arc(28 + 38.8 * w, 28 + 38.4 * h, 12, 0, 2 * Math.PI);
                    ctx.fill();
                    if (!wuziqi.ready) {
                        wuziqi.ready = 1;
                        wuziqi.A[w][h] = 1;
                        wuziqi.Atest(w, h);
                    } else {
                        wuziqi.ready = 0;
                        wuziqi.B[w][h] = 1;
                        wuziqi.Btest(w, h);
                    }
                }
            }
        })
    },
    whoTurn() {
        let [Turn] = wuziqi.ready ? [wuziqi.A_color] : [wuziqi.B_color];
        ctx.beginPath();
        ctx.fillStyle = Turn;
        ctx.arc(50, 15, 12, 0, 2 * Math.PI);
        ctx.fill();
    },
    Atest(w, h) {
        this.win(w, h, this.A);
    },
    Btest(w, h) {
        this.win(w, h, this.B);
    },
    win(w, h, p) {
        if (this.leftGet(w, h, p)+this.rightGet(w, h, p)>3 || this.upGet(w, h, p)+this.downGet(w, h, p)>3 || this.ldGet(w, h, p) + this.luGet(w, h, p) >3 || this.rdGet(w, h, p) + this.ruGet(w, h, p)>3) {
            this.success(p);
        }
    },
    leftGet(w, h, p, sum = 0) {
        while (w - 1 >= 0 && p[--w][h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    rightGet(w, h, p, sum = 0) {
        while (w + 1 <= 13 && p[++w][h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    upGet(w, h, p, sum = 0) {
        while (h - 1 >= 0 && p[w][--h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    downGet(w, h, p, sum = 0) {
        while (h + 1 <= 13 && p[w][++h] === 1) {
            if (sum < 4) {
                sum++;

            }
        }
        return sum;
    },
    luGet(w, h, p, sum = 0) {
        while (w - 1 >= 0 && h - 1 >= 0 && p[--w][--h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    ldGet(w, h, p, sum = 0) {
        while (w + 1 <= 13 && h + 1 <= 13 && p[++w][++h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    ruGet(w, h, p, sum = 0) {
        while (w - 1 >= 0 && h + 1 <= 13 && p[--w][++h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    rdGet(w, h, p, sum = 0) {
        while (w + 1 <= 13 && h - 1 >= 0 && p[++w][--h] === 1) {
            if (sum < 4) {
                sum++;
            }
        }
        return sum;
    },
    success(p) {
        this.statu = 0;
        let [Text] = p === this.A ? ["黑棋胜"] : ["白棋胜"];
        ctx.font = "18px Arial boder";
        ctx.fillText(Text, 280, 25);
        music_win.play();
    }
}
$.ready(wuziqi.init());