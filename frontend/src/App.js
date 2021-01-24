import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import { Register } from "./screens/Register";
import { Product } from "./screens/Product";
import { Cart } from "./screens/Cart";
import { Shipping } from "./screens/Shipping";
import { Payment } from "./screens/Payment";
import { Order } from "./screens/Order";
import { PlaceOrder } from "./screens/PlaceOrder";

export const App = () => (
  <BrowserRouter>
    <Header />
    <main className="py-3">
      <Container>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/order/:id" component={Order} />
        <Route path="/profile" component={Profile} />
        <Route path="/product/:id" component={Product} />
      </Container>
    </main>
    <Footer />
  </BrowserRouter>
);
