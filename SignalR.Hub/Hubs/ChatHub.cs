using Microsoft.AspNetCore.SignalR;
using SignalR.Shared.Contracts;
using System.Linq.Expressions;

namespace SignalR.HubServer.Hubs;

public sealed class ChatHub : Microsoft.AspNetCore.SignalR.Hub
{
    public async Task SendMessage(string user, string message)
    {
        if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(message))
        {
            throw new HubException("El usuario y el mensaje son obligatorios.");
        }

        user = user.Trim();
        message = message.Trim();

        if (user.Length > 40 || message.Length > 1000)
        {
            throw new HubException("El mensaje supera el límite permitido.");
        }

        var chatMessage = new ChatMessage(user, message, DateTimeOffset.UtcNow);

        await Clients.All.SendAsync("ReceiveMessage", chatMessage);
    }

    public async Task UnirseSala(string nombreSala)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, nombreSala);

        var llegadaMensaje = new ChatMessage("Sistema", $"Un nuevo usuario se ha unido a {nombreSala}", DateTimeOffset.UtcNow);
        await Clients.Group(nombreSala).SendAsync("ReceiveMessage",llegadaMensaje);
    }

    public async Task enviarParaSala(string nombreSala, string user, string message)
    {
        if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(message))
        {
            throw new HubException("El usuario y el mensaje son obligatorios.");
        }

        user = user.Trim();
        message = message.Trim();

        if (user.Length > 40 || message.Length > 1000)
        {
            throw new HubException("El mensaje supera el límite permitido.");
        }

        var chatMessage = new ChatMessage(user, message, DateTimeOffset.UtcNow);

        await Clients.Group(nombreSala).SendAsync("ReceiveMessage",chatMessage);
    }
}
