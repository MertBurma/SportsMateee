import React, { FC, Fragment } from "react";
import IndexTopbar from "../index-topbar/IndexTopbar";
import IndexSidebar from "../index-sidebar/IndexSidebar";

const Layout: FC = ({ children }) => {
  return (
    <Fragment>
      <IndexTopbar />
      <div style={{ display: "flex" }}>
        <IndexSidebar />
        <main
          style={{
            marginTop: 60,
            marginLeft: 50,
          }}
        >
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default Layout;
