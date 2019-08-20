import React, { Component } from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";

class TransactionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txto: "", //接收地址
            txvalue: 0, //转账金额
            onSendClick: props.onSendClick, //具体转账逻辑
        };
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
        console.log("name:", name);
        console.log("value:", value);
    };

    onSendClick = () => {
        // console.log(this.state);
        this.state.onSendClick(this.state.txto, this.state.txvalue)
    };

    render() {
        return (
            <Segment stacked textAlign="left">
                <Header as="h1"> Transfer | Withdraw </Header>{" "}
                <Form.Input
                    style={{
                        width: "100%"
                    }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "address card",
                        content: "Address"
                    }}
                    actionPosition="left"
                    defaultValue=""
                    type="text"
                    name="txto"
                    required
                    // value={this.state.txto}
                    placeholder="to address"
                    onChange={this.handleChange}
                />{" "}
                <br />
                <Form.Input
                    style={{
                        width: "100%"
                    }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "ethereum",
                        content: "Amount"
                    }}
                    actionPosition="left"
                    defaultValue=""
                    type="text"
                    name="txvalue"
                    required
                    // value={this.state.txvalue}
                    placeholder="ether"
                    onChange={this.handleChange}
                />
                <br />
                <Button
                    color="twitter"
                    style={{
                        width: "100%"
                    }}
                    size="large"
                    // loading={this.state.loading}
                    onClick={this.onSendClick}
                >
                    Confirm
                </Button>
            </Segment>
        );
    }
}

export default TransactionTab;
