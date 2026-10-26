--Validación en el servidor--

A pesar de que existen distintas validaciones en el formulario de registro de un pedido, en el backend se continúa evaluando que los datos sean válidos, que cumplan con la longitud establecida, que no estén vacíos, entre otras. Además, no se le permite al usuario ingresar un nuevo estado, sino que se le obliga a elegir uno de los ya existentes. Es decir, tanto la parte visual como el servidor se encargan de asegurar la integridad de los datos.

--Pasos de Ejecución--

Para lograr utilizar la web de pedidos en vivo se deben seguir los siguientes pasos:

Abrir el proyecto en Visual Studio Insiders.

Abrir dos terminales.

En la primera terminal, se debe ejecutar el comando dotnet run --project Pedidos.Hub --urls https://localhost:7001 para que corra el Pedidos.Hub en el local host.

En la segunda terminal, se debe ejecutar el comando dotnet run --project Pedidos.Client --urls https://localhost:7002, para que corra Pedidos.Cliente en el local host.

Abrir Pedidos.Cliente (https://localhost:7002) en dos pestañas del navegador de su preferencia.

Para crear un nuevo paquete, no es necesario ingresar un identificador de paquete. Esto se debe a que el sistema le asignará un id de forma automática. 

Continuando con el proceso para crear un nuevo paquete, es necesario agregar los campos: Nombre del cliente, total y estado, donde estado es un combo box para limitar al usuario a los cuatro estados de la diapositiva: Pendiente, En preparación, Enviado y Entregado.

El último paso para crear es darle al botón “Enviar.” Al hacer esto, se mantendrá visible la orden en la parte inferior del formulario. 
Para editar un pedido, se debe ingresar un identificador de pedido ya registrado, al ingresar el id existente, los otros campos se rellenan para que el usuario solo deba ingresar el cambio de estado. Después de que todos los campos están llenos, es hora de darle al botón de enviar y visualizar cómo el mensaje de la lista se actualiza de forma automática. 

Nota: En dado caso de agregar un Id no existente, el sistema asumirá que es un nuevo registro y le asigna un valor de id. 

Noa: Ahora colóquese sobre la segunda pestaña que se solicitó abrir, esto para visualizar como todo lo que fue agregado o actualizado en la primera pestaña se refleja sin intervención del usuario en la segunda. 

-- Explica cómo integrarías SignalR con una API REST --

Tengo entendido que el sistema funcionará de forma más eficiente utilizando la API Rest ya que esta se encargaría de hacer la creación, modificación y eliminación de datos sin que el sistema tenga depender únicamente de signalr como actualmente lo hace. Para entregarla no hace falta hacer una instalación, ya que forma parte del entorno ASP.NET Core. Ahora bien, para integrarla en mi proyecto es necesario crear un controlador. Esta clase controlador hereda de controller base y llevaría los atributos obligatorios de una API y desde la parte visual, se utiliza “fetch” en vez de hacer “invoke”. 

--Propón autenticación y autorización --
Si se fuese a incluir la autenticación y la autorización, tengo entendido que esto permitiría identificar correctamente a los usuarios para evitar fraude de identidad. Es decir, actualmente se confía en que al momento de llenar el formulario de ingreso, el cliente escriba su nombre pero no existe una forma de comprobar si es realmente quien dice ser. Ahora bien, con la autorización, se le retira la responsabilidad de asignar un estado al cliente y se permitirá que solo un grupo específico de usuarios puedan modificar los estados de un pedido. 

--Preguntas de cierre--

¿Qué problema resuelve SignalR? 
-Es una alternativa más eficiente de comunicación entre cliente y servidor, donde se hace una petición y se recibe una respuesta llega cuando hay nuevos datos. En otras palabras, es una forma de establecer la comunicación entre cliente y servidor evitando el polling, que es el patrón de comunicación del desarrollo web donde un cliente realiza peticiones de forma periódica y repetitiva al servidor para verificar si hay nuevos datos. 

¿Qué diferencia hay entre invoke() y on()? 
-Invoke es una llamada activa del cliente al servidor y se usa para ejecutar un método específico del Hub. Ahora bien, el on funciona como un eventlistener, es como que el cliente establezca que desde que haya una respuesta, el servidor debe hacer algo.

¿Qué función cumple MapHub()? 
-Crea el punto de acceso o endpoint para que el servidor se comunique con el cliente, sin él, aunque existiera un hub, el servidor no tendría forma de escuchar al cliente. 

¿Cuándo usar Clients.All y cuándo un grupo? 
-Se usa Clients.All cuando quiero que el mensaje le llegue a todo cliente activo en el hub. Ahora bien, el grupo se utiliza cuando quiero que le llegue a un grupo específico de clientes activos. 

¿Qué ventajas ofrece Shared? 
-La ventaja es tener un solo folder donde se pueden escribir contratos que utilizarán tanto cliente como servidor para poder comunicarse correctamente. Gracias a Shared, cliente y servidor conocen el modelo de datos. 

¿Por qué la validación debe existir en el servidor? 
-Para asegurar la integridad de los datos y evitar errores en el tiempo de ejecución. 
 
¿Qué información persistirías en una app empresarial? 
-En una empresa se debe programar pensando en la estrategia de persistencia. En otras palabras, se debe garantizar la integridad, seguridad, escalabilidad y trazabilidad. En el código, esto se puede lograr de distintas formas, entre ellas asignando un id a cada pedido, asignando un usuario a cada cliente para validar su identidad, registrando las fechas de creación y actualización, mantenimiento historial de transacciones, etc. En pocas palabras, es hacer lo posible para poder mantener el orden y la trazabilidad de cualquier acción dentro del sistema. 

¿Cómo integrarías autenticación y autorización? 
-Creando un inicio de sesión y asignando roles según el tipo de usuario que se conecte. 
