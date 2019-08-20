import React, {Component} from "react";
import {Form, Segment, Button} from "semantic-ui-react";
import services from "../../services/service";
import PubSub from "pubsub-js";

class PrivateKeyTab extends Component {

    state = {
        privateKey: "",
        wallets: []
    };
    // 随机生成私钥
    handleCreateClick = () => {
        //直接生成私钥即可，不要生成钱包,修改前
        // let wallet = services.createRandomWallet();
        // console.log("prikey :", wallet.privateKey);
        // console.log("addr :", wallet.address);
        //修改后
        // 随机生成私钥
        let privateKey = services.createRandomKey();
        this.setState({
            privateKey
        });
    };

    //捕捉数据
    handleChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        });
        console.log("name :", name);
        console.log("value :", value);
    };

    // 私钥生成钱包
    onPrivateLoginClick = () => {
        let privateKey = this.state.privateKey;
        console.log("privateKey : ", privateKey);
        // 检查私钥是否合法性
        let res = services.checkPrivateKey(privateKey);

        if (res) {
            alert(res);
            return;
        }
        // 通过私钥创建钱包
        let wallet = services.createWalletByPrivatekey(privateKey);

        if (wallet) {
            let wallets = [];
            wallets.push(wallet);
            this.setState({
                wallets
            });

            //发布login成功的事件,
            //事件名字
            //传递的数据
            PubSub.publish("onLoginSuccessfully", wallets);
            console.log(this.state.wallets);
        } else {
            alert("Create wallets by private key failed!");
        }
    };

    render() {
        return (
            <Form size="large">
                <Segment>
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="private key"
                        name="privateKey"
                        value={this.state.privateKey}
                        onChange={this.handleChange}
                    />{" "}
                    <Button onClick={this.handleCreateClick}> Create Random  </Button>{" "}
                    <br/>
                    <br/>
                    <Button
                        color="teal"
                        fluid
                        size="large"
                        onClick={this.onPrivateLoginClick}
                    >
                        Private Key Import{" "}
                    </Button>{" "}
                </Segment>{" "}
            </Form>
        );
    }
}

export default PrivateKeyTab;
