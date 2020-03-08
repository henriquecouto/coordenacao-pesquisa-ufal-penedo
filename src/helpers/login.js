export const saveLastUse = () => {
  console.log("set");
  localStorage.setItem("@coord-pesq:lastUse", new Date());
};

export const getLastUse = () => {
  console.log("get");

  return new Date(localStorage.getItem("@coord-pesq:lastUse"));
};
