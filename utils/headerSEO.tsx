"use client";

interface headerProps {
  title: string;
  description: string;
  keyWords: string;
}

export const HeaderSEO = ({ title, description, keyWords }: headerProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyWords} />
    </>
  );
};
