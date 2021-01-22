import { Form } from "react-bootstrap";

export const QuantityForm = ({ context, qty, func }) => {
  return (
    <Form.Control as="select" value={qty} onChange={func}>
      {[...Array(context.countInStock).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </Form.Control>
  );
};
