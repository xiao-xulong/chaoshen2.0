<template>
  <div
    class="root"
  
  >
  <!-- v-infinite-scroll="addShowPic"
    :infinite-scroll-disabled="noMorePic"
    infinite-scroll-distance="200" -->
    <pageTop></pageTop>
    <van-dropdown-menu >
      <van-icon name="search" />
      <van-dropdown-item v-model="value1" :options="option1" @change="change"/>
</van-dropdown-menu>
    <img class="title_img" src="../assets/wallPicBackGround.png" />
    <div v-for="item in showPic" :key="item" class="itemContain">
      <img class="backImg" :src="item.url" @click="goDownload(item)" />
      <center class="imgName">{{ item.name }}</center>
    </div>
    <!-- <button v-show="!noMorePic" @click="addShowPic">更多无水印壁纸</button>
    <button style="color: orange" v-show="noMorePic">无更多壁纸了！</button> -->
    <van-pagination @change="pageChange" v-model="currentPage" :total-items="totalNum" :items-per-page="10" />
  </div>
</template>

<script>
import { examplePics, allPics, shootreq,other } from "../../http/http";
import { vips} from "../../http/vips";
import pageTop from "../components/pageTop";
import { onMounted, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { DropdownMenu, DropdownItem ,Pagination ,Dialog,Notify} from 'vant';
export default {
  name: "WallPaper",
  components: {
    pageTop,
  },
  setup() {
    console.log(vips);
    const isVip = ref(false);
    const userInfo = vips.find((element) => element.qq == localStorage.getItem('userId'));
    if (userInfo) {
      if (Number(userInfo.money)>=20) {
        isVip.value=true
      }
      
      if (Number(userInfo.money)<20) {
        isVip.value=false
        Dialog.alert({
        title: "提示",
       overlayClass: "tip-dialog",
         width: "80%",
         message:
           "您不是VIP仅能浏览一页，联系Q群760844036",

       })
      }
      
    }else{
      isVip.value=false
      Dialog.alert({
        title: "提示",
       overlayClass: "tip-dialog",
         width: "80%",
         message:
           "您不是VIP仅能浏览一页，联系Q群760844036",

       })
    }

    console.log(userInfo);
    const value1 = ref('默认排序');
    const currentPage = ref(1);

    const option1 = [
      { text: '默认排序', value: '默认排序' },
      { text: '白月魁', value: '白月魁' },
      { text: '云韵', value: '云韵' },
      { text: '云霄', value: '云霄' },
      { text: '雅妃', value: '雅妃' },
      { text: '玄衣', value: '玄衣' },
      { text: '小医仙', value: '小医仙' },
      { text: '小白', value: '小白' },
      { text: '萧薰儿', value: '萧薰儿' },
      { text: '天穹', value: '天穹' },
      { text: '千仞雪', value: '千仞雪' },
      { text: '宁雨蝶', value: '宁雨蝶' },
      { text: '宁桃', value: '宁桃' },
      { text: '纳兰嫣然', value: '纳兰嫣然' },
      { text: '美杜莎', value: '美杜莎' },
      { text: '陆雪琪', value: '陆雪琪' },
      { text: '韩月', value: '韩月' },
      { text: '曹颖', value: '曹颖' },
      { text: '比比东', value: '比比东' },
    ];
    let show = ref(true);
    const wid = ref({ imgHei: 0 });
    wid.value.imgHei = document.documentElement.clientWidth * 0.8 + "px";
    console.log(wid.value.imgHei);
    let { proxy } = getCurrentInstance();
    onMounted(() => {
      totalNum.value=other.length
 document.documentElement.scrollTo(0, 0);
      const top = document.documentElement.scrollTop || document.body.scrollTop;
    });
    let showPic = ref([]);
    let showPicNum = ref(10);
    let totalNum = ref(0);
    let noMorePic = ref(false);
    let newPic=ref([])
    showPic.value = other.slice(0, showPicNum.value);

    let pageChange = function (num) {
if (isVip.value===true) {
  
      currentPage.value=num
      console.log(num)
      if (value1.value==='默认排序') {
        showPic.value = other.slice((num-1)*10, num*10);
        console.log(showPic.value )
      }else{
        showPic.value = newPic.value.slice((num-1)*10, num*10)
        console.log(showPic.value )
      }
      document.documentElement.scrollTo(0, 0);
      const top = document.documentElement.scrollTop || document.body.scrollTop;
    
}else{currentPage.value=1
  Dialog.alert({
        title: "提示",
       overlayClass: "tip-dialog",
         width: "80%",
         message:
           "您不是VIP仅能浏览一页，联系Q群760844036",

       })
}
      

    };
    
    let addShowPic = function () {

      showPicNum.value += 5;
      if (value1.value==='默认排序') {
        if (other[showPicNum.value - 1] != undefined) {
        showPic.value = other.slice(0, showPicNum.value);
      } else {
        showPic.value = other;
        noMorePic.value = true;
      }
      }else{
        if (newPic.value[showPicNum.value - 1] != undefined) {
        showPic.value = newPic.value.slice(0, showPicNum.value);
      } else {
        showPic.value = newPic.value;
        noMorePic.value = true;
      }
      }

    };
    let goDownload = function (data) {
      console.log(data);
      proxy.$router.push({
        path: "/PicDownload",
        query: {
          data: JSON.stringify(data),
        },
      });
    };
    let  change= function (data) {
if (data!=='默认排序') {
 
  newPic.value=[]
  currentPage.value=1
  other.forEach((item)=>{
if(item.name.indexOf(data) !==-1){
newPic.value.push(item)
}
})
showPic.value =newPic.value.slice(0, 10);
totalNum.value=newPic.value.length
document.documentElement.scrollTo(0, 0);
const top = document.documentElement.scrollTop || document.body.scrollTop;
}else{
  location.reload()
}

console.log(newPic.value);
    }
    return {
      newPic,
      value1,
      option1,
      show,
      allPics,
      showPic,
      showPicNum,
      addShowPic,
      noMorePic,
      goDownload,
      wid,
      change
    ,totalNum,
     currentPage,
     pageChange,
     other,
     isVip
    };
  }

};
</script>

<style scoped lang="less">
:deep(.van-cell:first-child){
  margin-top:0;
}
.van-dropdown-menu{
width: auto;
position: absolute;
top: 65px;
right: 120px;
z-index: 99;
text-align: center;
line-height: 50px;
color: white;
}
:deep(.van-dropdown-menu__bar){
  background: none;
  color: red !important;
  position: absolute;
  z-index: 999;
  width: 50px;
height: 65px;
}
:deep(.van-ellipsis){
  color: red !important;
  font-size: 0px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
:deep(.van-dropdown-menu__title):after{
  content:"";
  border:none
}
.root {
  width: 100%;
  height: auto;
}

.title_img {
  margin-top: 10px;
  width: 150px;
  height: 70px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.itemContain {
  margin-bottom: 20px;

  .backImg {
    width: 94%;
    margin-left: 3%;
    height: v-bind("wid.imgHei");
    object-fit: cover;
    object-position: 50% 15%;
    border: 1px solid #01e7ff;
  }

  .imgName {
    color: white;
    font-size: 28px;
  }
}

button {
  font-size: 26px;
  width: 90%;
  height: 70px;
  margin-left: 5%;
  background: rgba(9, 61, 118, 0.3);
  border: solid 1px #40d7f7;
  color: white;
  text-align: center;
  line-height: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.van-icon-search{
  font-size: 50px;
}
</style>
