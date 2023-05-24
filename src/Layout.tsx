import { useState } from "react";
import Swiper from "./components/swiper";
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
  const handleBoardClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
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
              {boards.map((board) => (
                <li id={board.id} onClick={handleBoardClick}>
                  <div>{board.title}</div>
                  <div>{board.desc}</div>
                </li>
              ))}
            </Swiper>
          </div>
          <div className="category-container">
            {currentBoardCategories
              .map((categories) => categories)
              .map((category) => (
                <Category categoryName={category.name}>
                  {category.list.map((categoryItem) => (
                    <li key={categoryItem.id}>
                      <a href={categoryItem.href} target="_blank">
                        <img src={`${categoryItem.href}/favicon.ico`} />
                        <div>{categoryItem.name}</div>
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
