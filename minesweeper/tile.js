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

  displayEmoji(value) {
    const emojiObj = {
      1: "../public/img/1.png",
      2: "../public/img/2.png",
      3: "../public/img/3.png",
      4: "../public/img/4.png",
      5: "../public/img/5.png",
      6: "../public/img/6.png",
      7: "../public/img/6.png",
      8: "../public/img/6.png",
      9: "../public/img/6.png",
      M: "../public/img/M.png"
    };
    return emojiObj[value];
  }

  render() {
    return (
      <div
        className={this.state.displayed ? "tile tile--revealed" : "tile"}
        onClick={this.state.displayed ? () => {} : this.click()}
      >
        <img
          src={this.state.displayed ? this.displayEmoji(this.state.value) : ""}
        />
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
