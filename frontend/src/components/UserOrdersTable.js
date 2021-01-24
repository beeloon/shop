import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const UserOrdersTable = ({ orders }) => {
  const icon = <i className="fas fa-times" style={{ color: "red" }}></i>;

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Delivered</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, 10) : icon}</td>
            <td>
              {order.isDelivered ? order.deliveredAt.substring(0, 10) : icon}
            </td>
            <td>
              <LinkContainer to={`/order/${order._id}`}>
                <Button variant="light">Details</Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
