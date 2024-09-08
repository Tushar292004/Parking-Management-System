import React from 'react'
import '../css/home.scss'

function Home() {
  return (
    <div>
      <div className='banner'>
        <div className='overlay'>
          <h1>Looking for parking. <br /> <span>You have came to right place</span></h1>
        </div>
      </div>

      <div className='container mt-5'>
        <section className='my-5'>
          <h2>How SwiftPark Works</h2>

          <div className='row mt-4'>
            <div className='col-md-4 text-center'>
              <div className='card p-4'>
                <img src='./map.avif' className='services-card-icon'></img>
                <div className='mt-4'>
                  <h3>Search</h3>
                  <p className='mt-3'>Search for a parking spot according to your needs.</p>
                </div>
              </div>
            </div>

            <div className='col-md-4 text-center'>
              <div className='card p-4'>
                <img src='./book.png' className='services-card-icon'></img>
                <div className='mt-4'>
                  <h3>Book</h3>
                  <p className='mt-3'>Reserved Parking spot and pay desired amount..</p>
                </div>
              </div>
            </div>

            <div className='col-md-4 text-center'>
              <div className='card p-4'>
                <img src='./parking.png' className='services-card-icon'></img>
                <div className='mt-4'>
                  <h3>Park</h3>
                  <p className='mt-3'>Follow the provided instructions and park your car.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home