import { useState } from "react";

const API = [
  { name: "test1", type: "test1" },
  { name: "test2", type: "test2" },
  { name: "test3", type: "test3" },
  { name: "test4", type: "test4" },
  { name: "test4", type: "test4" },
];

const Test = () => {
  const products = API;
  const [category, setCategory] = useState([]);
  const showProducts =
    category.length == 0
      ? products
      : products.filter((product) => category.includes(product.type));

  const addFilter = (e) => {
    // console.log(e.target.value);
    const checked = e.target.checked;
    const typeSelected = e.target.value;

    if (checked) setCategory((cur) => [...cur, typeSelected]);
    else setCategory((cur) => cur.filter((item) => item !== typeSelected));
  };
  console.log(category);

  return (
    <div style={{ color: "#000" }}>
      <h1>Filter</h1>
      <ul>
        <li>
          <input type="checkbox" value="test1" onChange={addFilter} />
          <label htmlFor="">test1</label>
        </li>
        <li>
          <input type="checkbox" value="test2" onChange={addFilter} />
          <label htmlFor="">test2</label>
        </li>
        <li>
          <input type="checkbox" value="test3" onChange={addFilter} />
          <label htmlFor="">test3</label>
        </li>
        <li>
          <input type="checkbox" value="test4" onChange={addFilter} />
          <label htmlFor="">test4</label>
        </li>
      </ul>
      <hr />

      <h1>List Item</h1>
      <div>
        {showProducts.map((elem, index) => (
          <h2 key={index}>{elem.name}</h2>
        ))}
      </div>
    </div>
  );
};

export default Test;
