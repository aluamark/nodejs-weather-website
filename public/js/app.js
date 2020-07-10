console.log('Client side javascript file is loaded, perfect!')

const weatherForm = document.querySelector('#form')
const userInput = document.querySelector('#input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = `Let's check some weather today!`

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = userInput.value

    messageOne.textContent = `Please wait...`
    messageTwo.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address=' + search).then((response) => {
        response.json().then((output) => {
            if (output.error) {
                return messageOne.textContent = output.error
            }
            
            messageOne.textContent = output.location
            messageTwo.textContent = output.forecastData
        })
    })
})