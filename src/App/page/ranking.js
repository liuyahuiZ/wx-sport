import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    LoadMore
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          status: this.props.status,
          productList: [],
          enableLoad: 'canload',
          currentPage: 1,
          pageSize: 5,
      };
    }
    componentDidMount(){
      this.getProduct();
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
    loadmore(){
      console.log('load...');
      const self = this;
      // 'loading' 'loaded' 'canload'
      self.setState({
        enableLoad: 'loading'
      })
      self.getProduct();
    }
    getProduct(){
      const {currentPage, pageSize, productList} = this.state;
      const self = this;
      let reqbody={
        "currentPage" : currentPage,
        "pageSize": pageSize,
      }
      fetch( config.ROOT_URL+ 'article/getArticle', { method: 'POST', data: reqbody})
      .then(data => {
          console.log(data)
          let page =  currentPage;
          let products = productList;
          let enableLoad = 'loading';
          if(data.respHead.code=='0000'){
            products = products.concat(data.respBody.list);
            if( products.length >= data.respBody.pageInfo.allCount ) {
              enableLoad = 'loaded'
            } else{
              page = currentPage + 1;
              enableLoad = 'canload';
            }
            self.setState({
              productList: products,
              enableLoad: enableLoad,
              currentPage: page
            })
          }else{

          }
      })
    }
    

    render() {
        const { status, productList, enableLoad } = this.state;
        const productListDom = productList.map((itm, idx)=>{
          return (
          <Row className="padding-all padding-bottom-3 border-bottom border-color-333"  key={`${idx}-itm`} onClick={()=>{
            this.handleClick(`/articleDetail?id=${itm._id}`)
        }}>
            <Col span={6} className="">
            <div className="middle-round overflow-hide border-radius-9r">
              <img className='middle-round'
              src='https://static1.keepcdn.com/2018/02/28/15/1519802299371_581x581.png'
            />
            </div>
            </Col>
            <Col span={14} className="textclolor-white font-size-9 margin-top-3">
              {itm.title}{itm.tirtle}
            </Col>
            <Col span={4} className="padding-all">
              <div className={`icon trophy ${idx < 3 ? `icon-trophy-${idx}`: ''}`} />
            </Col>
          </Row>)
        });
        return(
          <section className="bg-000 minheight-90">
          <LoadMore enableLoad={enableLoad} percent={20}  loadfunc={()=>{this.loadmore()}}>
            <Row className="padding-all minheight-100">
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-8EBF66 border-radius-5f">
                  <Col className="text-align-center margin-top-1r">
                    <div className="middle-round border-radius-round bg-333 display-inline-block line-height-4r">
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r">
                    <span className="textclolor-white font-size-8">UserName占领了封面</span>
                  </Col>
                </Row>
                </TransAnimal>
              </Col>
             
              <Col span={24} className="bg-1B1B1B margin-top-2 border-radius-5f">
                <Row>
                  <Col span={12}></Col>
                  <Col span={12}></Col>
                </Row>
              </Col>
              <Col className='bg-1B1B1B margin-top-2 border-radius-5f padding-all'>{productListDom}</Col>
            </Row>
            </LoadMore>
          </section>
        );
    }
}
export default OcrDoc;
