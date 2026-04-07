import Bookmarks from "./assets/components/Bookmarks";
import Header from "./assets/components/Header";
import SideBar from "./assets/components/SideBar";

function App() {
  return (
    <div className="mx-auto bg-teal-100 min-h-screen">
      <Header />
      <div className="grid grid-cols-[30%_70%]">
        <SideBar />
        <Bookmarks />
      </div>
    </div>
  );
}

export default App;
