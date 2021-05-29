const canvasLayer1 = document.querySelector("#layer1")
const canvasLayer2 = document.querySelector("#layer2")

const ctx = canvasLayer1.getContext('2d')
const ctx2 = canvasLayer2.getContext('2d')

const cyan = "rgba(255, 255, 255, 0.2)"
const blue = "rgba(25, 255, 255, 0.3)"
const yellow = "rgba(255, 255, 25, 0.8)"
const white = "rgba(255, 255, 255, 0.7)"

export class Draw{
    background(activateGrid = true){
        ctx.fillRect(0, 0, 1000, 1000)
        ctx.fillStyle = "black"

        if(activateGrid){

            let counterX = -5
            let counterY = 5
            for(let i = 0; i < 2; i++){
                for(let k = 0; k < 1000; k += 100){
                    ctx.beginPath()
                    if(i == 0){
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
                    if(i == 0){
                        ctx.strokeText(`${counterY--} i`, 505, k + 20)
                    }else{
                        ctx.strokeText(`${counterX++}`, k + 5, 520)
                    }
                }
            }
        }
    }

    circle(x, y, r, color=blue){
        ctx.beginPath()
        ctx.arc(500 + x * 100, 500 - y * 100, r * 100, 0, 2*Math.PI)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
    }

    vector(xi, yi, xe, ye, color=white){
        ctx.beginPath()
        ctx.moveTo(500 + xi * 100, 500 - yi * 100)
        ctx.lineTo(500 + xe * 100, 500 - ye * 100)
        ctx.lineWidth = 3
        ctx.strokeStyle = color
        ctx.stroke()
    }

    point(x, y){
        ctx2.fillStyle = yellow
        ctx2.fillRect(500 + x * 100, 500 - y * 100, 3, 3)
    }

    clear(removePoints=false){
        ctx2.clearRect(0, 0, 1000, 1000)
        circles = {}
        if(removePoints){
            drawAxies = []
            len = drawAxies.length
        }
    }
}
