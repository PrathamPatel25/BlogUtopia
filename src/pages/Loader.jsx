import React from "react";
import Grid from "../components/Grid";
import "../style/Loader.css";

const Loader = () => {
  return (
    <Grid>
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    </Grid>
  );
};

export default Loader;
