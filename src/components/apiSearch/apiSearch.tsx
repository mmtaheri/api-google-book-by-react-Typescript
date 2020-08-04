import React from "react";
import BookList from "../BookList/bookList";
import NotFound from "../NotFound/notFound";
//import SearchBox from "../SearchBox/searchBox"

type ObjBooks = {
    imageLinks :any;
    title:string;
    author:string;
    publisher:string;
    pageCount:number;
    language:string;
    categories:string;
}
type MyState= {
  searchKey: string,
  items: Array<ObjBooks>,
  isLoading: boolean,
  searchInput: string,
  searchGoTop:string,
  totalItem:number,
  
};


class ApiSearch extends React.Component<{}, MyState> {

  constructor(props:{}) {
    super(props);
    this.state = {
      searchKey: "",
      items: [],
      isLoading: false,
      searchInput: "",
      searchGoTop:'hide',
      totalItem: 1
    }
  
     this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (e:any) =>{
    this.setState({
      searchKey: e.target.value.replace(/ +/g, ""),
     });
  
    if (e.key === 'Enter'){
      this.searchBook();
    }
 
  }

  async getDataBook() {
    let searchKey = this.state.searchKey;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchKey}`
    );
    if (!response.ok) {
      throw new Error("Could load json Error 400.");
    }
    const data = await response.json();

    let countBook:number = data.totalItems;
    if(countBook > 0){
      return data;
    }else {
      return ''
    }
  }


  searchBook = async () => {
    if (this.state.searchKey !== '' ){
      this.setState({
        isLoading:true,
      })

      await this.getDataBook()
        .then((data) => {
          let { items,totalItems } = data;
          if (totalItems > 0 ){
            console.log('data',totalItems )
            this.setState({
              totalItem:totalItems,
              items: items,
              searchGoTop:'find',
              isLoading:false,
            })
          } else {
            this.setState({
              totalItem:0,
              searchGoTop:'find',
              isLoading:false,
            })
          }

        })
        .catch((error) => {
         
          console.log("Error in response data" ,error);
          this.setState({
            items: [],
            isLoading:false,
          });
        });
    }else{
      alert('please fill search box')
    }
  };


  render() {
    const {searchGoTop,isLoading,totalItem} = this.state;
    
    return (
      <div className="container">
          <div className="row">
        <div className={`search-wrap ${searchGoTop}`}>
        <div className="search-input-field">

<button className="btn-search" type="button"  onClick={this.searchBook} disabled={this.state.isLoading} >
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
</button>

<input
onKeyDown={this.handleKeyPress}
  id="searchInput"
  type="text"
  placeholder="search book..."
  className="search"
/>

</div>

        </div>
    <div className={`${(isLoading) ? 'show' :''}`} id="spinner"></div>
 
 
   {totalItem > 0 ?   <BookList itemsListProp={this.state.items}  /> :<NotFound/>}
 
      {/* <BookList itemsListProp={this.state.items}  /> */}
    
      </div>
      </div>
    );
  }
}
export default ApiSearch;
