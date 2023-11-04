document.addEventListener(
    'DOMContentLoaded', function() {
        const el_count_prev = document.getElementById('count_prev');
        const el_count_content = document.getElementById('count_content');

        const el_description = document.getElementsByClassName('textarea-mid')[0];
        const el_content = document.getElementsByClassName('textarea-big')[0];

        const max_chars = 255;

        initCount(el_description, el_count_prev, max_chars)
        initCount(el_content, el_count_content, false)

        el_content.addEventListener('input', (val) => {
            const value = el_content.value
            const count = value.split(' ').filter(val => val != '').length
            el_count_content.innerText = count > 0 ? `${count} ${count > 1 ? 'palavras' : 'palavra'}` : "-"
        });

        el_description.addEventListener('input', (val) => {
           el_count_prev.innerText = `${val.target.value.length}/${max_chars}`
        });
    }
);

function initCount(element, element_count, max) {
    let content = element.textContent
    if(max) {
        if(content != null) {
            element_count.innerText = `${content.length}/${max}`
        }

        return;
    }

    if(content != null) {
        const count = content.split(' ').filter(val => val != '').length
        element_count.innerText = count > 0 ? `${count} ${count > 1 ? 'palavras' : 'palavra'}` : "-"
    }
}