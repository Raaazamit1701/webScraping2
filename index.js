const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const { log } = require("console");

// const pageUrl =
//   " https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2";

// const getData = async () => {
//   try {
//     let response = await axios.get(pageUrl);
//     let data = response.data;
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };
// getData();

const pageData = fs.readFileSync("Pagedata.txt");
// console.log(pageData.toString());
const $ = cheerio.load(pageData.toString());
const title = $(".a-size-medium.a-color-base.a-text-normal");
const pri = $(".a-price-whole");
const ratings =$(".a-icon.a-icon-star-small.a-star-small-5.aok-align-bottom")
const productName = [];
title.each((index, element) => {
  const tit = $(element).text();
  productName.push(tit);
  // console.log(tit);
});
const productPrice = [];
pri.each((index, element) => {
  const price = $(element).text();
  productPrice.push(price);
  // console.log(price);
});
const productRating =[];
ratings.each((index,element)=>{
    const rating = $(element).text();
    productRating.push(rating);
})
console.log(productRating);

// console.log(productName);
// console.log(productPrice);
const ProductJson = productName.map((title, index) => {
  return {
    discription: title,
    price: productPrice[index],
    rating:4,
    Availability:"yes",
  };
});
 console.log(ProductJson);
 fs.writeFileSync("product.json",JSON.stringify(ProductJson));

const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(ProductJson);

xlsx.utils.book_append_sheet(workbook, worksheet);

xlsx.writeFile(workbook, "product.xlsx");
console.log("work sucessfull");
