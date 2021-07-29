export const getCutStr = (str) => {
    if (str) {
      if (str.length >= 0 && str.length < 8) {
        return str.substr(0, 7);
      } else if (str.length >= 8 && str.length < 10) {
        return str.substr(0, 9);
      } else if (str.length >= 10 && str.length < 13) {
        return str.substr(0, 12);
      } else if (str.length >= 13) {
        return str.substr(0, 16);
      }
    }
  }