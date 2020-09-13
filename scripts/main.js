let runningTotal = 0
let buffer = "0"
let previousOperator
const screen = document.querySelector(".screen")
const calcButtons = document.querySelector(".calc-buttons")

function buttonClick(value) {
    !isNaN(+value) ? handleNumber(value) : handleSymbol(value)
    reRender()
}

function handleNumber(numberStr) {
    buffer === "0" ? buffer = numberStr : buffer += numberStr
}

function handleMath(symbol) {
    if (buffer === "0") {
        // do nothing
        return
    }

    const intBuffer = +buffer

    runningTotal === 0 ? runningTotal = intBuffer : flushOperation(intBuffer)

    previousOperator = symbol

    buffer = "0"
}

function flushOperation(intBuffer) {
    previousOperator === '÷' ? runningTotal /= intBuffer : previousOperator === '×' ? runningTotal *= intBuffer : previousOperator === '-' ? runningTotal -= intBuffer : runningTotal += intBuffer
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0"
            runningTotal = 0
            break

        case "=":
            if (previousOperator === null) {
                // need two numbers to do math
                return
            }
            flushOperation(+buffer)
            previousOperator = null
            buffer = +runningTotal
            runningTotal = 0
            break

        case "←":
            buffer.length === 1 ? buffer = "0" : buffer = buffer.substring(0, buffer.length - 1)
            break

        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(symbol)
            break
    }
}

function reRender() {
    screen.innerText = buffer
}

function init() {
    calcButtons.addEventListener("click", function(event) {
        buttonClick(event.target.innerText)
    })
}
init()