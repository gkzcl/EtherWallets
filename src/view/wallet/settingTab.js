import React, {Component} from "react";
import {Segment, Header, Form, Button, Progress} from "semantic-ui-react";
import service from "../../services/service";
import fileSaver from "file-saver";

class SettingTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: "", //导出keystore进度
            walletActive: props.walletActive, //当前已经连接网络的钱包
            pwd: "" //导出助记词的密码
        };
    }

    onExportPrivate = () => {
        let wallet = this.state.walletActive;
        console.log("settingTab wallet : ", wallet);
        alert(wallet.privateKey);
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
        console.log("name:", name);
        console.log("value:", value);
    };

    //导出keystore文件
    onExportClick = async () => {
        let {walletActive, pwd} = this.state;
        //输入校验
        if (!walletActive) {
            alert("Wallet is invalid !");
            return;
        }

        if (pwd.length < 6) {
            alert("Password length must not be less than 6 !");
            return;
        }

        //正式处理
        try {
            let keystore = await service.exportKeyStoreFromWallet(
                walletActive,
                pwd,
                progress => {
                    this.setState({progress});
                }
            );

            console.log(keystore);

            //保存keystore.json文件
            //这里更新了，保存
            let blob = new Blob([keystore], {
                type: "text/plain;charset=utf-8"
            });

            fileSaver.saveAs(blob, "keystore.json");
        } catch (error) {
            alert(error);
            return;
        }
    };

    render() {
        return (
            <Segment stacked textAlign="left">
                <Header as="h1"> Settings </Header>
                <Form.Input
                    style={{
                        width: "100%"
                    }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "lock",
                        content: "Password"
                    }}
                    actionPosition="left"
                    type="password"
                    name="pwd"
                    required
                    value={this.state.pwd}
                    placeholder="password"
                    onChange={this.handleChange}
                />
                <br/>
                {this.state.progress && (
                    <Progress
                        style={{
                            width: "100%"
                        }}
                        percent={parseInt(this.state.progress * 100)}
                        inverted
                        success
                        progress
                    />
                )}
                <Button
                    color="twitter"
                    style={{width: "48%"}}
                    onClick={this.onExportPrivate}
                >
                    Check For Private Key
                </Button>
                <Button
                    color="twitter"
                    style={{
                        width: "48%"
                    }}
                    onClick={this.onExportClick}
                    // loading={this.state.exportLoading}
                >
                    Output KeyStore
                </Button>
            </Segment>
        );
    }
}

export default SettingTab;
