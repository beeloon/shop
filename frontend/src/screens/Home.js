import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { listProducts } from "../storage/product/productList/actions";

import { Product } from "../components/Product";
import { Message } from "../components/Message";
import { Loader } from "../components/Loader";

export const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  let render;

  if (loading) render = <Loader />;
  else if (error) render = <Message variant="danger">{error}</Message>;
  else
    render = (
      <>
        <h1>latest products</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    );

  return render;
};
