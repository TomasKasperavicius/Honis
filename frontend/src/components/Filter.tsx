import React, { useState, useRef } from "react";
import { product } from "./Product";
import { Paper, Slider } from "@mui/material";
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
  const MAX = 100;
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];
  const checkPriceInterval = ({ price }: any, min: number, max:number): boolean => {
    const Price = parseFloat(price.$numberDecimal);
    if (Price >= min && Price <= max) {
      return true;
    }
    return false;
  };
  const predicate = (obj: any, min:number = 0, max:number = 100): boolean => {
    const { description }: any = obj;
    for (let key in description) {
      if (filter.current[key] === undefined) {
        continue;
      }
      if (description[key] != filter.current[key]) {
        return false;
      }
    }
    return checkPriceInterval(obj, min, max);
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

  const [min, setMin] = useState<number>(MIN);
  const [max, setMax] = useState<number>(MAX);

  const handleMinChange = (_: Event, newValue: number | number[]) => {
    setMin(newValue as number);
    setProducts(products.filter((obj) => predicate(obj, newValue as number, max)));
  };
  const handleMaxChange = (_: Event, newValue: number | number[]) => {
    setMax(newValue as number);
    setProducts(products.filter((obj) => predicate(obj,min, newValue as number)));
  };
  return (
    <Paper
      elevation={10}
      style={{ backgroundColor: "rgba(245 ,158, 11,0.3)", height: "100%" }}
    >
      <div className="w-full  p-2 ">
        <b> Price:</b>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 gap-y-4  h-fit">
        <div className="col-span-2 px-2">
          <label htmlFor="FromPrice">Min price</label>
        </div>
        <div className="col-span-2 pr-5">
          <Slider
            marks={marks}
            step={10}
            value={min}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={handleMinChange}
          />
        </div>
        <div className="col-span-2 px-2">
          <label htmlFor="ToPrice">Max price</label>
        </div>
        <div className="col-span-2  pr-5">
          <Slider
            marks={marks}
            step={10}
            value={max}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={handleMaxChange}
          />
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
    </Paper>
  );
};
export default Filter;
