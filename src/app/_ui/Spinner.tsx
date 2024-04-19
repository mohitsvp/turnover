import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {ClimbingBoxLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Spinner = () => {
    let [loading, setLoading] = useState(true);
    
    return (
        <div className="flex justify-center items-center h-[90vh]">
          <ClimbingBoxLoader
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
        />
        </div>
      );
    
}

export default Spinner