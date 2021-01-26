import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        className="mr-sm-2 ml-sm-5"
        type="text"
        name="q"
        placeholder="Search product..."
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};
