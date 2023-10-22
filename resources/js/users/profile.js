/* document.getElementById(
    'alterar-senha'
).style.display = 'none' */

document
/* .getElementById('alterar-senha')
    .addEventListener('click', () => {

    }) */

/* function showAlterarSenha(show) {
    if(show == true) {
        document.getElementById(
            'alterar-senha'
        ).style.removeProperty('display')
    } else {
        document.getElementById(
            'alterar-senha'
        ).style.display = 'none'
    }
} */

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

        show_form(false)

        button.addEventListener('click', function() {
            show = !show;
            show_form(show)
        })

    /* meuBotao.addEventListener('click', function() {
      alert('Você clicou no botão!');
    }); */
  });