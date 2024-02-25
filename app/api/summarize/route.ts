//  this file is just for testing

import { NextResponse } from "next/server";
const d = "'Good. 👍👍👍', 'Good processor and vibrant display.', 'It is speed and is not hanging like other android devices. With this king of storage and ram capacity. With buying', 'I have ordered this mobile last month and delivered the same after 2 weeks. The quality of this products is not acceptable and I intiated return process. Even after 2 weeks no response and no update from Amazon.', 'Smart feature display is very good in this price', It's a typical Moto product. Being a Moto fan loved it. Simple but sturdy. Fast and efficient. Works smooth. No heating issue. No lagging or any other issues in software. Pure Android experience, 'Camera quality is not good ...phone battery is good ...using past 2 days', 'Camera Quality is not good as compared then same budget range phone.Other things ok.', 'Honestly it is the best phone for normal use under this price range however it is heavier than industry average weight. It gets heated for heavy workload so buy it accordingly', Good"
export async function GET(){
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '37a04799a1msha5927427c0b0490p177c02jsn75681093b322',
      'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
    },
    body: JSON.stringify({
      language: 'english',
      summary_percent: 20,
      text: "'Good. 👍👍👍', 'Good processor and vibrant display.', 'It is speed and is not hanging like other android devices. With this king of storage and ram capacity. With buying', 'I have ordered this mobile last month and delivered the same after 2 weeks. The quality of this products is not acceptable and I intiated return process. Even after 2 weeks no response and no update from Amazon.', 'Smart feature display is very good in this price', It's a typical Moto product. Being a Moto fan loved it. Simple but sturdy. Fast and efficient. Works smooth. No heating issue. No lagging or any other issues in software. Pure Android experience, 'Camera quality is not good ...phone battery is good ...using past 2 days', 'Camera Quality is not good as compared then same budget range phone.Other things ok.', 'Honestly it is the best phone for normal use under this price range however it is heavier than industry average weight. It gets heated for heavy workload so buy it accordingly', Good"
    })
  };
  
  try {
    const response = await fetch('https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1', options);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false
    }, {
      status: 500
    });
  }
}















