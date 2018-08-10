import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import wx from 'weixin-js-sdk';
import { subjectDetail } from '../api/subject';

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
  
class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          dataDetail: {},

      };
    }
    _viewAppear(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      subjectDetail(obg.subjectId).then((data)=>{
        console.log(data);
        Loade.hide();
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
    goLink(link, id){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: {
            subjectId : id,
          }
        });
      }
    }
    bought(){
      let obg = UrlSearch();
      wx.chooseWXPay({
        timestamp: 1414723227,
        nonceStr: 'noncestr',
        package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
        signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
        paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
      });
      this.goLink('/ClassList', obg.subjectId)
    }

    render() {
        const { dataDetail } = this.state;
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src={dataDetail.slideImgUrl} />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src={`${config.IMG_URL}getphotoPal/2017-6-9/14969914014459.jpg`} />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src={`${config.IMG_URL}getphotoPal/2017-4-1/14910395145549.jpg`} />), isActive: false }];
        
        const stepArr = JSON.stringify(dataDetail)!=='{}' ? dataDetail.step.split('|'): [];
        console.log(stepArr);
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
        console.log(stepDom);
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
                      <Col span={8}>
                        <img className='width-100' src={`${config.IMG_URL}getphotoPal/2017-4-1/14910395145549.jpg`} />
                      </Col>
                      <Col span={8}>
                        <img className='width-100' src={`${config.IMG_URL}getphotoPal/2017-4-1/14910395145549.jpg`}/>
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
                  text="立即购买"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.bought()
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
