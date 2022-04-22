import { createContext, useState } from "react";
export const GlobalStoreContext = createContext({});
 
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author Kev
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  SEARCH: "SEARCH"
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
//const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    loggedIn: false,
    username: "",
    email: null,
    actualName: null,
    search: "",
  });

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.SIGN_IN: {
        return setStore({
          loggedIn: true,
          username: payload.username,
          email: payload.email,
          actualName: payload.actualName,
          search : store.search,
        });
      }
      // SIGNOUT
      case GlobalStoreActionType.SIGN_OUT: {
        return setStore({
          loggedIn: false,
          username: null,
          email: null,
          actualName: null,
          search: store.search,
        });
      }
      case GlobalStoreActionType.SEARCH: {
        return setStore({
          loggedIn: store.loggedIn,
          username: store.username,
          email: store.email,
          actualName: store.actualName,
          search: payload.search,
        });
      }
      default:
        return store;
    }
  };
  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  store.logIn = function(data){
      console.log('data', data);
      console.log(data.username);
      console.log(data.email);
      console.log(data.actualName);
    storeReducer({
      type: GlobalStoreActionType.SIGN_IN,
      payload: {
        username: data.username,
        email: data.email,
        actualName: data.actualName,
      },
    });
  }
  store.logOut = function () {
    
    storeReducer({
      type: GlobalStoreActionType.SIGN_OUT,
      payload: {
        empty: "empty"
      },
    });
  }
  store.setSearch = function (data) {
    storeReducer({
      type: GlobalStoreActionType.SEARCH,
      payload: {
        search: data
      },
    });
  }

  

  // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
  return { store, storeReducer };
};
