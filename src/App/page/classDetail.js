import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import wx from 'weixin-js-sdk';
import { subjectDetail, createOrder } from '../api/subject';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Carousel,
    Loade
} = Components;
const { sessions, storage } = utils;

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      this.state = {
          dataDetail: {},
          subjectId: obg.subjectId
      };
    }
    _viewAppear(){
      let obg = UrlSearch();
      console.log(obg)
      const self = this;
      Loade.show();
      subjectDetail(obg.subjectId).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(JSON.stringify(data)!=='{}'){
          self.setState({
            dataDetail: data
          })
        } else {
          self.setState({
            loadText: '暂无数据'
          })
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link, obg){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: obg
        });
      }
    }
    undefindOrder(){
      const { subjectId } = this.state;
      const self = this;
      let userId = storage.getStorage('userId');
      let authCode = storage.getStorage('authCode');
      let obg = UrlSearch();
      console.log(authCode);
      Loade.show();
      createOrder({
        "authCode": authCode,
        "clientIP": '192.168.3.1',
        "subjectId": subjectId,
        "userId": userId
      }).then((res)=>{
        Loade.hide();
        console.log(res);
        if(!res.prepayId) { Toaster.toaster({ type: 'error', content: '调用支付失败,请稍后重试', time: 3000 }); return; }
        self.bought(res);
      }).catch((err)=>{
        Loade.hide();
        console.log(res);
      })
    }
    bought(res){
      const self = this;
      let obg = UrlSearch();
      wx.chooseWXPay({
        timestamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: 'prepay_id='+res.prepayId,
        signType: 'MD5', // 注意：新版支付接口使用 MD5 加密
        paySign: res.paySign,
        success: function (respon) {
          Toaster.toaster({ type: 'error', content: '购买成功，请预约课程', time: 3000 });
          self.goLink('/ClassList', {
            subjectId : obg.subjectId,
            orderId: res.orderId
          })
        }
      });
      
    }


    render() {
        const { dataDetail } = this.state;
        let obg = UrlSearch();
        const carouselMap = [];
        if(dataDetail&&dataDetail.slideImgUrlList) {
          for (let i=0; i< dataDetail.slideImgUrlList.length;i++){
            carouselMap.push({tabName: `f-${i}`, content: (<img alt="text" src={dataDetail.slideImgUrlList[i]} />), isActive: true })
          }
        }
        const stepArr = JSON.stringify(dataDetail)!=='{}' ? dataDetail.step.split('|'): [];

        const stepDom = stepArr.length > 0 ? stepArr.map((itm, idx)=>{
          const botIcon = idx === (stepArr.length-1) ? '' : 
          (<Icon iconName={'android-arrow-dropdown '} className="nopadding" size={'150%'} iconColor={'#000'} />)
          return (<Row justify='center' key={`stp-${idx}`}>
          <Col span={18} className="bg-000 padding-all border-radius-6r overflow-hide">
              <Row justify='center'>
                <Col span={3} className="textclolor-white ">
                  <div className="bg-8EBF66 font-size-8 textclolor-white small-round text-align-center border-radius-100">{idx+1}</div>
                </Col>
                <Col span={11} className="font-size-8 textclolor-black-low text-align-left">{itm}</Col>
              </Row>
          </Col>
          <Col className="text-align-center heighr-1 line-height-1r margin-bottom-1">{botIcon} </Col>
        </Row>)
        }) : <div />;
    
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col span={2} className="line-height-4r "><Icon iconName={'android-list '} size={'150%'} iconColor={'#fff'} /> </Col>
                  <Col span={22} className="font-size-12 textclolor-white line-height-4r ">训练计划简介</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row>
                      <Col span={24} className="font-size-8 textclolor-black-low margin-bottom-3 ">
                      {dataDetail.intro}
                      </Col>
                      <Col span={8}>
                        <img className='width-100' src={dataDetail.introImgUrl} />
                      </Col>
                      
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">适用人群</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{dataDetail.fitPeople}</Col>
                        </Row>
                      </Col>

                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">计划难度</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{dataDetail.difficuity}</Col>
                        </Row>
                      </Col>
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">训练费用</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">￥{(obg.price/100).toFixed(2)}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r "><Icon iconName={'android-radio-button-on '} size={'150%'} iconColor={'#fff'} /> </Col>
                  <Col span={22} className="font-size-12 textclolor-white line-height-4r ">注意事项</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row>
                      <Col className="font-size-8 textclolor-black-low ">{dataDetail.ps}</Col>
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r "><Icon iconName={'android-radio-button-on '} size={'150%'} iconColor={'#fff'} /> </Col>
                  <Col span={22} className="font-size-12 textclolor-white line-height-4r ">健身步骤</Col>
                  <Col className="bg-1B1B1B padding-all">
                    { stepDom }
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text={`￥${(obg.price/100).toFixed(2)} 立即购买`}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.undefindOrder()
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
