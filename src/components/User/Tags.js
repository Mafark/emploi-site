import React, { Component } from 'react';

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      tags: []
    };
  }

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    this.setState({
      tags: this.props.user.tags
    });
    console.log('set' + this.props.user.tags);
  }

  addEmptyTag() {
    let newTags = this.state.tags.splice(0);
    newTags.push('');
    this.setState({
      tags: newTags
    });
  }

  deleteTag(tag) {
    let newTags = this.state.tags.splice(0);
    newTags.splice(newTags.indexOf(tag), 1);
    console.log(newTags);
    this.setState({
      tags: newTags
    });
  }

  changeTag(tag, e) {
    let newTags = this.state.tags.splice(0);
    newTags[newTags.indexOf(tag)] = e.target.value;
    this.setState({
      tags: newTags
    });
  }

  render() {
    if (this.state.tags && this.state.tags.length !== 0) {
      return (
        <div>
          <hr />
          <div className="tags text-center small-12 columns">
            {this.state.tags.map((tag, index) => {
              return (
                <span className={'tag circle small-bg ' + this.props.editClass} key={index}>
                  <input
                    className="small-bg tag-input"
                    onChange={this.changeTag.bind(this, tag)}
                    value={tag}
                  />
                  {this.props.editing ? (
                    <i
                      onClick={this.deleteTag.bind(this, tag)}
                      className={'material-icons ' + this.props.editClass}>
                      close
                    </i>
                  ) : null}
                </span>
              );
            })}
            {this.props.editing ? (
              <button className="icon-link icon-link__small" onClick={this.addEmptyTag.bind(this)}>
                +
              </button>
            ) : null}
          </div>
        </div>
      );
    }
    if (this.props.editing) {
      this.addEmptyTag();
    } else {
      this.state.tags && this.state.tags.indexOf('') !== -1 ? this.deleteTag('') : null;
    }
    return null;
  }
}

export default Tags;
