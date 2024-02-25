"use server"
import { NextResponse } from "next/server";
import axios from "axios";

export async function fetchASIN(productName:string) {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/search',
            params: {
              query:productName,
              page: '1',
              country: 'IN',
              category_id: 'aps'
            },
            headers: {
              'X-RapidAPI-Key': process.env.XRapidAPIKeyASIN,
              'X-RapidAPI-Host': process.env.XRapidAPIHostASIN
            }
          };
            const response = await axios.request(options);
            const products = response.data.data.products;
            return products[0].asin;
    } catch (error) {
        return "error"
    }
    
          
}


export async function fetchComments(country:string , ASIN:string) {
    // const res = await fetch("")
    // const data = res.json();
    switch(country){
        case "India" : country="in"; break;
        case "UK" : country="uk"; break;
        case "US" : country="us"; break;
        default : country="in";
    }
        console.log("country : " , country)

    const options = {
        method: 'GET',
        url: 'https://amazon-merchant-data.p.rapidapi.com/get-reviews',
        params: {
          asin: ASIN,
          country: country,
          page: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.XRapidAPIKeyComments,
          'X-RapidAPI-Host': process.env.XRapidAPIHostComments
        }
      };
      
      try {
          let content = ""
          const response = await axios.request(options);
          if( response.data.reviews.lenght == 0)
          return "null"
          for (let i of response.data.reviews){
            content += i.text + "  ";
          }
          return content;
      } catch (error) {
          console.error(error);
          return "error"
      }
}

export async function getAWSData(comments : string){
        const d = {data : comments}
        var myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");
        myHeaders.append("Access-Control-Allow-Origin", "https://yiiyjzgi4a.execute-api.us-east-1.amazonaws.com")
        console.log("inside aws")
        const res = await fetch("https://yiiyjzgi4a.execute-api.us-east-1.amazonaws.com/my-new-stage",{ 
            method : "POST",
            headers:myHeaders,
            body:JSON.stringify(d),
            redirect:"follow",
        })
        const data = res.json()
        return data;
}