import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./genre.css";

const Genre = (props) => {
  const [name] = useState(props.genreName);
  // const [active, setActive] = useState(false);

  // useEffect(() => {
  //   console.log(name);
  // }, []);

  // const toggleClass = () => {
  //   let a = active;
  //   setActive(!a);
  //   props.activeGenreHandler(name, active);
  // };

  let classes = "genre_div ";
  // if (active) classes += "genre_div_active";
  return (
    <Link className="text_transfrom_none" to={props._id}>
      <div className={classes}>
        <p className="genre_text">{name}</p>
      </div>
    </Link>
  );
};

export default Genre;

// class Category extends Component {
//   state = {
//     name: this.props.categoryName,
//     active: false
//   };

//   toggleClass = () => {
//     let a = this.state.active;
//     this.setState({ active: !a });
//     this.props.activeCategoryHandler(this.state.name, this.state.active);
//   };
//   render() {}
// }

// export default Category;
