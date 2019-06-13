import React, { Component } from 'react';
import { Button, message, Tabs } from 'antd';
import produce from 'immer';

import Canvas from './Canvas';
import EditableTitle from './EditableTitle';
import SettingsDrawer from './SettingsDrawer';
import RedTooltip from './RedTooltip';
import Attractor from './Attractor';
import Tour from './Tour';
import { welcome } from './notifications';
import { Template } from '../graphics/Template';
import { create } from '../api';
import { RenderMethod } from '../graphics/attractor';

import './Create.css';

const { Group } = Button;
const { TabPane } = Tabs;

const defaultTitle = 'Enter a title here.';
const conflictCode = 409;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        title: { isValid: true, message: '' },
        template: { isValid: true, message: '' }
      },
      isPublishing: false,
      settingsVisible: false,
      tourVisible: false,
      fractal: {
        title: defaultTitle,
        body: {
          settings: { renderMethod: RenderMethod.PROGRESSIVE, iterations: 6 }
        }
      }
    };
  }

  componentDidMount() {
    welcome(
      'Welcome to fractal.parts!',
      'This page lets you create a fractal. Would you like a tour?',
      () => this.setState({ tourVisible: true })
    );
  }

  handleTitle = title => {
    this.setState(
      produce(draft => {
        draft.fractal.title = title;
      })
    );
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

  handleSettings = settings => {
    this.setState(
      produce(draft => {
        draft.fractal.body.settings = {
          ...draft.fractal.body.settings,
          ...settings
        };
      })
    );
  };

  handleTab = key => {
    if (key === 'template') {
      this.template.makeInteractive();
    } else {
      this.template.removeInteractivity();
      this.syncFractal();
    }
  };

  syncFractal = () => {
    this.setState(
      produce(draft => {
        draft.fractal = this.makeFractal();
      })
    );
  };

  makeFractal = () => {
    const {
      title,
      body: { settings }
    } = this.state.fractal;
    const { parent, children } = this.template;
    return { title, body: { settings, parent, children } };
  };

  publish = async () => {
    if (this.validate()) {
      this.setState({ isPublishing: true });
      try {
        const { data } = await create(this.makeFractal());
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
    if (predicate(this.state.fractal[field])) {
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

  render() {
    const { errors, isPublishing, settingsVisible, fractal } = this.state;
    return (
      <div className="Create">
        <EditableTitle
          value={fractal.title}
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
                <Button
                  className="Create-add"
                  size="large"
                  onClick={this.handleAdd}
                >
                  Add
                </Button>
              </RedTooltip>
              <Button
                size="large"
                onClick={() => this.setState({ settingsVisible: true })}
              >
                Settings
              </Button>
              <Button
                className="Create-publish"
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
              className="Create-template"
              width={window.innerWidth}
              height="1000"
              onRef={this.handleTemplate}
            />
          </TabPane>
          <TabPane
            tab={<span className="Create-preview">Preview</span>}
            key="preview"
            forceRender
          >
            <Attractor
              width={window.innerWidth}
              height="1000"
              fractal={fractal}
            />
          </TabPane>
        </Tabs>
        <SettingsDrawer
          settings={fractal.body.settings}
          visible={settingsVisible}
          onClose={() => this.setState({ settingsVisible: false })}
          onChange={this.handleSettings}
        />
        <Tour run={this.state.tourVisible} />
      </div>
    );
  }
}

export default Create;
