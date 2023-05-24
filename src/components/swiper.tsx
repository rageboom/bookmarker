import { ReactNode, useState, useRef } from "react";
import "./swiper.scss";
interface SwiperProps {
  children: ReactNode[];
}

function Swiper({ children }: SwiperProps) {
  const [x, setX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const cIdx = useRef(1);
  const tl = children.length;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement;
    const direction = target.getAttribute("data-direction");
    const rectRef = ref.current;

    if (rectRef) {
      const cw = rectRef.getBoundingClientRect().width;
      const cl = Math.floor(cw / 200);

      if (direction === "prev" && cIdx.current > 1) {
        let width = 200;
        if (tl - cl < cIdx.current) {
          width -= cw - cl * 200;
        }
        const dx = x + width;

        setX(dx);
        cIdx.current--;
      } else if (direction === "next" && tl - cl >= cIdx.current) {
        let width = 200;
        if (tl - cl === cIdx.current) {
          width -= cw - cl * 200;
        }
        const dx = x - width;

        setX(dx);
        cIdx.current++;
      }
    }
  };
  return (
    <div className="swipe">
      <div ref={ref} className="container">
        <ul
          className="wrapper"
          style={{
            transform: `translateX(${x}px)`,
          }}
        >
          {children}
        </ul>
      </div>
      <button className="prev" data-direction="prev" onClick={handleClick}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button className="next" data-direction="next" onClick={handleClick}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Swiper;
