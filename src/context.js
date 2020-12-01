import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('cocktail');
  const [cocktails, setCocktails] = useState([]);
  //fetching data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let a = await fetch(`${url}${searchTerm}`);
      let b = await a.json();
      const { drinks } = b;
      if (drinks) {
        const newCocktail = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktail);
      } else {
        setCocktails([]);
      }
      setLoading(false);


    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);

  return <AppContext.Provider
    value={{ loading, cocktails, searchTerm, setSearchTerm }}
  >
    {children}
  </AppContext.Provider>;

};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
