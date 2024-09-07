import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([])
  const [, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)
  
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  //   constructor=()=>{
    //   super(props);
    //   // state = {
      //   //   articles: [],
      //   //   loading: true,
      //   //   page: 1,
      //   //   totalResult: 0,
      //   // };
      // };
      
      const upadateNews=async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1eb8424e839d4ccfba27a83a84749437&page=${page}&pageSize=${props.pageSize}`;
        // setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResult)
        setLoading(false)
        // setState({
          //   articles: parsedData.articles,
          //   totalResult: parsedData.totalResults,
          //   // loading: true,
          // });
          props.setProgress(100);
        }
        useEffect(() => {
          upadateNews();
          document.title = `${Capitalize(props.category)}- NewsChimpanzee`;
          // eslint-disable-next-line
        }, [])
  // async componentDidMount=()=> {
  // //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=1eb8424e839d4ccfba27a83a84749437&page=1&pageSize=${props.pageSize}`;
  // //   // setState({loading: true})
  // //   // let data= await fetch(url);
  // //   // let parsedData= await data.json();
  // //   // console.log(parsedData);
  // //   // setState({
  // //   //   articles: parsedData.articles,
  // //   //   totalResult: parsedData.totalResults,
  // //   //   loading: false
  // //   // })
  //   upadateNews();
  // // }
  
  
  // const handlePrevClick = async () => {
  //   console.log("Previous");
  //   setPage(page-1)
  //   upadateNews();
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=1eb8424e839d4ccfba27a83a84749437&page=${this.state.page -1}&pageSize=${props.pageSize}`;
  //   // setState({loading: true})
  //   // let data= await fetch(url);
  //   // let parsedData= await data.json();
  //   // console.log(parsedData);
  //   // setState({
  //   //  page: state.page - 1,
  //   //  articles: parsedData.articles,
  //   //  loading: false
  //   // })
  // };

// const  handleNextClick = async () => {
//     console.log("next");
//     setPage(page+1)
//     upadateNews();
//     //  if(state.page + 1 > Math.ceil(state.totalResults/props.pageSize)){

//     //  }
//     //   else{ let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=1eb8424e839d4ccfba27a83a84749437&page=${this.state.page +1}&pageSize=${props.pageSize}`;
//     //    setState({loading: true})
//     //    let data= await fetch(url);
//     //    let parsedData= await data.json();
//     //    console.log(parsedData);
//     //    setState({
//     //    page: state.page + 1,
//     //    articles: parsedData.articles,
//     //    loading: false
//     //  })
//     //  }
//   };

 const  fetchMoreData = async() => {
    // setState({page: state.page + 1, });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1eb8424e839d4ccfba27a83a84749437&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    // setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults)
    // setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResult: parsedData.totalResults,
    //   // loading: true, 
    // });
  };
 
    return (
      <>
      <h1 className="text-center"style={{marginTop:'90px'}}>
          NewsChimpanzee-Top {Capitalize(props.category)} headlines
        </h1>
        {/* {state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spinner />}
          >
          <div className="container">
          <div className="row">
            {/* {!this.state.loading&&this.state.articles.map((element)=> */}
            {articles.map((element) => {
              return (
                <div className="col-md-4" apikey={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                 />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              state.page + 1 >
              Math.ceil(state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark mx-1"
            onClick={handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  }
  News.defaultProps = {
    country: "in",
    pageSize: 5,
    category:"general"
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }
export default News