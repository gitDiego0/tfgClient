import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <main className="container">
        <section className="container">{children}</section>
      </main>
    </>
  );
};

export default Layout;
