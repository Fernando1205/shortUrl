console.log('Hola desde el front');

document.addEventListener('click', (e) => {
    if (e.target.dataset.short) {
        let url = `http:://localhost:3001/${e.target.dataset.short}`;

        navigator.clipboard
            .writeText(url)
            .then(() => {
                console.log('Texto copiado...');
            })
            .catch((e) => {
                console.log(`Error: ${e}`);
            })
    }
});