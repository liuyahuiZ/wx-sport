import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    Switch,
    Collapse,
    Panel
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {}
      };
    }

    switchChange(date){
        console.log(date);
    }

    submitClick(){
        Modal.alert({ title: 'warning',
          content: (<div> others
            <Buttons
              text="click to do a new Alert "
              type={'link'}
              onClick={() => {
                Modal.formConfirm({ title: 'Form Open',
                content: (
                  1231
                ),
                style: '',
                btnConStyle: 'center',
                btnSure: {
                  text: '确认',
                  type: 'link',
                  style: { 'height': '2rem'}
                },
                btnCancle: {
                  text: '取消',
                  type: 'link',
                  style: { 'height': '2rem'}
                }
              },
              (id, callback) => { callback(id); },
              (id, callback) => { callback(id); alert('this is cancle callback'); });
              }}
            />
          </div>),
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { console.log('nult callback'); });
    }
        

    render() {
        return(
          <section className="padding-all bg-000">
            <Row justify="center">
              <Col span={24} >
                <Row justify="center" className="padding-all-1r bg-6E9EFB border-radius-5f">
                  <Col span={12} className="text-align-left">
                    <Icon iconName={'quote '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col span={12} className="text-align-right">
                    <Icon iconName={'android-settings '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col className="text-align-center">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r">
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r">
                    <span className="textclolor-white">UserName</span>
                  </Col>
                  {/* <Col className="text-align-center margin-top-1r">
                    <Row>
                      <Col span={8} className=""><span className="font-size-8 textclolor-white">UserName</span></Col>
                      <Col span={8} className=""><span className="font-size-8 textclolor-white">UserName</span></Col>
                      <Col span={8} className=""><span className="font-size-8 textclolor-white">UserName</span></Col>
                    </Row>
                  </Col> */}
                </Row>
              </Col>
              <Col>
              <Row className="padding-all bg-1B1B1B margin-top-3 border-radius-5f">
                  <Col span={8} onClick={()=>{this.goCreateArticle('/CreateArticle')}}>
                    <Row className="" justify="center">
                      <Col className="text-align-center">
                        <span className="display-inline-block line-height-2r">
                          <Icon iconName={'pie-graph '} size={'180%'} iconColor={'#fff'} />
                        </span>
                      </Col>
                      <Col className="text-align-center textclolor-white">正在进行</Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row className="" justify="center">
                      <Col className="text-align-center">
                        <span className="display-inline-block line-height-2r">
                        <Icon iconName={'ios-stopwatch'} size={'180%'} iconColor={'#fff'} />
                        </span>
                      </Col>
                      <Col className="text-align-center textclolor-white">已完成</Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row className="" justify="center">
                      <Col className="text-align-center">
                        <span className="display-inline-block line-height-2r">
                        <Icon iconName={'paper-airplane'} size={'180%'} iconColor={'#fff'} />
                        </span>
                      </Col>
                      <Col className="text-align-center textclolor-white">动态</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24} className="bg-1B1B1B margin-top-2 border-radius-5f">
                <Item
                    leftContent={{text: (<Row>
                        <Col span={4}>
                        <Icon iconName={'card'} size={'150%'} iconColor={'#4698F9'}  />
                        </Col>
                        <Col span={20}>我的银行卡</Col></Row>), style: {flex: '5'}, className: 'font-size-8 textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
                <Item
                    leftContent={{text: (<Row><Col span={4}>
                        <Icon iconName={'social-bitcoin '} size={'150%'} iconColor={'#4698F9'}  />
                        </Col><Col span={20}>我的银行卡</Col></Row>), style: {flex: '5'}, className: 'font-size-8 textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
                <Item
                    leftContent={{text: (<Row><Col span={4}>
                        <Icon iconName={'document-text '} size={'150%'} iconColor={'#4698F9'}  />
                        </Col><Col span={20}>我的银行卡</Col></Row>), style: {flex: '5'}, className: 'font-size-8 textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
              </Col>

              <Col className="margin-top-2r" span={20}>
                <Buttons
                  text="submit"
                  type={'primary'}
                  size={'large'}
                  onClick={()=>{
                    this.submitClick()
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
