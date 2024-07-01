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
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import img from './mmm.jpg';
import db from "../appwrite/database";
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      movie_id: id,
      star: parseInt(rating, 10),
      title_description: title,
      description: description
    };

    try {
      console.log(payload, 'payload');
      await db.movies.create(payload);
      alert('Review submitted successfully!');
      setRating(1)
      setTitle('')
      setDescription('')

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review.');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setRating(value);
    } else if (e.target.value === '') {
      setRating(0); // Handle empty input
    }
  };

  const renderStars = () => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;
    const emptyStars = 10 - filledStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="d-flex">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="star" color="#ffc107" size={40} />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="star" color="#ffc107" size={40} />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={index} className="star" color="#e4e5e9" size={40} />
        ))}
      </div>
    );
  };

  return (
    <div className="details container">
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
          <p className='result'><b>Rating: </b>{(movie.vote_average).toFixed(1)}</p>
          <p className='result'><b>View: </b>{(movie.popularity).toFixed(1)}</p>
          <p className='result'><b>Duration: </b>{movie.runtime} minutes</p>
          <p className='result'><b>Status: </b>{movie.status}</p>
          <p className='result'><b>Release Date: </b>{movie.release_date}</p>
          <p className='result'><b>Revenue: </b>${movie.revenue}</p>
          <p className='result'><b>Director: </b>{movie.director}</p>
          <p className='result'><b>Writer: </b>{movie.writer}</p>
          {/* <p className='result'> */}
            {/* <a href={`https://www.movique.in/movies/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-lists my-2">View on movique website</a> */}
          {/* </p> */}
        </div>

        <div className="container mt-5">
          <h2 className="details-heading mb-4">Submit Review</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Rating (1 to 10)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={rating}
                onChange={handleRatingChange}
                min="0"
                max="10"
                required
              />
              <div className="mt-3">{renderStars()}</div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <div className='d-flex' style={{ gap: '20px' }}>
              <Button variant="secondary" className="w-100" onClick={() => navigate('/movies')}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="btn-lists w-100">
                Submit Review
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

