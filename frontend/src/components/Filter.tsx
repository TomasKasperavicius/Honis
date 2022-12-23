import React from "react";
import { ProductProps } from "./Product";
interface FilterProps {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
}
interface Filter {
  [key: string]: string | undefined;
}
const Filter: React.FC<FilterProps> = ({
  products,
  setProducts,
}: FilterProps): JSX.Element => {
  var filter:Filter = { Size: undefined, HoneyType: undefined };
  const predicate = ({description}:any):boolean=>{
    for (let key in description) {
      if (filter[key] === undefined) {
        continue
      }
      if (description[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  }
  const changeFilter = (key: string, value: string | undefined) => {
    filter[key] = value;
    setProducts(products.filter(obj => predicate(obj.product)));
  };
  return (
    <div className="flex-col border-2 m-2">
      Honey type:
      <div className="grid grid-cols-2 grid-rows-1 gap-4 bg-red-100">
        <div>
          <label>Brown</label>
        </div>
        <div className="flex items-center">
          <input className="w-4 h-4" type="checkbox" onClick={()=>changeFilter("HoneyType","Brown")}></input>
        </div>
        <div>
          <label>White</label>
        </div>
        <div className="flex items-center">
          <input className="w-4 h-4" type="checkbox" onClick={()=>changeFilter("HoneyType","White")}></input>
        </div>
        <div>
          <label>Black</label>
        </div>
        <div className="flex items-center">
          <input className="w-4 h-4" type="checkbox" onClick={()=>changeFilter("HoneyType","Black")}></input>
        </div>
      </div>
      Size:
      <div className="grid grid-cols-2 grid-rows-1 gap-4 bg-red-100">
        <div>
          <label>250ml</label>
        </div>
        <div className="flex items-center">
          <input className="w-4 h-4" type="checkbox" onClick={()=>changeFilter("Size","250 ml")}></input>
        </div>
        <div>
          <label>500ml</label>
        </div>
        <div className="flex items-center">
          <input className="w-4 h-4" type="checkbox" onClick={()=>changeFilter("Size","500 ml")}></input>
        </div>
        <div>
          <label>750ml</label>
        </div>
        <div className="flex items-center">
          <input className="w-4 h-4" type="checkbox" onClick={()=>changeFilter("Size","750 ml")}></input>
        </div>
      </div>
    </div>
  );
};
export default Filter;
