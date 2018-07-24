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
    ProgressCircle,
    Tab,
    Progress
  } = Components;
  
class PersonalFiles extends Component {
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
           
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    render() {
        const { status } = this.state;
    
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
                  <Col className="text-align-center margin-top-1r">
                    <Row>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-8 textclolor-white">粉丝 173人</span></Col>
                      <Col span={8} className="text-align-center border-left border-right border-color-fff heighr-1 line-height-1r"><span className="font-size-8 textclolor-white">关注 26人</span></Col>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-8 textclolor-white">积分 290</span></Col>
                    </Row>
                  </Col>
                </Row>
                </TransAnimal>
              </Col>
              <Col span={24} className="bg-1B1B1B padding-all margin-top-1r border-radius-5f">
               <Row>
                   <Col className="textclolor-white">总运动789分钟</Col>
                   <Col span={2}><div className="icon icon-sport margin-top-p4r" /></Col>
                   <Col span={10} className="font-size-8 textclolor-black-low line-height-2r">全身燃动初级 2次</Col>
                   <Col span={2}><div className="icon icon-sport margin-top-p4r" /></Col>
                   <Col span={10} className="font-size-8 textclolor-black-low line-height-2r">核心刺激初级 3次</Col>
                   <Col span={2}><div className="icon icon-sport margin-top-p4r" /></Col>
                   <Col span={10} className="font-size-8 textclolor-black-low line-height-2r">人鱼线雕刻 3次</Col>
                   <Col span={2}><div className="icon icon-sport margin-top-p4r" /></Col>
                   <Col span={10} className="font-size-8 textclolor-black-low line-height-2r">全身燃动初级 2次</Col>
               </Row>
              </Col>
              <Col span={24} className="bg-1B1B1B padding-all margin-top-1r border-radius-5f">
               <Row>
                   <Col span={8}>
                    <Row>
                        <Col className="font-size-8 textclolor-black-low line-height-2r">俯卧撑</Col>
                        <Col><div className="icon icon-sport margin-top-p4r" /></Col>
                    </Row>
                   </Col>
                   <Col span={8}>
                    <Row>
                        <Col className="font-size-8 textclolor-black-low line-height-2r">俯卧撑</Col>
                        <Col><div className="icon icon-sport margin-top-p4r" /></Col>
                    </Row>
                   </Col>
                   <Col span={8}>
                    <Row>
                        <Col className="font-size-8 textclolor-black-low line-height-2r">俯卧撑</Col>
                        <Col><div className="icon icon-sport margin-top-p4r" /></Col>
                    </Row>
                   </Col>
                   <Col span={8}>
                    <Row>
                        <Col className="font-size-8 textclolor-black-low line-height-2r">俯卧撑</Col>
                        <Col><div className="icon icon-sport margin-top-p4r" /></Col>
                    </Row>
                   </Col>
                   <Col span={8}>
                    <Row>
                        <Col className="font-size-8 textclolor-black-low line-height-2r">俯卧撑</Col>
                        <Col><div className="icon icon-sport margin-top-p4r" /></Col>
                    </Row>
                   </Col>
                   <Col span={8}>
                    <Row>
                        <Col className="font-size-8 textclolor-black-low line-height-2r">俯卧撑</Col>
                        <Col><div className="icon icon-sport margin-top-p4r" /></Col>
                    </Row>
                   </Col>
            
               </Row>
              </Col>
              <Col className="margin-top-1r">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    hashHistory.goBack();
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default PersonalFiles;
