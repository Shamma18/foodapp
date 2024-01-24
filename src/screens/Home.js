import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5001/api/foodData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      // console.log(response[0], response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data, index) => (
            <div className="row mb-3">
            <div key={data._id } className="fs-3 m-3">{data.CategoryName}</div>
            <hr/>
            {foodItem.length !==0 ? foodItem.filter((item)=>item.CategoryName===data.CategoryName)
            .map(filterItems=> {
              return(
                <div key={filterItems._id} className="col-12  col-md-6 col-lg-3">
                  <Card foodName={filterItems.name}
                  options={ filterItems.options[0]}
                  imgSrc={filterItems.img}></Card>

                  </div>
              )
            }):"no such data found"}
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
       
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
