import React from "react";

const Card = ({ children }) => {
  return <div className="bg-green-200 shadow-md rounded-lg p-8">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

const CardSecond = () => {
  return <div className="card rounded-lg p-8"></div>;
};

const CardContentSecont = ({ children }) => {
  return <div className="container">{children}</div>;
};

const CardContentPieCharts = ({ children }) => {
  return <div className="pie-chart-container2 mt-4">{children}</div>;
};

export { Card, CardContent, CardSecond, CardContentSecont, CardContentPieCharts };