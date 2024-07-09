import React from "react";

export interface product{
  _id: string;
    title: string;
    units: number;
    price: { $numberDecimal: number };
    description: {};
    image: string;
}
export interface ProductProps {
  product: product
}
const Product: React.FC<ProductProps> = ({
  product,
}: ProductProps): JSX.Element => {
  const descriptionBreakdown: JSX.Element[] = Object.entries(
    product.description
  ).map((entry, id): JSX.Element => {
    var words: string[] = entry[0].split(/(?=[A-Z])/);
    for (let index = 1; index < words.length; index++) {
      words[index] = words[index].toLowerCase();
    }
    return (
      <div key={id}>
        {words.join(" ") as string}:{" "}
        {entry[0] === "Capacity"
          ? (entry[1] as string)+" ml" 
          : (entry[1] as string)}
      </div>
    );
  });
  return (
    <div className="flex-col w-full h-full pl-4">
      <div>Title: {product.title}</div>
      <div>
        <div className="border-b-2">

        Description <br />
        </div>
        {Object.keys(descriptionBreakdown).length === 0 ? (
          <i>Empty</i>
        ) : (
          descriptionBreakdown
        )}
      </div>
      <div>Price: {product.price.$numberDecimal}&euro;</div>
      <div>Available units: {product.units}</div>
      <div className="flex items-center  justify-center pr-4 pt-4">
        <img alt="product" className="w-52 h-52 mx-auto" src={product.image} />
      </div>
      
    </div>
  );
};
export default Product;
