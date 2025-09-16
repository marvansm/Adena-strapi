import httpServices from "./api/http";

const api = new httpServices("http://localhost:1337/api/");
const PRODUCT_LISTS = document.querySelector("#productLists");
const COLLECTION_LISTS = document.querySelector("#collectionList");
const AVAILABILITY_LIST = document.querySelector("#Availability");
const COLOR_LISTS = document.querySelector("#colors");
const SIZE_LISTS = document.querySelector("#sizes");
console.log(api.getStrapiData("products"));

const productsRender = () => {
  api.getStrapiData("products?populate=*").then((data) => {
    console.log(data);
    let renderHTML = data?.data
      ?.map(
        (item) => `    <div class="card">
                <div class="img w-full h-[385px] relative group">
                  <img
                    src="http://localhost:1337${item?.image?.url}"
                    alt=""
                    class="object-cover w-full h-full"
                  />

                  <div
                    class="hoverimg w-full h-[385px] absolute inset-0 opacity-0 duration-500 cursor-pointer group-hover:opacity-100"
                  >
                    <img
                      src="http://localhost:1337${item?.hoveimg?.url}"
                      alt=""
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="hoverIcon absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-500"
                  >
                    <ul class="flex items-center gap-1.5">
                      <li
                        class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer"
                      >
                        <i class="ri-shopping-bag-2-line"></i>
                      </li>
                      <li
                        class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer"
                      >
                        <i class="ri-heart-line"></i>
                      </li>
                      <li
                        class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer"
                      >
                        <i class="ri-arrow-left-right-fill"></i>
                      </li>
                      <li
                        class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer"
                      >
                        <i class="ri-search-line"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="sale">
            ${
              item?.sale
                ? `        <button
                      class="bg-[#d96e40] absolute top-[20px] left-[20px] min-w-[50px] px-[10px] leading-[20px] text-[#fff] text-[14px]"
                    >
                      ${item?.sale}
                    </button>`
                : ""
            }
                  </div>
                </div>

                <div class="card_body flex items-start flex-col gap-1.5">
                  <div
                    class="stars text-[18px] text-[#FFA422] flex items-center gap-0 pt-4"
                  >
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                  </div>
                  <h2 class="text-[14px] font-normal text-[#000000] uppercase">
              ${item?.title}
                  </h2>
                  <div class="prices flex items-center gap-1">
                             ${
                               item?.price
                                 ? `        <span
                      class="text-[#d96e40] text-[14px] line-through font-normal"
                      >$${item?.price.toFixed(2)}</span
                    >   `
                                 : ""
                             }
                   <span class="text-black text-[14px] font-normal"
                      >$${item?.discountprice.toFixed(2)}</span
                    >  
 
                  </div>
                  <div class="colors">
                    <ul class="flex items-center gap-1.5">
                  ${item?.colors
                    ?.map(
                      (color) => `    <li
                        class="w-[20px] h-[20px] rounded-full bg-[${color?.code}] leading-[20px]"
                      ></li>`
                    )
                    .join("")}
                    </ul>
                  </div>
                </div>
              </div>`
      )
      .join("");
    PRODUCT_LISTS.innerHTML = renderHTML;
  });
};

const collections = () => {
  api.getStrapiData("collections").then((data) => {
    console.log(data);
    let collectionRender = data?.data
      ?.map(
        (c) => `<div class="flex items-center justify-between w-full">
        <span class="text-gray-600">${c?.Name}</span>
                      <span class="text-gray-400 text-sm">(8)</span>
        </div>`
      )
      .join("");
    COLLECTION_LISTS.innerHTML = collectionRender;
  });
};
const Availability = () => {
  api.getStrapiData("stock-statuses").then((data) => {
    console.log(data);
    let availabilityRender = data?.data
      ?.map(
        (s) => `<div class="flex items-center justify-between w-full">
        <span class="text-gray-600">${s?.name}</span>
                      <span class="text-gray-400 text-sm">(8)</span>
        </div>`
      )
      .join("");
    AVAILABILITY_LIST.innerHTML = availabilityRender;
  });
};
const Colors = () => {
  api.getStrapiData("colors").then((data) => {
    console.log(data);
    let colorsRender = data?.data
      ?.map(
        (c) => `
                    <ul class="flex items-center gap-1.5">
                   <li
                        class="w-[30px] h-[30px] border border-gray-200 rounded-full bg-[${c?.code}] leading-[20px]"
                      ></li>
                    </ul>
                `
      )
      .join("");
    COLOR_LISTS.innerHTML = colorsRender;
  });
};

const Sizes = () => {
  api.getStrapiData("sizes").then((data) => {
    console.log(data);
    let sizeRender = data?.data
      ?.map(
        (s) => `<div class="flex items-center  gap-2">
       <button class="px-3 bg-transparent border border-gray-200 flex items-center gap-2 hover:bg-amber-900 group duration-300 cursor-pointer">
        <span class="text-gray-500 group-hover:text-white">${s?.name}</span>
                      <span class="text-gray-400 text-[12px] group-hover:text-white">(8)</span>
       </button>
        </div>`
      )
      .join("");
    SIZE_LISTS.innerHTML = sizeRender;
  });
};

Sizes();
Colors();
Availability();
collections();
productsRender();
