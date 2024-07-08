import React, { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import img from '../layout/logo.webp';
import withAuth from '../appwrite/auth'

const customStyles = {
  header: {
    style: {
      fontSize: '18px',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
    },
  },
};

const columns = [
  {
    name: 'Image',
    selector: row => <img src={`https://image.tmdb.org/t/p/w500${row.poster_path}`} alt={row.title} className="img-thumbnail" style={{ width: '50px' }} />,
    sortable: false,
  },
  {
    name: 'Name',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Release Date',
    selector: row => row.release_date,
    sortable: true,
  },
  {
    name: 'Rating',
    selector: row => row.vote_average,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="d-flex justify-content-center">
        <Link to={`/movies/details/${row.id}`} className="btn btn-lists mr-2"><i className="far fa-edit"></i></Link>
        {/* <Link to={`/movies/edit/${row.id}`} className="btn btn-lists"><i className="far fa-edit"></i></Link> */}
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    center: true,
  },
];

const SearchMovies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: searchQuery,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDM1OTYyYzU0ODRmNmYyMzE5ZWZmOGE0ZGVhYTUwYiIsInN1YiI6IjY2NTAzZWUxMmRjYWM3MWRjMjBhNmQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oYeY6hKZrTN7lGHc59csGeeabbCHfrtZb9LfQkmSbZE'
      }
    };

    try {
      const response = await axios.request(options);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching the movies data:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="list-heading">Search Movies</h2>
      <form onSubmit={handleSearch} className="form-inline search-form">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-lists mb-2"><i className="fas fa-search"></i></button>
      </form>
      <DataTable
        columns={columns}
        data={movies}
        defaultSortFieldId={2}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
};

export default withAuth(SearchMovies);
