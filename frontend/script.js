document.addEventListener('DOMContentLoaded', () => {
  const autorForm = document.getElementById('autorForm');
  const libroForm = document.getElementById('libroForm');
  const autoresTableBody = document.querySelector('#autoresTable tbody');
  const librosTableBody = document.querySelector('#librosTable tbody');
  const buscarAutoresBtn = document.getElementById('buscarAutores');
  const buscarAutorPorIdBtn = document.getElementById('buscarAutorPorId');
  const buscarLibrosBtn = document.getElementById('buscarLibros');
  const buscarLibrosPorAutorBtn = document.getElementById('buscarLibrosPorAutor');
  const messageDiv = document.getElementById('message');
  const resetTablesBtn = document.getElementById('resetTables');

  const showMessage = (msg, isError = false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? 'red' : 'green';
    setTimeout(() => {
      messageDiv.textContent = '';
    }, 3000);
  };

  const fetchAutores = async () => {
    try {
      const response = await fetch('/api/autores');
      if (!response.ok) throw new Error('Error fetching autores');
      const autores = await response.json();
      autoresTableBody.innerHTML = '';
      autores.forEach(autor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${autor.id_autor}</td>
          <td>${autor.nombre}</td>
          <td>${autor.apellido}</td>
          <td>${autor.nacionalidad}</td>
          <td>${autor.fecha_nacimiento}</td>
          <td>
            <button onclick="window.editarAutor(${autor.id_autor})">Editar</button>
            <button onclick="window.eliminarAutor(${autor.id_autor})">Eliminar</button>
          </td>
        `;
        autoresTableBody.appendChild(tr);
      });
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  const fetchAutorPorId = async (id) => {
    try {
      const response = await fetch(`/api/autores/${id}`);
      if (!response.ok) throw new Error('Error fetching autor');
      const autor = await response.json();
      autoresTableBody.innerHTML = '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${autor.id_autor}</td>
        <td>${autor.nombre}</td>
        <td>${autor.apellido}</td>
        <td>${autor.nacionalidad}</td>
        <td>${autor.fecha_nacimiento}</td>
        <td>
          <button onclick="window.editarAutor(${autor.id_autor})">Editar</button>
          <button onclick="window.eliminarAutor(${autor.id_autor})">Eliminar</button>
        </td>
      `;
      autoresTableBody.appendChild(tr);
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  const fetchLibros = async () => {
    try {
      const response = await fetch('/api/libros');
      if (!response.ok) throw new Error('Error fetching libros');
      const libros = await response.json();
      librosTableBody.innerHTML = '';
      libros.forEach(libro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${libro.id_libro}</td>
          <td>${libro.titulo}</td>
          <td>${libro.genero}</td>
          <td>${libro.fecha_publicacion}</td>
          <td>${libro.id_autor}</td>
          <td>
            <button onclick="window.editarLibro(${libro.id_libro})">Editar</button>
            <button onclick="window.eliminarLibro(${libro.id_libro})">Eliminar</button>
          </td>
        `;
        librosTableBody.appendChild(tr);
      });
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  const fetchLibrosPorAutor = async (idAutor) => {
    try {
      const response = await fetch(`/api/libros/autor/${idAutor}`);
      if (!response.ok) throw new Error('Error fetching libros por autor');
      const libros = await response.json();
      librosTableBody.innerHTML = '';
      libros.forEach(libro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${libro.id_libro}</td>
          <td>${libro.titulo}</td>
          <td>${libro.genero}</td>
          <td>${libro.fecha_publicacion}</td>
          <td>${libro.id_autor}</td>
          <td>
            <button onclick="window.editarLibro(${libro.id_libro})">Editar</button>
            <button onclick="window.eliminarLibro(${libro.id_libro})">Eliminar</button>
          </td>
        `;
        librosTableBody.appendChild(tr);
      });
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  window.editarAutor = async (id) => {
    try {
      const nombre = prompt('Nuevo nombre:');
      if (!nombre) throw new Error('Nombre es requerido');
      const apellido = prompt('Nuevo apellido:');
      if (!apellido) throw new Error('Apellido es requerido');
      const nacionalidad = prompt('Nueva nacionalidad:');
      const fecha_nacimiento = prompt('Nueva fecha de nacimiento (YYYY-MM-DD):');
      if (!fecha_nacimiento) throw new Error('Fecha de nacimiento es requerida');
      const response = await fetch(`/api/autores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, nacionalidad, fecha_nacimiento })
      });
      if (!response.ok) throw new Error('Error updating autor');
      showMessage('Autor actualizado exitosamente.');
      fetchAutores();
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  window.eliminarAutor = async (id) => {
    try {
      const response = await fetch(`/api/autores/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error deleting autor');
      showMessage('Autor eliminado exitosamente.');
      fetchAutores();
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  window.editarLibro = async (id) => {
    try {
      const titulo = prompt('Nuevo título:');
      if (!titulo) throw new Error('Título es requerido');
      const genero = prompt('Nuevo género:');
      if (!genero) throw new Error('Género es requerido');
      const fecha_publicacion = prompt('Nueva fecha de publicación (YYYY-MM-DD):');
      if (!fecha_publicacion) throw new Error('Fecha de publicación es requerida');
      const id_autor = prompt('Nuevo ID de autor:');
      if (!id_autor) throw new Error('ID de autor es requerido');
      const response = await fetch(`/api/libros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, genero, fecha_publicacion, id_autor })
      });
      if (!response.ok) throw new Error('Error updating libro');
      showMessage('Libro actualizado exitosamente.');
      fetchLibros();
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  window.eliminarLibro = async (id) => {
    try {
      const response = await fetch(`/api/libros/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error deleting libro');
      showMessage('Libro eliminado exitosamente.');
      fetchLibros();
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  autorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const nombre = autorForm.nombre.value;
      if (!nombre) throw new Error('Nombre es requerido');
      const apellido = autorForm.apellido.value;
      if (!apellido) throw new Error('Apellido es requerido');
      const nacionalidad = autorForm.nacionalidad.value;
      const fecha_nacimiento = autorForm.fecha_nacimiento.value;
      if (!fecha_nacimiento) throw new Error('Fecha de nacimiento es requerida');
      const autor = { nombre, apellido, nacionalidad, fecha_nacimiento };
      const response = await fetch('/api/autores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
      });
      if (!response.ok) throw new Error('Error adding autor');
      showMessage('Autor agregado exitosamente.');
      autorForm.reset();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  libroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const titulo = libroForm.titulo.value;
      if (!titulo) throw new Error('Título es requerido');
      const genero = libroForm.genero.value;
      if (!genero) throw new Error('Género es requerido');
      const fecha_publicacion = libroForm.fecha_publicacion.value;
      if (!fecha_publicacion) throw new Error('Fecha de publicación es requerida');
      const id_autor = libroForm.id_autor.value;
      if (!id_autor) throw new Error('ID de autor es requerido');
      const libro = { titulo, genero, fecha_publicacion, id_autor };
      const response = await fetch('/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
      });
      if (!response.ok) throw new Error('Error adding libro');
      showMessage('Libro agregado exitosamente.');
      libroForm.reset();
    } catch (error) {
      showMessage(error.message, true);
    }
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
  
  resetTablesBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/reset', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Error al reiniciar las tablas');
      showMessage('Tablas reiniciadas exitosamente.');
      fetchAutores();
      fetchLibros();
    } catch (error) {
      showMessage(error.message, true);
    }
  });
});
