import React from "react";
import { Container } from "../components";
import Grid from "../components/Grid";
import Title from "../components/Title";
import HorizontalScroll from "../components/HorizontalScroll";

export default function Home() {
  return (
    <Grid>
      <div className="w-full h-full text-center dark:text-white">
        <Title />
        <HorizontalScroll />
      </div>
    </Grid>
  );
}
