<template>
  <div class="footer">
    <div class="copyright">
      <p>Copyright © 2022. letxi.cn</p>
      <p>
        <a target="_blank" href="http://www.beian.gov.cn/" class="font-xk"
          ><img
            src="../assets/images/备案图标.png"
            alt=""
            height="14px"
          />公网安备号码 xxxxxxxxxxxx号</a
        >
      </p>
      <p>
        <a target="_blank" href="https://beian.miit.gov.cn/" class="font-xk"
          >ICP备案号 xxxxxxxxxxxxxx号</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style lang='less' scoped>
.footer {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  .copyright {
    width: 350px;
    padding-top: 15px;
    text-align: center;
  }
  p {
    padding: 2px 0;
    font: 14px "Microsoft YaHei";
    a {
      color: #fff;
      img {
        vertical-align: text-bottom;
      }
      &:hover {
        color: orangered;
      }
    }
  }
}
</style>