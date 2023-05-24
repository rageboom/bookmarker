import { ReactNode, useState, useRef, useEffect } from "react";
import "./swiper.scss";
interface SwiperProps {
  children: ReactNode[];
}

type TouchEventType = "ontouchmove" | "ontouchend" | "ontouchstart";
type MouseEventType = "onmousemove" | "onmouseup" | "onmousedown";

const isMobileDevice = () => {
  return window.navigator.userAgent.indexOf("Mobi") > -1;
};
const getEventString = (isMobile: boolean) => {
  if (isMobile) {
    return (type: string): TouchEventType => {
      if (type === "move") {
        return "ontouchmove";
      } else if (type === "end") {
        return "ontouchend";
      } else {
        return "ontouchstart";
      }
    };
  } else {
    return (type: string): MouseEventType => {
      if (type === "move") {
        return "onmousemove";
      } else if (type === "end") {
        return "onmouseup";
      } else {
        return "onmousedown";
      }
    };
  }
};

function Swiper({ children }: SwiperProps) {
  const [x, setX] = useState(0);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const containerWidth = useRef<number>(0);
  const wrapperWidth = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const isDragStart = useRef<boolean>(false);
  const cIdx = useRef(1);
  const tl = children.length;
  const eventType = getEventString(isMobileDevice());

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width;
    }
    if (wrapperRef.current) {
      wrapperWidth.current = wrapperRef.current.getBoundingClientRect().width;
    }
  }, [tl]);
  const transformX = (clientX: number) => {
    if (isDragStart.current) {
      const dx = startX.current - clientX;

      currentX.current = x - dx;
      setX(currentX.current);
    }
  };
  const startDragging = (clientX: number) => {
    startX.current = clientX;
    isDragStart.current = true;
    document.ondragstart = () => false;
  };
  const cleanup = () => {
    const type = eventType("move");
    document[type] = null;
    isDragStart.current = false;
    const maxTransformX = containerWidth.current - wrapperWidth.current;

    document.ondragstart = null;
    if (currentX.current > 0) {
      setX(0);
    } else if (maxTransformX > currentX.current) {
      setX(maxTransformX);
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    transformX(e.clientX);
  };
  const handleMouseUp = (e: MouseEvent) => {
    cleanup();
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    startDragging(e.clientX);
    document[eventType("move") as MouseEventType] = handleMouseMove;
    document[eventType("end") as MouseEventType] = handleMouseUp;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    startDragging(e.changedTouches[0].clientX);
    document[eventType("move") as TouchEventType] = handleTouchMove;
    document[eventType("end") as TouchEventType] = handleTouchEnd;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    cleanup();
  };
  const handleTouchMove = (e: TouchEvent) => {
    transformX(e.changedTouches[0].clientX);
  };
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   const target = e.currentTarget as HTMLElement;
  //   const direction = target.getAttribute("data-direction");

  //   const cl = Math.floor(containerWidth.current / 200);

  //   if (direction === "prev" && cIdx.current > 1) {
  //     let width = 200;
  //     if (tl - cl < cIdx.current) {
  //       width -= containerWidth.current - cl * 200;
  //     }
  //     const dx = x + width;

  //     setX(dx);
  //     cIdx.current--;
  //   } else if (direction === "next" && tl - cl >= cIdx.current) {
  //     let width = 200;
  //     if (tl - cl === cIdx.current) {
  //       width -= containerWidth.current - cl * 200;
  //     }
  //     const dx = x - width;

  //     setX(dx);
  //     cIdx.current++;
  //   }
  // };
  return (
    <div className="swipe">
      <div ref={containerRef} className="container">
        <ul
          ref={wrapperRef}
          className="wrapper"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
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
