import React from "react";

interface Props{
    imageLinks :any;
    title:string;
    author:string;
    publisher:string;
    pageCount:number;
    language:string;
    categories:string;

}
const BookCard:React.FC<Props> = (props:Props) => {
   //console.log(typeof(props.imageLinks))
    return (
      
      
                            <div  className="book-column">
                      <div className="book-card">
                        <div className="book-list-content">
                            <div className="book-card-image"><img src={props.imageLinks === '' ? "https://bulma.io/images/placeholders/128x128.png"   : props.imageLinks.thumbnail} alt="" /> </div>
                            <div className="book-card-body">
                                <div className="book-header">
                                    <h4 className="book-title book-hight-text">Title: {props.title}</h4>
                                    <h4 className="book-author book-hight-text">Author: {props.author != null ? props.author:"no-authors"}</h4>
                                    {/* <h4 className="book-el-link book-hight-text">{props.title}</h4> */}
                                </div>
                                <div className="book-details">
                                    <h5 className="book-publisher book-hight-text">Publisher: {props.publisher != null ? props.publisher : "No Publisher"}</h5>
                                    {/* <h5 className="book-id-number book-hight-text">Id Number: {props.id}</h5> */}
                                </div>
                                <div className="book-details-footer">
                                    <span className="book-badge book-badge-blue"> {props.pageCount != null ? props.pageCount : "#0"} p </span>
                                    <span className="book-badge book-badge-green"> {props.language != null ? props.language : "No Language"} </span>
                                    <span className="book-badge book-badge-red"> #{props.categories} </span>
                                </div>
                          

      </div>
                        </div>
                    </div>
                </div>
              
               
    )
}


export default BookCard;
