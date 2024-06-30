// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import img from './mmm.jpg';
// import db from "../appwrite/databases";


// const reviews = [
//   {
//     id: 1,
//     profileImage: img,
//     userName: 'admin',
//     time: '8 hours',
//     rating: 2,
//     reviewText: 'Honestly Its a fine thriller. The major turn off in this movie is nothing but the Hero itself, Rajasekhar is a good actor, but in this movie they tried to present him as a 30-35 year old look while he looks more aged, imperfect make up and hair style pulling back the viewers while enjoying the movie itself, also Pairing with so young Adah Sharma, is totally not synced.'
//   },
//   {
//     id: 2,
//     profileImage: img,
//     userName: 'John Doe',
//     time: '2 days',
//     rating: 4,
//     reviewText: 'Great movie with a thrilling plot and excellent performances. Highly recommend watching it!'
//   },
//   // Add more review objects here
// ];

// const DetailsPage = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       const options = {
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/movie/${id}`,
//         params: { language: 'en-US' },
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDM1OTYyYzU0ODRmNmYyMzE5ZWZmOGE0ZGVhYTUwYiIsInN1YiI6IjY2NTAzZWUxMmRjYWM3MWRjMjBhNmQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oYeY6hKZrTN7lGHc59csGeeabbCHfrtZb9LfQkmSbZE'
//         }
//       };

//       try {
//         const response = await axios.request(options);
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Error fetching the movie details:', error);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (!movie) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <h2 className="list-heading">Movie Details</h2>

//       <div className='row'>
//         <div className='col-md-6 col-12 my-2'>
//           <div className='w-full h-full'>
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className='img-fluid'
//             />
//           </div>
//         </div>

//         <div className='col-md-6 col-12 my-2'>
//           <h5 className='details-heading'>{movie.title}</h5>
//           <p className='result'>{movie.tagline}</p>
//           <p className='result'><b>Overview: </b><br /> {movie.overview}</p>
//           <p className='result'><b>Rating: </b>{movie.vote_average}</p>
//           <p className='result'><b>View: </b>{movie.popularity}</p>
//           <p className='result'><b>Duration: </b>{movie.runtime} minutes</p>
//           <p className='result'><b>Status: </b>{movie.status}</p>
//           <p className='result'><b>Release Date: </b>{movie.release_date}</p>
//           <p className='result'><b>Revenue: </b>${movie.revenue}</p>
//           <p className='result'><b>Director: </b>{movie.director}</p>
//           <p className='result'><b>Writer: </b>{movie.writer}</p>
//         </div>

//         {/* <div className='col-md-12 my-2'>
//           <h5 className='details-heading'>Cast:</h5> */}
//           {/* Add cast data rendering here */}
//         {/* </div> */}

//         <div className='col-md-12 my-2'>
//           <h5 className='details-heading mb-4'>Submit Review</h5>

//           <form>
//             <div className='form-group'>
//               <label htmlFor="reviewText">Title</label>
//               <input  className='form-control my-2' type="text" id='title'/>
//               <label>Desprition</label>
//               <textarea
//                 className="form-control my-2"
//                 id="reviewText"
//                 rows="3"
//               ></textarea>
//             </div>
//             <div className='form-group'>
//               <label htmlFor="rating">Star Rating: </label>
//               <select className="form-select mx-2" id="rating">
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//           </form>

// {/* 
//           {reviews.map(review => (
//             <div key={review.id} className='review-rating'>
//               <div className='profile'>
//                 <img src={review.profileImage} className='img-fluid' alt={review.userName} />
//                 <div className='user'>
//                   <h4>{review.userName}</h4>
//                   <p>{review.time}</p>
//                 </div>
//               </div>
//               <div className='star'>
//                 {[...Array(review.rating)].map((_, i) => (
//                   <i key={i} className="fas fa-star"></i>
//                 ))}
//               </div>
//               <div className='review'>
//                 <p>{review.reviewText}</p>
//               </div>
//             </div>
//           ))} */}

//         </div>

//       </div>
//     </div>
//   );
// };

// export default DetailsPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import img from './mmm.jpg';
import db from "../appwrite/database";
import { toast } from 'react-toastify';

const DetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    rating: 1,
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDM1OTYyYzU0ODRmNmYyMzE5ZWZmOGE0ZGVhYTUwYiIsInN1YiI6IjY2NTAzZWUxMmRjYWM3MWRjMjBhNmQxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oYeY6hKZrTN7lGHc59csGeeabbCHfrtZb9LfQkmSbZE'
        }
      };

      try {
        const response = await axios.request(options);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching the movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      movie_id: id,
      star: parseInt(form.rating, 10),
      title_description: form.title,
      description: form.description
    };

    try {
      console.log(payload, 'payload');
      await db.movies.create(payload);
      // alert('Review submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review.');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="list-heading">Movie Details</h2>
      <div className='row'>
        <div className='col-md-6 col-12 my-2'>
          <div className='w-full h-full'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className='img-fluid'
            />
          </div>
        </div>

        <div className='col-md-6 col-12 my-2'>
          <h5 className='details-heading'>{movie.title}</h5>
          <p className='result'>{movie.tagline}</p>
          <p className='result'><b>Overview: </b><br /> {movie.overview}</p>
          <p className='result'><b>Rating: </b>{movie.vote_average}</p>
          <p className='result'><b>View: </b>{movie.popularity}</p>
          <p className='result'><b>Duration: </b>{movie.runtime} minutes</p>
          <p className='result'><b>Status: </b>{movie.status}</p>
          <p className='result'><b>Release Date: </b>{movie.release_date}</p>
          <p className='result'><b>Revenue: </b>${movie.revenue}</p>
          <p className='result'><b>Director: </b>{movie.director}</p>
          <p className='result'><b>Writer: </b>{movie.writer}</p>
        </div>

        <a href={`https://www.movique.in/movies/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary my-2">View on Movique</a>

        <div className='col-md-12 my-2'>
          <h5 className='details-heading mb-4'>Submit Review</h5>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                className='form-control my-2'
                type="text"
                id='title'
                name='title'
                value={form.title}
                onChange={handleChange}
              />
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control my-2"
                id="description"
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className='form-group'>
              <label htmlFor="rating">Star Rating: </label>
              <select
                className="form-select mx-2"
                id="rating"
                name="rating"
                value={form.rating}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

