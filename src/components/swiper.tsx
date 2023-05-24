import { ReactNode, useState, useRef, useEffect } from "react";
import "./swiper.scss";
interface SwiperProps {
  children: ReactNode[];
}

function Swiper({ children }: SwiperProps) {
  const [x, setX] = useState(0);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const containerWidth = useRef<number>(0);
  const wrapperWidth = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const isMouseDown = useRef<boolean>(false);
  const cIdx = useRef(1);
  const tl = children.length;

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width;
    }
    if (wrapperRef.current) {
      wrapperWidth.current = wrapperRef.current.getBoundingClientRect().width;
    }
  }, [tl]);
  const handleMouseMove = (e: MouseEvent) => {
    if (isMouseDown.current) {
      const dx = startX.current - e.clientX;

      currentX.current = x - dx;
      setX(currentX.current);
    }
  };
  const handleMouseUp = (e: MouseEvent) => {
    document.onmousemove = null;
    isMouseDown.current = false;
    const maxTransformX = containerWidth.current - wrapperWidth.current;
    console.log("mouseup: ", maxTransformX);

    document.ondragstart = null;
    if (currentX.current > 0) {
      setX(0);
    } else if (maxTransformX > currentX.current) {
      setX(maxTransformX);
    }
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    startX.current = e.clientX;
    isMouseDown.current = true;
    document.onmousemove = handleMouseMove;
    document.addEventListener("mouseup", handleMouseUp, {
      once: true,
    });
    document.ondragstart = () => false;
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement;
    const direction = target.getAttribute("data-direction");

    const cl = Math.floor(containerWidth.current / 200);

    if (direction === "prev" && cIdx.current > 1) {
      let width = 200;
      if (tl - cl < cIdx.current) {
        width -= containerWidth.current - cl * 200;
      }
      const dx = x + width;

      setX(dx);
      cIdx.current--;
    } else if (direction === "next" && tl - cl >= cIdx.current) {
      let width = 200;
      if (tl - cl === cIdx.current) {
        width -= containerWidth.current - cl * 200;
      }
      const dx = x - width;

      setX(dx);
      cIdx.current++;
    }
  };
  return (
    <div className="swipe">
      <div ref={containerRef} className="container">
        <ul
          ref={wrapperRef}
          className="wrapper"
          onMouseDown={handleMouseDown}
          style={{
            transform: `translateX(${x}px)`,
          }}
        >
          {children}
        </ul>
      </div>
      {/* <button className="prev" data-direction="prev" onClick={handleClick}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button className="next" data-direction="next" onClick={handleClick}>
        <i className="fa-solid fa-arrow-right"></i>
      </button> */}
    </div>
  );
}

export default Swiper;
