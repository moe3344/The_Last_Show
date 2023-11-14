import Button from "./Button";
import ObituaryModal from "./ObituaryModal";
import { useState } from "react";
const Navbar = ({ refreshObituaries }) => {
  const [visibility, setVisibility] = useState(false);
  const handleClick = () => {
    setVisibility(!visibility);
  };
  return (
    <>
      <ObituaryModal
        visibility={visibility}
        setVisibility={handleClick}
        refreshObituaries={refreshObituaries}
      />
      <div className="wrapper flex justify-center items-center p-4">
        <div className="title text-4xl flex-1 text-center">The Last Show</div>
        <div className="new-obituary-btn">
          <Button text={"New Obituary"} handler={handleClick} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
