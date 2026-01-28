export const useLoader = () => {
  const isIntroDone = useState("isIntroDone", () => false);
  return { isIntroDone };
};
