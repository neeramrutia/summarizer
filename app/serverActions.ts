"use server"
import { NextResponse } from "next/server";
import axios from "axios";

export async function fetchASIN(productName:string) {
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
          
}


export async function fetchComments(country:string , ASIN:string) {
    // const res = await fetch("")
    // const data = res.json();


    const options = {
        method: 'GET',
        url: 'https://amazon-merchant-data.p.rapidapi.com/get-reviews',
        params: {
          asin: ASIN,
          country: 'in',
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
          for (let i = 0;i<10 ;i++){
            content += response.data.reviews[i].text + "  ";
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