import React from "react";
import HorizontalScroll from "../components/HorizontalScroll";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CallToAction from "../components/CallToAction";
import FeaturedPosts from "../components/FeaturedPosts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPosts />
      <StatsSection />
      <HorizontalScroll />
      <CallToAction />
    </>
  );
}
