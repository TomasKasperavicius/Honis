import React, { useState, useRef } from "react";
import { product } from "./Product";
interface FilterProps {
  products: product[];
  setProducts: (products: product[]) => void;
}
export interface FilterType {
  [key: string]: string | number | undefined;
}
interface FilterState {
  field: string | number;
  checked: boolean;
}
const Filter: React.FC<FilterProps> = ({
  products,
  setProducts,
}: FilterProps): JSX.Element => {
  const filter = useRef<FilterType>({
    Capacity: undefined,
    HoneyType: undefined,
    FromPrice: "",
    ToPrice: "",
  });
  const [HoneyTypes, setHoneyTypes] = useState<FilterState[]>([
    { field: "Clover", checked: false },
    { field: "Wildflower", checked: false },
    { field: "Acacia", checked: false },
    { field: "Alfalfa", checked: false },
    { field: "Buckwheat", checked: false },
    { field: "Creamed", checked: false },
    { field: "Manuka", checked: false },
    { field: "Eucalyptus", checked: false },
    { field: "Orange Blossom", checked: false },
    { field: "Baker's Special", checked: false },
  ]);
  const [Capacities, setCapacities] = useState<FilterState[]>([
    { field: 250, checked: false },
    { field: 500, checked: false },
    { field: 750, checked: false },
    { field: 1000, checked: false },
  ]);
  const checkPriceInterval = ({ price }: any): boolean => {
    const Price = parseFloat(price.$numberDecimal);
    const ToPrice = parseFloat(filter.current.ToPrice as string);
    const FromPrice = parseFloat(filter.current.FromPrice as string);
    if (filter.current.FromPrice === "" && filter.current.ToPrice === "")
      return true;
    if (filter.current.FromPrice !== "" && filter.current.ToPrice === "") {
      if (Price >= FromPrice) {
        return true;
      }
      return false;
    }
    if (filter.current.ToPrice !== "" && filter.current.FromPrice === "") {
      if (Price <= ToPrice!) {
        return true;
      }
      return false;
    }
    if (Price >= FromPrice && Price <= ToPrice) {
      return true;
    }
    return false;
  };
  const predicate = (obj: any): boolean => {
    const { description }: any = obj;
    for (let key in description) {
      if (filter.current[key] === undefined) {
        continue;
      }
      if (description[key] !== filter.current[key]) {
        return false;
      }
    }
    return checkPriceInterval(obj) === true ? true : false;
  };

  const changeFilter = (
    key: string,
    value: string | number | undefined,
    arr: FilterState[],
    setArrState: (arr: FilterState[]) => void
  ) => {
    const result = arr.map((e) => {
      if (e.field === value) {
        if (e.checked === true) {
          e.checked = false;
          filter.current[key] = undefined;
        } else {
          e.checked = true;
          filter.current[key] = value;
        }
        return e;
      }
      e.checked = false;
      return e;
    });
    setArrState(result);
    setProducts(products.filter((obj) => predicate(obj)));
  };
  const changePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    filter.current[e.target.id] = e.target.value;
    setProducts(products.filter((obj) => predicate(obj)));
  };
  return (
    <div className="h-full bg-opacity-30 bg-amber-500">
      <div className="w-full  p-2 ">
        <b> Price:</b>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 gap-y-4  h-fit">
        <div className="col-span-2 px-2">
          <label htmlFor="FromPrice">From</label>
        </div>
        <div className="col-span-2">
          <input
            className="w-16 h-4"
            type="number"
            id="FromPrice"
            min={0}
            onChange={(e) => changePriceFilter(e)}
          ></input>
        </div>
        <div className="col-span-2 px-2">
          <label htmlFor="ToPrice">To</label>
        </div>
        <div className="col-span-2">
          <input
            className="w-16 h-4"
            type="number"
            id="ToPrice"
            onChange={(e) => changePriceFilter(e)}
            min={0}
          ></input>
        </div>
      </div>
      <div className="w-full px-2 py-4">
        <b>Honey type:</b>
      </div>
      {HoneyTypes.map((obj, id) => {
        return (
          <div key={id} className="grid grid-cols-4 py-1 grid-rows-1  ">
            <div className="col-span-3 px-2">
              <label>{obj.field}</label>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={obj.checked}
                onChange={() =>
                  changeFilter(
                    "HoneyType",
                    obj.field,
                    HoneyTypes,
                    setHoneyTypes
                  )
                }
              ></input>
            </div>
          </div>
        );
      })}
      <div className="w-full px-2  py-4">
        <b> Capacity:</b>
      </div>
      {Capacities.map((obj, id) => {
        return (
          <div key={id} className="grid grid-cols-4 grid-rows-1 py-1  ">
            <div className="col-span-3 px-2">
              <label>{obj.field + " ml"}</label>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={obj.checked}
                onChange={() =>
                  changeFilter("Capacity", obj.field, Capacities, setCapacities)
                }
              ></input>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Filter;
