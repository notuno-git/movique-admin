import React from 'react'
import withAuth from '../appwrite/auth'

const Dashboard = () => {
  return (
    <div>
      Dashboard
    </div>
  )
}

export default withAuth(Dashboard);
