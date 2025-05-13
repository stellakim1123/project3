async function fetchBooks(query) {
    const params =new URLSearchParams({
        target: "title", 
        query,
    }); 

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            Authorization : "KakaoAK 63346950c3790693cf435b45d5a338ed"
        }
    }); 

    if(!response.ok){
        throw new Error(`HTTP 오류: ${response.status}`); 
    }

    return response.json();
   }

   async function bookData() {
    try{
        const querys= ['소설', '역사', '경제', '자기계발', '시']; 

        querys.forEach(async(query, i)=>{
            const data =await fetchBooks(query); 

            const divs=$("article").eq(i).find(".box"); 

            for(let j=0; j<divs.length; j++){
                divs.eq(j).append("<img src=" + data.documents[j].thumbnail+">");
                divs.eq(j).append("<h3>" + data.documents[j].title+"</h3>");
                divs.eq(j).append("<h6>" + data.documents[j].authors+"</h6>"); 

                let str=data.documents[j].contents.substring(0,60); 

                divs.eq(j).append("<p>"+str+"</p>"); 
                divs.eq(j).append("<button>click</button>");
            }
        })
    } catch(error){
        console.log("에러발생", error); 
    }
   }

   bookData();

   $('#booktab li').click(function(){
    let i=$(this).index(); 
    $(".list").eq(i).show().siblings(".list").hide();
   });

   $("#booktab li").click(function(){
    $("#titlelist").text($(this).text());
   });

// async function fetchBooks2(query) {
//         const params = new URLSearchParams({
//             target: "title",
//             query,
//             size: 50
//         });
//         const url = `https://dapi.kakao.com/v3/search/book?${params}`;

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP 오류: ${response.status}`);
//         }

//         return response.json();
//     }


async function bookData2() {
        try {
            const querys = ['자바스크립트', '정원'];

            querys.forEach(async (query, k) => {
                const data = await fetchBooks(query);

                // for문 (8개)
                const divs = $('section').eq(k+2).children('.box');
                console.log(divs)
                for (let l=0; l<divs.length; l++) {
                    divs.eq(l).append("<img src=" + data.documents[l].thumbnail + "/>");
                    divs.eq(l).append("<h3>" + data.documents[l].title + "</h3>");
                    divs.eq(l).append("<h6>" + data.documents[l].authors + "</h6>");

                    let str =  data.documents[l].contents.substring(0, 60);
                    divs.eq(l).append("<p>" + str + "</p>");
                    divs.eq(l).append("<button>" + "click" + "</button>");
                }
            })
        } catch (error) {
            console.log('에러발생', error);
        }
    }

    bookData2();