function Game(){
    this.charArr = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G',
        'H','J','K','L','Z','X','C','V','B','N','M'];
    this.current = [];
    this.position = [];
    this.number = 5;
    this.speed = 10;
    this.gk = 10;
    this.score = 0;
}
Game.prototype={
    start:function(){
        this.getchars();
        this.drop();
        this.key();
        // this.checkPosition();

    },
    getchars:function(){
        for(let i=0;i<this.number;i++){
            this.getchar();
        }
    },
    getchar:function(){
        let num = Math.floor(Math.random()*this.charArr.length);
        // 字符this.charArr[num]  this.current[i].innerText 相比
        let divs = document.createElement('div');
        divs.innerText = this.charArr[num];
        divs.classList.add('char');

        let tops = Math.random()*100;
        let lefts = (innerWidth-400)*Math.random()+200;
        while(this.checkPosition(lefts)){
            lefts = (innerWidth-400)*Math.random()+200;
        }
        divs.style.cssText = `
           top:${tops}px;left:${lefts}px;
        `;
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    },
    checkPosition:function(lefts){
       let flag = this.position.some(function(value){
           return Math.abs(value-lefts)<60;
       });
       return flag;
    },
    drop:function(){
        let that = this;
        this.t = setInterval(function(){
           for(let i = 0;i<that.current.length;i++){
               let tops = that.current[i].offsetTop + that.speed;
               that.current[i].style.top = `${tops}px`;
               if(tops>=500){
                   document.body.removeChild(that.current[i]);
                   that.current.splice(i,1);
                   that.position.splice(i,1);
                   that.getchar()
               }
           }
        },300)
    },
    key:function(){
        let that = this;
        document.onkeydown = function(e){
            for(let i = 0;i<that.current.length;i++){
                if(that.current[i].innerText==String.fromCharCode(e.keyCode)){
                    that.score += 2;
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i,1);
                    that.position.splice(i,1);
                    that.getchar();
                    if(that.score==that.gk){
                        that.next();
                    }
                }
            }
        }
    },
    next:function(){
        clearInterval(this.t);
        for(let i = 0;i<this.current.length;i++){
            document.body.removeChild(this.current[i]);
        }
        this.current.length = 0;
        this.position.length = 0;
        this.number++;
        this.gk+=10;
        this.start();

    }
}