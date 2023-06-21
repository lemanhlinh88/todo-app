export const handleSaveOnLocalStorage = (works) => {
  try {
    localStorage.setItem("works", JSON.stringify(works));
  } catch (error) {
    console.log(error);
  }
};

export const getWorksFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("works")) || [];
  } catch (error) {
    console.log(error);
  }
};
