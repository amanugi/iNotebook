import React from 'react'
import Notes from './Notes';

const Home = () => {
  return (
    <div>
      <div class="container my-3">
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Email</label> <br />
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">Password</label> <br />
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>

      <Notes />
  </div>
  )
}

export default Home;
