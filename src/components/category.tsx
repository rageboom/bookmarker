import { ReactNode, useState } from "react";
import "./category.scss";
interface CategoryProps {
  categoryName: string;
  children: ReactNode[];
}

function Category({ categoryName, children }: CategoryProps) {
  return (
    <div className="category">
      <div className="header">
        <h1>{categoryName}</h1>
        <div></div>
      </div>
      <div className="list">
        <ul>{children}</ul>
      </div>
    </div>
  );
}

export default Category;
