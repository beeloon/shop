import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./screens/Home";
import { Cart } from "./screens/Cart";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Product } from "./screens/Product";

const App = () => (
  <BrowserRouter>
    <Header />
    <main className="py-3">
      <Container>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/product/:id" component={Product} />
      </Container>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
