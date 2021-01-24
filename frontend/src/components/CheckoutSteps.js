import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const CheckoutSteps = ({ step }) => {
  const steps = ["Login", "Shipping", "Payment", "Place Order"];

  return (
    <Nav className="justify-content-center mb-4">
      {steps.map((name, idx) => {
        const link = name.split(" ").join("").toLowerCase();

        if (step > idx) {
          return (
            <Nav.Item key={idx}>
              <LinkContainer to={`/${link}`}>
                <Nav.Link>{name}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          );
        }

        return (
          <Nav.Link key={idx} disabled>
            {name}
          </Nav.Link>
        );
      })}
    </Nav>
  );
};
