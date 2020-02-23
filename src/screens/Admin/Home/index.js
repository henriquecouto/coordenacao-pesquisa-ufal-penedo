import React, { useEffect } from "react";

export default function Home({ setPosition }) {
  useEffect(() => {
    setPosition("Home");
  }, [setPosition]);
  return <div>Hello Home admin</div>;
}
