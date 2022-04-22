import React from 'react'
import axios from "axios";
import PlatformCard from "../components/PlatformCard.js";
import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { GlobalStoreContext } from "../store";

function SearchScreen() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const url = useLocation().search;
    const query = new URLSearchParams(url).get("search");
    console.log("data values are ", data);
    //var loaded = false;
    const { store } = useContext(GlobalStoreContext);
    var body = {
        search: store.search
    }

    /*
    useEffect(() => {
        store.setSearch(query);
    }, []);
    */
    
    useEffect(() => {
    console.log("store value is ", store.search);
    console.log("entered search screen");
    const res = fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        search: store.search,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //console.log("parsed json", json); // access json.body here
        //console.log("json search", json.search);
        setData(json.search);
      });
    setLoading(false);
    console.log('true value :', isLoading);
    //console.log("message:", res.message);
    //console.log("data var: ", jsonData);
  
    }, [store.search] )
    
    if (isLoading){
      return <span> loading platforms</span>;
    } else {
      if (data.length == 0){
          return <span> No results</span>
      }
      else {
        return (
          <div>
            {data.map((elem) => (
              <PlatformCard platform={elem} />
            ))}
          </div>
        );
      }

        }
}

export default SearchScreen
