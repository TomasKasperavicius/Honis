import React from "react";

export interface ProductProps {
  product:{_id:string, title: string, price: number, description: {}, img: string}
}
const Product: React.FC<ProductProps> = ( {product} : ProductProps): JSX.Element => {
  const descriptionBreakdown: JSX.Element[] = Object.entries(
    product.description
  ).map((entry): JSX.Element => {
    var words: string[] = entry[0].split(/(?=[A-Z])/);
    for (let index = 1; index < words.length; index++) {
      words[index] = words[index].toLowerCase();
    }
    return (
      <div>
        {words.join(" ") as string}: {entry[1] as string}
      </div>
    );
  });
  return (
    <div className="flex-col border-2">
      <div>Title: {product.title}</div>
      <div>Description {descriptionBreakdown}</div>
      <div className="flex justify-center m-2">
        <img src={product.img} />
        <div>Price: {product.price}</div>
      </div>
    </div>
  );
};
export default Product;
