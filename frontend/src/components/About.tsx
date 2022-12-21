import React from "react";

const About: React.FC = (): JSX.Element => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-4 w-5/6">
        <div>
          Company name: <i>The orange note</i>
        </div>
        <div>Contacts:</div>
      </div>
    </div>
  );
};
export default About;
