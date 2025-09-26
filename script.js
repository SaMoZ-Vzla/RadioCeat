document.addEventListener('DOMContentLoaded', function() {

    // 1. GESTIÓN DEL FORMULARIO DE CONTACTO
    const formContacto = document.querySelector('#contacto form');
    
    if (formContacto) {
        formContacto.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            
            // Muestra un mensaje de éxito
            alert(`¡Gracias por contactarnos, ${nombre}! Tu mensaje ha sido recibido. Te responderemos pronto a ${email}.`);
            
            // Limpia el formulario
            formContacto.reset();
        });
    }

    // 2. FUNCIONALIDAD DEL BOTÓN "ESCUCHAR EN VIVO"
    const liveButton = document.querySelector('.live-button');
    
    if (liveButton) {
        liveButton.addEventListener('click', function() {
            console.log('Botón Escuchar en vivo presionado. Iniciando reproducción...');
            
            const reproductor = document.querySelector('.reproductor audio');
            if (reproductor) {
                reproductor.play().catch(error => {
                    console.error('La reproducción automática falló:', error);
                    alert('Por favor, presiona el botón Play en el reproductor si no inicia automáticamente.');
                });
            }
        });
    }
    
    // 3. FUNCIONALIDAD DEL CARRUSEL (GALERÍA)
    const slides = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlideIndex = 0; 
    
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active-slide');
            });
            
            if (index >= slides.length) {
                currentSlideIndex = 0; 
            } else if (index < 0) {
                currentSlideIndex = slides.length - 1; 
            } else {
                currentSlideIndex = index;
            }
            
            slides[currentSlideIndex].classList.add('active-slide');
        }

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlideIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlideIndex - 1);
        });

        // Muestra la primera imagen al cargar
        showSlide(currentSlideIndex); 
    }
});