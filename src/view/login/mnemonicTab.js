import React, {Component} from "react";
import {Form, Segment, Button} from "semantic-ui-react";
import service from "../../services/service";
import PubSub from "pubsub-js";

class MnemonicTab extends Component {

    state = {
        mmic: "", //助记词
        path: "m/44'/60'/0'/0/0", //分层钱包path
        wallets: []
    };

    // 随机生成助记词
    handleGenMnemonic = () => {
        // 随机生成助记词
        let words = service.createRandomMnemonic();
        this.setState({
            mmic: words
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

    //根据助记词生成钱包
    onMMICClick = () => {
        //1. 需要助记词
        //2. 需要path
        let {mmic, path} = this.state;
        //^ : 开头
        //$ : 结尾
        //(0x)? : 可有可无
        //[0-9A-Fa-f]: 限定取值数据
        //{64}: 限定64个
        // if (!path.match(/^[1-9]\d*|0$/)) {
        //     alert("Wallets numbers wrong!");
        //     return;
        // }

        try {
            //根据助记词生成钱包
            let wallets = service.createWalletFromMnemonic(
                mmic,
                path
            );

            //3. 钱包有效时，发布消息
            this.setState({
                wallets
            });

            //发布login成功的事件,
            //事件名字
            //传递的数据
            PubSub.publish("onLoginSuccessfully", wallets); //事件名字，事件传递数据
            console.log(this.state.wallets);
        } catch (error) {
            alert("Create wallets by mnemonic failed!");
        }
    };

    render() {
        return (
            <Form size="large">
                <Segment stacked>
                    <Form.TextArea
                        placeholder="12 words"
                        name="mmic"
                        value={this.state.mmic}
                        onChange={this.handleChange}
                    />{" "}
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        name="path"
                        value={this.state.path}
                        onChange={this.handleChange}
                    />{" "}
                    <Button onClick={this.handleGenMnemonic}> Create Random </Button>{" "}
                    <br/>
                    <br/>
                    <Form.Button
                        onClick={this.onMMICClick}
                        color="teal"
                        fluid
                        size="large"
                    >
                        Mnemonic Import{" "}
                    </Form.Button>{" "}
                </Segment>{" "}
            </Form>
        );
    }
}

export default MnemonicTab;
