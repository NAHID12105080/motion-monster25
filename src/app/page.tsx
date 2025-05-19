"use client";
import React from "react";
import { DecoratedText } from "@/components/DecoratedText";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";

const Page = () => {
  return (
    <>
      <Header />
      <Hero />
      <DecoratedText />
    </>
  );
};

export default Page;
