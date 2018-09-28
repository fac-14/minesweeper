import React from "react";
import PropTypes from "prop-types";
import emoji1 from "../public/img/1.png";
import emoji2 from "../public/img/2.png";
import emoji3 from "../public/img/3.png";
import emoji4 from "../public/img/4.png";
import emoji5 from "../public/img/5.png";
import emoji6 from "../public/img/6.png";
import emojiMine from "../public/img/M.png";
// import some funcationality some utils

class Tile extends React.Component {
  click() {
    if (this.props.value === "M") {
      return () => {
        this.props.parentBoard.endGame(false);
      };
    } else if (this.props.parentBoard.state.revealedTiles < 381) {
      return () => {
        this.props.parentBoard.revealTile(this.props.id);
      };
    } else {
      return () => {
        this.props.parentBoard.endGame(true);
      };
    }
  }

  displayEmoji(value) {
    const emojiObj = {
      1: emoji1,
      2: emoji2,
      3: emoji3,
      4: emoji4,
      5: emoji5,
      6: emoji6,
      7: emoji6,
      8: emoji6,
      9: emoji6,
      M: emojiMine
    };
    return emojiObj[value];
  }

  render() {
    return (
      <div
        className={this.props.displayed ? "tile tile--revealed" : "tile"}
        onClick={this.props.displayed ? () => {} : this.click()}
      >
        {this.props.displayed ? (
          <img
            className="tile-emoji"
            src={this.displayEmoji(this.props.value)}
          />
        ) : (
          ""
        )}
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
