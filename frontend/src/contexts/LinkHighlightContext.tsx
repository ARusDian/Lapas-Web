import { createContext } from "react";

interface LinkHighlightContextProps {
  currentPath: string,
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>
}

const LinkHighlightContext = createContext<LinkHighlightContextProps>({
  currentPath: "",
  setCurrentPath: () => {},
});

export default LinkHighlightContext;