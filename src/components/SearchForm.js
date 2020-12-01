import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const search = React.useRef('');
  React.useEffect(() => {
    search.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const searchCocktail = () => {
    setSearchTerm(search.current.value);
  };

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={search}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
