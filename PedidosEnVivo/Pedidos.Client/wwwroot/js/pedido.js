"use strict";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7001/OrderNotificationHub")
    .withAutomaticReconnect()
    .build();

const sendButton = document.getElementById("sendButton");