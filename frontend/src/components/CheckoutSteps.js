import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const createNavItem = (step, link, text) => {
  if (step) {
    return (
      <Nav.Item>
        <LinkContainer to={link}>
          <Nav.Link>{text}</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    );
  }
  return <Nav.Link disabled>{text}</Nav.Link>;
};

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      {createNavItem(step1, "/login", "Sign In")}
      {createNavItem(step2, "/shipping", "Shipping")}
      {createNavItem(step3, "/payment", "Payment")}
      {createNavItem(step4, "/placeorder", "Place Order")}
    </Nav>
  );
};
