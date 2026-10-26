--Pasos de Ejecución-- 

Para lograr utilizar la web de pedidos en vivo se deben seguir los siguientes pasos:

1. Abrir el proyecto en Visual Studio Insiders.

2. Abrir dos terminales.

3. En la primera terminal, se debe ejecutar el comando dotnet run --project SignalR.Hub --urls https://localhost:7001 para que corra el SignalR.Hub en el local host.

4. En la segunda terminal, se debe ejecutar el comando dotnet run --project SignalR.Client --urls https://localhost:7002, para que corra SignalR.Cliente en el local host.

5. Abrir SignalR.Cliente (https://localhost:7002) en dos pestañas del navegador de su preferencia.

6. Ingresar su nombre y el mensaje que desea enviar. 

7. Presione el botón de “Enviar” para realizar el envío de su mensaje. Nota: Al hacerlo de esta forma, todos los usuarios conectados al Hub verán su mensaje. 

8. Podrá visualizar su mensaje en la parte inferior del formulario, acompañado de la hora en la que se envió. 


--Salas--
En el formulario de mensaje existen dos botones: uno con el texto Desarrollo y el otro con texto de Diseño. Estos botones permiten redirigir al usuario a salas independientes donde los mensajes sólo son visibles para los usuarios que se encuentren conectados a esa misma sala. 
En otras palabras, un usuario que esté conectado en Desarrollo no podrá ver los mensajes enviados en la sala Diseño. Además, cuando un usuario se une a una sala, sale un mensaje anunciando su llegada.
Nota: Ahora colóquese sobre la segunda pestaña y envíe mensajes sin antes ingresar a una sala, podrá ver cómo el mensaje es visible para la primera pestaña. Asimismo, use su primera pestaña e ingrese a la sala de Desarrollo y envie un mensaje y verá que no se refleja en la segunda  pestaña. 


