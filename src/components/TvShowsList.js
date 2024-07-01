import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

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
    selector: row => <img src={`https://image.tmdb.org/t/p/w500${row.poster_path}`} alt={row.name} className="img-thumbnail" style={{ width: '50px' }} />,
    sortable: false,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Release Date',
    selector: row => row.first_air_date,
    sortable: true,
  },
  {
    name: 'Rating',
    selector: row => (row.vote_average).toFixed(1),
    sortable: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="d-flex justify-content-center">
        <Link to={`/tvshows/details/${row.id}`} className="btn btn-lists mr-2"><i className="far fa-edit"></i></Link>
        {/* <Link to={`/movies/edit/${row.id}`} className="btn btn-lists"><i className="far fa-edit"></i></Link> */}
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    center: true,
  },
];

const TvShowsList = () => {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredShows, setFilteredShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/tv/week',
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDM1OTYyYzU0ODRmNmYyMzE5ZWZmOGE0ZGVhYTUwYiIsInN1YiI6IjY2NTAzZWUxMmRjYWM3MWRjMjBhNmQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oYeY6hKZrTN7lGHc59csGeeabbCHfrtZb9LfQkmSbZE'
        }
      };

      try {
        const response = await axios.request(options);
        setShows(response.data.results);
        setFilteredShows(response.data.results);
      } catch (error) {
        console.error('Error fetching the TV shows data:', error);
      }
    };

    fetchShows();
  }, []);

  useEffect(() => {
    const filteredData = shows.filter(show =>
      show.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredShows(filteredData);
  }, [search, shows]);

  return (
    <div className="container">
      <h2 className="list-heading">TV Shows List</h2>
      <DataTable
        columns={columns}
        data={filteredShows}
        defaultSortFieldId={2}
        pagination
        highlightOnHover
        customStyles={customStyles}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            className="form-control list-search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  );
};

export default TvShowsList;
