import React, { useEffect, useState } from 'react';
import qs from 'qs';
// import do SeachInput
import SearchInput from './SearchInput';
import Pagination from './Pagination';
import './styles.css';

const api = 'https://kitsu.io/api/edge/';
const LIMIT = 15;

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(0);

  console.log(info);

  useEffect(() => {
    //setInfo({});

    const query = {
      page: {
        limit: LIMIT,
        offset
      }
    };

    if (text) {
      query.filter = {
        text
      };
    }

    //console.log(text);
    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
        //console.log(response);
      });
  }, [text, offset]);

  return (
    <div className="App">
      <h1>Animes Search</h1>
      <h2>
        Realizar Buscar de animês <span>Version 1.0</span>
      </h2>
      <SearchInput
        value={text}
        onChange={(search) => setText(search)}
      />
      {text && !info.data && <span>carregando...</span>}
      {info.data && (
        <ul className="anime-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              <span>{anime.attributes.canonicalTitle}</span>
              <br />
              <span>{anime.attributes.status}</span>
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
        <Pagination
          limit={LIMIT}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
