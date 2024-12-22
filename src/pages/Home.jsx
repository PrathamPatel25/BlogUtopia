import React from "react";
import { Container } from "../components";
import Grid from "../components/Grid"; // Import Grid component

export default function Home() {
  return (
    <Grid>
      {" "}
      {/* Wrap content with Grid */}
      <div className="w-full mt-0 pt-2 text-center dark:text-white">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">Welcome to BlogUtopia</h1>
            </div>
          </div>
        </Container>
      </div>
    </Grid>
  );
}
