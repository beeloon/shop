import { Helmet } from "react-helmet";

export const Meta = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
  </Helmet>
);

Meta.defauldProps = {
  title: "Welcom to Electrify",
  description: "We sell the best product for cheap prices",
  keywords: "electronics, cheap products, buy electronics",
};
