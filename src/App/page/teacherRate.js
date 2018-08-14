import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { userMark } from '../api/classes';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Rate,
    Loade
} = Components;
const { sessions, storage } = utils;

class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          status: this.props.status,
          resourceKey: '1',
          js: 5,
          bd: 5,
          wg: 4
      };
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }

    setValue(key,val){
        this.setState({[key]: val});
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

    submitMark(){
      let userId = storage.getStorage('userId');
      const {js, bd, wg} = this.state;
      Loade.show();
      userMark({
        userId: userId,
        js: js,
        bd: bd,
        wg: wg
      }).then((data)=>{
        console.log(data);
        Loade.hide();
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
        

    render() {
        const { status, js, bd, wg } = this.state;
        const self = this;

        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-8EBF66 border-radius-5f  overflow-hide relative">
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r">
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <span className="zindex-10 textclolor-white">UserName</span>
                  </Col>
                  <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-8 textclolor-white">深圳</span>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <img className="width-100 absolute-left zindex-6 heightp-100" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-29/15328575406788.png`} />
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
                        <Rate value={js} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{
                          console.log(v)
                          self.setValue('js', v)
                        }} />
                      </Col>
                      <Col span={4}>
                        <div className="margin-top-p4r bg-8EBF66 font-size-8 textclolor-333 text-align-center border-radius-6r line-height-20">表达</div>
                      </Col>
                      <Col span={18}>
                        <Rate value={bd} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{
                          console.log(v)
                          self.setValue('bd', v)
                        }} />  
                      </Col>
                      <Col span={4}>
                        <div className="margin-top-p4r bg-8EBF66 font-size-8 textclolor-333 text-align-center border-radius-6r line-height-20">外观</div>
                      </Col>
                      <Col span={18}>
                        <Rate value={wg} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{
                          console.log(v)
                          self.setValue('wg', v)
                        }} />
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
                    this.submitMark()
                  }}
                />
              </Col>
        

            </Row>
          </section>
        );
    }
}
export default OcrDoc;
