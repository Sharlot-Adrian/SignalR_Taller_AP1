"use strict";
//Cadena de conexion
const connection = 
new signalR.HubConnectionBuilder()
.withUrl("https://localhost:7001/chatHub")
.withAutomaticReconnect()
.build();
//Referencia a las paginas
const sendButton =
    document.getElementById("sendButton");
const status =
    document.getElementById("status");
const messagesList =
    document.getElementById("messagesList");
//Recibir el evento
connection.on("ReceiveMessage", (message) => {
    const item = document.createElement("li");
    item.style.whiteSpace = "pre-line";
    item.textContent =
        `${message.user}: ${message.message} \n Hora envio: ${message.sentAt}`;
    messagesList.appendChild(item);
});
//Botones de salas
let salaActual = "General";
const botonDesarrollo =
    document.getElementById("btnDesarrollo");
const botonDisenio = document.getElementById("btnDisenio");

botonDesarrollo.addEventListener("click", () => {
    salaActual = "Desarrollo";
    connection.invoke("UnirseSala", salaActual)
});

botonDisenio.addEventListener("click", () => {
    salaActual = "Diseño";
    connection.invoke("UnirseSala", salaActual)
});
//Conexion
connection.onreconnecting(() =>{
    status.textContent = "Reconectando...";
    sendButton.disabled = true;
});

connection.onreconnected(() =>{
    status.textContent = "Conectado";
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
//Leer campos
sendButton.addEventListener("click", async () =>{
    const user = document
        .getElementById("userInput").value.trim();
    const message = document
        .getElementById("messageInput").value.trim();
if(!user || !message){
    alert("Completa el usuario y el mensaje.");
    return;
}
//Verificar conexion
if(connection.state !== signalR.HubConnectionState.Connected){
    alert("No existe una conexión activa.");
    return;
}

    try {
        if (salaActual == "General") {
            await connection.invoke(
                "SendMessage", user, message);
        } else {
            await connection.invoke("enviarParaSala", salaActual, user, message);
        }
    document.getElementById("messageInput").value = "";
}catch(error){
    console.error("No se pudo enviar el mensaje: ", error);
}

});

startConnection();
