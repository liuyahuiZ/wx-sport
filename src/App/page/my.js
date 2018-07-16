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
          <section className="bg-f5f5f5">
            <Row justify="center">
              <Col span={24} >
                <Row justify="center" className="padding-all-1r bg-6E9EFB">
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
                </Row>
              </Col>
              <Col span={24} className="bg-show margin-top-2">
                <Item
                    leftContent={{text: (<Row><Col>
                        <Icon iconName={'card'} size={'150%'} iconColor={'#4698F9'}  />我的银行卡
                        </Col></Row>), style: {flex: '5'}}} 
                    rightContent={{text: '银行信用 当日起息', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
                <Item
                    leftContent={{text: (<Row><Col>
                        <Icon iconName={'social-bitcoin '} size={'150%'} iconColor={'#4698F9'}  />我的存款
                        </Col></Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
                <Item
                    leftContent={{text: (<Row><Col>
                        <Icon iconName={'document-text '} size={'150%'} iconColor={'#4698F9'}  />我的账单
                        </Col></Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
              </Col>

              <Col span={24} className="bg-show margin-top-2">
               <Item
                    leftContent={{text:'setting', style: {flex: '7'}}} 
                    rightContent={{text: (<Switch checkedText={'-'} unCheckText={'o'} onchange={this.switchChange} />), style: {flex: '1'}}} />
                <Item
                    leftContent={{text:'coder', style: {flex: '7'}}} 
                    rightContent={{text: (<Switch checkedText={0} unCheckText={1} bgColor={'#4BD963'} value={true} />), style: {flex: '1'}}} />
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
