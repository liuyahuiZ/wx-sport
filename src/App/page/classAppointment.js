import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Carousel
  } = Components;
  
class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {}
      };
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    render() {
        const {article} = this.state;

        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30">
                <Row className="padding-all" justify="center" >
                  <Col className="zindex-10 text-align-center font-size-12 textclolor-white">牛油果体适能训练营第36期</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low">07月19日 下午14:40-15:40</Col>
                  <Col span={8} className="zindex-10 margin-top-2"><img className="width-100" src="http://47.88.2.72:2019/files?text=1tes1tyu" /></Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low margin-top-2">扫码签到</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low">请让学员拿出微信“扫一扫”</Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
                <img className="width-100 absolute-left zindex-6 heightp-100" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-21/1532141519697.png`} />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col>
                    <Row content="flex-start">
                      <Col span={1}></Col>
                      <Col span={11} className="font-size-10 textclolor-white line-height-2r ">预约人数</Col>
                      <Col span={10} className="font-size-8 textclolor-white text-align-right line-height-2r ">查看更多</Col>
                      <Col span={2} className="line-height-2r"><Icon iconName={'chevron-right '} size={'90%'} iconColor={'#333'} /></Col>
                    </Row>
                  </Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row>
                      
                      <Col span={8}>
                        <img className='width-100' src={'https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg'} />
                      </Col>
                      <Col span={8}>
                        <img className='width-100' src={'https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg'} />
                      </Col>
                      <Col span={8}>
                        <img className='width-100' src={'https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg'}/>
                      </Col>
                      
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">课程</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">牛油果体适能力量与塑形训练营-第36期</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">课程详情再“XXX”页面中查看</Col>
                        </Row>
                      </Col>

                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">地址</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">xxxxxxxxxx</Col>
                          <Col span={24} className="font-size-10 textclolor-white">点击查看地图</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="确认提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.goLink('/ClassDetail')
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
