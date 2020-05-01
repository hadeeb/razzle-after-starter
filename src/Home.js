import * as React from "react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <div className="Home-header">
        <header>Welcome to After.js</header>
      </div>
      <p>
        To get started, edit <code>src/Home.js</code> or{" "}
        <code>src/About.js</code> and save to reload.
      </p>
      <Link to="/about">About -></Link>
    </main>
  );
}

Home.getInitialProps = function () {
  return { whatever: "stuff" };
};

export default Home;
