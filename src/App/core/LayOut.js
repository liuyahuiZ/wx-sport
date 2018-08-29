import ReactDOM from 'react-dom';
import React , { Component }from 'react';
import {Components, Parts, utils} from 'neo';
import { Router, Route, hashHistory, IndexRedirect, History } from 'react-router';
import '../style/comment.scss';
import '../style/common.scss';
import wx from 'weixin-js-sdk';
import config from '../config/config';
import fetch from '../servise/fetch';

const { Button, PageTransition } = Components;
const { HeaderPart } = Parts
const { sessions, storage } = utils;

class LayOut extends Component {
    constructor(props, context) {
        super(props, context);
      this.state = {
          action: 'enter',
          compontArr: [],
          titleArr: [],
          historyArr:[],
          moving: true,
      };
    }
    componentDidMount(){
        const arr = [];
        const histArr = [];
        arr.push(this.props.children);
        histArr.push(this.props.location.pathname);
        this.setState({
            compontArr: arr,
            historyArr: histArr,
            titleArr: histArr,
            moving: false
        })
        this.getSign();
        // storage.setStorage('userInfo', {"openid":"o7vpA1s0OLLSrPK47Y5sLNDI7NKs","nickname":"MR.Andsen","sex":1,"language":"zh_CN","city":"浦东新区","province":"上海","country":"中国","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTITVMkZP6mtUU1WAxOSa9nyquS9ho7QInmlFhrckhRgtmNTSsZVwuInbu1CjBAAvH7faR7SV4LeTg/132","privilege":[]});
        // storage.setStorage('userId', 4);
    }
    
    componentWillReceiveProps(nextProps, nextContext) {
        const { moving, historyArr } = this.state;
        if(moving) {
            this.setState({
                moving: false
            });
            return;
        }
        if(nextProps.location.pathname === '/') {
            this.setState({
                historyArr: [],
            })
            this.changeContent('leave', nextProps)
            return
        }
        if(!sessions.getStorage('isFirst')){
            sessions.setStorage('isFirst', 'is')
            return 
        }
        if(nextProps.location.action === "PUSH") {
            this.changeContent('enter', nextProps)
        } else if(nextProps.location.action === "POP") {
            this.changeContent('leave', nextProps)
        }
    }
    
    getSign(){
      const self = this;
        let url =  encodeURIComponent(window.location.href.split('#')[0])
        let reqbody={
        "url" : url
        }
        fetch( config.ROOT_URL+ 'wx/sign', { method: 'POST', data: reqbody})
        .then(data => {
        //   console.log(data)
        //   alert(JSON.stringify(data.respBody));
           wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx9a7768b6cd7f33d0', // 必填，公众号的唯一标识
              timestamp: data.respBody.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.respBody.noncestr, // 必填，生成签名的随机串
              signature: data.respBody.signature,// 必填，签名，见附录1
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'chooseImage',
                'scanQRCode',
                'getLocation',
                'openLocation',
                'chooseWXPay'
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(()=>{
            console.log('wx.ready');
            // alert('wx.ready')
          });

          wx.error(function(res){

            console.log('wx err',res);
            // alert('wx.err'+JSON.stringify(res));

            //可以更新签名
          });
          wx.onMenuShareTimeline({
              title: 'shareTest', // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://47.88.2.72:2016/getphotoPal/2017-4-13/14920521723196.png', // 分享图标
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  alert('分享成功')
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  alert('用户取消分享')
              }
          });
          wx.onMenuShareAppMessage({
              title: 'shareTest', // 分享标题
              desc: 'shareTestshareTestshareTest,', // 分享描述
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://47.88.2.72:2016/getphotoPal/2017-4-13/14920521723196.png', // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  alert('分享成功')
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  alert('用户取消分享')
              }
          });
        })
        .catch(error => console.log(error))
    }

    changeContent(action, nextProps){
        const self = this;
        const arr = this.state.compontArr;
        const titArr = this.state.titleArr;
        
        if(arr.length < 2) {   
            let child = React.cloneElement(nextProps.children, { pageIn: 'viewAppear' });
            arr.push(child);
            titArr.push(nextProps.location.pathname);
        }
        this.setState({
            compontArr: arr,
            action: action,
            titleArr: titArr,
            moving: true,
        })
        setTimeout(()=> {
            const arr = self.state.compontArr;
            const titArr = this.state.titleArr;
            arr.shift();
            titArr.shift();
            let child = React.cloneElement(arr[0], { pageIn: '' });
            self.setState({
                compontArr: [child],
                titleArr:titArr,
                moving: false
            })
        }, 600)
    }

    actions(){
        const {historyArr, action} = this.state;
        hashHistory.goBack();
    }
    render() {
        const self = this;
        const {compontArr, titleArr} = this.state;
        const Action = this.state.action;
        let actionArr = [{action: 'leave', enter: 'doc-leave', leave:'doc-enter' },
        {action: 'enter', enter: 'doc-enter', leave:'doc-leave-end' }];
        if(Action === 'enter') {
            actionArr = [{action: 'leave', enter: 'doc-enter', leave:'doc-leave-end' },
            {action: 'enter', enter: 'doc-enter', leave:'doc-leave' }];
        }
        
        let ZIndex = 5;
        const components = compontArr.map((item, idx) => {
            return (<PageTransition
                disable={ compontArr.length === 1 ? false : true }
                act={actionArr[idx].action}
                enter={ (compontArr.length ==1) ? actionArr[idx].leave : actionArr[idx].enter}
                leave={ (compontArr.length ==1) ? actionArr[idx].enter : actionArr[idx].leave}
                key={`${item.props.location.pathname}-com`}
                ><div className="pageContent transf pages" style={{zIndex: ZIndex + idx}}>{item}</div>
                </PageTransition>);
        });
        return(
            <div>
                {/* <HeaderPart titlepart={titleArr} action={Action} onback={() => {this.actions()}}/> */}
                {components}
                {/* <div className="pageContent transf">{this.props.children}</div> */}
            </div>
        );
    }
}

export default LayOut;
