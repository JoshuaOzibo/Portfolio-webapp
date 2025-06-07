import React from "react";
import { Card } from "../ui/card";

interface cardType{
    key?: string,
    className: string
}

const card = ({key, className}: cardType) => {
  return (
    <Card
      key={key}
      className={` ${className} border-0 shadow-sm hover:shadow-md transition-shadow`}
    ></Card>
  );
};

export default card;
