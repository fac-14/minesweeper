import React from "react";
import PropTypes from "prop-types";
// import some funcationality some utils

class Tile extends React.Component {
  state = {
    value: this.props.value,
    displayed: this.props.displayed,
    id: this.props.id,
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

  static getDerivedStateFromProps(props) {
    const { value, displayed } = props;
    return {
      value,
      displayed
    };
  }

  click() {
    if (this.state.value === "M") {
      return () => {
        this.state.parentBoard.endGame(false);
      };
    } else if (this.state.parentBoard.state.revealedTiles < 381) {
      return () => {
        this.state.parentBoard.revealTile(this.state.id);
      };
    } else {
      return () => {
        this.state.parentBoard.endGame(true);
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
  id: PropTypes.number,
  parentBoard: PropTypes.object
};

export default Tile;
