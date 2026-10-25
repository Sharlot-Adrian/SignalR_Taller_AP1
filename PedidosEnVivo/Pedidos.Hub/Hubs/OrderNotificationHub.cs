using Microsoft.AspNetCore.SignalR;
using Pedidos.Shared.Contracts;
namespace Pedidos.HubServer.Hubs;

  public sealed class OrderNotificationHub : Microsoft.AspNetCore.SignalR.Hub
  {
    public async Task cambiaEstado(string nombreCliente, string estado, double total)
    {
        if (string.IsNullOrWhiteSpace(nombreCliente) || string.IsNullOrWhiteSpace(estado) || string.IsNullOrEmpty(total.ToString()))
        {
            throw new HubException("El nombre del cliente, el estado del pedido y el total son obligatorios.");
        }

        nombreCliente = nombreCliente.Trim();
        estado = estado.Trim();
        string[] estadosPermitidos = {"Pendiente", "En Preparacion", "Enviado", "Entregado"};

        if(nombreCliente.Length > 40 || total < 0)
        {
            throw new HubException("Datos del cliente o del pedido inválidos.");
        }

        if(string.IsNullOrWhiteSpace(estado)){
            throw new HubException("El estado es obligatorio.");
        }

        int orderNotificationId = Random.Shared.Next(10000,100000);

        var notificacion = new OrderNotification(orderNotificationId, nombreCliente,estado,total, DateTimeOffset.Now);
        await Clients.All.SendAsync("RecibirNotificacion", notificacion);
    }
  }
