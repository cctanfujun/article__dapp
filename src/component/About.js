import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

class About extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          什么是星云有好文?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            用户可以推荐文章，或者给文章点赞点踩，每篇文章只能进行一次赞或者一次踩，总赞数量最高的文章排名靠前。
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          关于这个项目?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            我将这个项目开源到Github<a href="">详情</a>
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          关于作者?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            我是晓晨DEV，之前是一名Android开发者，你可以在{" "}
            <a href="http://tanfujun.com">http://tanfujun.com</a>{" "}
            找到更多关于我的信息。
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          开发星云App获得Nas奖励?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
            你可以通过<a href="https://incentive.nebulas.io/cn/signup.html?invite=mfd8C">
              https://incentive.nebulas.io/cn/signup.html?invite=mfd8C
            </a>注册成为Nas开发者，每提交一个Dapp可以获得110Nas，约6000RMB哦！
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default About;
