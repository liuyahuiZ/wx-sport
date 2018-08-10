import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { myClass } from '../api/classes';

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
    Progress,
    Loade
  } = Components;
const { sessions, storage } = utils;

class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          status: this.props.status,
          resourceKey: '',
          userInfo: storage.getStorage('userInfo') ||{},
          myClassList:[{name: '增强体制训练', progress: 60},
          {name: '塑形基本训练', progress: 20},
          {name: '瑜伽基本训练', progress: 40}]
      };
    }
    componentDidMount(){
      // console.log('obg', storage.getStorage('userInfo'), UrlSearch());
      let obg = UrlSearch();
      let userInfo = storage.getStorage('userInfo')
      if(obg.code&&obg.code!==''){
        if(!(userInfo&&userInfo.nickname&&userInfo.nickname!=='')){
          this.getUserinfo(obg.code);
        }
      }
      if((userInfo&&userInfo.nickname&&userInfo.nickname!=='')){
        this.getMyClass(userInfo)
      }
    }

    getMyClass(userInfo){
      console.log(userInfo);
      const self = this;
      Loade.show();
      myClass({userId: userInfo.openid}).then((data)=>{
        console.log(data);
        Loade.hide();
        if(data && data.length > 0){
          self.setState({
            myClassList: data
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

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }

    getUserinfo(code){
      const self = this;
      fetch( config.ROOT_URL+ 'wx/getWebAccessToken', { method: 'POST', data: {
          code: code
      }}).then(data => {
        console.log(data)

        Modal.alert({ title: '用户信息',
            content: JSON.stringify(data),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
          },
        () => { console.log('nult callback'); });
      //   Toaster.toaster({ type: 'success', position: 'top', content: JSON.stringify(data), time: 5000 });

        let resp = JSON.parse(data.respBody);
        if(!resp.errcode){
          storage.setStorage('userInfo', JSON.parse(data.respBody));
          self.getMyClass(data.respBody)
          self.setState({
            userInfo: JSON.parse(data.respBody)
          })
        }
        
      })
    }

    checkUser(){
      console.log(storage.getStorage('userInfo'));
      if (storage.getStorage('userInfo')) {
        this.goLink('/PersonalFiles');
      } else {
        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx15145e4f7b434571&redirect_uri=http%3A%2F%2Fwww.wetalks.cn%2Fwx-sport%2F%23%2FTab&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect';
      }
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
        
    tabChange(v) {
      const self = this;
      self.setState({
        'resourceKey': v
      });
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    render() {
        const { status, myClassList, resourceKey, userInfo } = this.state;
        const myClassListDom = myClassList.map((itm, idx)=>{
          return (<Row justify="center" className="margin-top-3" key={`${idx}-r`} onClick={()=>{
            this.goLink('/MyClassDetail')
          }}>
          <Col className="text-align-center textclolor-white">{itm.name}</Col>
          <Col className="margin-top-3" span={15}>
            <Progress percent={itm.nowSection/itm.allSection * 100} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'} bgColor={'#333'} style={{height: '7px'}} radius={20} />
          </Col>
          <Col className="margin-top-3 text-align-center textcolor-8EBF66" span={6}>共{itm.allSection}天</Col>
        </Row>)
        })
        const tabOptions = [{
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <div className={`icon small ${resourceKey ==='1' ? 'icon-working-a': 'icon-working'}`} />
            </Col>
            <Col className="font-size-8">正在进行</Col></Row>),
          keyword: '1', 
          headStyle: {height: '4rem'},
          content: (
            <Row justify="center">
              <Col  className="margin-top-3">
                <Row justify="center" className="textclolor-666 font-size-8">
                  <Col span={6}>第一周</Col>
                  <Col span={2}>1</Col>
                  <Col span={2}>2</Col>
                  <Col span={2}><div className="bg-8EBF66 font-size-8 textclolor-white small-round text-align-center border-radius-100">3</div></Col>
                  <Col span={2}>4</Col>
                  <Col span={2}>5</Col>
                  <Col span={2}>6</Col>
                  <Col span={2}>7</Col>
                </Row>
              </Col>
              <Col>
                {myClassListDom}
              </Col>
             
            </Row>
          )
        },
        {
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <div className={`icon ${resourceKey ==='2' ? 'icon-complate-a': 'icon-complate'}`} />
            </Col>
            <Col className="font-size-8">已完成</Col></Row>),
            keyword: '2',
            content: (
            <Row>
              <Col span={8} className="padding-all" onClick={()=>{
                this.goLink('/TrainResult')
              }}>
                <ProgressCircle score={80} show={status} innerText={`${80}%`} />
              </Col>
              <Col span={8} className="padding-all">
                <ProgressCircle score={60} show={status} innerText={`${60}%`} />
              </Col>
              <Col span={8} className="padding-all">
                <ProgressCircle score={100} show={status} innerText={`${100}%`} />
              </Col>
            </Row>
          )
        },
        {
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <Icon iconName={'android-star'} size={'180%'} iconColor={resourceKey ==='3' ? '#8FBF66' :'#fff'} />
            </Col>
            <Col className="font-size-8">动态</Col></Row>),
            keyword: '3',
            content: (
            <Row>
              <Col span={8} className="padding-all" onClick={()=>{
                this.goLink('/TrainResult')
              }}>
                <ProgressCircle score={70} show={resourceKey ==='3'} innerText={`${70}%`} />
              </Col>
            </Row>
          )
        }]
        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                  {/* <Col span={12} className="text-align-left">
                    <Icon iconName={'quote '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col span={12} className="text-align-right">
                    <Icon iconName={'android-settings '} size={'150%'} iconColor={'#fff'}   />
                  </Col> */}

                  <Col className="margin-top-1r text-align-center zindex-10" onClick={()=>{ this.checkUser()}}>
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                        {

                        }
                        <img src={userInfo.headimgurl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <span className="textclolor-white">{userInfo.nickname || '请登陆'}</span>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <Row>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-8 textclolor-white">粉丝 173人</span></Col>
                      <Col span={8} className="text-align-center border-left border-right border-color-fff heighr-1 line-height-1r"><span className="font-size-8 textclolor-white">关注 26人</span></Col>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-8 textclolor-white">积分 290</span></Col>
                    </Row>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <img className="width-100 absolute-left zindex-6 heightp-100" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-29/15328575406788.png`} />
                </Row>
                </TransAnimal>
              </Col>
             
              <Col className='padding-all bg-1B1B1B margin-top-3 border-radius-5f'>
                <Tab options={tabOptions} active={this.state.resourceKey} onChange={(v) => {
                  this.tabChange(v);
                }} />
              </Col>
              <Col span={24} className="bg-1B1B1B margin-top-2 border-radius-5f">
                <Item
                    leftContent={{text: (<Row><Col span={5}>
                        <Icon iconName={'clipboard '} size={'160%'} iconColor={'#fff'}  />
                        </Col><Col span={19}>服务条款</Col></Row>), style: {flex: '5'}, className: 'font-size-8 textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    onClick={()=>{
                      console.log('123')
                      this.goLink('/TeacherRate')
                    }}
                    showRight 
                    />
                <Item
                    leftContent={{text: (<Row><Col span={5}>
                        <Icon iconName={'information-circled '} size={'160%'} iconColor={'#fff'}  />
                        </Col><Col span={19}>关于牛油果</Col></Row>), style: {flex: '5'}, className: 'font-size-8 textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
