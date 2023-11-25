import React from "react";

type Props = {};

const PageHeaders = ({ h1Text = "Hello" }) => {
  return (
    <section className="text-center mt-24 mb-8">
      <h1
        className="text-3xl"
        style={{ textShadow: "2px 2px 0 rgba(134,194,50,.7)" }}
      >
        {h1Text}
      </h1>
    </section>
  );
};

export default PageHeaders;
