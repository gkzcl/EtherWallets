import React from "react";
import { Header, Image, Segment, Form } from "semantic-ui-react";

let AccountTab = props => {
    let { address, balance, txCount } = props.allInfo;
    return (
        <div>
            <Header as="h2" color="teal" textAlign="center">
                <Image src="images/logo.png" /> Ether Wallet
            </Header>
            <Segment stacked textAlign="left">
                <Header as="h1">Account</Header>
                <Form.Input
                    style={{ width: "100%" }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "address card",
                        content: "Address"
                    }}
                    actionPosition="left"
                    value={address}
                />
                <br />
                <Form.Input
                    style={{ width: "100%" }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "ethereum",
                        content: "Balance"
                    }}
                    actionPosition="left"
                    value={balance}
                />
                <br />
                <Form.Input
                    actionPosition="left"
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "numbered list",
                        content: "TxCount"
                    }}
                    style={{ width: "100%" }}
                    value={txCount}
                />
            </Segment>
        </div>
    );
};

export default AccountTab;
