import { mouseState, points, edit } from './main.js'

const canvasLayer2 = document.querySelector("#layer2")
export let pointSelected = null

function getMousePosition(evt){
    let rect = canvasLayer2.getBoundingClientRect()
    return {
        x: ((evt.clientX - rect.left - 10) / 550 * 1000 - 500) / 100,
        y: (500 - (evt.clientY - rect.top -10) / 550 * 1000) / 100,
    }
}

canvasLayer2.addEventListener('click', evt => {
    
    if(edit && pointSelected != null){

        let initPoints = []
        let collecs = []

        for(let k = 0; k < 2; k++){
            initPoints.push(pointSelected[k])
            collecs.push(mouseState[k] - initPoints[k])
        }

        let hip = (collecs[0]**2 + collecs[1]**2)**0.5
        let numberOfPoints = hip * 8

        for(let i = 0; i < numberOfPoints - 2; i++){
            initPoints[0] += collecs[0] / numberOfPoints
            initPoints[1] += collecs[1] / numberOfPoints
            points.push([initPoints[0], initPoints[1]])
        }

        pointSelected = null
    }

    for(const pointId in points){
        const output = points[pointId]

        if(mouseState[0] <= output[0] + 0.05 && 
        mouseState[0] >= output[0] - 0.05 && 
        mouseState[1] <= output[1] + 0.05 &&
        mouseState[1] >= output[1] - 0.05 && edit) pointSelected = output
    }

    if (edit && pointSelected === null) points.push([mouseState[0], mouseState[1]])
})

canvasLayer2.addEventListener('mousemove', evt => {
    let mousePosition = getMousePosition(evt)

    mouseState[0] = mousePosition.x
    mouseState[1] = mousePosition.y
})