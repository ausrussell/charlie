import React, { Component } from "react";
import "../css/search.css";
import { Input, Accordion, Icon, Dropdown } from "semantic-ui-react";

const storyOptions = [
  { key: "1", text: "6 months of Walmart", value: "1" },
  { key: "2", text: "A weekly summary", value: "2" },
  { key: "3", text: "Check a particular transaction", value: "3" },
  { key: "4", text: "All Walmart", value: "4" }
];

const HeaderHero = props => {
  return (
    <div className="header-hero">
      <div className="header-hero__title">{props.title}</div>
      <div className="header-hero__time">
        {props.cardCount !== 0 && props.cardCount + " " + props.cardType + "s"}
      </div>
      <div className="header-hero__average">
        {props.average !== 0 &&
          "Average per " + props.cardType + " : $" + props.average}
      </div>
      <div className="header-hero__sum-total">
        {props.sumTotal !== 0 && "Total: $" + props.sumTotal}
      </div>
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
          />
        )}
      </div>
    );
  }
}

export default Header;
