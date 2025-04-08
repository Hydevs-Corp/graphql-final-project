import { ReactElement } from "react";

const CenteredContainer = ({ children }: { children: ReactElement }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 1440,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CenteredContainer;
