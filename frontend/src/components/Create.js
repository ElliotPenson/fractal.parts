import React, { Component } from 'react';
import { Typography, Button } from 'antd';

import Canvas from './Canvas';
import { Controller } from '../graphics/Controller';

import './Create.css';

const { Title } = Typography;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { title: 'Enter a title here.' };
  }

  handleTitle = title => {
    this.setState({ title });
  };

  handleCanvas = canvas => {
    this.controller = new Controller(canvas);
  };

  handleNew = () => {
    this.controller.add();
  };

  render() {
    return (
      <div className="Create">
        <Title editable={{ onChange: this.handleTitle }}>
          {this.state.title}
        </Title>
        <Canvas width="750" height="750" onRef={this.handleCanvas} />
        <div>
          <Button size="large" onClick={this.handleNew}>
            New
          </Button>
        </div>
      </div>
    );
  }
}

export default Create;
