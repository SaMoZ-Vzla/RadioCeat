document.addEventListener('DOMContentLoaded', function() {

   // 1. GESTIÓN DEL FORMULARIO DE CONTACTO
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const nombre = document.getElementById('nombre').value;
            const curso = document.getElementById('curso').value; // Capturamos el nuevo campo
            
            let mensajeConfirmacion = `¡Mensaje enviado! Gracias, ${nombre}, por contactar a Radio CEAT.`;
            
            if (curso) {
                mensajeConfirmacion += ` (Vimos que eres de ${curso})`;
            }
            
            // Muestra el mensaje de éxito simulado
            alert(mensajeConfirmacion);
            
            form.reset(); 
        });
    }

    // 2. REPRODUCTOR DE PODCASTS (FUNCIONALIDAD SIMPLE)
    const playButtons = document.querySelectorAll('.podcast-play-btn');
    const audioPlayer = document.querySelector('.reproductor-vivo audio');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-audio-src');
            
            if (audioSrc) {
                // Cambia la fuente del reproductor principal
                audioPlayer.src = audioSrc; 
                audioPlayer.play();
                
                alert(`Reproduciendo: ${this.parentNode.querySelector('h3').textContent}`);
            }
        });
    });

    // 3. BOTÓN ESCUCHAR EN VIVO
    const liveButton = document.querySelector('.live-button');
    if (liveButton) {
        liveButton.addEventListener('click', function() {
            // Desplaza la vista a la sección de inicio donde está el reproductor
            document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 4. LÓGICA DEL CARRUSEL
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));

    if (track && slides.length > 0) {
        // Calcula el ancho de una sola slide
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Función para mover el carrusel
        const moveToSlide = (currentSlide, targetSlide) => {
            // Calcula la posición de desplazamiento
            const targetIndex = slides.indexOf(targetSlide);
            track.style.transform = 'translateX(-' + (targetIndex * slideWidth) + 'px)';
            
            // Actualizar la clase "current-slide"
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
            
            // Actualizar la clase "current-indicator"
            const currentIndicator = document.querySelector('.current-indicator');
            currentIndicator.classList.remove('current-indicator');
            indicators[targetIndex].classList.add('current-indicator');
        };

        // Función para posicionar cada slide horizontalmente
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };

        // 1. Inicializar: Distribuir las slides
        slides.forEach(setSlidePosition);

        // 2. Evento del botón SIGUIENTE
        nextButton.addEventListener('click', e => {
            const currentSlide = document.querySelector('.current-slide');
            const currentIndex = slides.indexOf(currentSlide);
            const targetIndex = (currentIndex + 1) % slides.length; // Ciclo
            const nextSlide = slides[targetIndex];
            
            moveToSlide(currentSlide, nextSlide);
        });

        // 3. Evento del botón ANTERIOR
        prevButton.addEventListener('click', e => {
            const currentSlide = document.querySelector('.current-slide');
            const currentIndex = slides.indexOf(currentSlide);
            // Ciclo inverso: (currentIndex - 1 + length) % length
            const targetIndex = (currentIndex - 1 + slides.length) % slides.length; 
            const prevSlide = slides[targetIndex];
            
            moveToSlide(currentSlide, prevSlide);
        });

        // 4. Evento de los INDICADORES (puntos)
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', e => {
                const targetSlide = slides[index];
                const currentSlide = document.querySelector('.current-slide');
                moveToSlide(currentSlide, targetSlide);
            });
        });
        
        // 5. Autoplay (Desliza automáticamente cada 5 segundos)
        setInterval(() => {
            nextButton.click();
        }, 5000);
        
        // 6. Ajustar al redimensionar (para que el carrusel no se rompa)
        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].getBoundingClientRect().width;
            slides.forEach((slide, index) => {
                slide.style.left = newSlideWidth * index + 'px';
            });
            // Vuelve a posicionar el carrusel en la diapositiva actual
            const currentSlide = document.querySelector('.current-slide');
            const currentIndex = slides.indexOf(currentSlide);
            track.style.transform = 'translateX(-' + (currentIndex * newSlideWidth) + 'px)';
        });
    }
    
    // 5. LÓGICA DEL BOTÓN ME GUSTA (LIKE)
    const likeButtons = document.querySelectorAll('.like-button');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic afecte a otros elementos
            
            const isLiked = this.getAttribute('data-liked') === 'true';
            const songTitle = this.parentNode.querySelector('.song-title').textContent;
            
            if (isLiked) {
                // Si ya tiene "Me Gusta", lo quita
                this.setAttribute('data-liked', 'false');
                alert(`💔 Se eliminó el Me Gusta de: ${songTitle}`);
            } else {
                // Si no tiene "Me Gusta", lo activa
                this.setAttribute('data-liked', 'true');
                alert(`❤️ ¡Me Gusta registrado para: ${songTitle}!`);
            }
        });
    });
});