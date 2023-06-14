import Product from "./Product";

export default async function page() {
  return (
    <div>
      <button className="mt-6">voltar</button>
      <div className="mt-6">
        <Product />
      </div>
    </div>
  );
}
