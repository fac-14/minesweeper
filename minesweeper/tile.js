import React from "react";
import PropTypes from "prop-types";
// import some funcationality some utils

class Tile extends React.Component {
  state = {
    value: this.props.value,
    displayed: false,
    parentBoard: this.props.parentBoard
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
    this.setState(prevState => {
      return {
        value: prevState.value,
        displayed: true
      };
    });
  }

  // onClick = Tile.click()
  click() {
    if (this.state.value === "M") {
      return () => {
        //  endGame(false) --> call function in another class
      };
    } else if (this.state.parentBoard.state.revealedTiles < 381) {
      return () => {
        this.state.parentBoard.revealTile();
        this.reveal();
      };
    } else {
      return () => {
        // endGame(true);
      };
    }
  }

  render() {
    return (
      <div onClick={this.state.displayed ? () => {} : this.click()}>
        {this.state.displayed ? this.state.value : "*"}
      </div>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayed: PropTypes.bool,
  parentBoard: PropTypes.object
};

export default Tile;
