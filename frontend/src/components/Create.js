import React, { Component } from 'react';
import { Button, message, Tabs } from 'antd';

import Canvas from './Canvas';
import EditableTitle from './EditableTitle';
import SettingsDrawer from './SettingsDrawer';
import RedTooltip from './RedTooltip';
import Attractor from './Attractor';
import { Template } from '../graphics/Template';
import { create } from '../api';

import './Create.css';

const { Group } = Button;
const { TabPane } = Tabs;

const defaultTitle = 'Enter a title here.';
const conflictCode = 409;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: defaultTitle,
      errors: {
        title: { isValid: true, message: '' },
        template: { isValid: true, message: '' }
      },
      isPublishing: false,
      settingsVisible: false,
      fractal: null
    };
  }

  handleTitle = title => {
    this.setState({ title });
    this.clearError('title');
  };

  handleTemplate = canvas => {
    if (canvas) {
      this.template = new Template(canvas);
      this.template.makeInteractive();
      this.template.draw();
    }
  };

  handleAdd = () => {
    this.template.add();
    this.template.draw();
    this.clearError('template');
  };

  validate() {
    return (
      this.validateField(
        'title',
        title => title === defaultTitle,
        'Click to enter a title.'
      ) &&
      this.validateField(
        'title',
        title => !/[a-zA-Z]/.test(title),
        'The title must contain at least one letter.'
      ) &&
      this.validateField(
        'template',
        () => this.template.children.length === 0,
        'Be sure to add a shape.'
      )
    );
  }

  validateField(field, predicate, message) {
    if (predicate(this.state[field])) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  clearError(field) {
    this.setError(field);
  }

  addError(field, message) {
    this.setError(field, message);
  }

  setError(field, message) {
    this.setState(({ errors }) => {
      const isValid = !Boolean(message);
      if (!message) {
        message = errors[field].message;
      }
      return { errors: { ...errors, [field]: { isValid, message } } };
    });
  }

  handleTab = key => {
    const { template } = this;
    if (key === 'template') {
      template.makeInteractive();
    } else {
      template.removeInteractivity();
    }
    this.setState({ fractal: template });
  };

  publish = async () => {
    if (this.validate()) {
      this.setState({ isPublishing: true });
      try {
        const { data } = await create(this.state.title, this.template);
        this.redirect(data.key);
      } catch (error) {
        const { status } = error.response;
        if (status === conflictCode) {
          this.addError('title', 'A fractal with this title already exists.');
        } else {
          message.error(`Unable to publish fractal (${status})`);
        }
        this.setState({ isPublishing: false });
      }
    }
  };

  redirect = key => {
    this.props.history.push({
      pathname: `/${key}`,
      state: { justPublished: true }
    });
  };

  render() {
    const { title, errors, isPublishing, drawerVisible } = this.state;
    return (
      <div className="Create">
        <EditableTitle
          value={title}
          onChange={this.handleTitle}
          hasError={!errors.title.isValid}
          errorMessage={errors.title.message}
        />

        <Tabs
          size="large"
          onChange={this.handleTab}
          tabBarExtraContent={
            <Group>
              <RedTooltip
                visible={!errors.template.isValid}
                message={errors.template.message}
              >
                <Button size="large" onClick={this.handleAdd}>
                  Add
                </Button>
              </RedTooltip>
              <Button
                size="large"
                onClick={() => this.setState({ drawerVisible: true })}
              >
                Settings
              </Button>
              <Button
                size="large"
                type="primary"
                loading={isPublishing}
                onClick={this.publish}
              >
                Publish
              </Button>
            </Group>
          }
        >
          <TabPane tab="Template" key="template" forceRender>
            <Canvas
              width={window.innerWidth}
              height="1000"
              onRef={this.handleTemplate}
            />
          </TabPane>
          <TabPane tab="Preview" key="preview" forceRender>
            <Attractor
              width={window.innerWidth}
              height="1000"
              fractal={this.state.fractal}
            />
          </TabPane>
        </Tabs>

        <SettingsDrawer
          visible={drawerVisible}
          onClose={() => this.setState({ drawerVisible: false })}
        />
      </div>
    );
  }
}

export default Create;
