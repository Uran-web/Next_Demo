'use client';

interface CustomError extends Error {
  errMessage: string;
}

export default function Error({
  error,
  reset,
}: {
  error: CustomError & { digest?: string };
  reset?: () => void;
}) {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h2 className="display-4 fw-bold">{error?.errMessage}</h2>
          <p className="f3">
            <span className="test-danger">Opps!</span>
            Something went wrong
          </p>
          <p className="lead">Sorry for inconvenience</p>
          <button className="btn btn-primary" onClick={() => reset?.()}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
