import { useState } from "react";
import Swiper from "./components/swiper";
import Modal from "./components/modal";
import Category from "./components/category";
import { useRecoilState, RecoilState } from "recoil";
import { boardState } from "./store/boardsState";
import { categoryState } from "./store/categoryState";
import { modalState } from "./store/modalState";
import { useHideModal, useShowModal } from "./hooks/modalHook";
import AddBoardForm from "./components/addModalFrom";

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
    if (e.target !== e.currentTarget) return;
    if (modal.show) {
      hideModal();
    } else {
      showModal("보드를 추가하세요.", <AddBoardForm></AddBoardForm>);
    }
  };

  return (
    <div className="root">
      <header>
        <div className="searchBox">
          <i className="fa-solid fa-book-bookmark"></i>
          <input type="text" placeholder="북마크를 찾아보세요."></input>
          <button className="fa-light fa-solid fa-search"></button>
        </div>
      </header>
      <main className="content">
        <section className="bookmarks">
          <div className="header-container">
            <h2>당신의 보드</h2>
            <i className="fa-solid fa-add" onClick={handleAddClick}></i>
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
