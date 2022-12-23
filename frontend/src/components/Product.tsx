import React from "react";

export interface ProductProps {
  product: {
    _id: string;
    title: string;
    price: number;
    description: {[key: string]:any};
    img: string;
  };
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
        {words.join(" ") as string}: {entry[1] as string}
      </div>
    );
  });
  return (
    <div className="flex-col w-full h-full">
      <div>Title: {product.title}</div>
      <div>Description {descriptionBreakdown}</div>
      <div className="flex-col m-2 text-center">

        <img className="w-52 h-52 mx-auto" src={product.img} />
        <div>Price: {product.price}</div>
      </div>
    </div>
  );
};
export default Product;
