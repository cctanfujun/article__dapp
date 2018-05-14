import React, { Component } from "react";
import "./App.css";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Button, Header, TransitionablePortal } from "semantic-ui-react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./component/Home.js";
import Find from "./component/Find.js";
import About from "./component/About.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Top />
        <br />
        <Footer />
      </div>
    );
  }
}

const Top = () => (
  <BrowserRouter>
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header href="/">
            <Image
              size="mini"
              src="./assets/images/NebulasLogo.svg"
              style={{ marginRight: "1.5em" }}
            />
            星云有好文
          </Menu.Item>
          <Menu.Item as="a" href="/">
            主页
          </Menu.Item>
          <Menu.Item as="a" href="/add">
            推好文
          </Menu.Item>
          <Menu.Item as="a" href="/about">
            关于
          </Menu.Item>
        </Container>
      </Menu>
      <div style={{ marginTop: "7em" }}>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Find} />
        <Route path="/about" component={About} />
      </div>
    </div>
  </BrowserRouter>
);

const Footer = () => {
  return (
    <div>
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "3em 0em" }}
      >
        <Container textAlign="center">
          <Divider inverted section />

          <List horizontal inverted divided link>
            <List.Item
              as="a"
              href="https://github.com/ChengOrangeJu/WebExtensionWallet"
            >
              基于星云链运行，使用前请先安装钱包插件
            </List.Item>
            <List.Item
              as="a"
              href="https://incentive.nebulas.io/cn/signup.html?invite=mfd8C"
            >
              注册星云开发者(奖励110Nas)
            </List.Item>
            <List.Item as="a" href="#">
              © 2018 Copyright
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};

export default App;
