import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Rate
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          status: this.props.status,
          resourceKey: '1',
      };
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
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
        const { status } = this.state;
        console.log(status);
        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-6E9EFB border-radius-5f">
                  <Col className="text-align-center margin-top-1r">
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
                </TransAnimal>
              </Col>
             
              <Col span={24} className="bg-1B1B1B margin-top-2 padding-top-2r padding-bottom-2r border-radius-5f">
                <Row justify="center">
                  <Col span={18}>
                    <Row justify="center">
                      <Col span={4}>
                        <div className="margin-top-p4r bg-8EBF66 font-size-8 textclolor-333 text-align-center border-radius-6r line-height-20">教授</div>
                      </Col>
                      <Col span={18}>
                        <Rate value={5} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{console.log(v)}} />
                      </Col>
                      <Col span={4}>
                        <div className="margin-top-p4r bg-8EBF66 font-size-8 textclolor-333 text-align-center border-radius-6r line-height-20">教授</div>
                      </Col>
                      <Col span={18}>
                        <Rate value={3} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{console.log(v)}} />  
                      </Col>
                      <Col span={4}>
                        <div className="margin-top-p4r bg-8EBF66 font-size-8 textclolor-333 text-align-center border-radius-6r line-height-20">教授</div>
                      </Col>
                      <Col span={18}>
                        <Rate value={4} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{console.log(v)}} />
                      </Col>
                    </Row>
                  </Col>
                  <Col className="text-align-center textclolor-white margin-top-1r">对计划是否清晰</Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="确认提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
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
