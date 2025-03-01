const area = document.getElementById('txtArea')
area.focus()

api.setColor((event, color) => {
    area.style.color = color
})