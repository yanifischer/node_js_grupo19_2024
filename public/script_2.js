document.addEventListener('DOMContentLoaded', () =>{
    const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const editarUsuarioForm = document.getElementById('editarUsuarioForm');
    const listarUsuariosBtn = document.getElementById('listarUsuariosBtn');
    const listaUsuarios = document.getElementById('listaUsuarios');


    //mostrar u ocultar el form de creación de usuario

    mostrarCrearUsuarioFormBtn.addEventListener('click',() => 
    {
        crearUsuarioForm.classList.toggle('hidden');
    });


    //CREARNOS UN NUEVO USUARIP


    crearUsuarioForm.addEventListener('submit', async (e) =>
    {  
         console.log("Hola"); //test
        e.preventDefault();
        const formData = new FormData(crearUsuarioForm);
        const data = 
        {
            nombre: formData.get('nombre'),
            apellido : formData.get('apellido'),
            mail: formData.get('mail'),
            cel: formData.get('cel')
        }

        const response = await fetch ('/clientes',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
         console.log("Hola2"); //test
        alert("Cliente Registrado Con EXITO");

        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();

    });



    //EDITAR USUARIO
    editarUsuarioForm.addEventListener('submit', async(e) => 
    {
        e.preventDefault();
        const formData = new FormData(editarUsuarioForm);
        const id = formData.get('editID');
        const data = 
        {
            nombre: formData.get('editNombre'),
            apellido : formData.get('editApellido'),
            mail: formData.get('editMail'),
            cel: formData.get('editCel')
        }

        const response = await fetch(`/clientes/${id}`,
        {
            method: 'PUT',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        editarUsuarioForm.reset();
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();

    });




    //listar todos los usuarios

    listarUsuariosBtn.addEventListener('click', listarUsuarios);

    async function listarUsuarios()
    {
        const response = await fetch('/clientes');
        const usuarios = await response.json();
        listaUsuarios.innerHTML='';//limpio la lista de usuarios

        console.log("Hola"); //test

        usuarios.forEach(usuario => {
             console.log("Hola"); //test
            const li = document.createElement('li');
            li.innerHTML = `
                <span> ID: ${usuario.id}, Nombre: ${usuario.nombre}, Apellido: ${usuario.apellido}, Email: ${usuario.mail}, Cel:${usuario.cel}  </span>
                <div class="actions"> 
                    <button class="update" data-id="${usuario.id}" data-nombre="${usuario.nombre}" data-apellido="${usuario.apellido}" data-mail="${usuario.mail}" data-cel="${usuario.cel}" > </button> 

                    <button class="delete" data-id="${usuario.id}"> </button>

                </div>
            `;

            listaUsuarios.appendChild(li);
        });

 console.log("Hola"); //test
        document.querySelectorAll('.update').forEach(button => 
            {
                button.addEventListener('click',(e) => 
                {
                    const id = e.target.getAttribute('data-id');                    
                    const nombre = e.target.getAttribute('data-nombre');                    
                    const apellido = e.target.getAttribute('data-apellido');                    
                    const mail = e.target.getAttribute('data-mail');
                    const cel = e.target.getAttribute('data-cel');

                    document.getElementById('editID').value = id;
                    document.getElementById('editNombre').value = nombre;
                    document.getElementById('editApellido').value = apellido;
                    document.getElementById('editMail').value = mail;
                    document.getElementById('editCel').value = cel;

                    editarUsuarioForm.classList.remove('hidden');
                });
            });

            document.querySelectorAll('.delete').forEach(button => 
                {
                    button.addEventListener('click', async(e)=>
                    {
                        const id = e.target.getAttribute('data-id');
                        const response = await fetch(`/clientes/${id}`,{
                            method: 'DELETE'
                        });

                        const result = await response.json();
                        alert(result.message);
                        listarUsuarios();
                    });

                });


    }

});
