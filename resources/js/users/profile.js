document.addEventListener(
    'DOMContentLoaded', function() {
        let show = false;
        const button = document.getElementById('btn_alterar_senha');
        const view = document.getElementById('view_alterar_senha');
        
        const show_form = (show) => {
            if(show === true) {
                view.style.removeProperty('display')
            } else view.style.display = 'none'
        }

        if(view) {
            show_form(false)
        }

        if(button) {
            button.addEventListener('click', function() {
                show = !show;
                show_form(show)
            })
        }
  });