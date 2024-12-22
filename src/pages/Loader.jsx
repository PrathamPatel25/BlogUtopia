import React from "react";
import Grid from "../components/Grid"; // Importing the Grid component
import "../style/Loader.css"; // Assuming you still want to keep the custom CSS

const Loader = () => {
  return (
    <Grid>
      {/* Loader centered within the grid */}
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    </Grid>
  );
};

export default Loader;
