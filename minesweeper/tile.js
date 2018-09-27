import React from "react";
import PropTypes from "prop-types";
// import some funcationality some utils

class Tile extends React.Component {
  state = {
    value: this.props.value,
    displayed: false
    // emoji file
  };

  componentDidMount() {
    this.setState(() => {
      return {
        value: this.props.value,
        displayed: this.props.displayed
      };
    });
  }

  reveal() {
    return () => {
      this.setState(prevState => {
        return {
          value: prevState.value,
          displayed: true
        };
      });
    };
  }

  // onClick = Tile.click()
  // click():
  //   if tile.value === 'M'
  //    endGame(false) --> call function in another class
  //  else if (revealedTiles < 381)
  //    reveal(remember to +1 to revealTiles)
  //  else
  //    endGame(true)

  render() {
    return (
      <div onClick={this.reveal()}>
        {this.state.displayed ? this.state.value : "*"}
      </div>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayed: PropTypes.bool
};

export default Tile;
