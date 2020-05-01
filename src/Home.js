import * as React from "react";

import { Link } from "react-router-dom";

import * as styles from "./Home.treat";

function Home() {
  return (
    <main className={styles.homeStyle}>
      <h2 className={styles.headerStyle}>Welcome to After.js</h2>
      <p>
        To get started, edit <code>src/Home.js</code> or{" "}
        <code>src/About.js</code> and save to reload.
      </p>
      <Link to="/about" className={styles.linkStyle}>
        About ->
      </Link>
    </main>
  );
}

Home.getInitialProps = function () {
  return { whatever: "stuff" };
};

export default Home;
