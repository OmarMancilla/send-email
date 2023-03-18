// se asegura de que se descargue el codigo HTML con lo sig
document.addEventListener('DOMContentLoaded', function() {
// este objeto se crea ya que se haya terminado tdo el proceso del email, asunto y mensaje y es para activar el btnenviar
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    //Seleccionar los elementos del interfaz
    const inputEmail = document.querySelector('#email');
    const inputccDestinatario = document.querySelector('#cc-destinatario');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); 
    const btnReset = document.querySelector('#formulario button[type="reset"]'); 
    const spinner = document.querySelector('#spinner');
   /* //Asignar eventos 
    inputEmail.addEventListener('blur', function(e){
        console.log(e.target.value);


        // 'blur' = se activa cada que se sale del input (franja de texto)
        // 'input' =  se activa cada que escribimos
    });
 //NOTA:   con la funcion validar se resume esta funcion en las siguientes
    */

    //Asignar eventos
    inputEmail.addEventListener('input', validar); // se cambia de blur a imput por ser en tiempo real
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputccDestinatario.addEventListener('input', validar2);

    formulario.addEventListener('submit', enviarEmail);


    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        // Reiniciar el objeto
    resetFormulario();
    });

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex'); // se agrega el flex en el lugar del hiden (aparece el logo de enviando)
        spinner.classList.remove('hidden'); // se quita el hiden para que actue el flex (quita el logo de enviando)

        //simulacion de tiempo de envio del ms con un tiempo de 3000milisegundos (3s). se hace el proceso anterior al inverso
        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');


            // Reiniciar el objeto
            resetFormulario();

            // Crear alerta de exito
            const alertaExito = document.createElement('P');     // 'P' crea un parrafo.   esto se agrega al formulario
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-bold', 'text-sm', 'upper-case');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            setTimeout(()=>{ // con esto se quita la alerta exito para que no se quede ahi 
                alertaExito.remove();
            }, 3000);


        }, 3000);
    }


    function validar (e){
        if(e.target.value.trim() === ''){         // el trim() es un string que para evitar los espacios en blanco
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);  //para que aparesca al pie se agrega e.target.parentElement (elemento padre) 
           email[e.target.name] = ''; // hace que se reinicie y se pueda bloquear la opcion de enviar. se coloca tambien en el if siguiente
            comprobarEmail();    // se llama la funcion por si se borra el correo. hace que se bloque la funcion de enviar. antes del return para que la lea.
            return; // se coloca para evitar el else y detiene el codigo.
           
        } 
        if(e.target.id === 'email' && !validarEmail(e.target.value)){ // se deben de poner las dos condicionantes si no no funciona y aplica a todos los canpos.
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = ''; // hace que se reinicie y se pueda bloquear la opcion de enviar.
            comprobarEmail(); // se llama la funcion por si se borra el correo. hace que se bloque la funcion de enviar. antes del return para que la lea
            return;
                    }
            //limpiar alerta
        limpiarAlerta(e.target.parentElement);

        // Asignar valores (para que desbloque la opcion de enviar)
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el objeto Email
        comprobarEmail();


    }

    function validar2(e){
        if(e.target.value.trim() !=='' && !validarEmail(e.target.value)){
        mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = ''; // hace que se reinicie y se pueda bloquear la opcion de enviar.
            comprobarEmail(); // se llama la funcion por si se borra el correo. hace que se bloque la funcion de enviar. antes del return para que la lea
            return;
        };
        //limpiar alerta
        limpiarAlerta(e.target.parentElement);

    };

    function mostrarAlerta(mensaje, referencia){   // con innerHTML se puede pero es mas seguro con esta forma
        //Compruebe si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
        
        //Generar alerta HTML
        const error = document.createElement('P')   // crea un parrafo y se imprime con textContent
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'uppercase', 'text-center'); // le da color al mensaje y lo resalta

        //utilizando innerHTML sustituye todo. es mejor con appendChild()
        // formulario.innerHTML = error.inner.HTML

        // Inyectar el error al formulario. ( lo muestra en pantalla el mensaje en la parte inferior)
        referencia.appendChild(error);         // en el lugar de formulario se le coloca referencia y asi se imprime abajo del que corresponde
   
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    //Expresion regular se usa para poner condicionantes. como el correo y num de tarjetas de credito
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;  //La busca en internet como expresion regular para email en javaScript
        const resultado = regex.test(email);
        return resultado;
    
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50'); // se agrega para que cuando falte el gmail esto bloquee el boton enviar
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

        /* codigo que estaba agregado aif de comprobarEmail        
        else{     // para eliminar el else se agrega un return dentro del if
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
        */
    }

    function resetFormulario(){
        // Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail(); // para que se reinicie junto con el boton de enviar se debe llamar esta funcion
  
    }

} );