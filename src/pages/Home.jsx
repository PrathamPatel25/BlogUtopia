import React from "react";
import { Container } from "../components";
import Grid from "../components/Grid";
import Title from "../components/Title";
import HorizontalScroll from "../components/HorizontalScroll";
import ThreeDModel from "../components/ThreeDModel";
import LeftSide from "../components/LeftSide";

export default function Home() {
  return (
    <Grid>
      <div className="w-full h-full text-center dark:text-white">
        <Title />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="flex justify-center items-center">
            <LeftSide />
          </div>
          <div className="flex justify-center items-center">
            <ThreeDModel />
          </div>
        </div>
        <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-40">
          <HorizontalScroll />
        </div>
      </div>
    </Grid>
  );
}
