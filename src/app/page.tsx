import About from "./About";
import Blog from "./Blog";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Location from "./Location";
import News from "./News";
import Shop from "./Shop";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Shop />
      <Blog />
      <Location />
      {/* <Contact /> */}
      <News />
      <Footer />
    </div>
  );
}

export default App;