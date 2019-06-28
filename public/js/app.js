const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')



// Listens for user input from HTML form
if (weatherForm) {
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const location = search.value;;
        
        var br = document.createElement("br")
        var x = document.getElementById("message-two")

        br.setAttribute('style', 'white-space: pre')

        messageOne.textContent = 'Loading...'
    
        fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    })
}


var splitURL = document.URL.split('/')
var pathname = '/' + splitURL[3]

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < document.links.length; i++) {
    console.log(document.links[i].pathname)
    if (document.links[i].pathname == pathname) {
        document.links[i].className = 'active';
    }
}