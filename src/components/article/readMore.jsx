import { useState } from "react";

const ReadMore = ({ children }) => {
    const text = typeof children==='string'?children:children.props.children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="readMoreText" style={{textAlign:"justify"}}>
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };
  export default ReadMore;