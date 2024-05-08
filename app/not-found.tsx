import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Oops!</span>
            Page not found
          </p>
          <p className="lead">The page you are looking for does not exists.</p>
          <Link href={'/'} className="btn btn-primary">
            Go to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
