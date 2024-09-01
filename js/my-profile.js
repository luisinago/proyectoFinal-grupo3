document.addEventListener('DOMContentLoaded', () => {
    // Obtener el nombre de usuario de alguna fuente (por ejemplo, API o almacenamiento local)
    const nombreUsuario = 'Juan Pérez'; // Cambia esto con el nombre real del usuario

    // Obtener el elemento donde se mostrará el nombre de usuario
    const elementoNombreUsuario = document.getElementById('usuario');

    // Verificar si el elemento existe antes de intentar actualizar su contenido
    if (elementoNombreUsuario) {
        elementoNombreUsuario.textContent = nombreUsuario;
    }
});
