import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Favorites = () => {
  const { userId } = useParams();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Articles favorited by @{userId}</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
};

export default Favorites;
