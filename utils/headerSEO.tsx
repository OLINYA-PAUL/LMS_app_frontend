"use client";
import { Helmet } from "react-helmet";

interface headerProps {
  title: string;
  descripion: string;
  keyWords: string;
}
export const HeaderSEO = ({ title, descripion, keyWords }: headerProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="descripion" content={descripion} />
      <meta name="keywords" content={keyWords} />
    </Helmet>
  );
};
