import React, { Component } from "react";
import { Button, Checkbox, Form, ItemDescription } from "semantic-ui-react";
import { sendToBlockChain } from "./BlockChain.js";
import { Modal } from "react-bootstrap";

const Find = () => {
  let style = {
    width: "70%",
    textAlgin: "left",
    margin: "0 auto"
  };

  return (
    <div style={style}>
      <MyForm />
    </div>
  );
};

class MyForm extends Component {
  constructor() {
    super();
    this.state = {
      article_url: "",
      discover: "",
      article_desc: "",
    };
  }


  handleChange(e, number) {
    if (number == 1) {
      this.setState({
        fullName: e.target.value
      });
    } else if (number == 2) {
      this.setState({
        discover: e.target.value
      });
    } else if (number == 3) {
      this.setState({
        article_url: e.target.value
      });
    } else if (number == 4) {
      this.setState({
        img_url: e.target.value
      });
    } else {
      this.setState({
        article_desc: e.target.value
      });
    }
  }

  sendForm() {
    var state_str = JSON.stringify(this.state);
    var dic = [];
    dic.push(state_str);
    sendToBlockChain(JSON.stringify(dic), function callback(resp) {
      console.log(resp);
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Input
            fluid
            label="文章 Url"
            placeholder="http://"
            onChange={(ev, index) => {
              this.handleChange(ev, 3);
            }}
          />

          <Form.Input
            fluid
            label="发现人"
            placeholder="昵称"
            onChange={(ev, index) => {
              this.handleChange(ev, 2);
            }}
          />

          <Form.TextArea
            label="推荐语"
            placeholder="如果你想说说这篇文章"
            onChange={(ev, index) => {
              this.handleChange(ev, 5);
            }}
          />
          <Form.Button color="blue" onClick={this.sendForm.bind(this)}>
            Submit
          </Form.Button>
        </Form>
      </div>
    );
  }
}

export default Find;
