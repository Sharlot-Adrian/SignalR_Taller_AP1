using System;
using System.Collections.Generic;
using System.Text;

namespace Pedidos.Shared.Contracts;

public sealed record OrderNotification(int OrderNotificationId,
    string NombreCliente,
    string Estado,
    double Total, 
    DateTimeOffset FechaCreacion);

