"use strict";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7001/OrderNotificationHub")
    .withAutomaticReconnect()
    .build();

const idInput = document.getElementById("IdInput");
const userInput = document.getElementById("userInput");
const estadoPedido = document.getElementById("estadoPedido");
const totalInput = document.getElementById("totalInput");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");
const messagesList = document.getElementById("messagesList");
const pedidosLocales = new Map();

connection.on("RecibirNotificacion", (notificacion) =>{
    pedidosLocales.set(notificacion.orderNotificationId, notificacion);

    let item = document.getElementById(`pedido-ui-${notificacion.orderNotificationId}`);
    if(!item){
        item = document.createElement("li");
        item.id = `pedido-ui-${notificacion.orderNotificationId}`;
        item.style.whiteSpace = "pre-line";
        messagesList.appendChild(item);
    } 

    item.textContent = `Pedido: ${notificacion.orderNotificationId} 
    del cliente: ${notificacion.nombreCliente} 
    - Estado: ${notificacion.estado} 
    - Total: ${notificacion.total}\n 
    Fecha Pedido: ${notificacion.fechaCreacion}`;
});

idInput.addEventListener("input",() =>{
    const idTexto = idInput.value.trim();
    const idBuscado = idTexto ? parseInt(idTexto,10) : 0;

    if(pedidosLocales.has(idBuscado)){
        const pedido = pedidosLocales.get(idBuscado);
        userInput.value = pedido.nombreCliente;
        estadoPedido.value = pedido.estado;
        totalInput.value = pedido.total;
    }
    else
    {
        userInput.value = "";
        estadoPedido.selectedIndex = 0;
        totalInput.value = "";
    }
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
    const idText = idInput.value.trim();
    const orderId = idText? parseInt(idText) : 0; 

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
        if(orderId > 0)
        {
            await connection.invoke("ActualizarPedido", orderId, nombreCliente, estado, total);
        }
        else
        {
            await connection.invoke("cambiaEstado", nombreCliente,estado,total);
        }
        document.getElementById("IdInput").value = "";
        document.getElementById("userInput").value = "";
        document.getElementById("totalInput").value = "";
        document.getElementById("estadoPedido").selectedIndex = 0;
    }catch(error){
        console.error("no se pudo enviar correctamente: ", error);
    }
});
startConnection();