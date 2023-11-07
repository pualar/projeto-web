document.addEventListener(
    'DOMContentLoaded', function() {
        const menu = document.getElementById('my-sidenav')
        const main = document.getElementsByTagName('main')[0]
        const toggle = document.getElementById('toggle')
        let visible = false

        toggle.addEventListener('click', function() {
            visible = !visible;
            menu.style.display = visible ? 'flex' : 'none';
        });

        main.addEventListener('click', function(event) {            
            if(menu.style.display != 'none') {
                if(!menu.contains(event.target) ) {
                    if(menu.style.display != 'none') menu.style.display = 'none'
                }
            }
        })        
})