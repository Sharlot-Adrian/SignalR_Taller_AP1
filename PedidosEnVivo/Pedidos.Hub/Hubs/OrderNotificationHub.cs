using Microsoft.AspNetCore.SignalR;
using Pedidos.Shared.Contracts;
namespace Pedidos.HubServer.Hubs;

  public sealed class OrderNotificationHub : Microsoft.AspNetCore.SignalR.Hub
  {
    private static readonly List<OrderNotification> listaPedidos = new List<OrderNotification>();
    private static int idSimulado = 1;
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
        var notificacion = new OrderNotification(idSimulado++, nombreCliente,estado,total, DateTimeOffset.Now);
        listaPedidos.Add(notificacion);

        await Clients.All.SendAsync("RecibirNotificacion", notificacion);
    }

    public async Task ActualizarPedido(int orderNotificationId, string nombreCliente, string estado, double total)
    {
        var index = listaPedidos.FindIndex(p => p.OrderNotificationId == orderNotificationId);
        if(index < 0)
        {
            throw new HubException("No se encontro el pedido.");
        }

        var pedidoDesactualizado = listaPedidos[index];

        var PedidoActualizacion = new OrderNotification(orderNotificationId, nombreCliente,estado,total, pedidoDesactualizado.FechaCreacion);
        listaPedidos[index] = PedidoActualizacion;
        await Clients.All.SendAsync("RecibirNotificacion", PedidoActualizacion);
    }
  }
