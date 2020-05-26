import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal'
import './Search.css';
import useHttp from '../../hooks/http';

const Search = React.memo(props => {
  const { onFilterIngredients } = props;
  const [Filter, setFilter] = useState('');
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear} = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if(Filter === inputRef.current.value){
        const query = Filter.length === 0 ? '' : `?orderBy="title"&equalTo="${Filter}"`;
        sendRequest('https://my-react-hooks-5c2f9.firebaseio.com/ingredients.json'+query, 'GET' )
      }
    }, 500);
    // melhora a performance com o timer
    return () => {
      clearTimeout(timer);
    };
  }, [Filter, sendRequest, inputRef])

  useEffect(() => {
    if(!isLoading && !error && data) {
      const loadedIngredients = [];
      for( const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onFilterIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onFilterIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} value={Filter} onChange={event => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
