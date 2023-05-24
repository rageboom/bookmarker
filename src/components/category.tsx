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
        <h4>{categoryName}</h4>
      </div>
      <div className="list">
        <ul>{children}</ul>
      </div>
    </div>
  );
}

export default Category;
