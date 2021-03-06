import React from "react";
import BookCard from "../BookCard/bookCard";

const BookList = (props:any) => {
 
  return (
   <>

      {props.itemsListProp.map((item:any, i:number) => {
         //console.log(props.itemsListProp)
        let {
          title,
          imageLinks,
          authors,
          publisher,
          pageCount,
          language,
          categories,
        } = item.volumeInfo;

        return (
         
         
          <BookCard
            key={i}
            title={title}
            author={authors}
            imageLinks={imageLinks}
            publisher={publisher}
            pageCount={pageCount}
            language={language}
            categories={categories}
          /> 
       
       
        );
      })}
  
    </>
  );
};

export default BookList;
