// Espera a que todo el contenido del DOM (la página) se cargue
document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar el botón y el párrafo por su ID
    const magicButton = document.getElementById('magicButton');
    const magicText = document.getElementById('magicText');

    // Añadir un "escuchador de eventos" que se activa al hacer clic en el botón
    magicButton.addEventListener('click', function() {
        
        // Cambiar el texto del párrafo
        magicText.textContent = '¡Gracias por visitar mi página! 🎉';

        // Opcional: Cambiar también el color del texto
        magicText.style.color = '#198754'; // Un verde bonito de Bootstrap
    });

});