document.addEventListener(
    'DOMContentLoaded', function() {
        const menu = document.getElementById('my-sidenav')
        const main = document.getElementsByTagName('main')[0]
        const toggle = document.getElementById('toggle')
        const lock = document.getElementById('lock')
        const unlock = document.getElementById('unlock')
        let visible = false

        const changeVisibility = (element, show) => {
            element.style.display = show ? 'block' : 'none'
        }

        toggle.addEventListener('click', function() {
            visible = !visible;
            changeVisibility(lock, !visible)
            changeVisibility(unlock, visible)

            menu.style.display = visible ? 'flex' : 'none';
        });

        main.addEventListener('click', function(event) {            
            if(menu.style.display != 'none') {
                if(!menu.contains(event.target) ) {
                    if(menu.style.display != 'none') {
                        visible = false
                        menu.style.display = 'none'
                        changeVisibility(lock, !visible)
                        changeVisibility(unlock, visible)
                    }
                }
            }
        })        
})