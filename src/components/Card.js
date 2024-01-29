import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatchCart = useDispatchCart();
  const data = useCart();
  const priceRef = useRef(); // Create a ref
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Initialize size with the first option

  const handleAddToCart = async () => {
    const finalPrice = qty * parseInt(options[size]);
    await dispatchCart({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    });
    console.log(data); // Logging the state after dispatching an action
  };

  useEffect(() => {
    setSize(priceRef.current?.value); // Update size when the value changes
  }, [priceRef.current?.value]); // Ensure the effect runs when the value changes

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>

            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" value={qty} onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5">
                {qty * parseInt(options[size])}/-
              </div>
            </div>
          </div>
          <hr />
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
