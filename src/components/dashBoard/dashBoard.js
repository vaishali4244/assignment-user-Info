import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDetails from "../userDetails/userDetails";
import "./dashBoard.css";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const previousInput = localStorage.getItem("lastSearch");

  useEffect(() => {
    const persistInput = () => {
      const searchInput = document.getElementById("searchInput");
      const searchQuery = searchInput.value;

      // Save the search query to localStorage
      localStorage.setItem("lastSearch", searchQuery);
      // console.log("Search query saved to localStorage:", searchQuery);
    };
    if (search?.length !== 0) {
      const timer = setTimeout(() => {
        persistInput();
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);

  //to get data based on the search input
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        if (search === null) {
          const filteredData = res?.data?.filter((item) => {
            return item?.name
              ?.toLowerCase()
              ?.includes(previousInput?.toLowerCase());
          });
          setData(filteredData?.sort((a, b) => a.name.localeCompare(b.name)));
        } else if (search?.length !== 0 && search !== null) {
          const filteredData = res?.data?.filter((item) => {
            return item?.name?.toLowerCase()?.includes(search?.toLowerCase());
          });
          setData(filteredData?.sort((a, b) => a.name.localeCompare(b.name)));
          // console.log("filterdata2", filteredData?.sort((a,b)=>a.name.localeCompare(b.name)))
        } else {
          setData(res?.data.sort((a, b) => a.name.localeCompare(b.name)));
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [search, previousInput]);

  return (
    <div className="container">
      <h1>Get User Information</h1>
      <div className="searchBar">
        <label htmlFor="">Search by Name</label>
        <input
          id="searchInput"
          type="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search !== null ? search : previousInput}
          placeholder="search"
        />
      </div>

      <div className="card-container">
        {data?.map((item, index) => {
          return (
            <UserDetails
              key={item?.id}
              name={item?.name}
              email={item?.email}
              phone={item?.phone}
              city={item?.address?.city}
              street={item?.address?.street}
              suite={item?.address?.suite}
              company={item?.company?.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
