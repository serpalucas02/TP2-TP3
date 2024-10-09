async function enviarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    const respuesta = await fetch('/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, precio, stock })
    });

    if (respuesta.ok) {
        alert('Producto agregado correctamente');

        document.getElementById('nombre').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('stock').value = '';
    } else {
        alert('Error al agregar producto');
    }
}
