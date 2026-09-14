import ProductCard from "./ProductCard";

function ProductRow({ title, products }) {
  return (
    <section className="product-row-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="product-row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductRow;