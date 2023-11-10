<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface PathNavParams {
  pathInfo: PathInfoType[];
}

export type PathInfoType = {
  display: string;
  url: string;
};

const PathNav = ({ pathInfo }: PathNavParams) => {
  const currentPath = usePathname() as string;

  const getPath = (currentIndex: number) => {
    const segments = currentPath.split("/");
    const path = segments.slice(
      0,
      segments.length - (pathInfo.length - currentIndex - 1)
    );
    return path.join("/");
  };

  return (
    <div className="mt-6">
      <div className="font-merriweather flex flex-row">
        {pathInfo.map((currPath, index, array) => (
          <React.Fragment key={index}>
            {index !== 0 && <div className="px-2">&gt;</div>}
            <Link
              href={getPath(index)}
              className={
                index === array.length - 1 ? "text-dark-teal" : "text-black"
              }
            >
              {currPath.display}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default PathNav;
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestPage from "../app/private/[uid]/admin/home/chapter/page";
=======
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import TestPage from "../app/private/[uid]/admin/home//page";
>>>>>>> 0487a52 (created specific chapter page)

// const PathNav = () => {
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestPage from "../app/private/[uid]/admin/home/chapter/page";

const PathNav = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/test">Test</Link>
          </li>
          {/* <li>
            <Link to="/"></Link>
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
};
export default PathNav;

// const Navigation = () => {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           {/* <li>
//             <Link to="/"></Link>
//           </li> */}
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes>
//     </Router>
//   );
// };
