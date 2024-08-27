Pagenation

Step: 1
```<script src="https://cdn.jsdelivr.net/gh/SujithVSuresh/pagination-cdn@master/pagination.js"></script>```
Include this at the bottom of your ejs file.

Step: 2
```
          <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item" id="prevBtn"><a class="page-link text-black" href="#">Previous</a></li>
                <% for(let i=1; i<= totalPages; i++){ %>
                <li class="page-item pagenationBtn" data-page-no="<%= i %>"><a class="page-link text-black"><%= i %></a></li>
                <% } %>
                <li class="page-item" total-pages="<%= totalPages %>" id="nxtBtn"><a class="page-link text-black" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
```
          
The above code provides the interface for pagenation. Put this at the place where you want to see the pagenation button. 

Step: 3

Add this code in you respective controller: 
```
const users = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = 5;
    let skip = (page - 1) * limit;
    let users = await User.find({})
      .sort({ dateJoined: -1 })
      .skip(skip)
      .limit(limit);
    const totalOrders = await User.countDocuments({});
    const totalPages = Math.ceil(totalOrders / limit);
    res.render("admin/user", {
      users: users, 
      totalPages: totalPages,
      isLogin: true,
      adminName: req.session.adminName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
```
Instead of User schema you can provide any other schema, which has an array of documents.  
Make sure to pass totalPages count to the front end. Also consider applying skip and limit.  
