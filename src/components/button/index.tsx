import React, { useEffect, useState } from "react";

const Button = () => {
  const [buttonCount, setButtonCount] = useState(0);
  useEffect(() => {
    fetch(`api/button`)
      .then((res) => res.json())
      .then((data) => setButtonCount(data.timesClicked));
  }, []);

  return (
    <div className="flex flex-col gap-2 text-gray-700">
      <p>This button has been clicked {buttonCount} times!</p>
      <button
        onClick={async (event) => {
          event.preventDefault();

          /*
           * client lie: update the button count immediately, assuming that the
           * server will respond with the correct value
           */
          setButtonCount(buttonCount + 1);

          /*
           * make the call to update the count on the server
           */
          const res = await fetch("api/button", { method: "POST" });
          const newButton = await res.json();
          setButtonCount(newButton.timesClicked);
        }}
      >
        Click me!
      </button>
    </div>
  );
};

export default Button;
