import { Adddress } from "./adddress";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
    customer:Customer;
    order:Order;
    shippingAddress:Adddress;
    billingAddress:Adddress;
    orderItems:OrderItem[];
}
