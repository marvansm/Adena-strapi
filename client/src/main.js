import httpServices from "./api/http";

document.addEventListener("DOMContentLoaded", () => {
  const api = new httpServices("http://localhost:1337/api/");
  const PRODUCT_LISTS = document.querySelector("#productLists");
  const COLLECTION_LISTS = document.querySelector("#collectionList");
  const AVAILABILITY_LIST = document.querySelector("#Availability");
  const COLOR_LISTS = document.querySelector("#colors");
  const SIZE_LISTS = document.querySelector("#sizes");

  const CART_MODAL = document.getElementById("cartModal");
  const CART_PANEL = document.getElementById("cartPanel");
  const CART_OVERLAY = document.getElementById("cartOverlay");
  const CART_CLOSE = document.getElementById("cartClose");

  const SUBMIT_REGISTER = document.querySelector("#submitRegister");
  const REGSITER_USERNAME = document.querySelector("#username");
  const REGSITER_EMAIL = document.querySelector("#email");
  const REGSITER_PASSWORD = document.querySelector("#password");

  const LOGIN_FORM = document.querySelector("#loginForm");
  const LOGIN_EMAIL = document.querySelector("#loginEmail");
  const LOGIN_PASSWORD = document.querySelector("#loginPassword");

  const closeModal = () => {
    CART_OVERLAY.classList.add("opacity-0");
    CART_OVERLAY.classList.remove("opacity-100");
    CART_PANEL.classList.add("translate-x-full");

    setTimeout(() => {
      CART_MODAL.classList.add("hidden");
    }, 300);
  };

  CART_CLOSE.addEventListener("click", closeModal);
  CART_OVERLAY.addEventListener("click", closeModal);

  const productsRender = (query = "") => {
    api.getStrapiData(`products?populate=*${query}`).then((data) => {
      let renderHTML = data?.data
        ?.map(
          (item) => `
        <div class="card">
          <div class="img w-full h-[385px] relative group overflow-hidden">
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
              class="hoverIcon absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500"
            >
              <ul class="flex items-center gap-1.5">
                <li class="openBasket w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer">
                  <i class="ri-shopping-bag-2-line"></i>
                </li>
                <li class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer">
                  <i class="ri-heart-line"></i>
                </li>
                <li class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer">
                  <i class="ri-arrow-left-right-fill"></i>
                </li>
                <li class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white text-[18px] hover:bg-[#63512D] hover:text-white duration-300 cursor-pointer">
                  <i class="ri-search-line"></i>
                </li>
              </ul>
            </div>
            <div class="sale">
              ${
                item?.sale
                  ? `<button class="bg-[#d96e40] absolute top-[20px] left-[20px] min-w-[50px] px-[10px] leading-[20px] text-[#fff] text-[14px]">${item?.sale}</button>`
                  : ""
              }
            </div>
          </div>
          <div class="card_body flex items-start flex-col gap-1.5">
            <div class="stars text-[18px] text-[#FFA422] flex items-center gap-0 pt-4">
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
                  ? `<span class="text-[#d96e40] text-[14px] line-through font-normal">$${item?.price.toFixed(
                      2
                    )}</span>`
                  : ""
              }
              <span class="text-black text-[14px] font-normal">$${item?.discountprice.toFixed(
                2
              )}</span>  
            </div>
            <div class="colors">
              <ul class="flex items-center gap-1.5">
                ${item?.colors
                  ?.map(
                    (color) =>
                      `<li class="w-[20px] h-[20px] rounded-full" style="background-color:${color?.code}"></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>`
        )
        .join("");
      PRODUCT_LISTS.innerHTML = renderHTML;

      // Yeni render olunan kartlarda openBasket eventləri
      document.querySelectorAll(".openBasket").forEach((btn) => {
        btn.addEventListener("click", () => {
          CART_MODAL.classList.remove("hidden");
          setTimeout(() => {
            CART_OVERLAY.classList.add("opacity-100");
            CART_OVERLAY.classList.remove("opacity-0");
            CART_PANEL.classList.remove("translate-x-full");
          }, 10);
        });
      });
    });
  };

  const collections = () => {
    api.getStrapiData("collections").then((data) => {
      let collectionRender = data?.data
        ?.map(
          (c) =>
            `<div class="flex items-center justify-between w-full cursor-pointer" data-id="${c.id}" data-type="collection">
            <span class="text-gray-600">${c?.Name}</span>
            <span class="text-gray-400 text-sm">(8)</span>
          </div>`
        )
        .join("");
      COLLECTION_LISTS.innerHTML = collectionRender;

      COLLECTION_LISTS.addEventListener("click", (e) => {
        const target = e.target.closest("[data-id]");
        if (!target) return;
        const id = target.dataset.id;
        productsRender(`&filters[collection][id][$eq]=${id}`);
      });
    });
  };

  const Availability = () => {
    api.getStrapiData("stock-statuses").then((data) => {
      let availabilityRender = data?.data
        ?.map(
          (s) =>
            `<div class="flex items-center justify-between w-full cursor-pointer" data-id="${s.id}" data-type="availability">
            <span class="text-gray-600">${s?.name}</span>
            <span class="text-gray-400 text-sm">(8)</span>
          </div>`
        )
        .join("");
      AVAILABILITY_LIST.innerHTML = availabilityRender;

      AVAILABILITY_LIST.addEventListener("click", (e) => {
        const target = e.target.closest("[data-id]");
        if (!target) return;
        const id = target.dataset.id;
        productsRender(`&filters[stock_status][id][$eq]=${id}`);
      });
    });
  };

  const Colors = () => {
    api.getStrapiData("colors").then((data) => {
      let colorsRender = data?.data
        ?.map(
          (c) =>
            `<li class="w-[30px] h-[30px] border border-gray-200 rounded-full cursor-pointer" style="background-color:${c?.code}" data-id="${c.id}" data-type="color"></li>`
        )
        .join("");
      COLOR_LISTS.innerHTML = `<ul class="flex items-center gap-1.5">${colorsRender}</ul>`;

      COLOR_LISTS.addEventListener("click", (e) => {
        const target = e.target.closest("[data-id]");
        if (!target) return;
        const id = target.dataset.id;
        productsRender(`&filters[colors][id][$eq]=${id}`);
      });
    });
  };

  const Sizes = () => {
    api.getStrapiData("sizes").then((data) => {
      let sizeRender = data?.data
        ?.map(
          (s) =>
            `<button class="px-3 border border-gray-200 hover:bg-amber-900 hover:text-white duration-300 cursor-pointer" data-id="${s.id}" data-type="size">${s?.name}</button>`
        )
        .join("");
      SIZE_LISTS.innerHTML = sizeRender;

      SIZE_LISTS.addEventListener("click", (e) => {
        const target = e.target.closest("[data-id]");
        if (!target) return;
        const id = target.dataset.id;
        productsRender(`&filters[sizes][id][$eq]=${id}`);
      });
    });
  };

  Sizes();
  Colors();
  Availability();
  collections();
  productsRender();

  SUBMIT_REGISTER &&
    SUBMIT_REGISTER.addEventListener("submit", (e) => {
      e.preventDefault();
      const payload = {
        username: REGSITER_USERNAME.value,
        email: REGSITER_EMAIL.value,
        password: REGSITER_PASSWORD.value,
      };
      api.loginAuth("auth/local/register", payload).then((data) => {
        if (data?.user) {
          localStorage.setItem("email", data?.user?.email);
          setTimeout(() => {
            window.location.href = "../login.html";
          }, 800);
          Swal?.fire?.({
            title: "Registered",
            icon: "success",
            draggable: true,
          });
        }
      });
    });

  LOGIN_FORM &&
    LOGIN_FORM.addEventListener("submit", (e) => {
      e.preventDefault();
      const payload = {
        identifier: LOGIN_EMAIL.value,
        password: LOGIN_PASSWORD.value,
      };
      api.loginAuth("auth/local", payload).then((data) => {
        if (data?.user) {
          localStorage.setItem("token", data?.jwt);
          localStorage.setItem("email", data?.user?.email);
          setTimeout(() => {
            window.location.href = "/";
          }, 800);
          Swal?.fire?.({ title: "Welcome", icon: "success", draggable: true });
        }
      });
    });
});
