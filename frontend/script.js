document.addEventListener('DOMContentLoaded', () => {
    const autorForm = document.getElementById('autorForm');
    const libroForm = document.getElementById('libroForm');
    const autoresList = document.getElementById('autoresList');
    const librosList = document.getElementById('librosList');
  
    // Fetch and display autores
    const fetchAutores = async () => {
      const response = await fetch('/api/autores');
      const autores = await response.json();
      autoresList.innerHTML = '';
      autores.forEach(autor => {
        const li = document.createElement('li');
        li.textContent = `${autor.nombre} ${autor.apellido} (ID: ${autor.id_autor})`;
        autoresList.appendChild(li);
      });
    };
  
    // Fetch and display libros
    const fetchLibros = async () => {
      const response = await fetch('/api/libros');
      const libros = await response.json();
      librosList.innerHTML = '';
      libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} (ID: ${libro.id_libro})`;
        librosList.appendChild(li);
      });
    };
  
    autorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const autor = {
        nombre: autorForm.nombre.value,
        apellido: autorForm.apellido.value,
        nacionalidad: autorForm.nacionalidad.value,
        fecha_nacimiento: autorForm.fecha_nacimiento.value
      };
      await fetch('/api/autores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
      });
      fetchAutores();
    });
  
    libroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const libro = {
        titulo: libroForm.titulo.value,
        genero: libroForm.genero.value,
        fecha_publicacion: libroForm.fecha_publicacion.value,
        id_autor: libroForm.id_autor.value
      };
      await fetch('/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
      });
      fetchLibros();
    });
  
    fetchAutores();
    fetchLibros();
  });
  