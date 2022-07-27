import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Favorites = () => {
  const { userId } = useParams();

  return (
    <>
      <Helmet>
        <title>Articles favorited by {userId}— Conduit</title>
      </Helmet>
    </>
  );
};

export default Favorites;
