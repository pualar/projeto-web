document.addEventListener(
    'DOMContentLoaded', function() {
        const el_tempo_leitura = document.getElementsByClassName('read_time');
        const el_data = document.getElementsByClassName('created_at');
        const el_favorite = document.getElementsByClassName('material-symbols-outlined')[0];
        

        // ################################### Tempo de leitura
        if(el_tempo_leitura) {
            for(let i = 0; i < el_tempo_leitura.length; i++ ) {
                const element = el_tempo_leitura[i]
                const tempo_leitura_original = element.innerText.trim();
                if(tempo_leitura_original <= 1) {
                    element.innerText = "Leitura rápida! Menos de 1 minuto"
                } else if(tempo_leitura_original > 1) {
                    element.innerText = `Tempo de leitura: ${tempo_leitura_original} ${tempo_leitura_original == 1 ? 'minuto' : 'minutos'}`
                }
            }
        }
       
        
        // ################################### Data de criação
        if(el_data) {
            var nomes_meses = [
                "janeiro", "fevereiro", "março", "abril", "maio", "junho",
                "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
            ];

            for(let i = 0; i < el_data.length; i++) {
                const element = el_data[i];
                console.log("element", element)
                console.log("innerText", element.innerText)

                if(!element.innerText.includes(" de ")) {
                    const data_original = new Date(element.innerText.trim());
                    console.log("data_original", data_original)
                   
                    const dia = data_original.getDate()
                    const mes = nomes_meses[data_original.getMonth()]
            
                    element.innerText = `${dia} de ${mes}`;
                }
            }           
        }
    }
)