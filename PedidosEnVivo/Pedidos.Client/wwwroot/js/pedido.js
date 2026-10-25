"use strict";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7001/OrderNotificationHub")
    .withAutomaticReconnect()
    .build();

const userInput = document.getElementById("userInput");
const estadoPedido = document.getElementById("estadoPedido");
const totalInput = document.getElementById("totalInput");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");
const messagesList = document.getElementById("messagesList");

connection.on("RecibirNotificacion", (notificacion) =>{
    const item = document.createElement("li");
    item.style.whiteSpace = "pre-line";

    item.textContent = `Pedido: ${notificacion.OrderNotificationId} 
    del cliente: ${notificacion.nombreCliente} 
    - Estado: ${notificacion.estado} 
    - Total: ${notificacion.total}\n 
    Fecha Pedido: ${notificacion.fechaCreacion}`;
    messagesList.appendChild(item);
});

connection.onreconnecting(() =>{
    status.textContent = "Reconectando..."
    sendButton.disabled = true;
});
connection.onreconnected(() =>{
    status.textContent = "Conectado."
    sendButton.disabled = false;
});

async function startConnection(){
    try{
        await connection.start();
        status.textContent = "Conectado";
        sendButton.disabled = false;
    }catch(error){
        status.textContent = "Error de Conexión";
        console.error(error);
    }
}
    sendButton.addEventListener("click", async () =>{
    const nombreCliente = document.getElementById("userInput").value.trim();
    const estado = document.getElementById("estadoPedido").value;
    const total = parseFloat(document.getElementById("totalInput").value);

    if (!nombreCliente || !estado || !total){
        alert("Completa los campos.");
        return;
    }

    if(connection.state !== signalR.HubConnectionState.Connected){
        alert("No existe una conexión activa.");
        return;
    }

    try{
        await connection.invoke("cambiaEstado", nombreCliente,estado,total);

        document.getElementById("userInput").value = "";
        document.getElementById("totalInput").value = "";
        document.getElementById("estadoPedido").selectedIndex = 0;
    }catch(error){
        console.error("no se pudo enviar correctamente: ", error);
    }
});
startConnection();