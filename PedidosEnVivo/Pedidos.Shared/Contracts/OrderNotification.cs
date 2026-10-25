using System;
using System.Collections.Generic;
using System.Text;

namespace Pedidos.Shared.Contracts;

public sealed record OrderNotification(int OrderNotificationId,
    string nombreCliente,
    string estado,
    double total, 
    DateTimeOffset fechaCreacion);

