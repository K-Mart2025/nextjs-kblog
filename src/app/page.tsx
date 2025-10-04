import About from "./About";
import Blog from "./Blog";
import Hero from "./Hero";
import Location from "./Location";
import News from "./News";
import Shop from "./Shop";

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Shop />
      <Blog />
      <Location />
      {/* <Contact /> */}
      <News />
    </div>
  );
}

export default App;