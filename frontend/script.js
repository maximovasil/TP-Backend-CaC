document.addEventListener('DOMContentLoaded', () => {
  const autorForm = document.getElementById('autorForm');
  const libroForm = document.getElementById('libroForm');
  const autoresList = document.getElementById('autoresList');
  const librosList = document.getElementById('librosList');
  const buscarAutoresBtn = document.getElementById('buscarAutores');
  const buscarAutorPorIdBtn = document.getElementById('buscarAutorPorId');
  const buscarLibrosBtn = document.getElementById('buscarLibros');
  const buscarLibrosPorAutorBtn = document.getElementById('buscarLibrosPorAutor');

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

  const fetchAutorPorId = async (id) => {
    const response = await fetch(`/api/autores/${id}`);
    const autor = await response.json();
    autoresList.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = `${autor.nombre} ${autor.apellido} (ID: ${autor.id_autor})`;
    autoresList.appendChild(li);
  };

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

  const fetchLibrosPorAutor = async (idAutor) => {
    const response = await fetch(`/api/libros/autor/${idAutor}`);
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
  });

  buscarAutoresBtn.addEventListener('click', fetchAutores);
  buscarAutorPorIdBtn.addEventListener('click', () => {
    const autorId = document.getElementById('autorId').value;
    fetchAutorPorId(autorId);
  });

  buscarLibrosBtn.addEventListener('click', fetchLibros);
  buscarLibrosPorAutorBtn.addEventListener('click', () => {
    const autorLibrosId = document.getElementById('autorLibrosId').value;
    fetchLibrosPorAutor(autorLibrosId);
  });
});
