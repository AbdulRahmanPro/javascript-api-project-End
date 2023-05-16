
const authToken = localStorage.getItem("token")
var  id_account = localStorage.getItem("id_account")
const profile_img = document.getElementById("profile_img");
const email = document.getElementById("email")
const name1  = document.getElementById("name")
const user = document.getElementById("user")
const posts_int = document.getElementById("posts_int")
const comment = document.getElementById("comment")
const Sec_posts = document.getElementById("Sec_posts")

console.log( localStorage.getItem("username"))
if (authToken == null) {
    window.location.href = "http://127.0.0.1:5500/Page_Login/LoginPage.html"
  } else {
    Edit_but()
  }


  console.log(id_account)

  Chake_parmes()
  function mouseOverEffect() {
    but_login.style.backgroundColor = "#4C0500";
  }
  
  // دالة إزالة التأثير عندما يترك المؤشر العنصر
  function mouseOutEffect() {
    but_login.style.backgroundColor = "";
  }
  // دالة مسؤولة عن تسجيل الخروج
  function logout() {
    axios({
      method: 'post',
      url: 'https://tarmeezacademy.com/api/v1/logout',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then(res => {
      console.log(res)
      localStorage.removeItem("token")
      location.reload()
    })
      .catch(err => {
  
      })
  }
  // دالة مسؤولة عن تسجيل الخروج
  
  // دالة مسؤولة عن تعديل الزر تبع ناف بار الى تسجيل خروج
  function Edit_but() {
    but_login.innerHTML = "Logout"
    but_login.setAttribute("onclick", "logout()")
    but_login.style.border = "2px solid #8B0000"
    // إضافة المستمعين على الأحداث
    but_login.addEventListener("mouseover", mouseOverEffect);
    but_login.addEventListener("mouseout", mouseOutEffect);
  
  }
  // دالة مسؤولة عن تعديل الزر تبع ناف بار الى تسجيل خروج

//   دالة مسؤولة عن جلب بيانات المستخدم
    function getProfile() {
        axios({
            method: 'get',
            url: `https://tarmeezacademy.com/api/v1/users/${id_account}`,
            headers: {
                Accept: 'application/json',
                content_type: 'application/json',
            }
            


        }).then(res => {
          user.innerHTML = res.data.data.username
          name1.innerHTML = res.data.data.name
          email.innerHTML = res.data.data.email
          posts_int.innerHTML = res.data.data.posts_count
          comment.innerHTML = res.data.data.comments_count

        })
    }

    function Chake_Show_but(callback) {
      var postElements = document.querySelectorAll(".text-light");
    
      postElements.forEach(function(postElement) {
        var usernameElement = postElement.querySelector("#username");
    
        if (usernameElement) {
          var username = usernameElement.textContent;
          console.log(username);
    
          if (username === "@"+localStorage.getItem("username")) {
            var but_delete = postElement.querySelector("#but_delete");
            var but_edit = postElement.querySelector("#but_edit");
    
            if (but_delete) {
              but_delete.style.display = "block";
              but_delete.className = "btn btn-danger";
            }
    
            if (but_edit) {
              but_edit.style.display = "block";
              but_edit.className = "btn btn-warning";
    
            }
          }
        }
      });
    }


    function delete_post(id){

      axios({
        method: 'delete',
        url: `https://tarmeezacademy.com/api/v1/posts/${id}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer  ${authToken}`
        },
      })
        .then(res => {
          console.log(res)
          location.reload()
        })
  }
  // دالة حذف منشور
  
  function Edit_Post_Request(id, title, body) {
    axios({
      method: 'put',      
      url: `https://tarmeezacademy.com/api/v1/posts/${id}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer  ${authToken}`
      },
      data: {
        title: `decodedData.${title}`,
        body: `decodedData.${body}`
      }
    })
      .then(res => {
        console.log(res)
      })
  }


    function ShowPost(callback , id) {  
      axios({
        method: 'get',
        url: `https://tarmeezacademy.com/api/v1/users/${id_account}/posts`,
        headers: {
          accept: 'application/json',
          contentType: 'application/json',
        }
      })
        .then(res => {
          for (let i = 0; i < 5; i++) {
            var obj = res.data.data[i];
            var encodedData = encodeURIComponent(JSON.stringify(obj));
            var divCrate = document.createElement("div");
            divCrate.setAttribute("class", "text-light");
            divCrate.setAttribute("style", " background-color: #232323;");
            divCrate.setAttribute("id", "post");
            var id = res.data.data[i].id;
            divCrate.innerHTML = `
              <div class="shadow-sm" id="title" style="background-color: #242424;"> 
                <img id="icon" src="${res.data.data[i].author.profile_image}" alt="">
                <h1 id="username">@${res.data.data[i].author.username}</h1>
                <div class="Box_Edit">
                  <button style="display: none;" class="btn btn-danger" id="but_delete" onclick="delete_post(${res.data.data[i].id})">Delete</button>
                  <button style="display: none;" class="btn btn-warning" id="but_edit" data-toggle="modal" data-target="#FormInput_add_Post" onclick="Edit_Post('${encodedData}')">Edit</button>
                </div>
              </div>
              <div class="content">
                <img id="content" src="${res.data.data[i].image}" alt="">
              </div>
              <div class="container">
                <p>${res.data.data[i].created_at}</p>
                <h1>${res.data.data[i].title}</h1>
                <p>${res.data.data[i].body}</p>
                <hr>
                <p>(${res.data.data[i].comments_count}) Comment</p>
              </div>
            `;
            Sec_posts.appendChild(divCrate);
    
            Chake_Show_but();
          }
          callback(int);
        });
    }

    function Chake_parmes(){
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var id = urlParams.get('id');
      if(id){
        id_account = id
        getProfile()
      }
      else{
        null
      }
    }

// دالة قدية تتطوير وهناك خطأ بحيث يقوم بتكرار البوستات 
    // function Post_increase_system() {
    //   Chake_Show_but()
    //   ShowPost(null, 1)
    //   let currentPage = 1; // initialize the current page to 1
    //   window.addEventListener("scroll", function () {
    //     const scrolable = document.documentElement.scrollHeight - window.innerHeight;
    //     const scrolled = window.scrollY;
    //     if (Math.ceil(scrolled) === scrolable) {
    //       Chake_Show_but()
    //       currentPage++; // increment the current page number
    //       ShowPost(Post_increase_system, currentPage); // fetch and append the next set of posts
    //     }
    //   })
    // }
    
    // Post_increase_system()
    ShowPost(Chake_Show_but , id_account)
   Chake_Show_but();
    getProfile()
    Chake_parmes()
    