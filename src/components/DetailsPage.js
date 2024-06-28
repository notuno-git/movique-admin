import React from 'react'
import { useParams } from 'react-router-dom';
import img from './mmm.jpg'

const reviews = [
  {
    id: 1,
    profileImage: img,
    userName: 'Rohit Kumar',
    time: '8 hours',
    rating: 2,
    reviewText: 'Honestly Its a fine thriller. The major turn off in this movie is nothing but the Hero itself, Rajasekhar is a good actor, but in this movie they tried to present him as a 30-35 year old look while he looks more aged, imperfect make up and hair style pulling back the viewers while enjoying the movie itself, also Pairing with so young Adah Sharma, is totally not synced.'
  },
  {
    id: 2,
    profileImage: img,
    userName: 'John Doe',
    time: '2 days',
    rating: 4,
    reviewText: 'Great movie with a thrilling plot and excellent performances. Highly recommend watching it!'
  },
  // Add more review objects here
];

const DetailsPage = () => {
  const { id } = useParams();
  // const movie = movies.find(movie => movie.id === parseInt(id));

  // if (!movie) {
  //     return <div>Movie not found</div>;
  // }

  console.log(id);

  return (
    <div className="container">
      <h2 className="list-heading">Movie Details</h2>

      <div className='row'>
        <div className='col-md-6 col-12 my-2'>
          <div className='w-full h-full'>
            <img
              src={img}
              className='img-fluid'
            />
          </div>
        </div>

        <div className='col-md-6 col-12 my-2'>
          <h5 className='details-heading'>Kalki</h5>
          <p className='result'>Fury is born.</p>
          <p className='result'><b>Overview : </b><br /> As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.</p>
          <p className='result'><b>Rating : </b>4+</p>
          <p className='result'><b>View  : </b>1197</p>
          <p className='result'><b>Duration : </b>2h 5m</p>
          <p className='result'><b>Staus : </b>Released</p>
          <p className='result'><b>Release Date : </b>May 22nd 2024</p>
          <p className='result'><b>Revenue : </b>168076980</p>
          <p className='result'><b>Director : </b>George Miller</p>
          <p className='result'><b>Writer : </b>George Miller, Nico Lathouris</p>
        </div>

        <div className='col-md-12 my-2'>
          <h5 className='details-heading'>Cast :</h5>
          {/* <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
            {
              castData?.cast?.filter(el => el?.profile_path).map((starCast, index) => {
                return (
                  <div key={starCast.id} onClick={() => handleCastClick(starCast.id)}>
                    <div>
                      <img
                        src={imageURL + starCast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                  </div>
                )
              })
            }
          </div> */}
        </div>

        <div className='col-md-12 my-2'>
          <h5 className='details-heading mb-4'>Audience reviews & Rating :</h5>

          {reviews.map(review => (
            <div key={review.id} className='review-rating'>
              <div className='profile'>
                <img src={review.profileImage} className='img-fluid' alt={review.userName} />
                <div className='user'>
                  <h4>{review.userName}</h4>
                  <p>{review.time}</p>
                </div>
              </div>
              <div className='star'>
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <div className='review'>
                <p>{review.reviewText}</p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default DetailsPage
