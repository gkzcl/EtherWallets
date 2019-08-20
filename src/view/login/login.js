import React, {Component} from "react";
import {Tab, Grid, Header, Image} from "semantic-ui-react";
import PrivateKeyTab from "./privateKeyTab";
import MnemonicTab from "./mnemonicTab";
import KeyStoreTab from "./keystoreTab";

const panes = [
    {menuItem: "PrivateKey", render: () => <Tab.Pane><PrivateKeyTab/></Tab.Pane>},
    {menuItem: "Mnemonic", render: () => <Tab.Pane><MnemonicTab/></Tab.Pane>},
    {menuItem: "KeyStore", render: () => <Tab.Pane><KeyStoreTab/></Tab.Pane>}
];

class LoginTab extends Component {
    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450, marginTop: 100}}>
                    <Header as="h2" color="teal" textAlign="center">
                        <Image src="images/logo.png"/> Ether Wallets
                    </Header>
                    <Tab
                        menu={{text: true}}
                        panes={panes}
                        style={{maxWidth: 450}}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginTab;
