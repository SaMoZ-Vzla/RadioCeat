document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.admin-nav a');
    const sections = document.querySelectorAll('.admin-section');
    
    // Elementos de la sección Noticias
    const noticiasSection = document.getElementById('noticias');
    const contentList = noticiasSection.querySelector('.content-list');
    const addButton = noticiasSection.querySelector('.add-button');

    // Inicializar o cargar noticias desde localStorage
    let noticias = JSON.parse(localStorage.getItem('radioceat_noticias')) || [];

    // ===============================================
    // FUNCIONES DE UTILIDAD (CRUD SIMULADO)
    // ===============================================

    function saveNoticias() {
        localStorage.setItem('radioceat_noticias', JSON.stringify(noticias));
        renderNoticiasList();
    }
    
    // Función para renderizar la lista en el panel de admin
    function renderNoticiasList() {
        contentList.innerHTML = ''; // Limpia la lista actual

        if (noticias.length === 0) {
            contentList.innerHTML = '<p style="padding: 15px; color: #777;">No hay noticias publicadas.</p>';
            return;
        }

        noticias.forEach((noticia, index) => {
            const item = document.createElement('div');
            item.classList.add('list-item');
            
            // Usamos el índice como ID simulado
            item.innerHTML = `
                <span class="item-title">${noticia.titulo}</span>
                <span class="item-date">Fecha: ${noticia.fecha}</span>
                <div class="item-actions">
                    <button class="edit-btn" data-index="${index}">✏️ Editar</button>
                    <button class="delete-btn" data-index="${index}">🗑️ Eliminar</button>
                </div>
            `;
            contentList.appendChild(item);
        });
    }

    // ===============================================
    // MANEJO DE EVENTOS (CRUD)
    // ===============================================
    
    addButton.addEventListener('click', function() {
        // En un proyecto real, se mostraría un modal con campos. Aquí usamos prompt.
        const titulo = prompt("Título de la nueva noticia:");
        const contenido = prompt("Contenido (Resumen):");
        const imagenUrl = prompt("URL de la imagen (ej: assets/img/noticiaX.jpg):");

        if (titulo && contenido && imagenUrl) {
            const nuevaNoticia = {
                titulo: titulo.substring(0, 50), // Limitar el título
                resumen: contenido.substring(0, 150), // Limitar el resumen
                imagen: imagenUrl,
                fecha: new Date().toLocaleDateString('es-ES')
            };
            noticias.unshift(nuevaNoticia); // Añadir al principio
            saveNoticias();
            alert("Noticia agregada con éxito.");
        } else if (titulo || contenido || imagenUrl) {
            alert("Operación cancelada o faltan campos.");
        }
    });

    contentList.addEventListener('click', function(e) {
        const index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('delete-btn')) {
            if (confirm(`¿Estás seguro de eliminar "${noticias[index].titulo}"?`)) {
                noticias.splice(index, 1);
                saveNoticias();
            }
        }
        // La funcionalidad de editar se implementaría de forma similar.
    });


    // ===============================================
    // NAVEGACIÓN Y CONFIGURACIÓN INICIAL
    // ===============================================
    
    function showSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active-content');
        });
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active-content');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault(); 
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                showSection(targetId);
            }
        });
    });

    // Cargar y renderizar al iniciar
    renderNoticiasList();
    showSection('#dashboard');
    document.querySelector('.admin-nav a[href="#dashboard"]').classList.add('active');
});