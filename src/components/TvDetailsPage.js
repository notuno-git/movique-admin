import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import db from "../appwrite/database";
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Query } from "appwrite";

const TvDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reviewId, setReviewId] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}`,
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

    const fetchReview = async () => {
      try {
        const response = await db.movies.list([
          Query.equal('movie_id', id)
        ]);
        if (response.documents.length > 0) {
          const existingReview = response.documents[0];
          setReviewId(existingReview.$id);
          setRating(existingReview.star);
          setTitle(existingReview.title_description);
          setDescription(existingReview.description);
        }
      } catch (error) {
        console.error('Error fetching the review:', error);
      }
    };

    fetchMovieDetails();
    fetchReview()
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      movie_id: id,
      star: rating,
      title_description: title,
      description: description
    };

  try {
      if (reviewId) {
        // Update existing review
        await db.movies.update(reviewId, payload);
        alert('Review updated successfully!');
      } else {
        // Create new review
        await db.movies.create(payload);
        alert('Review submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review.');
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
      <h2 className="list-heading">TV Shows Details</h2>
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
          <h5 className='details-heading'>{movie.name}</h5>
          <p className='result'>{movie.tagline}</p>
          <p className='result'><b>Overview: </b><br /> {movie.overview}</p>
          <p className='result'><b>Rating: </b>{movie.vote_average}</p>
          <p className='result'><b>View: </b>{movie.popularity}</p>
          <p className='result'><b>Duration: </b>{movie.runtime} minutes</p>
          <p className='result'><b>Status: </b>{movie.status}</p>
          <p className='result'><b>Seasons: </b>
          {
          movie?.seasons?.map((item) => (
            <span key={item?.id}>{item?.name}, </span>
          ))
          }
          </p>
          <p className='result'><b>Type: </b>{movie.type}</p>
          {/* <p className='result'>
            <a href={`https://www.movique.in/tvshows/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-lists my-2">View on movique website</a>
          </p> */}
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
              <Button variant="secondary" className="w-100" onClick={() => navigate('/tvshows')}>
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

export default TvDetailsPage;