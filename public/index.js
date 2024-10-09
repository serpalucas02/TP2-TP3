async function enviarFormulario(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const año = document.getElementById('año').value;

    const respuesta = await fetch('/libros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, año })
    });

    if (respuesta.ok) {
        alert('Libro agregado correctamente');
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('año').value = '';
    } else {
        alert('Error al agregar libro');
    }
}

function verLibros() {
    window.location.href = '/libros';
}
