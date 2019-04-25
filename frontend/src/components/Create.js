import React, { Component } from 'react';
import { Button, Tabs, Typography } from 'antd';

import Canvas from './Canvas';
import { Controller } from '../graphics/Controller';

import './Create.css';

const { Group } = Button;
const { TabPane } = Tabs;
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

  handleAdd = () => {
    this.controller.addRectangle();
  };

  render() {
    return (
      <div className="Create">
        <Title editable={{ onChange: this.handleTitle }}>
          {this.state.title}
        </Title>
        <Tabs
          size="large"
          tabBarExtraContent={
            <Group>
              <Button size="large" onClick={this.handleAdd}>
                Add
              </Button>
              <Button size="large" type="primary">
                Publish
              </Button>
            </Group>
          }
        >
          <TabPane tab="Template" key="1">
            <Canvas
              width={window.innerWidth}
              height="1000"
              onRef={this.handleCanvas}
            />
          </TabPane>
          <TabPane tab="Preview" key="2">
            todo
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Create;
