import HashLoader from "react-spinners/HashLoader";

const Loader = ({ loading, size }) => {
  return (
    <>
      <span className="d-flex  justify-content-center">
        <HashLoader
          className="mx-auto text-center w-100 justify-items-center mt-4"
          color="orange"
          loading={loading}
          // cssOverride={override}
          size={size || 50}
          speedMultiplier={3}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </span>
    </>
    // <>Loading....</>
  );
};

export default Loader;
