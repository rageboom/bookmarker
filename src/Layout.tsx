import { SyntheticEvent, useState } from "react";
import Swiper, { Content } from "./components/swiper";
import Modal from "./components/modal";
import Category from "./components/category";
import { useRecoilState } from "recoil";
import { boardState } from "./store/boardsState";
import { categoryState } from "./store/categoryState";
import { modalState } from "./store/modalState";
import { useHideModal, useShowModal } from "./hooks/modalHook";
import AddBoardForm from "./components/addModalForm";

function Layout() {
  const [currentBoardID, setCurrentBoardID] = useState<string>("1");

  const [modal] = useRecoilState(modalState);
  const [boards] = useRecoilState(boardState);
  const [categories] = useRecoilState(categoryState);
  const hideModal = useHideModal();
  const showModal = useShowModal();
  const currentBoardCategories = categories[currentBoardID];
  const handleFallback = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${window.location.origin}/favicon.ico`;
    console.log(e);
  };
  const handleBoardClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement;
    const targetId = target.getAttribute("id");

    if (targetId) {
      setCurrentBoardID(targetId);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    if (modal.show) {
      hideModal();
    } else {
      showModal("보드를 추가하세요.", <AddBoardForm></AddBoardForm>);
    }
  };

  return (
    <div className="root">
      <header>
        <h2>Bookmarkers</h2>
        <div className="search">
          <button className="icon">
            <i className="fa-light fa-solid fa-search"></i>
          </button>
        </div>
      </header>
      <main className="content">
        <section className="bookmarks">
          <div className="header-container">
            <h4>당신의 보드</h4>
            <button className="icon" onClick={handleAddClick}>
              <i className="fa-solid fa-add"></i>
            </button>
          </div>
          <div className="boards-container">
            <Swiper>
              {boards.map((board, index) => (
                <Content
                  board={board}
                  clickContent={handleBoardClick}
                ></Content>
              ))}
            </Swiper>
          </div>
          <div className="category-container">
            {currentBoardCategories
              .map((categories) => categories)
              .map((category, index) => (
                <Category key={index} categoryName={category.name}>
                  {category.list.map((categoryItem, index) => (
                    <li key={categoryItem.id + index}>
                      <a href={categoryItem.href} target="_blank">
                        <img
                          className="favicon"
                          src={`${
                            new URL(categoryItem.href).origin
                          }/favicon.ico`}
                          onError={handleFallback}
                        />
                        <div className="name">{categoryItem.name}</div>
                      </a>
                    </li>
                  ))}
                </Category>
              ))}
          </div>
        </section>
      </main>
      <footer className="footer"></footer>
      <Modal></Modal>
    </div>
  );
}

export default Layout;
