import Button from "./Button";
import { useState, useRef } from "react";
const ObituaryCard = ({ obituary }) => {
  const [visibility, setVisibility] = useState(false);
  const [playerType, setPlayerType] = useState("playerPlay");
  const audioRef = useRef(null);
  const handlePlayerType = () => {
    if (playerType === "playerPlay") {
      // play audio
      audioRef.current.play();
      setPlayerType("playerPause");
    } else {
      // pause audio
      audioRef.current.pause();
      setPlayerType("playerPlay");
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          onClick={() => setVisibility(!visibility)}
          className="rounded-t-lg h-64 w-full object-cover object-center cursor-pointer"
          src={obituary.image_url}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {obituary.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`${obituary.birth_year} - ${obituary.death_year}`}
        </p>
        <div className={`${visibility ? "block" : "hidden"}`}>
          <p className={`mb-3 font-normal text-gray-700 dark:text-gray-400`}>
            {obituary.obituary}
          </p>
          <Button text={""} type={playerType} handler={handlePlayerType} />
        </div>
        {/* <Button
          text={""}
          type={"icon"}
          iconPath={
            "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12 8H9V3H7V8H4V9L8 13L12 9V8Z"
          }
        /> */}
      </div>
      <div className="hidden">
        <audio ref={audioRef} src={obituary.audio_url}></audio>
      </div>
    </div>
  );
};
export default ObituaryCard;
