// 待辦事項清單
let todoList = [];
// 從 localStorge 中取出 todoList
const str = localStorage.getItem("todoList");
// 如果 str 存在的話（不是null）
if (str) {
    // 將 str 轉成陣列
    todoList = JSON.parse(str);
    // 將資料渲染到畫面上
    render();
}

// $("選擇器")=>jQuery("選擇器")
// $("h1") => <h1></h1>
// $(".title") => class="title"
function render() {
    // 將 todoList 轉成字串
    const str = JSON.stringify(todoList);
    // 將字串化後的 todoList 儲存到 localStorage 中
    localStorage.setItem("todoList", str);
    // 準備將 todolist 渲染到畫面上
    // 將 #todolist 清空
    $("#todoList").empty();
    // 選到 #todoListLength 並將 todoList 的長度渲染到畫面上
    $("#todoListLength").text(todoList.length);
    // 將 todoList 內的資料透過迴圈取出
    todoList.forEach((todo, idx) => {
        // console.log(todo);
        const createdAt = moment(todo.createdAt).format("yyyy/MM/DD HH:mm:ss")
        const listItem = `
        <li class="list-group-item">
            <div class="list-group-left">
                 <div class="todo-color-box bg-${todo.color}"></div>
                <h5>
                    ${todo.title}
                    <br>
                    <span class="created-at">Created at ${createdAt}</span>
                </h5>
             </div>
            <div class="list-group-right">
                <button data-idx=${idx} class="delete-btn" type="button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
     </li>`;
        //  將listItem 插入到 #todoList 內
        // document.getElementById("todoList").innerHTML += listItem;
        $("#todoList").append(listItem);
    });
    console.log("#".repeat(30));
}
// 綁定 #createTodoForm 的表單送出事件
// document.getElementById("createTodoForm").addEventListener("submit", function (e) {});
$("#createTodoForm").submit(function (e) {
    // 預防表單送出的重新整理行為
    e.preventDefault();
    // console.log("#createTodoForm submitted");
    const newTodo = {
        title: $("#createTodoTitle").val(),
        color: $("#createTodoColor").val(),
        createdAt: new Date().getTime(),
    };
    // console.log("todo:", newTodo);
    // 將newTodo 物件新增到 todoList 陣列中
    todoList.push(newTodo);
    // console.log("todoList:", todoList);
    // 將資料渲染到render畫面上
    render();
});

// 綁定 #clearTodoListBtn 的點擊事件
$("#clearTodoListBtn").click(function () {
    // 清空待辦事項清單
    console.log("#clearTodoListBtn click!")
    todoList = [];
    // 將資料渲染到畫面上
    render();
});

// 綁定到 todoList 裡面的 .delete-btn 的點擊事件
$("#todoList").delegate(".delete-btn", "click", function () {
    // console.log("準備移除一個按鈕")
    console.log("被點到的按鈕是:", this);
    const idx = parseInt(this.dataset.idx);
    // 將 todoList 陣列中的資料刪圖
    // 在 todoList 內，索引為 idx 的位置，刪除 1 筆資料
    todoList.splice(idx, 1);
    render();
});