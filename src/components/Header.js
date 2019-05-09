import React, { Component } from "react";
import "../css/search.css";
import { Input, Accordion, Icon, Dropdown, Button } from "semantic-ui-react";

const storyOptions = [
  { key: "1", text: "6 months of Walmart", value: "1" },
  { key: "2", text: "A weekly summary", value: "2" },
  { key: "3", text: "Check a particular transaction", value: "3" },
  { key: "4", text: "All Walmart", value: "4" }
];

const HeaderHero = props => {
  const { title, cardCount, cardType, average, sumTotal, checkID } = props;
  return (
    <div className="header-hero">
      <div className="header-hero__title">{title}</div>
      {!checkID && (
        <div className="header-hero__time">
          {cardCount !== 0 && cardCount + " " + cardType + "s"}
        </div>
      )}
      {!checkID && (
        <div className="header-hero__average">
          {average > 0 ? (
            <div className="header-hero__average">
              Average spend per {cardType} : ${average}
            </div>
          ) : (
            <div className="header-hero__average total-positive">
              Average savings per {cardType} : ${average * -1}
            </div>
          )}
        </div>
      )}

      {sumTotal > 0 ? (
        <div className="header-hero__sum-total">Total: ${sumTotal}</div>
      ) : (
        !checkID && (
          <div className="header-hero__sum-total total-positive">
            Total: ${sumTotal * -1}
          </div>
        )
      )}

      {cardCount === 7 && (
        <div className="target-button">
          <Button animated color="green" compact>
            <Button.Content visible>
              <Icon name="bullseye" />
              Set a target
            </Button.Content>
            <Button.Content hidden>
              Save ${parseInt(average * -1)} per week!
            </Button.Content>
          </Button>
        </div>
      )}

      {cardCount === 6 && (
        <div className="target-button">
          <Button animated color="green" compact>
            <Button.Content visible>
              <Icon name="bullseye" />
              Target monthly
            </Button.Content>
            <Button.Content hidden>
              Save ${parseInt(average)} per month!
            </Button.Content>
          </Button>
        </div>
      )}

      {checkID > 0 && (
        <div className="target-button">
          <Button animated color="green" compact>
            <Button.Content visible>
              <Icon name="eye" />
              Watch transaction
            </Button.Content>
          </Button>
        </div>
      )}
    </div>
  );
};

class Header extends Component {
  state = {
    term: "",
    activeIndex: null,
    showHero: false,
    timeNumber: -1,
    timeUnit: "day",
    storyValue: 0
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
    this.setState({ showHero: this.state.term !== "", activeIndex: null });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  handleChange = (e, { value }) => {
    this.props.onStorySelect(value);
    this.setState({ showHero: true, activeIndex: null, storyValue: null });
  };

  render() {
    const { activeIndex, term } = this.state;

    return (
      <div className="header-wrapper">
        <div className="header-container">
          <div className="top-header">
            <h2 className="top-header-name">Activity</h2>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
                className="magnifying-glass"
              >
                <Icon name="search" />
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <div className="search">
                  <div className="search-dropdown">
                    <form onSubmit={this.onFormSubmit}>
                      <Input
                        fluid
                        placeholder="Search all your activity..."
                        value={term}
                        onChange={e => this.setState({ term: e.target.value })}
                      />
                    </form>
                  </div>
                </div>
                <Dropdown
                  placeholder="Select a story"
                  fluid
                  selection
                  options={storyOptions}
                  onChange={this.handleChange}
                />
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
        {this.state.showHero && (
          <HeaderHero
            title={this.props.title}
            cardCount={this.props.cardCount}
            cardType={this.props.cardType}
            average={this.props.average}
            sumTotal={this.props.sumTotal}
            checkID={this.props.checkID}
          />
        )}
      </div>
    );
  }
}

export default Header;
