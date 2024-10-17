import { jwtDecode } from "jwt-decode"

const Constents = {
  Apk:() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    
        // Status bar ne transparent karva mate
        if (window.matchMedia('(display-mode: standalone)').matches) {
          document.querySelector('meta[name="theme-color"]').setAttribute('content', 'transparent');
        }
      });
    }; 
  },
  httpSuccess: "Success",
  tinymcKey:"1800qht7mdc06i65pnblmat83560kgdbma2n9t6a189pftbk",
  httpErrors: {
    500: (() => {
      const err = new Error("Somthing went wrong")
      err.status = 500
      return err
    })(),
    400: (() => {
      const err = new Error("Missing dependency")
      err.status = 400
      return err
    })(),
    401: (() => {
      const err = new Error("unAuthorized")
      err.status = 401
      return err
    })()
  },
  roles: ["admin", "distributor", "customer"],
  paymentStatus: ['pending', "success", "reject"],
  orderStatus: ["pending", "accept", "dispatch", "return"],
  deliveryStatus: ["pending", "delivered", "canceled"],
  paymentMethod: ["online", "cod"],
  orderStaps:["pending", "accept", "dispatch", "delivered"],
  getQuery: () => {
    let query = window.location.search.split("?")
    query = query[1]
    query = query?.split("&")
    let tmp = query
    query = {
    }
    tmp?.forEach((x) => {
      let key = x.split("=")[0]
      let value = x.split("=")[1]
      query[key] = value
    })
    return query
  },
  getUserDetails: () => {
    try {
      const token = localStorage.getItem("token")
      const userInfo = jwtDecode(token)
      return userInfo
    } catch (error) {
      return null
    }
  }
}
Constents.Apk()

export default Constents