import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import BaseView from '../core/app';
import { UrlSearch } from '../utils';
import { userMark, userInfo } from '../api/classes';

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

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          resourceKey: '1',
          js: 5,
          bd: 5,
          wg: 5
      };
    }

    _viewAppear(){
      this.getUserInfo();
    }

    setValue(key,val){
        this.setState({[key]: val});
    }

    getUserInfo(){
      let obg = UrlSearch();
      const self = this;
      userInfo({userId: obg.teacherId}).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let info = res.result;
        self.setState({
          userInfo: info
        })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '获取教练信息失败', time: 3000 });
      })
    }

    submitMark(){
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      const {js, bd, wg} = this.state;
      Loade.show();
      userMark({
        userId: obg.teacherId,
        js: js,
        bd: bd,
        wg: wg
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        Modal.alert({ title: '评分成功',
          content: "您对该教练评分成功!",
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { console.log('nult callback'); });
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
        

    render() {
        const { userInfo, js, bd, wg } = this.state;
        const self = this;

        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-8EBF66 border-radius-5f  overflow-hide relative">
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r  overflow-hide">
                        <img src={userInfo.imgUrl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <span className="zindex-10 textclolor-white">{userInfo.nickName}</span>
                  </Col>
                  <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-8 textclolor-white">{userInfo.describe || 'xxx'}</span>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bg1" />
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
