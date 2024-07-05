document.addEventListener("DOMContentLoaded", (event) => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let pgno = urlParams.get("page");
  
    let currentPath = window.location.pathname; 
  
    if(!pgno){
    urlParams.set('page', 1);
    window.history.replaceState({}, '', `${currentPath}?page=${1}`);
    }
  
    document.addEventListener("click", (event) => {
      queryString = window.location.search;
      urlParams = new URLSearchParams(queryString);
      pgno = urlParams.get("page");
    
      currentPath = window.location.pathname; 
    
      // Pagination number button
      if (event.target && event.target.closest(".pagenationBtn")) {
        let pageNo = event.target
          .closest(".pagenationBtn")
          .getAttribute("data-page-no");
        console.log(pageNo);
        if (pgno != pageNo) {
        //   urlParams.set('page', pageNo);
          window.location.href = `${currentPath}?page=${pageNo}`;
        }
      }
      // Next button
      if (event.target && event.target.closest("#nxtBtn")) {
        event.preventDefault();
        const totalPages = event.target
          .closest("#nxtBtn")
          .getAttribute("total-pages");
  
        if (pgno < totalPages) {
          let n = Number(pgno) + 1;
        //   urlParams.set('page', n);
          window.location.href = `${currentPath}?page=${n}`;
        }
      }
      // Previous button
      if (event.target && event.target.closest("#prevBtn")) {
        event.preventDefault();
        if (pgno > 1) {
          let n = Number(pgno) - 1;
        //   urlParams.set('page', n);
          window.location.href = `${currentPath}?page=${n}`;
        }
      }
    });

})