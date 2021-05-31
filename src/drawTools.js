const cyan = "rgba(255, 255, 255, 0.4)"
const blue = "rgba(25, 255, 255, 0.3)"
const yellow = "rgba(255, 255, 25, 0.8)"
const white = "rgba(255, 255, 255, 0.7)"

export class Draw{
    background(ctx, activateGrid = true){
        ctx.fillRect(0, 0, 1000, 1000)
        ctx.fillStyle = "black"

        if(activateGrid){

            let counterX = -5
            let counterY = 5
            for(let i = 0; i < 2; i++){
                for(let k = 0; k < 1000; k += 100){
                    ctx.beginPath()
                    if(!i){
                        ctx.moveTo(0, k)
                        ctx.lineTo(1000, k)
                    }else{
                        ctx.moveTo(k, 0)
                        ctx.lineTo(k, 1000)
                    }
                    ctx.strokeStyle = cyan
                    ctx.lineWidth = 1
                    ctx.stroke()

                    ctx.font = "20px Arial"
                    ctx.strokeStyle = cyan
                    if(!i){
                        ctx.strokeText(`${counterY--} i`, 505, k + 20)
                    }else{
                        ctx.strokeText(`${counterX++}`, k + 5, 520)
                    }
                }
            }
        }
    }

    image(ctx, image){
        ctx.save()
        ctx.globalAlpha = 0.3;
        ctx.drawImage(image, 0, 0) 
        ctx.restore()
    }

    circle(ctx, x, y, r, color=blue){
        ctx.beginPath()
        ctx.arc(500 + x * 100, 500 - y * 100, r * 100, 0, 2*Math.PI)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
    }

    vector(ctx, xi, yi, xe, ye, color=white){
        ctx.beginPath()
        ctx.moveTo(500 + xi * 100, 500 - yi * 100)
        ctx.lineTo(500 + xe * 100, 500 - ye * 100)
        ctx.lineWidth = 3
        ctx.strokeStyle = color
        ctx.stroke()
    }

    point(ctx, x, y){
        ctx.fillStyle = yellow
        ctx.fillRect(500 + x * 100, 500 - y * 100, 3, 3)
    }

    clear(ctx, removePoints=false){
        ctx.clearRect(0, 0, 1000, 1000)
        circles = {}
        if(removePoints){
            drawAxies = []
            len = drawAxies.length
        }
    }
}
