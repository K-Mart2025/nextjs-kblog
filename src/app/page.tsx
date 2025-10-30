import { detectDeviceType, trackVisit } from "@/services/trackVisit";
import { headers } from "next/headers";
import { About } from "./About";
import { Blog } from "./Blog";
import { Hero } from "./Hero";
import { Location } from "./Location";
import { News } from "./News";
import { Shop } from "./Shop";

export default async function App() {
  const headersList = await headers();
  const host = headersList.get('host');
  const userAgent = headersList.get('user-agent') || '';

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const deviceType = detectDeviceType(userAgent);
  const page = `${protocol}://${host}/`
  await trackVisit(page, deviceType)
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

