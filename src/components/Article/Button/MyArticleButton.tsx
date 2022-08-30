const MyArticleButton = () => {
  return (
    <>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-edit"></i> Edit Article
      </button>{" "}
      <button className="btn btn-sm btn-outline-danger">
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </>
  );
};

export default MyArticleButton;
