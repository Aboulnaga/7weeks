export default function threwToast({ product, title, msg }) {
  const toasts = document.querySelector("#toasts");
  //   const toast = document.querySelectorAll("#toasts #toast");
  let toastDiv = document.createElement("div");
  toastDiv.classList.add("toast");
  toastDiv.id = "toast";
  //   console.log(toast);
  //   console.log(toasts);

  toastDiv.innerHTML = `
    <div class="container">
          <div class="img">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="msg">
            <h5>${title}</h5>
            <p>${msg}</p>
            
          </div>
          <div class="close"><i class="icon far fa-xmark icon"></i></div>
        </div>
        <div class="bar"></div>
    `;

  toastDiv.classList.add("active-toast");
  toasts.prepend(toastDiv);
  const toast = document.querySelectorAll("#toasts .toast");

  if (toast.length > 0) {
    toasts.style.visibility = "visible";
    // console.log(toast.length);
    // console.log("visible");
  }
  toast.forEach(toast => {
    const progressBar = toast.querySelector("#toast .bar");
    // console.log(progressBar);
    let timer;
    clearInterval(timer);
    // toast.classList.add("active-toast");
    timer = setTimeout(() => {
      toast.classList.remove("active-toast");
    }, 3000);

    const closeToast = document.querySelector(".toast .close");
    closeToast.addEventListener("click", () => {
      toast.classList.remove("active-toast");
      clearTimeout(timer);
    });

    toast.addEventListener("mouseover", e => {
      clearTimeout(timer);
      toast.classList.add("active-toast");
      progressBar.style.animationPlayState = "paused";
      progressBar.style.backgroundColor = "red";
    });

    toast.addEventListener("mouseleave", e => {
      clearTimeout(timer);
      progressBar.style.animationPlayState = "running";
      progressBar.style.backgroundColor = "var(--sec)";
      timer = setTimeout(() => {
        toast.classList.remove("active-toast");
        // toasts.removeChild(toast);
      }, 3000); // Set your desired timeout here
    });

    toast.addEventListener("animationend", () => {
      timer = setTimeout(() => {
        // console.log("removing");
        toasts.removeChild(toast);
      }, 500); // Set your desired timeout here
    });

    if (toast.length > 0) {
      toasts.style.visibility = "visible";
      console.log(toast.length);
      console.log("visible");
    } else {
      // console.log(toast.length);
      toasts.style.visibility = "hidden";
      // console.log("hidden");
    }

    // console.log(toast);
  });
}

/**
 * 
 * 
 * 
 * 
 * 
 export default function threwToast({ product, title, msg }) {
  const toasts = document.querySelector("#toasts");
  //   const toast = document.querySelectorAll("#toasts #toast");
  const toastDiv = document.createElement("div");
  toastDiv.classList.add("toast");
  toastDiv.id = "toast";
  //   console.log(toast);
  //   console.log(toasts);

  toastDiv.innerHTML = `
    <div class="container">
          <div class="img">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="msg">
            <h5>${title}</h5>
            <p>${msg}</p>
            
          </div>
          <div class="close"><i class="icon far fa-xmark icon"></i></div>
        </div>
        <div class="bar"></div>
    `;

  toastDiv.classList.add("active-toast");
  toasts.prepend(toastDiv);
  const toast = document.querySelectorAll("#toasts .toast");
  toast.forEach(toast => {
    const progressBar = toast.querySelector(".bar");
    console.log(progressBar);
    let timer;
    clearInterval(timer);
    // toast.classList.add("active-toast");
    timer = setTimeout(() => {
      toast.classList.remove("active-toast");
    }, 3000);

    if (!toast.classList.contains("active-toast")) {
      toast.innerHTML = "";
      return toast.remove();
    }

    const closeToast = document.querySelector(".toast .close");
    closeToast.addEventListener("click", () => {
      toast.classList.remove("active-toast");
      clearTimeout(timer);
    });

    toast.addEventListener("mouseover", e => {
      progressBar.style.animationPlayState = "pause";
      clearTimeout(timer);
    });

    toast.addEventListener("mouseleave", e => {
      progressBar.style.animationPlayState = "running";
      if (toast.classList.contains("active-toast")) {
        setTimeout(() => {
          toast.classList.remove("active-toast");
        }, 3000); // Set your desired timeout here
      }
    });
  });
}
 ///////////////////////////////////////////////
 
let timer;
export default function threwToast({ product, title, msg }) {
  clearInterval(timer);
  const toast = document.querySelector(".toast");
  const multiToastsDiv = document.createElement("div");
  multiToastsDiv.classList.add("multi-toasts");
  toast.innerHTML += `
    <div class="container">
          <div class="img">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="msg">
            <h5>${title}</h5>
            <p>${msg}</p>
            
          </div>
          <div class="close"><i class="icon far fa-xmark icon"></i></div>
        </div>
        <div class="bar"></div>
    `;

  const toastContainer = document.querySelectorAll(".toast .container");
  console.log(toastContainer);

  toastContainer.forEach(container => {});

  toast.classList.add("active-toast");
  timer = setTimeout(() => {
    toast.classList.remove("active-toast");
  }, 3000);

  const closeToast = document.querySelector(".toast .close");
  closeToast.addEventListener("click", () => {
    toast.classList.remove("active-toast");
    clearTimeout(timer);
  });

  toast.addEventListener("mouseover", e => {
    console.log("hi");
    clearTimeout(timer);
  });

  toast.addEventListener("mouseleave", e => {
    if (toast.classList.contains("active-toast")) {
      setTimeout(() => {
        toast.classList.remove("active-toast");
      }, 3000); // Set your desired timeout here
    }
  });
}



 */
