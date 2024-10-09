export const saveState = (state) => {
  console.log(state);
  try {
    const data = JSON.stringify(state);
    localStorage.setItem('cart', data);
  } catch (error) {
    console.log(error);
  }
};

export const loadState = () => {
  try {
    const cartData = localStorage.getItem('cart');
    if (cartData === null) {
      return undefined;
    } else {
      return JSON.parse(cartData);
    }
  } catch (error) {
    console.log(error);
  }
};
