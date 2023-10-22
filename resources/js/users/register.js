document.getElementById('confirm').addEventListener('input', (val) => {
    const input = document.getElementById('password');
    const submit = document.getElementById('sbmt');
    const value = val.target.value;

    console.log(value)
    const differ = (s1, s2) => {
        if(s1.length == 0 || s2.length == 0) return false
        return s1 !== s2
    }

    if(differ(input.value, value)) {
        submit.setAttribute('disabled', 'true')
    } else {
        submit.removeAttribute('disabled')
    }
})

document.getElementById('password').addEventListener('input', (val) => {
    const input = document.getElementById('confirm');
    const submit = document.getElementById('sbmt');
    const value = val.target.value;

    console.log(value)
    const differ = (s1, s2) => {
        if(s1.length == 0 || s2.length == 0) return false
        return s1 !== s2
    }

    if(value.length > 0) {
        submit.removeAttribute('disabled') 
    }

    submit.setAttribute('disabled', 
        differ(input.value, value) ? 'true' : 'false')        
})