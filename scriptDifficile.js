window.onload = function()
{
    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 50;
    var snakee;
    var applee;
    var widthInBlocs = canvasWidth / blockSize;
    var heightInBlocs = canvasHeight / blockSize;
    var score;
    var timeout;
//    localStorage.setItem("Scoree",0)
//    var Scoree = localStorage.getItem("Scoree",0);
//    
    init();
    
    function init()
    {
        
    var canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "10px solid black";
    canvas.style.margin ="40px auto";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "#ddd";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    snakee = new Snake([[5,4], [4,4]], "down");
    applee = new Apple([28,1]);
    score = 0;
    refreshCanvas();
    
    }
    
    function drawBlock (ctx, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x ,y , blockSize, blockSize);
    }

    
    function refreshCanvas()
    {
        snakee.advance();
        
        if(snakee.checkCollision())
            {
              gameOver();  
            }
        else
        {
        if(snakee.isEatingApple(applee))
            {
                score++;
                snakee.ateApple = true;
                do{
                   applee.setNewPosition(); 
                    
                }
                while(applee.isOnSnake(snakee))
            }
            
        
                
        ctx.clearRect(0,0,canvasWidth,canvasHeight); 
        drawScore();
        snakee.draw();
        applee.draw();
        
        timeout = setTimeout(refreshCanvas,delay);
        }
        
    }
        
    function gameOver()
    {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.textAlign = "center";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText("GAME OVER", centreX , centreY - 180);
        ctx.fillText("GAME OVER", centreX , centreY - 180);
        
        ctx.font = "bold 30px sans-serif";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
        ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);

        document.onkeydown = function Repeat(e)
        {
            var key = e.keyCode;
            if(key === 32)
                        restart();
        
        }
        
//        if(score > Scoree)
//            {
//                Scoree = score;
//                alert("F\351licitations ! Tu d\351tiens le meilleur score de ce mode avec " + Scoree + " " + "points !");
//            } 
        
        ctx.restore();
    }
    
    function restart()
        {
            snakee = new Snake([[5,4], [4,4]], "down");
            applee = new Apple([28,1]);
            score = 0;
            clearTimeout(timeout);
            delay = 50;
            refreshCanvas();
        }
        

    function drawScore()
        {
            ctx.save;
            ctx.font = "bold 200px sans-serif";
            ctx.fillStyle = "gray";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            var centreX = canvasWidth / 2;
            var centreY = canvasHeight / 2;
            
            ctx.fillText(score.toString(), centreX, centreY);
            ctx.restore;
        }
        
    function Snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "black";
            for(var i=0; i < this.body.length; i++)
            {
                drawBlock(ctx,this.body[i]);
            }
            ctx.restore;
                
        };
        this.advance = function()
        {
         var nextPosition = this.body[0].slice();
        switch(this.direction)
            {
                case "left":
                    nextPosition[0] -=1;
                    break;
                    
                case "right":
                    nextPosition[0] +=1;
                    break;
                case "down":
                    nextPosition[1] +=1;
                    break;
                case "up":
                    nextPosition[1] -=1;
                    break;
                default:
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple)
            this.body.pop();
            else 
                this.ateApple = false;
        }
        
        this.setDirection = function(newDirection)
        {
            var allowDirection;
            switch(this.direction)
                {
                case "left":
                case "right":
                        allowedDirections = ["up", "down"];
                        break;
                case "down":
                case "up":
                        allowedDirections = ["right", "left"];
                        break;
                    default:
                        throw("Invalid Direction");
                }
            if(allowedDirections.indexOf(newDirection) > -1)
                {
                    this.direction = newDirection;
                }
            
        }
        
     
    function pause()
    {
       
        ctx.save();
        ctx.font = "bold 380px sans-serif";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.lineWidth = 5;
        ctx.textAlign = "center";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.fillText("II", centreX , centreY);
        
        ctx.font = "25px sans-serif";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        
        ctx.lineWidth = 5;
        ctx.textAlign = "center";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2 + 200;
        ctx.fillText("Pressez Entr\351e pour reprendre la partie", centreX , centreY);
        
        clearTimeout(timeout);
    }
        
    document.onkeydown = function handleKeyDown(e)
        {
            var key = e.keyCode;
            var newDirection;
            switch(key)  
                {   case 81:
                    case 37: /*gauche*/
                        newDirection = "left";
                        break;
                    case 90:
                    case 38: /*haut*/
                        newDirection = "up";
                        break;
                    case 68:
                    case 39: /* droite*/
                        newDirection = "right";
                        break;
                    case 83:
                    case 40: /*bas*/
                        newDirection = "down";
                    break;            
                    
                    case 27:
                        pause();
                        return;
                    case 13:
                         {clearTimeout(timeout);
                        refreshCanvas();
                        }
                        return;
                   
            default:
                return;
                }
    
    snakee.setDirection(newDirection);
    };
        
        
        this.checkCollision = function()
        {
            var wallColision = false;
            var snakeColision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocs - 1;
            var maxY = heightInBlocs - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            
            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
                    wallColision = true;
            
            for(var i = 0; i < rest.length ; i++)
                {
                    if(snakeX === rest[i][0] && snakeY === rest[i][1])
                    
                        snakeColision = true;
                    
                }
            return wallColision || snakeColision;
        }
        
        this.isEatingApple = function(appleToEat)
        {
            var head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                    return true;
            else return false;
        }
     } /* fermeture function snake*/
    
    function Apple(position)
    {
        this.position = position;
        this.draw= function()
        {
            ctx.save();
            ctx.fillStyle="#33cc33";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0]*blockSize+radius;
            var y = this.position[1]*blockSize+radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };
        
        this.setNewPosition = function()
        {
            var newX = Math.round(Math.random() * (widthInBlocs - 1));
            var newY = Math.round(Math.random() * (heightInBlocs - 1));
            this.position = [newX,newY];
        };
        
        this.isOnSnake = function(snakeToCheck)
        {
            var isOnSnake = false;
            
            for(var i = 0 ; i < snakeToCheck.body.length; i++)
        {
            if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
                {
                    isOnSnake = true;
                }
        }
            return isOnSnake;
        };
    }
    
}