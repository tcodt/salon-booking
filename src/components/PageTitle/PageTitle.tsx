import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h3 className="text-gray-800 text-xl font-bold">{title}</h3>;
};

export default PageTitle;
