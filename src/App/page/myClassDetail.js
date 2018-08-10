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
    Row,
    Col,
    Icon,
    Carousel,
    TimeRunner
  } = Components;
  
class MyClassDetail extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          status: false,
          itmStatus: true,
      };
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    submitClick(){
      console.log('endding')
    }

    startClass(){
      this.setState({
        status: true
      })
    }
    stopClass(){
      this.setState({
        status: false
      })
    }

    render() {
        const {article, status, itmStatus} = this.state;
        const self = this;
        const carouselMap = [
        { tabName: 'thired', content: (<img alt="text" src={'https://static1.keepcdn.com/2017/12/27/15/1514360005943_315x315.jpg'} />), isActive: false },
        { tabName: 'first', content: (<img alt="text" src={'http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg'} />), isActive: true }];
        
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row className="padding-top-2" content="flex-start">
                  <Col span={1}></Col>
                  <Col span={15} className="font-size-10 textclolor-white ">第一周第一天</Col>
                  <Col span={8} className="textclolor-333"><Icon iconName={'android-time '} size={'120%'} iconColor={'#333'} /> 00:39:20 </Col>
                  <Col className="bg-1B1B1B">
                    <Row >
                      <Col span={24} className="margin-top-2 border-bottom border-color-333 padding-top-3 padding-bottom-3" >
                        <Row >
                          <Col className="text-align-center">
                            <Row justify="center">
                              <Col span={10} className="bg-8EBF66 text-align-center border-radius-5f line-height-2r">热身</Col>
                            </Row>
                          </Col>
                          <Col span={24} className="font-size-10 text-align-center line-height-2r textclolor-white">计划难度</Col>
                          <Col span={24} className="font-size-8 text-align-center textclolor-black-low ">xxxxxxxxxx</Col>
                        </Row>
                      </Col>
                      <Col span={24} className="margin-top-2 border-bottom border-color-333 padding-top-3 padding-bottom-3" >
                        <Row >
                          <Col className="text-align-center">
                            <Row justify="center">
                              <Col span={10} className="bg-8EBF66 text-align-center border-radius-5f line-height-2r">热身</Col>
                            </Row>
                          </Col>
                          <Col span={24} className="font-size-10 text-align-center line-height-2r textclolor-white">计划难度</Col>
                          <Col span={24} className="font-size-8 text-align-center textclolor-black-low ">xxxxxxxxxx</Col>
                        </Row>
                      </Col>
                      <Col span={24} className="margin-top-2 padding-top-3 padding-bottom-3" >
                        <Row >
                          <Col className="text-align-center">
                            <Row justify="center">
                              <Col span={10} className="bg-8EBF66 text-align-center border-radius-5f line-height-2r">热身</Col>
                            </Row>
                          </Col>
                          <Col span={24} className="font-size-10 text-align-center line-height-2r textclolor-white">计划难度</Col>
                          <Col span={24} className="font-size-8 text-align-center textclolor-black-low ">xxxxxxxxxx</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3 heighr-10 border-radius-5f overflow-hide">
                <img className='width-100' src={'http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg'} />
              </Col>
              <Col className="textclolor-white text-align-center margin-top-3">
                <TimeRunner ref={(r) => { this.$$TimeRunner = r; }} />
              </Col>
              {
                status ? (<Row className="width-100">
                  <Col span={11} className="margin-top-3">
                { itmStatus ? <Buttons
                  text="暂停"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop();
                    self.setValue('itmStatus', false)
                  }}
                /> : <Buttons
                text="开始"
                type={'primary'}
                size={'large'}
                style={{backgroundColor: '#8EBF66', color:'#333'}}
                onClick={()=>{
                  this.$$TimeRunner.start();
                  self.setValue('itmStatus', true)
                }}
              />}
              </Col>
              <Col span={2}></Col>
              <Col span={11} className="margin-top-3">
                <Buttons
                  text="结束"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop()
                    this.submitClick()
                  }}
                />
              </Col>
                </Row>) : (<Col className="margin-top-3">
                <Buttons
                  text="开始训练"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    console.log(this.$$TimeRunner);
                    this.$$TimeRunner.start();
                    this.startClass()
                  }}
                />
              </Col>)
              }
              
              
            
            </Row>
          </section>
        );
    }
}
export default MyClassDetail;
