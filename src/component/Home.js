import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button, Card, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Container, Header } from "semantic-ui-react";
import { getStoreItems, vote, dislike } from "./BlockChain.js";

const items = [];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    var obj = this;
    getStoreItems(function(resp) {
      var items_str = resp.result;
      var items_obj = JSON.parse(items_str);
      var data = [];
      for (var i = 0; i < items_obj.length; i++) {
        data.push(JSON.parse(items_obj[i]));
      }
      obj.sort(data);
    });
  }

  sort(data) {
    data.sort(this.down);
    this.setState({ items: data });
  }

  down(x, y) {
    if (x.rank == undefined) {
      x.rank = 0;
    }
    if (y.rank == undefined) {
      y.rank = 0;
    }
    return x.rank < y.rank ? 1 : -1;
  }

  render() {
    var datas = this.state.items;
    console.log(datas);

    return (
      <div>
        <Card.Group centered={true}>
          {datas.map(item => <Item item={item} />)}
        </Card.Group>
      </div>
    );
  }
}

const Item = ({ item }) => {
  const voteArticle = () => {
    vote(item.article_url);
  };

  const dislikeArticle = () => {
    dislike(item.article_url);
  };

  const clickItem = () => {
    window.open(item.article_url, "_blank");
  };

  return (
    <Card color="blue" width="300">
      <Card.Content onClick={clickItem}>
        <Card.Content>
          <div onClick={clickItem}>
            <iframe
              src={item.article_url}
              height="300"
              frameborder="no"
              width="265"
              scrolling="no"
            />
          </div>
        </Card.Content>

        <Card.Meta textAlign="left" style={{ margin: "1em" }}>
          发现者:{item.discover}
        </Card.Meta>
        <Card.Description
          textAlign="left"
          style={{ marginLeft: "1em" }}
          onClick={clickItem}
        >
          {item.article_desc}
          <br />
          <br />
          <RankText rank={item.rank} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={voteArticle}>
            点赞
          </Button>
          <Button basic color="red" onClick={dislikeArticle}>
            点踩
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

Item.propTypes = {
  item: PropTypes.array
};

const RankText = rankObj => {
  let str = "赞";
  var rank = rankObj.rank;
  if (rank == undefined) {
    rank = 0;
  }
  if (rank >= 0) {
    str = "赞";
  } else {
    rank = 0 - rank;
    str = "踩";
  }
  return (
    <div>
      <Icon size="large" name="trophy" color="blue" />
      已有<strong>{rank}</strong>
      {str}
    </div>
  );
};

export default Home;
