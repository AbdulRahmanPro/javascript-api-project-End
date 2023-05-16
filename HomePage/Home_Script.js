
console.log(localStorage.getItem("username"))
const authToken = localStorage.getItem("token")
var but_login = document.getElementById("but_login")
var but_login_desine = document.getElementById("but_login_desine")
var posts = document.getElementsByClassName("container")
var Sec_container = document.getElementById("Sec_container")
var add_post = document.getElementById("add_post")

// إضافة المستمعين على الأحداث
add_post.addEventListener("click", function () {
  console.log("add_post")
});
if (authToken == null) {
  window.location.href = "http://127.0.0.1:5500/Page_Login/LoginPage.html"
} else {
  Edit_but()
}
console.log(authToken)
// دالة التأثير عندما يتم تمرير المؤشر فوق العنصر
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







function Chake_Show_but(callback) {
  var postElements = document.querySelectorAll(".text-light");

  postElements.forEach(function (postElement) {
    var usernameElement = postElement.querySelector("#username");

    if (usernameElement) {
      var username = usernameElement.textContent;
      console.log(username);

      if (username === "@" + localStorage.getItem("username")) {
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
// دالة مسؤولة عن زيادة عدد المنشورات
function Post_increase_system() {
  Chake_Show_but()
  ShowPost(null, 1)
  let currentPage = 1; // initialize the current page to 1
  window.addEventListener("scroll", function () {
    const scrolable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrolable) {
      Chake_Show_but()
      currentPage++; // increment the current page number
      ShowPost(Post_increase_system, currentPage); // fetch and append the next set of posts
    }
  })
}
// دالة مسؤولة عن زيادة عدد المنشورات

// دالة انشاء فورم لإضافة منشور
function Form_Crate_Post() {
  var FormInput_add_Post = document.createElement("div")
  FormInput_add_Post.setAttribute("class", "container shadow-lg")
  FormInput_add_Post.setAttribute("id", "FormInput_add_Post")
  // modle form add post
  FormInput_add_Post.innerHTML = `
  <h1>Create a post</h1>
  <label for="">title</label>
  <input type="text" class="input-group" id="input_title">
  <label for="">body</label>
  <textarea id="input_body" name="" id="body" cols="30" rows="10"></textarea>
  <input type="file" id="imageUpload" >
  <div>
  <button type="button" class="btn btn-dark" id="but_send">Create</button>
  <button type="button" class="btn btn-dark" id="but_close" onclick="">Close</button>
  </div>
  `
  // modle form add post

  Sec_container.appendChild(FormInput_add_Post)
  but_close.addEventListener("click", function () {
    Sec_container.removeChild(FormInput_add_Post)
  })
}
// دالة انشاء فورم لإضافة منشور


// دالة مسؤولة عن إضافة منشور
function Add_Post() {
  const but = document.getElementsByClassName("btn-send")
  but_send.addEventListener("click", function () {
    var fromdata = new FormData()
    fromdata.append("title", document.getElementById("input_title").value)
    fromdata.append("body", document.getElementById("input_body").value)
    fromdata.append("image", document.getElementById("imageUpload").files[0])
    axios({
      method: 'post',
      url: 'https://tarmeezacademy.com/api/v1/posts',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer  ${authToken}`
      },
      data: fromdata
    })
      .then(res => {
        but_send.addEventListener("click", function () {
          Add_Post()
        })
      })
      .then(res => {
        window.location.reload()

      })
  })
}
// دالة مسؤولة عن إضافة منشور

// دالة حذف منشور
function delete_post(id) {

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

// دالة مسؤولة عن تعديل منشور
async function Edit_Post(id) {
  Form_Crate_Post()
  var decodedData = JSON.parse(decodeURIComponent(id));
  new Promise((resolve, reject) => {

    if (resolve) {
      resolve()
    }
    else {
      reject()
    }
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        var form = document.getElementById("FormInput_add_Post")
        form.getElementsByTagName("h1")[0].innerHTML = "Edit a post"
        form.getElementsByTagName("input")[0].value = decodedData.title
        form.getElementsByTagName("textarea")[0].value = decodedData.body
        form.getElementsByTagName("button")[0].innerHTML = "Edit"
        form.getElementsByTagName("button")[0].addEventListener("click", function () {
          Edit_Post_Request(decodedData.id, decodedData.title, decodedData.body)
        })
      })
    })
    .then(() => {
    })
}

// دالة مسؤولة عن عرض المنشورات

function ShowPost(callback, int) {
  axios({
    method: 'get',
    url: `https://tarmeezacademy.com/api/v1/posts?limit=2&page=${int}`,
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
            <h1 onclick="Show_Profile(${res.data.data[i].author.id})" id="username">@${res.data.data[i].author.username}</h1>
            <div class="Box_Edit">
              <button style="display: none;" class="btn btn-danger" id="but_delete" onclick="delete_post(${res.data.data[i].id})">Delete</button>
              <button style="display: none;" class="btn btn-warning" id="but_edit"  onclick="Edit_Post('${encodedData}')">Edit</button>
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
            <p  onclick="Show_comment('${id}')">(${res.data.data[i].comments_count}) Comment</p>
          </div>
        `;
        posts[0].appendChild(divCrate);

        Chake_Show_but();
      }
      callback(int);
    });
}


function Show_comment(id) {

  axios({
    method: 'get',
    url: `https://tarmeezacademy.com/api/v1/posts/${id}`,
    headers: {
      accept: 'application/json',
      contentType: 'application/json',
    }
  })
  .then(res => {
    console.log(res.data.data.comments)
    var comment = document.createElement("div");
    comment.setAttribute("class", "shadow-lg");
    comment.setAttribute("id", "comment1");
    comment.innerHTML = `
      <h3>@${res.data}</h3>
      <p>Quis odit est quo officia facilis</p>
    `
    var commentContainer = document.getElementById("comment");
    commentContainer.appendChild(comment);
  });
}


function Show_Profile(id) {
  var user = document.getElementById("username");

  window.location.href = `../Page_Profile/Page_Profile.html?id=${id}`;

}
// دالة مسؤولة عن عرض المنشورات

add_post.addEventListener("click", function () {
  Form_Crate_Post()
  Add_Post()
})
Post_increase_system()
but_login.addEventListener("click", function () {
  logout()
})
window.addEventListener("load", function () {
  Chake_Show_but()
})


