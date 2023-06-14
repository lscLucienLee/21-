/*
方法:get
res
[{
    "id": "1001",
    "original": "java核心技术1",
    "standard_translation": "120",
    "machine_translation": "res/productimg/1.jpeg"
},{
...
}
]
*/

let table = document.querySelector("table")
//模拟后台响应的数据
let ul = document.querySelector(".pagination");
let page_number = 5; //单页浏览的条数
let Total_pages; //页数
let liAll; //页码按钮下标为 1到length-2是页数 0和length-1为上一页和下一页
let pre; //上一页
let next; //下一页
let pageThis//当前页面号
let start; //当页数据的起始下标
let end; //当页数据的结束下标
function clearTable() {
    table.innerHTML = `
            <tbody>
             <tr>
                <th style="width:40px">#</th>
          <th style="width:320px;text-align: center">语料库名</th>
          <th style="width:320px;text-align: center ">创建时间</th>
          <th style="width:120px;text-align: center ">是否选择合并</th>
            </tr>
        </tbody>
        `
}

window.onload = function () {
    $.ajax({
        url: '/path',
        type: 'GET',
        dataType: 'text',
        success: function (data) {
            console.log(data);
            // 处理响应数据
            let json = JSON.parse(data);
            json.forEach(function (item, i) {
                item.checked = false;
            })
            json.forEach(function (item, i) {
                let tbody = document.querySelector("tbody");
                if (i < page_number) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = `
                            <td>${item.nid}</td>
                            <td>${item.name}</td>
                            <td>${item.time}</td>
                            <td><input id="${item.id}" name="${item.id}" checked=false type="checkbox" style="margin-left: 40px"></td>
                            `
                    tbody.appendChild(tr);
                }
            })
            let len = json.length; //总记录条数
            Total_pages = len % page_number === 0 ? len / page_number : len / page_number + 1; //页数
            for (let i = 1; i <= Total_pages; i++) {
                ul.innerHTML += `
            <li class="page_li" id="${i}"><a href="#">${i}</a></li>
            `
            }
            ul.innerHTML += `
                <li id="next" class="page_li">
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
        `;
            liAll = document.querySelectorAll("li.page_li");
            pageThis = 1; //当前是第几页
            for (let i = 1; i < liAll.length - 1; i++) {
                liAll[i].onclick = function () {
                    if (pageThis !== 1) {
                        start = (pageThis - 1) * page_number;
                        end = start + page_number - 1;
                        if (end > json.length - 1) { //如果当页数据结束值大于总数据条数下标的值则赋值为总数据条数最大下标值
                            end = json.length - 1;
                        }
                    } else {
                        start = 0;
                        end = page_number - 1;
                    }
                    json.forEach(function (item, i) {
                        if (i >= start && i <= end) {
                            item.value = document.getElementById(item.id).checked;
                        }
                    })
                    // for (let j = 1; j < liAll.length - 1; j++) {
                    // }
                    pageThis = this.id; //获取当前是第几页
                    console.log(pageThis);

                    if (pageThis !== 1) {
                        start = (pageThis - 1) * page_number;
                        end = start + page_number - 1;
                        if (end > json.length - 1) { //如果当页数据结束值大于总数据条数下标的值则赋值为总数据条数最大下标值
                            end = json.length - 1;
                        }
                    } else {
                        start = 0;
                        end = page_number - 1;
                    }
                    clearTable();
                    let tbody = document.querySelector("tbody");
                    json.forEach(function (item, i) {

                        if (i >= start && i <= end) {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                            <td>${item.nid}</td>
                            <td>${item.name}</td>
                            <td>${item.time}</td>
                            <td><input id="${item.id}" name="${item.id}" checked=false type="checkbox" style="margin-left: 40px"></td>
                            `
                            tbody.appendChild(tr);
                        }
                    })
                }
            }
            pre = document.querySelector("#pre")
            next = document.querySelector("#next") //下一页
            pre.onclick = function () {
                console.log(pageThis);
                if (pageThis > 1) { //当前页数不等于1时执行上一页
                    start = (pageThis - 1) * page_number;
                    end = start + page_number - 1;
                    if (end > json.length - 1) { //如果当页数据结束值大于总数据条数下标的值则赋值为总数据条数最大下标值
                        end = json.length - 1;
                    }
                    json.forEach(function (item, i) {
                        if (i >= start && i <= end) {
                            item.value = document.getElementById(item.id).checked;
                        }
                    })
                    pageThis--;
                    start = (pageThis - 1) * page_number;
                    end = start + page_number - 1;
                    if (end > json.length - 1) {
                        end = json.length - 1;
                    }
                    clearTable();
                    let tbody = document.querySelector("tbody");
                    json.forEach(function (item, i) {
                        if (i >= start && i <= end) {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                            <td>${item.nid}</td>
                            <td>${item.name}</td>
                            <td>${item.time}</td>
                            <td><input id="${item.id}" name="${item.id}" checked=false type="checkbox" style="margin-left: 40px"></td>
                            `
                            tbody.appendChild(tr);
                        }

                    })
                } else {
                    alert("当前为第一页")
                }
            }
            next.onclick = function () {
                if (pageThis < liAll.length - 2) { //当前页数小于最后一页则执行下一页
                    if (pageThis > 1) {
                        let start = (pageThis - 1) * page_number;
                        let end = start + page_number - 1;
                        if (end > json.length - 1) { //如果当页数据结束值大于总数据条数下标的值则赋值为总数据条数最大下标值
                            end = json.length - 1;
                        }
                    } else {
                        start = 0;
                        end = page_number - 1;
                    }
                    json.forEach(function (item, i) {
                        if (i >= start && i <= end) {

                            item.value = document.getElementById(item.id).checked;
                        }
                    })
                    pageThis++;
                    for (let j = 1; j < liAll.length - 1; j++) {
                    }
                    start = (pageThis - 1) * page_number;
                    end = start + page_number - 1;
                    if (end > json.length - 1) {
                        end = json.length - 1;
                    }
                    clearTable();
                    let tbody = document.querySelector("tbody");
                    json.forEach(function (item, i) {
                        if (i >= start && i <= end) {
                            let tr = document.createElement("tr");
                            tr.innerHTML = `
                            <td>${item.nid}</td>
                            <td>${item.name}</td>
                            <td>${item.time}</td>
                            <td><input id="${item.id}" name="${item.id}" checked=false type="checkbox" style="margin-left: 40px"></td>
                            `
                            tbody.appendChild(tr);
                        }
                    })
                } else {
                    alert("当前为最后一页")
                }
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Error: " + errorThrown);
            // 处理错误
        }
    });
}

function post(){
    if (pageThis > 1) {
        start = (pageThis - 1) * page_number;
        end = start + page_number - 1;
        if (end > json.length - 1) { //如果当页数据结束值大于总数据条数下标的值则赋值为总数据条数最大下标值
            end = json.length - 1;
        }
    } else {
        start = 0;
        end = page_number - 1;
    }
    json.forEach(function (item, i) {
        if (i >= start && i <= end) {

            item.checked = document.getElementById(item.nid).checked;
        }
    })
    var data3={};
     json.forEach(function (item, i) {
      if(item.checked==true)
      {var data1=data3;
      var data2={item.name};
      for (var key in data1) {
     data3[key] = filterData[key];
    }

    for (var key in data2) {
      data3[key] = filterData1[key];
    }
}
   $.ajax({
            url: '/index/', //后端地址
            type: 'POST',       //提交方式
            data:  data3
            ,
            dataType: 'text',       //规定请求成功后返回的数据
            success: function (data) {
                //请求成功之后进入该方法，data为成功后返回的数据
            },
            error: function (errorMsg) {
                //请求失败之后进入该方法，errorMsg为失败后返回的错误信息
            }
        });


   }
}