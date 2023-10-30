document.addEventListener(
    'DOMContentLoaded', function() {
        const el_count_prev = document.getElementById('count_prev')
        const el_count_content = document.getElementById('count_content')

        const el_description = document.getElementsByClassName('textarea-mid')[0]
        const el_content = document.getElementsByClassName('textarea-big')[0]

        const max = 255;

        el_description.addEventListener('input', (val) => {
           el_count_prev.innerText = `${val.target.value.length}/${max}`
        })

        el_content.addEventListener('input', (val) => {
            const count = val.target.value.split(' ')
            el_count_content.innerText = count > 0 ? `${count.length()} palavras` : "-"
         })
    })