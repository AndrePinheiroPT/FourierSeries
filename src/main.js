import { Draw } from './drawTools.js'
import { pointSelected, circlesLength, dtime } from './events.js'

const draw = new Draw()

const image = document.querySelector('#output')
const canvasLayer1 = document.querySelector("#layer1")
const canvasLayer2 = document.querySelector("#layer2")
const ctx1 = canvasLayer1.getContext('2d')
const ctx2 = canvasLayer2.getContext('2d')

let time = 0
let circles = {}
export let points = []
export let mouseState = []
export let edit = false
let showPoints = true
let imageSelected = false

export function setEditMode(){
    let editButton = document.querySelector('#edit-button')

    editButton.style.backgroundColor = edit ? 'red' : 'green'
    edit = edit ? false : true
}setEditMode()

export function loadImage(event){
    image.src = URL.createObjectURL(event.target.files[0])
}

export function controlImage(type){
    imageSelected = type
}

export function addCircle(coefficient, velocity){
    let radius = (coefficient[0]**2 + coefficient[1]**2)**0.5
    circles[radius] = { coefficient, velocity, radius }
}

export function doFourier(){
    draw.clearContent(ctx2)
    circles = {}
    // time's variation
    const dt = 1 / points.length
    for(
        let velocity = Math.floor(-circlesLength / 2); 
        velocity <= Math.floor(circlesLength); 
        velocity++
    ){
        let coefficient = [0, 0]
        let input = 0

        for(const pointId in points){
            // Output of function: [a, bi]
            const output = points[pointId]

            // e^{in} = cos(n) + i*sin(n)
            let term = [
                Math.cos(-2 * Math.PI * input * velocity),
                Math.sin(-2 * Math.PI * input * velocity),
            ]

            // Compute Integral
            coefficient[0] += (output[0] * term[0] - output[1] * term[1]) * dt
            coefficient[1] += (output[0] * term[1] + output[1] * term[0]) * dt

            // Add time's variation
            input += dt
        }

        addCircle(coefficient, velocity)
    }
}

function render(){
    draw.background(ctx1, true)
    if(imageSelected){ 
        draw.image(ctx1, image)  
    }else{ 
        draw.background(ctx1, true)
    }
    if(image.src == ""){
        image.style.opacity = 0
    }else{
        image.style.opacity = 1
    }

    let output = [0, 0]
    for(const circleId in circles){
        const circle = circles[circleId]

        let initialCircle = [
            Math.cos(2 * Math.PI * time * circle.velocity),
            Math.sin(2 * Math.PI * time * circle.velocity) 
        ]
        
        // Sum of circle
        let dx = circle.coefficient[0] * initialCircle[0] - circle.coefficient[1] * initialCircle[1]
        let dy = circle.coefficient[0] * initialCircle[1] + circle.coefficient[1] * initialCircle[0]
        output[0] += dx
        output[1] += dy
        
        // Draw circle/vector
        let radius = (circle.coefficient[0]**2 + circle.coefficient[1]**2)**0.5
        draw.circle(ctx1, output[0] - dx, output[1] - dy, radius)
        draw.vector(ctx1, output[0] - dx, output[1] - dy, output[0], output[1])
    }

    // Draw output of function
    draw.point(ctx2, output[0], output[1])
    
    if(showPoints){
        for(let pointId in points){
            const point = points[pointId]
            draw.circle(ctx1, point[0], point[1], 0.05, "rgba(0, 255, 0, 0.3)")
        }
    }

    if(edit && pointSelected != null){
        draw.vector(
            ctx1,
            pointSelected[0], 
            pointSelected[1],
            mouseState[0], 
            mouseState[1],
            "rgba(0, 255, 0, 0.3)"
        )
    }
    
    // Add 1 milisecound
    time += 1 / (1000 * dtime)
}
setInterval(render, 1)