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
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src={`${config.IMG_URL}getphotoPal/2017-3-28/14906634803525.jpg`} />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src={`${config.IMG_URL}getphotoPal/2017-6-9/14969914014459.jpg`} />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src={`${config.IMG_URL}getphotoPal/2017-4-1/14910395145549.jpg`} />), isActive: false }];
        
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
                      燃脂塑形课程在欧美,燃脂塑形课程在欧美燃脂塑形课程在欧美燃脂塑形课程在欧美燃脂塑形课程在欧美燃脂塑形课程在欧美燃脂塑形课程在欧美,燃脂塑形课程在欧美
                      </Col>
                      <Col span={8}>
                        <img className='width-100' src={`${config.IMG_URL}getphotoPal/2017-4-1/14910395145549.jpg`} />
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
                          <Col span={24} className="font-size-8 textclolor-black-low ">训练计划简介</Col>
                        </Row>
                      </Col>

                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">计划难度</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">xxxxxxxxxx</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r "><Icon iconName={'android-radio-button-on '} size={'150%'} iconColor={'#fff'} /> </Col>
                  <Col span={22} className="font-size-12 textclolor-white line-height-4r ">注意事项</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row>
                      <Col className="font-size-8 textclolor-black-low ">1. aqooiqwueklasjlkdjk</Col>
                      <Col className="font-size-8 textclolor-black-low ">2. aqooiqwueklasjlkdjk</Col>
                      <Col className="font-size-8 textclolor-black-low ">3. aqooiqwueklasjlkdjk</Col>
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r "><Icon iconName={'android-radio-button-on '} size={'150%'} iconColor={'#fff'} /> </Col>
                  <Col span={22} className="font-size-12 textclolor-white line-height-4r ">健身步骤</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row justify='center'>
                      <Col span={18} className="bg-000 padding-all border-radius-6r overflow-hide">
                        <Row justify='center'>
                          <Col span={2} className="textclolor-white ">
                            <div className="bg-8EBF66 font-size-8 textclolor-white small-round text-align-center border-radius-100">1</div>
                          </Col>
                          <Col span={12} className="font-size-8 textclolor-black-low text-align-left">购买课程</Col>
                        </Row>
                      </Col>

                      <Col className="text-align-center heighr-1 line-height-1"><Icon iconName={'android-arrow-dropdown '} className="nopadding" size={'150%'} iconColor={'#000'} /> </Col>

                      <Col span={18} className="bg-000 padding-all border-radius-6r margin-top-3 overflow-hide">
                        <Row justify='center'>
                          <Col span={2} className="textclolor-white ">
                            <div className="bg-8EBF66 font-size-8 textclolor-white small-round text-align-center border-radius-100">2</div>
                          </Col>
                          <Col span={12} className="font-size-8 textclolor-black-low text-align-left">选择教练和场地</Col>
                        </Row>
                      </Col>
                      <Col className="text-align-center heighr-1 line-height-1"><Icon iconName={'android-arrow-dropdown '} className="nopadding" size={'150%'} iconColor={'#000'} /> </Col>
                      <Col span={18} className="bg-000 padding-all border-radius-6r margin-top-3 overflow-hide">
                        <Row justify='center'>
                          <Col span={2} className="textclolor-white ">
                            <div className="bg-8EBF66 font-size-8 textclolor-white small-round text-align-center border-radius-100">3</div>
                          </Col>
                          <Col span={12} className="font-size-8 textclolor-black-low text-align-left">完成入门课</Col>
                        </Row>
                      </Col>
                      <Col className="text-align-center heighr-1 line-height-1"><Icon iconName={'android-arrow-dropdown '} className="nopadding" size={'150%'} iconColor={'#000'} /> </Col>
                      <Col span={18} className="bg-000 padding-all border-radius-6r margin-top-3 overflow-hide">
                        <Row justify='center'>
                          <Col span={2} className="textclolor-white ">
                            <div className="bg-8EBF66 font-size-8 textclolor-white small-round text-align-center border-radius-100">4</div>
                          </Col>
                          <Col span={12} className="font-size-8 textclolor-black-low text-align-left">执行课程计划</Col>
                        </Row>
                      </Col>
                    </Row>
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
                    this.goLink('/MyClassDetail')
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
